// Game data
let gameSeq = [];
let userSeq = [];
let btns = ["red", "green", "yellow", "blue"];
let started = false;
let level = 0;

// Select elements
const h2 = document.querySelector("h2");

// Preload all sounds
const sounds = {
  red: new Audio("sounds/red.wav"),
  green: new Audio("sounds/green.wav"),
  yellow: new Audio("sounds/yellow.wav"),
  blue: new Audio("sounds/blue.wav"),
  wrong: new Audio("sounds/wrong.wav")
};

// Play a sound by color
function playSound(color) {
  if (sounds[color]) {
    sounds[color].currentTime = 0;
    sounds[color].play();
  }
}

// Flash a button and play sound
function btnFlash(btn) {
  const color = btn.id;
  playSound(color);
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 250);
}

// Start the game
function startGame() {
  if (!started) {
    started = true;
    level = 0;
    gameSeq = [];
    userSeq = [];
    levelup();
  }
}

// Go to next level
function levelup() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  // Add a new random color
  const randIdx = Math.floor(Math.random() * 4);
  const randColor = btns[randIdx];
  gameSeq.push(randColor);

  // Flash entire sequence
  let i = 0;
  const interval = setInterval(() => {
    const color = gameSeq[i];
    const btn = document.getElementById(color);
    btnFlash(btn);
    i++;
    if (i >= gameSeq.length) clearInterval(interval);
  }, 700);
}

// Check user answer
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelup, 1000);
    }
  } else {
    // Game over
    playSound("wrong");
    h2.innerHTML = `Game Over!<br>Your Score Level: <b>${level}</b><br> Press White area on screen to start Again`;
    document.body.classList.add("game-over");
    setTimeout(() => {
      document.body.classList.remove("game-over");
    }, 300);
    started = false;
  }
}

// Handle button press
function btnPress() {
  if (!started) return;

  const btn = this;
  const color = btn.id;
  userSeq.push(color);
  btnFlash(btn);
  checkAns(userSeq.length - 1);
}

// Add click listeners to buttons
const allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

// Start game on any key, mouse, or touch input (except modal/instruction button)
function handleStartInput(e) {
  // Prevent clicks on links or modals from starting the game
  if (
    e.target.closest(".start-btn") ||
    e.target.closest("#howBtn") ||
    e.target.closest(".modal")
  ) return;

  startGame();
}

document.addEventListener("keydown", handleStartInput);
document.addEventListener("mousedown", handleStartInput);
document.addEventListener("touchstart", handleStartInput);
