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

const canvas = document.getElementById("viewportCanvas");
const ctx = canvas.getContext("2d");
const vertices = [
    {x: -3, y: -3, z: -3}, {x: -1, y: -3, z: -3}, {x: 1, y: -3, z: -3}, {x: 3, y: -3, z: -3},
    {x: -3, y: -3, z: -1}, {x: -1, y: -3, z: -1}, {x: 1, y: -3, z: -1}, {x: 3, y: -3, z: -1},
    {x: -3, y: -3, z: 1}, {x: -1, y: -3, z: 1}, {x: 1, y: -3, z: 1}, {x: 3, y: -3, z: 1},
    {x: -3, y: -3, z: 3}, {x: -1, y: -3, z: 3}, {x: 1, y: -3, z: 3}, {x: 3, y: -3, z: 3},
    {x: -3, y: -1, z: -3}, {x: -1, y: -1, z: -3}, {x: 1, y: -1, z: -3}, {x: 3, y: -1, z: -3},
    {x: -3, y: -1, z: -1}, {x: -1, y: -1, z: -1}, {x: 1, y: -1, z: -1}, {x: 3, y: -1, z: -1},
    {x: -3, y: -1, z: 1}, {x: -1, y: -1, z: 1}, {x: 1, y: -1, z: 1}, {x: 3, y: -1, z: 1},
    {x: -3, y: -1, z: 3}, {x: -1, y: -1, z: 3}, {x: 1, y: -1, z: 3}, {x: 3, y: -1, z: 3},
    {x: -3, y: 1, z: -3}, {x: -1, y: 1, z: -3}, {x: 1, y: 1, z: -3}, {x: 3, y: 1, z: -3},
    {x: -3, y: 1, z: -1}, {x: -1, y: 1, z: -1}, {x: 1, y: 1, z: -1}, {x: 3, y: 1, z: -1},
    {x: -3, y: 1, z: 1}, {x: -1, y: 1, z: 1}, {x: 1, y: 1, z: 1}, {x: 3, y: 1, z: 1},
    {x: -3, y: 1, z: 3}, {x: -1, y: 1, z: 3}, {x: 1, y: 1, z: 3}, {x: 3, y: 1, z: 3},
    {x: -3, y: 3, z: -3}, {x: -1, y: 3, z: -3}, {x: 1, y: 3, z: -3}, {x: 3, y: 3, z: -3},
    {x: -3, y: 3, z: -1}, {x: -1, y: 3, z: -1}, {x: 1, y: 3, z: -1}, {x: 3, y: 3, z: -1},
    {x: -3, y: 3, z: 1}, {x: -1, y: 3, z: 1}, {x: 1, y: 3, z: 1}, {x: 3, y: 3, z: 1},
    {x: -3, y: 3, z: 3}, {x: -1, y: 3, z: 3}, {x: 1, y: 3, z: 3}, {x: 3, y: 3, z: 3},
];
const edges = [
    [0,3], [4,7], [8,11], [12,15],
    [0,12], [1,13], [2,14], [3,15],
    [16,19], [20,23], [24,27], [28,31],
    [16,28], [17,29], [18,30], [19,31],
    [32,35], [36,39], [40,43], [44,47],
    [32,44], [33,45], [34,46], [35,47],
    [48,51], [52,55], [56,59], [60,63],
    [48,60], [49,61], [50,62], [51,63],
    [0,48], [1,49], [2,50], [3,51],
    [4,52], [5,53], [6,54], [7,55],
    [8,56], [9,57], [10,58], [11,59],
    [12,60], [13,61], [14,62], [15,63]
];
let angle = 0;
let scale = 40;
let fov = 600;
let drag = false;
let prevX = 0;

canvas.addEventListener("pointerdown", onMouseDown);
canvas.addEventListener("pointerup", onMouseUp);
canvas.addEventListener("pointermove", rotateCanvas);
ctx.lineWidth = 2;
draw();

function draw(){
    if(!drag){
        angle += 0.1;
    }
    ctx.clearRect(0, 0, 500, 500);
    let matrix = new DOMMatrix();
    matrix = matrix.translateSelf(0, 0, 500);
    matrix = matrix.rotateSelf(10,0,0);
    matrix = matrix.rotateAxisAngleSelf(0, 1, 0, angle);
    matrix = matrix.scaleSelf(scale, scale, scale);
    let projection = vertices.map(v => {
        let tPoint = matrix.transformPoint(new DOMPoint(v.x, v.y, v.z));
        tPoint.x = (tPoint.x/tPoint.z)*fov;
        tPoint.y = (tPoint.y/tPoint.z)*fov;
        return{
            x: tPoint.x+250,
            y: tPoint.y+230
        };
    });
    ctx.beginPath();
    edges.forEach(([p1,p2]) => {
        ctx.moveTo(projection[p1].x, projection[p1].y);
        ctx.lineTo(projection[p2].x, projection[p2].y);
    });
    ctx.stroke();
    requestAnimationFrame(draw);
}

function onMouseDown(event){
    drag = true;
    prevX = event.clientX;
}

function onMouseUp(event){
    drag = false;
}

function rotateCanvas(event){
    if(drag){
        angle -= (event.clientX-prevX)/3;
        prevX = event.clientX;
    }
}