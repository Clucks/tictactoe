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


//Module for the name collection and turn tracker
const input = (() => {
    let counter = 0;
    const name = document.createElement("h1");
    let nameOne, nameTwo;

    const start = document.querySelector("#start")
    start.addEventListener("click", function (event) {
        event.preventDefault();
        nameOne = document.getElementById("nameOne").value;
        nameTwo = document.getElementById("nameTwo").value;
        gameboard.displayBoard();
    })

    const playerOne = personFactory(nameOne, "X");
    const playerTwo = personFactory(nameTwo, "O");

    const track = () => {
        if (counter % 2 == 1) {
            name.innerText = (playerOne);
        } else {
            name.innerText = (playerTwo);
        }
        counter++;

    }
    const addTracker = () => {
        const container = document.createElement("div");
        const body = document.querySelector(".container");
        container.appendChild(name);
        body.appendChild(container);
    }


    return {
        track,
        playerOne,
        playerTwo,
        addTracker,
    }
})();


