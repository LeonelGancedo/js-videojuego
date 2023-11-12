const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')
const gameContainer = document.querySelector('.game-container')
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')
const livesCount = document.querySelector('#livesId')
const timeCount = document.querySelector('#timeId')
const timeCountFinal = document.querySelector('#time2Id')
const recordCount = document.querySelector('#recordId')
const recordCountFinal = document.querySelector('#record2Id')
const resultP = document.querySelector('#result')
const resetArea = document.querySelector('#areaReset')
const btnResetY = document.querySelector('#resetYes')
const btnResetN = document.querySelector('#resetNo')
const btnPlayAgain = document.querySelector('#playAgain')
const resetCuadro = document.querySelector('.reset__cuadro')


let canvasSize;
let elementsSize;
let level = 0
let lives = 3

let timeStart;
let timePlayer;
let timeInterval;


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
    canvasSize = window.innerWidth * 0.7 : canvasSize = window.innerHeight * 0.7

    canvasSize = fixedNumber(canvasSize)
    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)
    elementsSize = fixedNumber((canvasSize / 10))

    playerPosition.x = undefined
    playerPosition.y = undefined

    startGame()
}
function startGame() {
    game.font = elementsSize*0.92 + "px Verdana"
    game.textAlign = "end"

    const map = maps[level]

    if (!map) {
        gameWin()
        return
    }
    if (!timeStart) {
        timeStart = Date.now()
        timeInterval = setInterval(showTime,100)
        showRecord()
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
        let x = fixedNumber(elementsSize * (colIndex + 1))
        let y = fixedNumber(elementsSize * (rowIndex + 1))
                
        if(col == "O") {
            if (!playerPosition.x && !playerPosition.y) {
                playerPosition.x = x
                playerPosition.y = y
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
    if ((fixedNumber(playerPosition.y) - fixedNumber(elementsSize))>= fixedNumber(elementsSize)) {
        playerPosition.y -= fixedNumber(elementsSize)
        startGame()  
    }
}
function moveDown () {
    if((fixedNumber(playerPosition.y) + fixedNumber(elementsSize)) < fixedNumber(canvasSize)) {
        playerPosition.y += fixedNumber(elementsSize)
        startGame()
    }
}
function moveLeft () {
    if((fixedNumber(playerPosition.x) - fixedNumber(elementsSize)) >= fixedNumber(elementsSize)) {
        playerPosition.x -= fixedNumber(elementsSize)
        startGame()
    }
}
function moveRight () {
    if((fixedNumber(playerPosition.x) + fixedNumber(elementsSize)) < fixedNumber(canvasSize) ) {
        playerPosition.x += fixedNumber(elementsSize)
        startGame()
    }
}

//GANAR O PERDER
function levelWin() {
    level++
    startGame() 
}
function levelLose() {
    lives--
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
    clearInterval(timeInterval)

    const recordStorage = localStorage.getItem('record')

    if (recordStorage) {
        if (recordStorage >timeActual) {
            localStorage.setItem('record', timeActual)
            timeCountFinal.innerHTML = secondsToString(timeActual)
            resultP.innerHTML = 'Mejoraste tu record 🏆'
            resetGame()
        } else {
            timeCountFinal.innerHTML = secondsToString(timeActual)
            resultP.innerHTML = 'Casi pero no 😢. Intentalo de nuevo 💪'
            resetGame()
        }
    } else {
        localStorage.setItem('record', timeActual)  
        timeCountFinal.innerHTML = secondsToString(timeActual)
        resultP.innerHTML = 'Lo diste todo en tu primera vez, trata de mejorar 😁'
        resetGame()

    }
}
function showLives() {
    livesCount.innerHTML = emojis["HEART"].repeat(lives)
}
function showTime() {
    timeActual = Date.now() - timeStart
    timeCount.innerHTML = secondsToString(timeActual)
}
function showRecord() {
    recordCount.innerHTML = secondsToString(localStorage.getItem('record'))
    recordCountFinal.innerHTML = secondsToString(localStorage.getItem('record'))
}

//Numeros
function fixedNumber(n) {
    return Number(n.toFixed(0))
}
function secondsToString(miliseconds) {
    let minute = Math.floor(miliseconds / 60000);
    minute = (minute < 10)? '0' + minute : minute;
    let second = Math.floor(miliseconds / 1000);
    second = (second < 10)? '0' + second : second;
    let milisecond = Math.floor(miliseconds % 100);
    milisecond = (milisecond < 10)? '0' + milisecond : milisecond;
    return minute + ':' + second + ':' + milisecond;
  }

//REINTENTAR AL PERDER
function resetGame(){
    resetArea.classList.remove('inactive')
    gameContainer.classList.add('inactive')
}
function resetYes () {
    location.reload()
}
function resetNo () {
    resetCuadro.classList.add('inactive')
    btnPlayAgain.classList.remove('inactive')
}
btnResetY.addEventListener('click', resetYes)
btnResetN.addEventListener('click', resetNo)
btnPlayAgain.addEventListener('click', resetYes)