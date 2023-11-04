const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')
const map = maps[0]
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')

let canvasSize;
let elementsSize;

const playerPosition = {
    x: undefined,
    y: undefined
}

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

    game.clearRect(0,0, canvasSize, canvasSize)

    mapRowCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
        let emoji = emojis[col]
        let x = elementsSize * (colIndex + 1)
        let y = elementsSize * (rowIndex + 1)

        if(col == "O") {
            if (!playerPosition.x && !playerPosition.y) {
                playerPosition.x = x
                playerPosition.y = y
                console.log(playerPosition);
            }
        }

        game.fillText(emoji, x, y)
        })
    });

    movePlayer()
}


function movePlayer () {
    game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y)
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
    playerPosition.y -= elementsSize
    startGame()
    console.log(playerPosition);
    console.log(canvasSize);
    
}
function moveDown () {
    console.log("Abajo");
    playerPosition.y += elementsSize
    startGame()
    console.log(playerPosition);
    console.log(canvasSize);
}
function moveLeft () {
    console.log("Izquierda");
    playerPosition.x -= elementsSize
    startGame()
    console.log(playerPosition);
    console.log(canvasSize);
}
function moveRight () {
    console.log("Derecha");
    playerPosition.x += elementsSize
    startGame()
    console.log(playerPosition);
    console.log(canvasSize);
}