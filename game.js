const x_Class = "x";
const o_Class = "o";
const cellElements = document.querySelectorAll("[data-cell]");
// console.log(cellElements);
// NodeList(9)
const board = document.getElementById("board");
// console.log(board);
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
const winningMessageText = document.querySelector("[winning-msg-text]")
const winningMessage = document.getElementById("winning-message")
const restartButton = document.getElementById("restart-button")

restartButton.addEventListener("click", startGame)

let o_Turn;

startGame();

function startGame() {
    o_Turn = false;
    cellElements.forEach((cell) => {
        cell.addEventListener("click", handelclick, { once: true });
    });
    setBoardHoverClass();
    winningMessage.classList.remove("show")
}

function handelclick(e) {
    // console.log("clicked");
    const cell = e.target;
    const currentClass = o_Turn ? o_Class : x_Class;

    // 1. place_mark
    place_mark(cell, currentClass);

    // check win
    if (check_Win(currentClass)) {
        endGame(false)
    } else if (isDraw()) {      // check draw
        endGame(true)
    } else {
        //2. switch turn
        swapTurns()
        setBoardHoverClass()
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageText.innerText = 'Draw!'
    } else {
        winningMessageText.innerText = `${o_Turn ? "o's" : "x's"} wins!`
    }
    winningMessage.classList.add("show")
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(x_Class) || cell.classList.contains(o_Class)
    })
}

function place_mark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    o_Turn = !o_Turn;
}

function setBoardHoverClass() {
    board.classList.remove(x_Class);
    board.classList.remove(o_Class);

    if (o_Turn) {
        board.classList.add(o_Class);
    } else {
        board.classList.add(x_Class);
    }
}

function check_Win(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}