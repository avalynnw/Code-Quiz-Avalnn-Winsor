const startBtn = document.getElementById('start');
var timerEl = document.getElementById('countdown');
const startPage = document.getElementById('start_page');
const questionPage = document.getElementById('questions');
const questionText = document.getElementById('questions_text');
const A_button = document.getElementById('A-button');
const B_button = document.getElementById('B-button');
const C_button = document.getElementById('C-button');
const D_button = document.getElementById('D-button');
const endPage = document.getElementById('post-game-screen');
const alertText = document.getElementById('alert_text');
const submitBtn = document.getElementById('submit');
const highscorePage = document.getElementById('highscores');
const userScore = document.getElementById('score');
const backBtn = document.getElementById('go_back');
const clearBtn = document.getElementById('clear');
const highscoresBtn = document.getElementById('highscores_button');


var highscoreInput = document.querySelector("#initials");
var highscoreForm = document.querySelector("#highscore_form");
var highscoreList = document.querySelector("#highscore_list");
var highscores = [];


let current_question = 0;
var score = 0;

// Array of questions, answers, and whether the selection is correct or not
let questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: [
            {option:"1. strings",answer:false},
            {option:"2. booleans",answer:false},
            {option:"3. alerts",answer:true},
            {option:"4. numbers",answer:false}
        ]
    },
    {
        question: "The condition in an if/else statement is enclosed within _____.",
        answers: [
            {option:"1. quotes",answer:false},
            {option:"2. curly brackets",answer:false},
            {option:"3. parentheses",answer:true},
            {option:"4. square brackets",answer:false}
        ]
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        answers: [
            {option:"1. numbers and strings",answer:false},
            {option:"2. other arrays",answer:false},
            {option:"3. booleans",answer:false},
            {option:"4. all of the above",answer:true}
        ]
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        answers: [
            {option:"1. commas",answer:false},
            {option:"2. curly brackets",answer:false},
            {option:"3. quotes",answer:true},
            {option:"4. parentheses",answer:false}
        ]
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            {option:"1. JavaScript",answer:false},
            {option:"2. terminal/bash",answer:false},
            {option:"3. for loops",answer:false},
            {option:"4. console log",answer:true}
        ]
    },
]


// Hide question page, score page, and alert when the page first loads
questionPage.classList.add('hide');
endPage.classList.add('hide');
highscorePage.classList.add('hide');
alertText.classList.add('hide');

// Start
function start_game() {
    // Begin countdown
    countdown();

    score = 0;
    // Remove extraneous pages
    startPage.classList.add('hide');
    endPage.classList.add('hide');
    highscorePage.classList.add('hide');
    alertText.classList.add('hide');
    questionPage.classList.remove('hide');

    current_question = 0;

    // Display the question and the sample answer text on the buttons
    questionText.innerHTML = questions[current_question].question;
    A_button.innerHTML = questions[current_question].answers[0].option;
    B_button.innerHTML = questions[current_question].answers[1].option;
    C_button.innerHTML = questions[current_question].answers[2].option;
    D_button.innerHTML = questions[current_question].answers[3].option;
}


// Global time declarations
let timeInterval;
let timeLeft;
let max_time = 75; // in seconds
timerEl.textContent = 'Time: ' + max_time + 's';


// Timer function
function countdown() {
    timeLeft = (max_time-1);
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    timeInterval = setInterval(function () {
      // As long as the `timeLeft` is greater than 1
      if (timeLeft > 0) {
        // Set the `textContent` of `timerEl` to show the remaining seconds
        timerEl.textContent = 'Time: ' + timeLeft + 's';
        // Decrement `timeLeft` by 1
        timeLeft--;
      } else {
        timerEl.textContent = 'Time: ' + timeLeft + 's';
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
        // End the game if the game is not over yet 
        end_game();
      }
    // Wait 1000ms
    }, 1000);
}


// Next question
function next_question() {
    // Move to next question
    current_question++;

    // Flash the "correct/wrong" alert for 600ms
    alertText.classList.remove('hide');
    setTimeout(() => { alertText.classList.add('hide');}, 600);

    // Update question and answer text
    questionText.innerHTML = questions[current_question].question;
    A_button.innerHTML = questions[current_question].answers[0].option;
    B_button.innerHTML = questions[current_question].answers[1].option;
    C_button.innerHTML = questions[current_question].answers[2].option;
    D_button.innerHTML = questions[current_question].answers[3].option;
}

