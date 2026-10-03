const playersBox = document.getElementById("playersBox");
const pointsInput = document.getElementById("pointsInput");
const addPointsButton = document.getElementById("addPointsButton");
const timer = document.getElementById("timer");
const startTimerButton = document.getElementById("startTimerButton");
const stopTimerButton = document.getElementById("stopTimerButton");
const timerSelect = document.getElementById("timerSelect");
const gridSelect = document.getElementById("gridSelect");

// let lastActive = null, nowActive = null;
// document.addEventListener("focusin", () => {
//     if (nowActive === null){
//         nowActive = document.activeElement;
//         lastActive = null;
//     }
//     else{
//         lastActive = nowActive;
//         nowActive = document.activeElement;
//     }
//     focusLength++;
// });
// document.addEventListener("focusout", () => {

// });

let selected;

function reloadSelected(){
    for (let child of playersBox.children){
        child.style.backgroundColor = "#037d67";
        child.classList.remove("colorFloat");
    }
    let child = playersBox.children[selected];
    child.style.backgroundColor = "#e6d9b7";
    child.classList.add("colorFloat");
}

function select(which){
    selected = which;
    reloadSelected();
}

function generatePlayersBox(){
    for (let i = 0; i < players.length; i++){
        player = players[i];

        let playerBox = document.createElement("div");
        playerBox.classList.add("playerBox");
        playersBox.appendChild(playerBox);

        let h1 = document.createElement("h2");
        h1.textContent = player;
        playerBox.append(h1);

        let p = document.createElement("p");
        p.textContent = 0;
        playerBox.append(p);

        playerBox.addEventListener("click", () => {
            select(i);
            pointsInput.focus();
        });
    }
}

function pickStartingPlayer(){
    selected = Math.floor(Math.random() * players.length);
}

function generate(){
    generatePlayersBox();

    pickStartingPlayer();
    reloadSelected();
}

function reloadPlayers(){
    for (let i = 0; i < playersBox.children.length; i++){
        child = playersBox.children[i];

        let p = child.children[1];

        p.textContent = points[i];
    }
}

addPointsButton.addEventListener("click", () => {
    if (pointsInput.value != ""){
        points[selected] += parseInt(pointsInput.value);
    }

    pointsInput.value = "";
    reloadPlayers();

    selected = (selected + 1) % players.length;

    reloadSelected();

    startTimer();
    pointsInput.focus();
});

pointsInput.addEventListener("keydown", (event) => {
    if (event.key == "Enter"){
        addPointsButton.click();
    }
});

let sound = new Audio("timer_end.mp3");
let timerInterval;
let soundTimeout;
function stopTimer(){
    timer.textContent = "0";
    clearInterval(timerInterval);
    clearTimeout(soundTimeout);
    sound.pause();
    sound.currentTime = 0;
}
function startTimer(){
    stopTimer();

    sound.play();
    soundTimeout = setTimeout(() => {
        sound.pause();
        sound.currentTime = 0;
    }, 2200);

    let secondsLeft = timerSelect.value;
    timer.textContent = secondsLeft;

    timerInterval = setInterval(() => {
        secondsLeft--;
        if (secondsLeft == 10){
            sound.play();
        }
        if (secondsLeft <= 0){
            clearInterval(timerInterval);
        }

        timer.textContent = secondsLeft;
    }, 1000);
}

startTimerButton.addEventListener("click", () => {
    startTimer();
    pointsInput.focus();
});

stopTimerButton.addEventListener("click", () => {
    stopTimer();
    pointsInput.focus();
});

function changeColumns(columns){
    playersBox.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
}

gridSelect.addEventListener("change", () => {
    changeColumns(parseInt(gridSelect.value));
});

// function addKeydows(){
//     document.addEventListener("keydown", (event) => {
//         if (event.key == " "){
//             startTimerButton.click();
//         }
//         if (event.key == "Enter"){
//             pointsInput.focus();
//         }
//     });
// }
