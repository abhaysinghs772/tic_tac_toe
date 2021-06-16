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
const winningMessageTextElement = document.querySelectorAll("[winning-msg-text]")
const winningMessageElement = document.getElementById("winning-message")

let o_Turn;

startGame();

function startGame() {
    o_Turn = false;
    cellElements.forEach((cell) => {
        cell.addEventListener("click", handelclick, { once: true });
    });
    setBoardHoverClass();
}

function handelclick(e) {
    // console.log("clicked");
    const cell = e.target;
    const currentClass = o_Turn ? o_Class : x_Class;

    // 1. place_mark
    place_mark(cell, currentClass);

    //2. switch turn
    swapTurns();
    setBoardHoverClass();

    // check win
    if (check_Win(currentClass)) {
        endGame(false)
    }
    // check draw
}

function endGame(draw) {
    if (draw) {

    } else {
        winningMessageTextElement.innerText = `${o_Turn ? "o's" : "x's"} wins!`
    }
    winningMessageElement.classList.add("show")
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