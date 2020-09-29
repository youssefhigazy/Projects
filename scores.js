const scores = document.querySelector(".scores");
const storedScores = JSON.parse(localStorage.getItem("highScores")) || [];

scores.innerHTML = storedScores.map(score => {
    return `<li class="high-score"> ${score.name} - ${score.score} </li>`; 
}).join("");

