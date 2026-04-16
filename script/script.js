// Variables for the DOM elements
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const settingsBtn = document.getElementById("settings-btn");
const difficultySelect = document.getElementById("difficulty");

// Array
const words = [
  "dependent",
  "dog",
  "superficial",
  "admit",
  "juice",
  "javascript",
  "developer",
  "airplane",
  "great",
  "fun",
  "manipulate",
  "cat",
  "transition",
  "school",
  "computer",
  "programming",
  "drag",
  "loving",
  "north"
];

// Initializing word
let randomWord;

// Initializing score
let score = 0;

// Initializing time
let time = 10;

// Get random word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Show random word in DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Update score
function updateScore() {
  score += 1;
  scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
  time--;
  timeEl.innerHTML = time;

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

// Game over
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = "flex";
}

// Add event listener to input
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    updateScore();
    addWordToDOM();

    if (difficultySelect.value === "hard") {
      time += 2;
    } else if (difficultySelect.value === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    timeEl.innerHTML = time;
    e.target.value = "";
  }
});

// Show/hide settings
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

// Save difficulty
settingsForm.addEventListener("change", (e) => {
  localStorage.setItem("difficulty", e.target.value);
});

// Get difficulty from localStorage
const difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

difficultySelect.value = difficulty;

// Start game
addWordToDOM();
text.focus();

// Start timer
const timeInterval = setInterval(updateTime, 1000);
