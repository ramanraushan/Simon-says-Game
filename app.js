let gameSeq = [];
let userSeq = [];
let btns = ["red", "green", "yellow", "blue"];
let started = false;
let level = 0;
let highScore = localStorage.getItem("highScore") || 0;

const h2 = document.querySelector("h2");

// Start only via keyboard
document.addEventListener("keydown", startGame);

function startGame() {
  if (!started) {
    started = true;
    levelup();
  }
}

function levelup() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level} | High Score: ${highScore}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.getElementById(randColor);
  gameSeq.push(randColor);

  setTimeout(() => btnFlash(randBtn), 500);
}

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 250);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelup, 1000);
    }
  } else {
    if (level > highScore) {
      highScore = level;
      localStorage.setItem("highScore", highScore);
    }

    h2.innerHTML = `Game Over!<br>Your Score: <b>${level}</b><br>High Score: <b>${highScore}</b><br>Press any key to restart`;

    document.body.classList.add("game-over");
    setTimeout(() => document.body.classList.remove("game-over"), 200);
    reset();
  }
}

function btnPress() {
  if (!started) return;

  let btn = this;
  let userColor = btn.getAttribute("id");

  userSeq.push(userColor);
  btnFlash(btn);
  checkAns(userSeq.length - 1);
}

function reset() {
  started = false;
  level = 0;
  gameSeq = [];
  userSeq = [];
}

// Add click listeners to all buttons
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", btnPress);
});

// Optional: Prevent double-tap zoom
let lastTouch = 0;
document.addEventListener("touchstart", function (e) {
  const now = new Date().getTime();
  if (now - lastTouch <= 300) {
    e.preventDefault();
  }
  lastTouch = now;
}, { passive: false });
