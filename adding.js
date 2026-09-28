players = [];
points = [];

const nickInput = document.getElementById("nickInput");
const nickButton = document.getElementById("nickButton");
const playersList = document.getElementById("playersList");
const playButton = document.getElementById("playButton");

function addPlayer(){
    if (nickInput.value == ""){
        return;
    }

    let li = document.createElement("li");
    li.textContent = nickInput.value;
    playersList.appendChild(li);

    players.push(nickInput.value);
    points.push(0);

    nickInput.value = "";
    nickInput.focus();
}

nickButton.addEventListener("click", () => {
    addPlayer();
});

nickInput.addEventListener("keydown", (event) => {
    if (event.key == "Enter"){
        nickButton.click();
    }
});

playButton.addEventListener("click", () => {
    if (players.length == 0){
        alert("Dodaj przynajmniej 1 gracza");
        return;
    }

    generate();
    addKeydows();

    document.getElementById("addingPage").hidden = true;
    document.getElementById("scrablePage").hidden = false;

    pointsInput.focus();
});

nickInput.focus();
