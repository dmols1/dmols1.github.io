const layers = document.querySelectorAll(".layer");
const turnLabel = document.getElementById("turnLabel");
const resetButton = document.getElementById("resetButton");
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
    [0,0,0],
    [1,1,1],
    [2,2,2],
    [3,3,3],
    [4,4,4],
    [5,5,5],
    [6,6,6],
    [7,7,7],
    [8,8,8]
];
const layerWinConditions = [
    [0,0,0],
    [1,1,1],
    [2,2,2],
    [0,1,2],
    [2,1,0]
];
let marks = [
  ["","","","","","","","",""],
  ["","","","","","","","",""],
  ["","","","","","","","",""]
];
let cellIndex = [[],[],[]];
let player = "X";
let gameActive = true;

layers.forEach((layer, i) => {
    for(let _ = 0; _ < 9; _++){
        layer.innerHTML += "<div></div>";
    }
    let cells = layer.querySelectorAll("div");
    cells.forEach((cell, j) => {
        cell.dataset.layer = i;
        cell.dataset.index = j;
        cellIndex[i][j] = cell;
        cell.addEventListener("click", onClick);
    });
});

resetButton.addEventListener("click", resetGame);

function onClick() {
    if(gameActive && marks[this.dataset.layer][this.dataset.index] == ""){
        this.style.backgroundImage = "url(3dtictactoefiles/"+player+".png)";
        marks[this.dataset.layer][this.dataset.index] = player;
        for(let i = 0; i < layerWinConditions.length; i++){
            let layerWinCondition = layerWinConditions[i];
            for(let j = 0; j < winConditions.length; j++){
                let winCondition = winConditions[j];
                if(marks[layerWinCondition[0]][winCondition[0]] == player &&
                marks[layerWinCondition[1]][winCondition[1]] == player &&
                marks[layerWinCondition[2]][winCondition[2]] == player &&
                !(winCondition[0] == winCondition[1] && layerWinCondition[0] == layerWinCondition[1])){
                    gameActive = false;
                    turnLabel.innerHTML = player+" wins!";
                    cellIndex[layerWinCondition[0]][winCondition[0]].style.backgroundColor = "green";
                    cellIndex[layerWinCondition[1]][winCondition[1]].style.backgroundColor = "green";
                    cellIndex[layerWinCondition[2]][winCondition[2]].style.backgroundColor = "green";
                }
            }
        }
        if(gameActive && !marks[0].includes("") && !marks[1].includes("") && !marks[2].includes("")){
            gameActive = false;
            turnLabel.innerHTML = "Draw!";
        }else if(gameActive){
            if(player == "X"){
                player = "O";
            }else if(player == "O"){
                player = "Z";
            }else if(player == "Z"){
                player = "X";
            }
            turnLabel.innerHTML = player+"'s turn";
        }
    }
}

function resetGame() {
    gameActive = true;
    marks = [
        ["","","","","","","","",""],
        ["","","","","","","","",""],
        ["","","","","","","","",""]
    ];
    let cells = document.querySelectorAll(".layer div");
    cells.forEach(cell => {
        cell.style.backgroundImage = "";
        cell.style.backgroundColor = "lightgrey";
    });
    player = "X";
    turnLabel.innerHTML = "X's turn";
}