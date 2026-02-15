const cells = document.querySelectorAll(".cell")
const layers = document.querySelectorAll(".layer")
const statusdisplay = document.querySelector("#status")
const resetbutton = document.querySelector("#reset")
const winconditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]
let marks = [
  ["","","","","","","","",""],
  ["","","","","","","","",""],
  ["","","","","","","","",""]
]
let player = "X"
let gameactive = false

startGame()

function startGame() {
  gameactive = true
  cells.forEach(cell => cell.addEventListener("click", onClick))
  statusdisplay.textContent = `${player}'s turn`
  resetbutton.addEventListener("click", resetGame)
}

function onClick() {
  let cellindex = this.getAttribute("cellindex")
  let layerindex = this.parentElement.getAttribute("layerindex")
  if (marks[layerindex][cellindex] == "" && gameactive) {
    updateCell(this, cellindex, layerindex)
  }
}

function updateCell(cell, cellindex, layerindex) {
  marks[layerindex][cellindex] = player
  cell.textContent = player
  checkForWinner()
}

function changePlayer() {
  if (player == "X") {
    player = "O"
  } else if (player == "O") {
    player = "Z"
  } else if (player == "Z") {
    player = "X"
  }
  statusdisplay.textContent = `${player}'s turn`
}

function checkForWinner() {
  let win = false
  for (let i = 0; i < winconditions.length; i++) {
    const condition = winconditions[i]
    const layer0slot0 = marks[0][condition[0]]
    const layer0slot1 = marks[0][condition[1]]
    const layer0slot2 = marks[0][condition[2]]
    const layer1slot0 = marks[1][condition[0]]
    const layer1slot1 = marks[1][condition[1]]
    const layer1slot2 = marks[1][condition[2]]
    const layer2slot0 = marks[2][condition[0]]
    const layer2slot1 = marks[2][condition[1]]
    const layer2slot2 = marks[2][condition[2]]
    if (
      layer0slot0 == layer0slot1 && layer0slot1 == layer0slot2 && layer0slot0 != "" ||
      layer1slot0 == layer1slot1 && layer1slot1 == layer1slot2 && layer1slot0 != "" ||
      layer2slot0 == layer2slot1 && layer2slot1 == layer2slot2 && layer2slot0 != "" ||
      layer0slot0 == layer1slot0 && layer1slot0 == layer2slot0 && layer0slot0 != "" ||
      layer0slot0 == layer1slot1 && layer1slot1 == layer2slot2 && layer0slot0 != "" ||
      layer2slot0 == layer1slot1 && layer1slot1 == layer0slot2 && layer2slot0 != ""
      ) {
      win = true
      break
    }
  }
  if (win) {
    statusdisplay.textContent = `${player} wins`
    gameactive = false
  } else if (!marks[0].includes("") && !marks[1].includes("") && !marks[2].includes("")) {
    statusdisplay.textContent = `Draw`
  } else {
    changePlayer()
  }
}

function resetGame() {
  marks = [
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""]
  ]
  cells.forEach(cell => cell.textContent = "")
  player = "X"
  statusdisplay.textContent = `${player}'s turn`
}