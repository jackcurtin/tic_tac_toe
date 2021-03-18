const allBoxes = document.querySelectorAll('.box');
const gameText = document.querySelector('h2');
const clearBtn = document.querySelector('#clearBtn');
const nameForms = document.querySelectorAll('.name-input');
const colorSelects = document.querySelectorAll('select');
const playerOneColorOptions = document.querySelector('#playerOneColor').children;
const playerTwoColorOptions = document.querySelector('#playerTwoColor').children;
const soundEffect = document.querySelector('audio');
const winningCombos = [
    ['box1', 'box2', 'box3'],
    ['box1', 'box4', 'box7'],
    ['box1', 'box5', 'box9'],
    ['box2', 'box5', 'box8'],
    ['box3', 'box5', 'box7'],
    ['box3', 'box6', 'box9'],
    ['box4', 'box5', 'box6'],
    ['box7', 'box8', 'box9']
];

class Player {
    constructor(name, color,playerIndex, token) {
        this.name = name;
        this.nameChanged = false;
        this.color = color;
        this.playerChoices = [];
        this.playerWinningCombo = [];
        this.playerTotalVictories = 0;
        this.playerIndex = playerIndex;
        this.token = token
    }

    changeName(){
        if (this.nameChanged === false) {
            this.name = nameForms[this.playerIndex].querySelector('input').value;
            this.nameChanged = true;
            game.clearGame();
        } else {
            alert ('you cannot change your name again')
        }
    }

    changeColor(color) {
        if (this.playerIndex === 0) {
            for (let i = 0; i < playerOneColorOptions.length; i++) {
                if (color == playerOneColorOptions[i].value) {
                    this.color = color;
                    this.playerChoices.forEach(box => {
                        document.querySelector(`#${box}TokenArea`).style.color = this.color;
                    })
                }
            }
        } else {
            for (let i = 0; i < playerTwoColorOptions.length; i++) {
                if (color == playerTwoColorOptions[i].value) {
                    this.color = color;
                    this.playerChoices.forEach(box => {
                        document.querySelector(`#${box}TokenArea`).style.color = this.color;
                    })
                }
            }
        }
    }

    claimBox(currentBox){
        let tokenArea = document.createElement('div')
        tokenArea.classList.add('animate__animated', 'animate__fadeIn');
        tokenArea.id = `${currentBox}TokenArea`;
        tokenArea.innerHTML = `${this.token}`;
        tokenArea.style.color = `${this.color}`;
        document.querySelector(`#${currentBox}`).appendChild(tokenArea);
        soundEffect.play();
        this.playerChoices.push(currentBox);
        game.occupiedSquares.push(currentBox);
        this.checkWinningCombos();
    }
    checkWinningCombos(){
        this.playerChoices.sort();
        for (let i = 0; i < winningCombos.length; i++){
            if (this.playerChoices.indexOf(winningCombos[i][0]) >= 0){
                if (this.playerChoices.indexOf(winningCombos[i][1]) >= 0){
                    if (this.playerChoices.indexOf(winningCombos[i][2]) >= 0){
                        this.playerWinningCombo = winningCombos[i];
                        game.winner = `${this.name}`;
                        this.playerTotalVictories++;
                        this.playerWinningCombo.forEach(box => {
                            document.querySelector(`#${box}`).style.border = '20px solid white';
                        })
                    }
                }
            }
        }
    }
}

let playerOne = new Player('Player 1', 'red', 0, 'X');
let playerTwo = new Player('Player 2','blue', 1, 'O');

const game = {
    players: [playerOne, playerTwo],
    turn: playerOne.name,
    occupiedSquares: [],
    winner: null,
    running: true,

    checkWinner() {
        if (this.winner === playerOne.name || this.winner === playerTwo.name) {
            console.log(`${this.winner}  wins!`)
            gameText.innerText= `${this.winner}  wins!`;
            this.running = false;
        } else if (this.occupiedSquares.length === 9 && this.winner === null){
            gameText.innerText= `It is a draw`;
            this.running = false;
        }
    },
    clearGame(){
        allBoxes.forEach(box => {
            box.style.backgroundColor = null;
            box.innerHTML = '';
            box.style.border = '1px solid whitesmoke';
        })
        this.winner = null;
        this.occupiedSquares = [];
        this.turn = playerOne.name;
        playerOne.playerChoices = [];
        playerTwo.playerChoices = [];
        gameText.innerHTML = `${game.turn} click a box to start!`
        this.running = true;
    }
}

allBoxes.forEach(box =>{
    box.addEventListener('click', (e) => {
        let currentBox = e.currentTarget.id;
        console.log(e.currentTarget);
        if (game.running === true) {
            if (!game.occupiedSquares.includes(currentBox)) {
                if (game.turn === null) {
                    game.turn = playerOne.name;
                } else if (game.turn === playerOne.name) {
                    playerOne.claimBox(currentBox);
                    game.turn = playerTwo.name;
                } else {
                    playerTwo.claimBox(currentBox);
                    game.turn = playerOne.name;
                }
                gameText.innerHTML = `It is ${game.turn}\'s turn!`
                game.checkWinner();
                if (game.winner === playerOne.name){
                    document.querySelector('#playerOneVictories').innerHTML = `Victories ${playerOne.playerTotalVictories}`;
                } else {
                    document.querySelector('#playerTwoVictories').innerHTML = `Victories ${playerTwo.playerTotalVictories}`;
                }
            } else {
                gameText.innerHTML = 'Square already selected, try a different one'
            }
        } else {
            gameText.innerText = `${game.winner} has already won. 
            Clear the board to play again!`
        }
    })
})

nameForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (form.id === 'player1Form') {
            playerOne.changeName();
            document.querySelector('#playerOneNametag').innerHTML = `${playerOne.name}`
        } else {
            playerTwo.changeName();
            document.querySelector('#playerTwoNametag').innerHTML = `${playerTwo.name}`
        }
        form.querySelector('input').value = null;
    })
})

colorSelects.forEach(color => {
    color.addEventListener('change', (e) => {
        e.preventDefault();
        let newColor = e.target.value
        if (color.id === 'playerOneColor') {
            playerOne.changeColor(newColor);
        } else {
            playerTwo.changeColor(newColor);
        }
    })
})

clearBtn.addEventListener('click', () => {
    game.clearGame();
})

gameText.innerHTML = `${game.turn} click a box to start!`;



