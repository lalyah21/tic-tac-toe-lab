/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8], //rows
    [0,3,6], [1,4,7], [2,5,8], // colums
    [0,4,6], [2,4,8] // diagonals
]



/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;
let squareIndex;


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const boardContainer = document.querySelector('.board');

const resetBtnEl = document.createElement('button');

resetBtnEl.id = 'reset';
resetBtnEl.textContent = 'Reset Game'

document.body.appendChild(resetBtnEl);

/*-------------------------------- Functions --------------------------------*/

function init() {
board = Array(9).fill('');
//board = ['X','O','','X','O','','X','O','X'];
turn = "X";
winner = false;
tie = false;
render()
}
init()
function render() {
updateBoard();
updateMessage();
}

function updateBoard() {
   board.forEach((mark, index) => {
    const square = squareEls[index];
    square.textContent = mark
   })
}

function updateMessage() {
    if (winner === true && tie === false) {
        messageEl.textContent = `Congratulations ${turn} Wins!`

    } else if (winner === false && tie === true){
        messageEl.textContent = `it's a tie!`
    } else if (winner === false && tie === false) {
        messageEl.textContent = `Current turn: ${turn}`
    }
}

function handleClick(event) {
    squareIndex = parseInt(event.target.id)
    if (board[squareIndex] || winner === true) return;

    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}

function placePiece(index){
    board[index] = turn
    console.log (board)
}

function checkForWinner(){
    for (const combo of winningCombos){
        const [a,b,c] = combo;
        if (board[a]&& board [a]===board[b]&& board[b]=== board[c]) {
            winner = true;
            console.log('Winner: ' + winner);
            return;
        }
    }
}

function checkForTie() {
    if (winner === true) return;

    tie = board.every(square => square !== "");
    console.log("Tie: " + tie)
}

function switchPlayerTurn() {
    if (winner) return;
    turn = turn === "X" ? "O" : "X"
    console.log("Current Turn:"+ turn);
}
/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(sqaure => {
    sqaure.addEventListener('click',handleClick);
    
})

resetBtnEl.addEventListener('click', init)
