const welcomeButton = document.querySelector("#welcome-button");
const message = document.querySelector("#message");
const themeToggle = document.querySelector("#theme-toggle");
const hourHand = document.querySelector(".clock-hand-hour");
const minuteHand = document.querySelector(".clock-hand-minute");
const secondHand = document.querySelector(".clock-hand-second");

const savedTheme = window.localStorage.getItem("theme");
const initialTheme = savedTheme === "dark" ? "dark" : "light";
document.documentElement.dataset.theme = initialTheme;
updateThemeToggle(initialTheme);

welcomeButton.addEventListener("click", () => {
  message.textContent = "¡Gracias por visitar mi página!";
  welcomeButton.textContent = "¡Listo!";
});

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  window.localStorage.setItem("theme", nextTheme);
  updateThemeToggle(nextTheme);
});

function updateThemeToggle(theme) {
  const isDark = theme === "dark";
  themeToggle.textContent = "Modo oscuro";
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

function updateClock() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;

  secondHand.style.transform = `translateX(-50%) rotate(${seconds * 6}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minutes * 6}deg)`;
  hourHand.style.transform = `translateX(-50%) rotate(${hours * 30}deg)`;
}

updateClock();
window.setInterval(updateClock, 1000);
