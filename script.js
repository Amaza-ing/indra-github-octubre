const welcomeButton = document.querySelector("#welcome-button");
const message = document.querySelector("#message");
const hourHand = document.querySelector(".clock-hand-hour");
const minuteHand = document.querySelector(".clock-hand-minute");
const secondHand = document.querySelector(".clock-hand-second");

welcomeButton.addEventListener("click", () => {
  message.textContent = "¡Gracias por visitar mi página!";
  welcomeButton.textContent = "¡Listo!";
});

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
