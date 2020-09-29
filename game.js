const body = document.getElementsByTagName("body");
const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-number"));
const bonus = 10; //the points for the correct answer 
const maxQuestions = 10;
const actualScore = document.querySelector(".number");
const src = document.querySelector(".src");
const bar = document.querySelector(".fullBar");

let score = 0;
let acceptingAnswers = false;
let currentQuestion = {};
let questionNumber = 0;
let availabeQuestions = [];

let questions = [];


fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple").then(response => {
    return response.json();
}).then (questionsLoaded => {
    console.log(questionsLoaded.results);
    questions = questionsLoaded.results.map(questionLoad => {
        const format = {
            question: questionLoad.question
        }

        const choicesNeeded = [...questionLoad.incorrect_answers];
        format.answer = Math.floor(Math.random() * 3) + 1;
        choicesNeeded.splice(format.answer-1, 0, questionLoad.correct_answer);

        choicesNeeded.forEach((choice, index) => {
            format["choice" + (index + 1)] = choice;
        });

        return format;
    });
    startGame();
}).catch(err => {
    question.innerText = "Get back to the home page!";
});

startGame = () => {
    questionNumber = 0;
    score = 0;
    availabeQuestions = [...questions];
    continueGame();
}

continueGame = () => {
    if (availabeQuestions.length === 0 || questionNumber >= 10){
        localStorage.setItem("recentScore", score);
        return window.location.assign("/end.html");
    }

    questionNumber++;

    actualScore.innerText = `${questionNumber} / ${maxQuestions}`;

    const index = Math.floor(Math.random() * availabeQuestions.length);
    currentQuestion = availabeQuestions[index];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availabeQuestions.splice(index, 1);
    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedOption = e.target;
        const answerSelected = selectedOption.dataset["number"];

        const result = answerSelected == currentQuestion.answer ? "correct" : "incorrect";
        selectedOption.classList.add(result);

        if (result == "correct"){
            score += bonus;
            src.innerText = score;
        } else if (result == "incorrect"){
            score = score;
            src.innerText = score;
        }

        bar.style.width = `${(questionNumber / maxQuestions) * 100}%`;

        setTimeout(() => {
            selectedOption.classList.remove(result);
            continueGame();
        }, 1000);
    });
});



/*const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-number"));
const maxQuestion = 3;
const bonus = 10;

let questionNumber = 0;
let availableQuestions = [];
let score = 0;
let currentQuestion = {};

let questions = [
    {
        question: "Inside which HTML element do we put the JavaScript??",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4
    }
];

startGame = () => {
    score = 0;
    questionNumber = 0;
    availableQuestions = [...questions];
    continueGame();
}

continueGame = () => {
    questionNumber++;
    const index = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[index];
    question.innerText = currentQuestion.question;

    // matching the choices
    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    })
}

startGame();
choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });*/