let playerOne, playerTwo;
//Function to create Players
function personFactory(name, piece) {
    function sayHello() {
        console.log('hello, im ' + name);
    }

    return ({
        name, piece, sayHello,
    });
}

//Module for gameBoard handles logic for winning
const gameboard = (() => {
    // Private array to store the gameboard state
    const board = ["", "", "", "", "", "", "", "", ""];

    function displayBoard() {
        const board = document.querySelector(".board");
        const playerForm = document.querySelector(".player");
        playerForm.classList.toggle("hidden");
        board.classList.toggle("hidden");
        gameFlow.setInput();
    }
    // Public methods
    const getBoard = () => board;

    const updateCell = (index, marker) => {
        if (board[index] === "") {
            board[index] = marker;
            return true; // Return true if the cell was successfully updated
        }
        return false; // Return false if the cell is already occupied
    };

    const resetBoard = () => {
        board.fill("");
    };

    // Return public methods
    return {
        getBoard,
        updateCell,
        resetBoard,
        displayBoard,
    };
})();


//Module for player form and start of game. 
const playerForm = (() => {
    const start = document.querySelector("#start");
    start.addEventListener("click", function (event) {
        event.preventDefault();
        const nameOneInput = document.getElementById("nameOne");
        const nameTwoInput = document.getElementById("nameTwo");

        if (nameOneInput.checkValidity() && nameTwoInput.checkValidity()) {
            gameboard.displayBoard();
            const nameOne = nameOneInput.value;
            const nameTwo = nameTwoInput.value;
            playerOne = personFactory(nameOne, "X");
            playerTwo = personFactory(nameTwo, "O");
            gameFlow.addTracker();
        } else {
            alert("Form must be filled");
        }
    });

    return {
        playerOne,
        playerTwo,
    };
})();

//Module for game Flow 
const gameFlow = (() => {
    let counter = 0;
    const name = document.createElement("h1");
    const container = document.createElement("div");
    const body = document.querySelector(".container");

    const addTracker = () => {
        const turn = getTurn(playerOne, playerTwo)
        if (counter % 2 == 0) {
            name.innerText = `Name: ${playerTwo.name}, Piece: ${playerTwo.piece}`;
        } else {
            name.innerText = `Name: ${playerOne.name}, Piece: ${playerOne.piece}`;
        }
        container.appendChild(name);
        body.appendChild(container);
    };

    const getTurn = (playerOne, playerTwo) => {
        counter++;
        if (counter % 2 == 0) {
            return playerOne;
        } else {
            return playerTwo;
        }
    };

    const checkWinner = () => {
        const board = gameboard.getBoard();
        const winningConditions = [
            // Define the winning conditions for tic-tac-toe
            [0, 1, 2], // Row 1
            [3, 4, 5], // Row 2
            [6, 7, 8], // Row 3
            [0, 3, 6], // Column 1
            [1, 4, 7], // Column 2
            [2, 5, 8], // Column 3
            [0, 4, 8], // Diagonal from top-left to bottom-right
            [2, 4, 6], // Diagonal from top-right to bottom-left
        ];
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
                // We have a winner
                return true;
            }
        }
    }

    const createEnd = (piece) => {
        const container = document.createElement("div");
        const button = document.createElement("button");
        button.innerText = "Play Again?";

        container.appendChild(button);
        container.style.gridColumn = "1 / 4";
        container.style.gridRow = "1"; // Specify the row range as "1 / span 1" to occupy a single row
        container.style.zIndex = "2";
        container.style.backgroundColor = "rgba(255, 0, 0, 0.7)";


        button.addEventListener("click", function (event) {

        })
        body.appendChild(container);
    }
    const setInput = () => {
        const square = document.querySelectorAll(".square");
        square.forEach((element, index) => {
            element.addEventListener("click", function (event) {
                element.setAttribute("data-index", index);
                if (element.innerText.trim().length === 0) {
                    const player = getTurn(playerOne, playerTwo);
                    console.log(player);
                    element.innerText = player.piece;
                    const index = (event.target.getAttribute("data-index"));
                    gameboard.updateCell(index, player.piece);
                    if (checkWinner()) {
                        createEnd(player.piece);

                    }
                }
            });
        })
    };

    return {
        addTracker,
        getTurn,
        setInput,
    };
})();



