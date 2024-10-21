const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");

let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function start() {
  if (!isRunning) {
    startBtn.textContent = "Start";
    startBtn.classList.add("disable");
    startTime = Date.now() - elapsedTime;
    timer = setInterval(() => update(), 10);
    isRunning = true;
  }
}

function stop() {
  if (isRunning) {
    startBtn.classList.remove("disable");
    startBtn.textContent = "Continue";
    clearInterval(timer);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
  }
}
function reset() {
  startBtn.classList.remove("disable");
  startBtn.textContent = "Start";
  clearInterval(timer);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  display.textContent = "00:00:00:00";
}

function update() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;

  let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  let seconds = Math.floor((elapsedTime / 1000) % 60);
  let milliseconds = Math.floor((elapsedTime % 1000) / 10);

  hours = String(hours).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");
  milliseconds = String(milliseconds).padStart(2, "0");
  display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}
