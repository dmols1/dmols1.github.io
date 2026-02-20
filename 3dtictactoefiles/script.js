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

let cells = document.querySelectorAll(".layer div");
resetButton.addEventListener("click", resetGame);

function onClick() {
    if(gameActive && marks[this.dataset.layer][this.dataset.index] == ""){
        this.style.backgroundImage = "url(3dtictactoefiles/"+player+".png)";
        marks[this.dataset.layer][this.dataset.index] = player;
        this.dataset.mark = player;
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
    cells.forEach(cell => {
        cell.style.backgroundImage = "";
        cell.style.backgroundColor = "lightgrey";
        delete cell.dataset.mark;
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
let viewportMarks = [];
var objectsToDraw = [];
let angle = 0;
let scale = 40;
let fov = 600;
let drag = false;
let prevX = 0;

canvas.addEventListener("pointerdown", onMouseDown);
canvas.addEventListener("pointerup", onMouseUp);
canvas.addEventListener("pointermove", rotateCanvas);
canvas.addEventListener("pointerleave", onMouseUp);
ctx.lineWidth = 2;
setInterval(draw, 1000/60);

function draw(){
    if(!drag){
        angle += 0.1;
    }
    viewportMarks = [];
    objectsToDraw = [];
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
            y: tPoint.y+225,
            zIndex: tPoint.z
        };
    });
    cells.forEach(cell => {
        let x, y, z;
        if(cell.dataset.mark){
            switch(cell.dataset.layer){
                case "0": y = -2; break;
                case "1": y = 0; break;
                case "2": y = 2;
            }
            switch(cell.dataset.index){
                case "0": x = -2; z = 2; break;
                case "1": x = 0; z = 2; break;
                case "2": x = 2; z = 2; break;
                case "3": x = -2; z = 0; break;
                case "4": x = 0; z = 0; break;
                case "5": x = 2; z = 0; break;
                case "6": x = -2; z = -2; break;
                case "7": x = 0; z = -2; break;
                case "8": x = 2; z = -2;
            }
            let entry = viewportMarks.length;
            viewportMarks[entry] = {};
            viewportMarks[entry].x = x;
            viewportMarks[entry].y = y;
            viewportMarks[entry].z = z;
            viewportMarks[entry].mark = cell.dataset.mark;
        }
    });
    let projectedMarks = viewportMarks.map(m => {
        let tPoint = matrix.transformPoint(new DOMPoint(m.x, m.y, m.z));
        tPoint.x = (tPoint.x/tPoint.z)*fov;
        tPoint.y = (tPoint.y/tPoint.z)*fov;
        return{
            x: tPoint.x+250,
            y: tPoint.y+225,
            zIndex: tPoint.z,
            size: 500/tPoint.z,
            mark: m.mark
        };
    });
    edges.forEach(([p1,p2]) => {
        let entry = objectsToDraw.length;
        objectsToDraw[entry] = {};
        objectsToDraw[entry].type = "edge";
        objectsToDraw[entry].zIndex = Math.max(projection[p1].zIndex, projection[p2].zIndex);
        objectsToDraw[entry].x1 = projection[p1].x;
        objectsToDraw[entry].x2 = projection[p2].x;
        objectsToDraw[entry].y1 = projection[p1].y;
        objectsToDraw[entry].y2 = projection[p2].y;
    });
    projectedMarks.forEach(mark => {
        let entry = objectsToDraw.length;
        objectsToDraw[entry] = {};
        objectsToDraw[entry].type = "mark";
        objectsToDraw[entry].zIndex = mark.zIndex;
        objectsToDraw[entry].x = mark.x-50*mark.size;
        objectsToDraw[entry].y = mark.y-50*mark.size;
        objectsToDraw[entry].size = 100*mark.size;
        objectsToDraw[entry].mark = mark.mark;
    });
    objectsToDraw.sort((a, b) => {return b.zIndex - a.zIndex});
    ctx.clearRect(0, 0, 500, 500);
    objectsToDraw.forEach(obj => {
        if(obj.type == "edge"){
            ctx.beginPath();
            ctx.moveTo(obj.x1, obj.y1);
            ctx.lineTo(obj.x2, obj.y2);
            ctx.stroke();
        }else if(obj.type == "mark"){
            let img = new Image();
            img.src = "3dtictactoefiles/"+obj.mark+".png";
            ctx.drawImage(img, obj.x, obj.y, obj.size, obj.size);
        }
    });
}

function onMouseDown(event){
    drag = true;
    prevX = event.clientX;
    event.preventDefault();
}

function onMouseUp(event){
    drag = false;
    event.preventDefault();
}

function rotateCanvas(event){
    if(drag){
        angle -= (event.clientX-prevX)/3;
        prevX = event.clientX;
    }
    event.preventDefault();
}