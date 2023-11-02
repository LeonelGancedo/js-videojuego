const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')
let canvasSize;
let elementsSize;
const levelOne = maps[0]

window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)

function setCanvasSize () {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8
    } else {
        canvasSize = window.innerHeight * 0.8
    }
    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)
    elementsSize = (canvasSize / 11)
    startGame()
}

function startGame() {
    game.font = elementsSize + "px Verdana"
    game.textAlign = "center"

    for (let i = 1; i <= 10; i++) {
        game.fillText(emojis["X"],elementsSize * i, elementsSize)
    }

}