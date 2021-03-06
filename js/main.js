window.addEventListener("load", init);

// Globals

// Available levels
const levels = {
    easy: 5,
    medium: 3,
    hard: 1
};

// To change level
const currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let highScore = 0;
let isPlaying;

// Dom Elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const highScoreDisplay = document.querySelector("#high-score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");

let words = [
    "hat",
    "time",
    "person",
    "year",
    "way",
    "day",
    "thing",
    "man",
    "world",
    "life",
    "hand",
    "part",
    "child",
    "eye",
    "woman",
    "place",
    "work",
    "week",
    "case",
    "point",
    "company",
    "number",
    "good",
    "first",
    "new",
    "last",
    "long",
    "great",
    "little",
    "own",
    "other",
    "old",
    "right",
    "big",
    "high",
    "different",
    "small",
    "large",
    "next",
    "early",
    "young",
    "important",
    "few",
    "public",
    "bad",
    "same",
    "able"
];

// Initialize Game
function init() {
    // adding extra words to the words array from wordapi
    httpGet("https://mywordapi.herokuapp.com/api/100", (res) => {
        const data = JSON.parse(res);
        words = words.concat(data.words);
    });
    // show number of seconds in UI
    seconds.innerHTML = currentLevel;
    // load word from array
    showWord(words);
    // Start matching on word input
    wordInput.addEventListener("input", startMatch);
    // Call countdown every second
    setInterval(countdown, 1000);
    // Check game status
    setInterval(checkStatus, 50);
}

// Handle HTTP request in the application
const httpGet = (url, callback, err = console.error) => {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.onload = () => callback(request.responseText);
    request.onerror = () => err(request);
    request.send();
};

// Start match
function startMatch() {
    if (matchWords()) {
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = "";
        score++;
    }

    // If score is -1, display 0
    if (score === -1) {
        scoreDisplay.innerHTML = 0;
    } else {
        scoreDisplay.innerHTML = score;
    }
}

// Match currentWord to wordInput
function matchWords() {
    if (wordInput.value === currentWord.innerHTML) {
        message.innerHTML = "Correct!!!";
        return true;
    } else {
        message.innerHTML = "typing...";
        return false;
    }
}

// Pick and show random word
function showWord(words) {
    // Generate random array index
    const randIndex = Math.floor(Math.random() * words.length);
    // Output random word
    currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
    // Make sure time is not run out
    if (time > 0) {
        // Decrement
        time--;
    } else if (time === 0) {
        // Game is over
        isPlaying = false;
    }
    // Show time
    timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
    if (!isPlaying && time === 0) {
        message.innerHTML = "Game Over!!!";
        if (score > highScore) {
            highScore = score;
        }
        highScoreDisplay.innerHTML = highScore;
        score = -1;
    }
}
