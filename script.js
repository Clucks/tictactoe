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
    container.classList.add("tracker")
    const body = document.querySelector(".container");
    const square = document.querySelectorAll(".square");
    const container2 = document.querySelector(".container2");

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
        container2.classList.toggle("hidden")
        if (container2.querySelector("h3") !== null) {
            const h3 = container2.querySelector("h3");
            h3.innerText = (piece + " has won the game");
        } else {
            const h3 = document.createElement("h3");
            h3.innerText = (piece + " has won the game");
            container2.appendChild(h3);
        }


        container2.style.gridColumn = "1 / 4";
        container2.style.gridRow = "1"; // Specify the row range as "1 / span 1" to occupy a single row
        container2.style.zIndex = "2";
        container2.style.backgroundColor = "rgba(255, 0, 0, 0.7)";
        const button = document.querySelector("#play");
        console.log(button);

        button.addEventListener("click", function (event) {
            gameboard.resetBoard();
            container2.classList.toggle("hidden", true);
            square.forEach((element) => {
                element.innerText = "";

            })
        })
        body.appendChild(container2);
    }
    const setInput = () => {

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



