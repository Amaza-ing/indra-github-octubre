const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const script = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");

function loadPage({ savedTheme = null, date = "2026-10-22T10:46:30" } = {}) {
  const elements = new Map();
  const intervals = [];
  const storedValues = new Map();
  let currentDate = date;

  class Element {
    constructor() {
      this.textContent = "";
      this.style = {};
      this.attributes = {};
      this.listeners = {};
    }

    addEventListener(event, listener) {
      this.listeners[event] = listener;
    }

    setAttribute(name, value) {
      this.attributes[name] = value;
    }

    click() {
      this.listeners.click();
    }
  }

  const document = {
    documentElement: { dataset: {} },
    querySelector(selector) {
      if (!elements.has(selector)) {
        elements.set(selector, new Element());
      }
      return elements.get(selector);
    },
  };

  if (savedTheme !== null) {
    storedValues.set("theme", savedTheme);
  }

  class FixedDate extends Date {
    constructor() {
      super(currentDate);
    }
  }

  const window = {
    localStorage: {
      getItem(key) {
        return storedValues.has(key) ? storedValues.get(key) : null;
      },
      setItem(key, value) {
        storedValues.set(key, value);
      },
    },
    setInterval(callback, delay) {
      intervals.push({ callback, delay });
    },
  };

  vm.runInNewContext(script, { document, window, Date: FixedDate });

  return {
    document,
    elements,
    intervals,
    storedValues,
    setDate(value) {
      currentDate = value;
    },
  };
}

test("inicia en modo claro cuando no hay un tema guardado", () => {
  const { document, elements } = loadPage();

  assert.equal(document.documentElement.dataset.theme, "light");
  assert.equal(elements.get("#theme-toggle").attributes["aria-pressed"], "false");
  assert.equal(elements.get("#theme-toggle").textContent, "Modo oscuro");
});

test("restaura un tema oscuro guardado", () => {
  const { document, elements } = loadPage({ savedTheme: "dark" });

  assert.equal(document.documentElement.dataset.theme, "dark");
  assert.equal(elements.get("#theme-toggle").attributes["aria-pressed"], "true");
});

test("el botón de tema alterna, actualiza accesibilidad y persiste la preferencia", () => {
  const { document, elements, storedValues } = loadPage();
  const themeToggle = elements.get("#theme-toggle");

  themeToggle.click();
  assert.equal(document.documentElement.dataset.theme, "dark");
  assert.equal(themeToggle.attributes["aria-pressed"], "true");
  assert.equal(storedValues.get("theme"), "dark");

  themeToggle.click();
  assert.equal(document.documentElement.dataset.theme, "light");
  assert.equal(themeToggle.attributes["aria-pressed"], "false");
  assert.equal(storedValues.get("theme"), "light");
});

test("el botón de bienvenida actualiza el mensaje y su etiqueta", () => {
  const { elements } = loadPage();

  elements.get("#welcome-button").click();

  assert.equal(elements.get("#message").textContent, "¡Bienvenido de nuevo!");
  assert.equal(elements.get("#welcome-button").textContent, "¡Listo!");
});

test("calcula los ángulos del reloj y programa una actualización cada segundo", () => {
  const { elements, intervals, setDate } = loadPage();

  assert.equal(elements.get(".clock-hand-second").style.transform, "translateX(-50%) rotate(180deg)");
  assert.equal(elements.get(".clock-hand-minute").style.transform, "translateX(-50%) rotate(279deg)");
  assert.equal(elements.get(".clock-hand-hour").style.transform, "translateX(-50%) rotate(323.25deg)");
  assert.equal(intervals.length, 1);
  assert.equal(intervals[0].delay, 1000);

  setDate("2026-10-22T10:47:00");
  intervals[0].callback();
  assert.equal(elements.get(".clock-hand-second").style.transform, "translateX(-50%) rotate(0deg)");
  assert.equal(elements.get(".clock-hand-minute").style.transform, "translateX(-50%) rotate(282deg)");
  assert.equal(elements.get(".clock-hand-hour").style.transform, "translateX(-50%) rotate(323.5deg)");
});
