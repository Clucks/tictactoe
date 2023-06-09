//Player Module

const Player = (() => {
    function personFactory(name, piece) {
        function sayHello() {
            console.log('hello, im ' + name);
        }

        return ({
            name, piece, sayHello,
        });
        
    };
    return{
        personFactory,
    };
})();
//Module for the name collection

const input = (() => {
    const start = document.querySelector("#start")
    start.addEventListener("click", function (event) {
        event.preventDefault();
        const nameOne = document.getElementById("nameOne").value;
        const nameTwo = document.getElementById("nameTwo").value;

    })
})();

const game = (() => {
    const board = [];
    const gameBoard = document.createElement("div.class");
})();



