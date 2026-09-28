const playersBox = document.getElementById("playersBox");
const playerSelect = document.getElementById("playerSelect");
const pointsInput = document.getElementById("pointsInput");
const timer = document.getElementById("timer");
const startTimerButton = document.getElementById("startTimerButton");
// const pauseTimerButton = document.getElementById("pauseTimerButton");
const stopTimerButton = document.getElementById("stopTimerButton");
const timerSelect = document.getElementById("timerSelect");

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
    }
}

function generatePlayerSelect(){
    for (let i = 0; i < players.length; i++){
        player = players[i];

        let o = document.createElement("option");
        o.value = i;
        o.textContent = player;

        playerSelect.appendChild(o);
    }
}

function reloadSelected(){
    for (let child of playersBox.children){
        child.style.backgroundColor = "white";
    }
    let child = playersBox.children[playerSelect.selectedIndex];
    child.style.backgroundColor = "grey";
}

function pickStartingPlayer(){
    let r = Math.floor(Math.random() * players.length);
    playerSelect.selectedIndex = r;
    // alert(`Grę rozpoczyna ${players[r]}`);
}

function generate(){
    generatePlayersBox();
    generatePlayerSelect();

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

playerSelect.addEventListener("change", () => {
    reloadSelected();
});

pointsButton.addEventListener("click", () => {
    if (pointsInput.value != ""){
        points[playerSelect.value] += parseInt(pointsInput.value);
    }

    pointsInput.value = "";
    reloadPlayers();

    playerSelect.selectedIndex = (playerSelect.selectedIndex + 1) % playerSelect.options.length;

    reloadSelected();
    pointsInput.focus();

    startTimer();
});

pointsInput.addEventListener("keydown", (event) => {
    if (event.key == "Enter"){
        pointsButton.click();
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

    // let secondsLeft = parseInt(timer.textContent);
    // if (secondsLeft == 0){

    // }
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
});

stopTimerButton.addEventListener("click", () => {
    stopTimer();
});

function addKeydows(){
    document.addEventListener("keydown", (event) => {
        if (event.key == " "){
            startTimerButton.click();
        }
        if (event.key == "Enter"){
            pointsInput.focus();
        }
    });
}
