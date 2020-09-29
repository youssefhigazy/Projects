const username = document.querySelector(".username");
const saveBtn = document.querySelector(".save");
const finalScore = document.querySelector(".final");
const scores = localStorage.getItem("recentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const maxHighScore = 5;

finalScore.innerText = scores;

username.addEventListener("keyup", () => {
    saveBtn.disabled = !username.value;
});


saveHighScore = e => {
    e.preventDefault();
    const score = {
        score: scores,
        name: username.value
    };
    highScores.push(score);
    highScores.sort((a,b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("/");
}
