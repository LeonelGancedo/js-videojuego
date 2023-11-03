const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')
const map = maps[0]
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')

let canvasSize;
let elementsSize;

window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)

function setCanvasSize () {
    window.innerHeight > window.innerWidth ? 
    canvasSize = window.innerWidth * 0.8 : canvasSize = window.innerHeight * 0.8
    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)
    elementsSize = (canvasSize / 11)
    startGame()
}
function startGame() {
    game.font = elementsSize + "px Verdana"
    game.textAlign = "center"
    const mapRowCols = map.trim().split("\n").map(row => row.trim().split(""))

    mapRowCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
        let emoji = emojis[col]
        let x = elementsSize * (colIndex + 1)
        let y = elementsSize * (rowIndex + 1)
        game.fillText(emoji, x, y)
        })
    });
}

btnUp.addEventListener('click', moveUp)
btnDown.addEventListener('click', moveDown)
btnLeft.addEventListener('click', moveLeft)
btnRight.addEventListener('click', moveRight)
window.addEventListener('keydown', moveKeys)

function moveKeys (e) {
    switch (e.key) {
        case 'ArrowUp': moveUp()
        break;
        case 'ArrowDown': moveDown()
        break;
        case 'ArrowLeft': moveLeft()
        break;
        case 'ArrowRight': moveRight()
        break;
        default:
        break
    }
}
function moveUp () {
    console.log("Arriba");
}
function moveDown () {
    console.log("Abajo");
}
function moveLeft () {
    console.log("Izquierda");
}
function moveRight () {
    console.log("Derecha");
}