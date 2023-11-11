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
    const mapRowCols = map.trim().split("\n").map(row => row.trim().split(""))

    //Liempieza
    game.clearRect(0,0, canvasSize, canvasSize)
    enemyPositions = []

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
    const giftColisionX = playerPosition.x.toFixed(2) == giftPosition.x.toFixed(2)
    const giftColisionY = playerPosition.y.toFixed(2) == giftPosition.y.toFixed(2)
    const giftColision = giftColisionX && giftColisionY

    if(giftColision) {
        console.log("Ganaste");
    }

    const enemyColsion = enemyPositions.find(enemy => {
        const enemyColsionX = enemy.x.toFixed(2) == playerPosition.x.toFixed(2)
        const enemyColsionY = enemy.y.toFixed(2) == playerPosition.y.toFixed(2)
        return enemyColsionX && enemyColsionY        
    })

    if(enemyColsion) {
        console.log("Perdiste");
    }


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