//Function to create Players
function personFactory(name, piece) {
    function sayHello() {
        console.log('hello, im ' + name);
    }

    return ({
        name, piece, sayHello,
    });
}

//Module for gameBoard
const gameboard = (() => {
    // Private array to store the gameboard state
    const board = ["", "", "", "", "", "", "", "", ""];

    function displayBoard() {
        const board = document.querySelector(".board");
        const playerForm = document.querySelector(".player");
        playerForm.classList.toggle("hidden");
        board.classList.toggle("hidden");
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


//Module for input
const playerForm = (() => {
    let playerOne, playerTwo;

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
            tracker.addTracker(playerOne, playerTwo);
        } else {
            alert("Form must be filled");
        }
    });

    return {
        playerOne,
        playerTwo,
    };
})();

//Module for tracker
const gameFlow = (() => {
    let counter = -1;
    const name = document.createElement("h1");
    const container = document.createElement("div");
    const body = document.querySelector(".container");

    const addTracker = (playerOne, playerTwo) => {
        counter++;
        if (counter % 2 == 1) {
            name.innerText = `Name: ${playerTwo.name}, Piece: ${playerTwo.piece}`;
        } else {
            name.innerText = `Name: ${playerOne.name}, Piece: ${playerOne.piece}`;
        }
        container.appendChild(name);
        body.appendChild(container);
    };

    const updateTracker = () => {
    }

    const getTurn = (playerOne, playerTwo) => {
        if (counter % 2 == 0) {
            return playerOne;
        } else {
            return playerTwo;
        }
    }

    return {
        addTracker,
        getTurn,
    };
})();

//Module for player input on board
const input = (() => {
    const square = document.querySelectorAll(".square");
    console.log(square);
    square.forEach(element => {
        if (element.innerText.trim().length === 0) {
            element.addEventListener("click", function (event) {
                const player = tracker.getTurn();
                console.log(player);
            })
        }

    });

})();