// End of game
function end_game() {

    // Hide question page and show post game screen
    questionPage.classList.add('hide');
    endPage.classList.remove('hide');

    // Final score is the amount of seconds left times the amount of correct answers.
    score = (timeLeft*score);
    // Display score
    userScore.innerHTML = "Your final score is " + score + ".";

    // flash the "correct/wrong" alert for 600ms one last time
    alertText.classList.remove('hide');
    setTimeout(() => { alertText.classList.add('hide');}, 600);

    // stop and update timer
    clearInterval(timeInterval);
    timerEl.textContent = 'Time: ' + timeLeft + 's';
}

// shows highscores page
function highscore_list() {
    endPage.classList.add('hide');
    startPage.classList.add('hide');
    questionPage.classList.add('hide');
    highscorePage.classList.remove('hide');
}


// initialize highscores
function init() {
    // get stored scores from localStorage
    var storedHighscores = JSON.parse(localStorage.getItem("highscores"));
    
    // if highscores were retrieved from localStorage, update the array
    if (storedHighscores !== null) {
      highscores = storedHighscores;
    }

    renderHighscores();
}



function storeHighscores() {
    // Stringify and set key in localStorage to highscores array
    localStorage.setItem("highscores", JSON.stringify(highscores));
}



// Function to render the highscore list
function renderHighscores() {
    // Clear highscoreList element
    highscoreList.innerHTML = "";
  
    // Render a new li for each highscore
    for (var i = 0; i < highscores.length; i++) {
      var highscore = highscores[i];

      var li = document.createElement("li");
      li.textContent = highscore;
      li.setAttribute("data-index", i);

      highscoreList.appendChild(li);
    }

}
  





// initialize
init();

// Event Listeners
startBtn.addEventListener('click', start_game);

// Takes the input initials and prints to the highscores list, then stores to local storage.
submitBtn.addEventListener("click", function(event) {

    highscore_list();
    
    event.preventDefault();
    var initials_text = highscoreInput.value.trim();
    if (initials_text === "") {
        return;
    }

    var score_string = score + ' - ' + initials_text;
    highscores.push(score_string);
    highscoreInput.value = "";

    storeHighscores();
    renderHighscores();
});


// Choice buttons which are assigned to one of the answer options each
A_button.onclick = () => {
    if(questions[current_question].answers[0].answer) {
        score++;
        alertText.innerHTML = "correct!";
    }
    else {
        timeLeft = (timeLeft-10);
        alertText.innerHTML = "wrong!";
    }
    if(current_question < (questions.length-1)) {
        next_question();
    }
    else {
        end_game();
    }
}

B_button.onclick = () => {
    if(questions[current_question].answers[1].answer) {
        score++;
        alertText.innerHTML = "correct!";
    }
    else {
        timeLeft = (timeLeft-10);
        alertText.innerHTML = "wrong!";
    }
    if(current_question < (questions.length-1)) {
        next_question();
    }
    else {
        end_game();
    }
}

C_button.onclick = () => {
    if(questions[current_question].answers[2].answer) {
        score++;
        alertText.innerHTML = "correct!";
    }
    else {
        timeLeft = (timeLeft-10);
        alertText.innerHTML = "wrong!";
    }
    if(current_question < (questions.length-1)) {
        next_question();
    }
    else {
        end_game();
    }
}

D_button.onclick = () => {
    if(questions[current_question].answers[3].answer) {
        score++;
        alertText.innerHTML = "correct!";
    }
    else {
        timeLeft = (timeLeft-10);
        alertText.innerHTML = "wrong!";
    }
    //scoreBoard.innerHTML = score;
    if(current_question < (questions.length-1)) {
        next_question();
    }
    else {
        end_game();
    }
}

// Returns to start page
backBtn.onclick = () => {
    startPage.classList.remove('hide');
    endPage.classList.add('hide');
    highscorePage.classList.add('hide');
    alertText.classList.add('hide');
    questionPage.classList.add('hide');
    clearInterval(timeInterval);
    timerEl.textContent = 'Time: ' + max_time + 's';
}

// Clears local storage and updates the highscores list
clearBtn.onclick = () => {
    localStorage.clear();
    highscores = [];
    renderHighscores();
}

// Links to highscores page
highscoresBtn.onclick = () => {
    startPage.classList.add('hide');
    endPage.classList.add('hide');
    highscorePage.classList.remove('hide');
    alertText.classList.add('hide');
    questionPage.classList.add('hide');
    clearInterval(timeInterval);
}