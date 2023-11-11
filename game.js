const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')
const livesCount = document.querySelector('#livesId')
const timeCount = document.querySelector('#timeId')

let canvasSize;
let elementsSize;
let level = 0
let lives = 3

let timeStart;
let timePlayer;
let timeInterval;
let timeActual;


const playerPosition = {
    x: undefined,
    y: undefined
}

const giftPosition = {
    x: undefined,
    y: undefined
}
let enemyPositions = []


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

    const map = maps[level]

    if (!map) {
        gameWin()
        return
    }
    if (!timeStart) {
        timeStart = Date.now()
        timeInterval = setInterval(showTime,100)
    }

    const mapRowCols = map.trim().split("\n").map(row => row.trim().split(""))

    //Liempieza
    game.clearRect(0,0, canvasSize, canvasSize)
    enemyPositions = []

    //ASIGNACION DE VALORES
    showLives()
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
        } else if (col == "I") {
            giftPosition.x = x
            giftPosition.y = y
        } else if (col == "X") {
            enemyPositions.push({
                x: x,
                y: y,
            })
        }

        game.fillText(emoji, x, y)
        })
    });
    movePlayer()
}
function movePlayer () {
    //DETECTAR SI GANASTE
    const giftColisionX = playerPosition.x.toFixed(2) == giftPosition.x.toFixed(2)
    const giftColisionY = playerPosition.y.toFixed(2) == giftPosition.y.toFixed(2)
    const giftColision = giftColisionX && giftColisionY

    if(giftColision) {
        levelWin()
    }

    //DETECTAR SI PERDISTE
    const enemyColsion = enemyPositions.find(enemy => {
        const enemyColsionX = enemy.x.toFixed(2) == playerPosition.x.toFixed(2)
        const enemyColsionY = enemy.y.toFixed(2) == playerPosition.y.toFixed(2)
        return enemyColsionX && enemyColsionY        
    })

    if(enemyColsion) {
        levelLose()
    }

    //DIBUJAR AL PLAYER
    game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y)
}

//MOVIMIENTOS
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
    if ((playerPosition.y - elementsSize)>= elementsSize) {
        playerPosition.y -= elementsSize
        startGame()  
    }
}
function moveDown () {
    if((playerPosition.y + elementsSize) < canvasSize) {
        playerPosition.y += elementsSize
        startGame()
    }
}
function moveLeft () {
    if((playerPosition.x - elementsSize) >= elementsSize) {
        playerPosition.x -= elementsSize
        startGame()
    }
}
function moveRight () {
    if((playerPosition.x + elementsSize) < canvasSize ) {
        playerPosition.x += elementsSize
        startGame()
    }
}

//GANAR O PERDER
function levelWin() {
    console.log("Ganaste");
    level++
    startGame() 
}
function levelLose() {
    lives--
    console.log("Perdiste");

    if (lives <= 0) {
        level = 0
        lives = 3
        timeStart = undefined
    }

    playerPosition.x = undefined
    playerPosition.y = undefined
    startGame()
    
}
function gameWin() {
    console.log("Terminaste el juego");
    clearInterval(timeInterval)
    recordTime()
}
function showLives() {
    livesCount.innerHTML = emojis["HEART"].repeat(lives)
}
function showTime() {
    timeActual = Date.now() - timeStart
    timeCount.innerHTML = timeActual
}
function recordTime () {
    let bestTime;
    let recordStorage = localStorage.getItem('record')

    if(!bestTime) {
        bestTime = timeActual
        localStorage.setItem('record', bestTime)
        return
    }

    if (recordStorage) {
        if (bestTime < recordStorage) {
            localStorage.clear('record')
            localStorage.setItem('record', bestTime)
        }
    }
}