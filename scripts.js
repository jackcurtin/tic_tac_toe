const allBoxes = document.querySelectorAll('.box');
const gameText = document.querySelector('h2');
const clearBtn = document.querySelector('#clearBtn');
const nameForms = document.querySelectorAll('.name-input');
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
    constructor(name, color,playerIndex) {
        this.name = name
        this.nameChanged = false;
        this.color = color
        this.playerChoices = []
        this.playerWinningCombo = []
        this.playerTotalVictories = 0
        this.playerIndex = playerIndex
    }

    changeName(){
        if (this.nameChanged === false) {
            this.name = nameForms[this.playerIndex].querySelector('input').value;
            this.nameChanged = true;
            Game.clearGame();
        } else {
            alert ('you cannot change your name again')
        }
    }

    claimBox(currentBox){
        document.querySelector(`#${currentBox}`).style.backgroundColor = `${this.color}`;
        this.playerChoices.push(currentBox);
        Game.occupiedSquares.push(currentBox);
        this.checkWinningCombos();
    }
    checkWinningCombos(){
        this.playerChoices.sort();
        for (let i = 0; i < winningCombos.length; i++){
            if (this.playerChoices.indexOf(winningCombos[i][0]) >= 0){
                if (this.playerChoices.indexOf(winningCombos[i][1]) >= 0){
                    if (this.playerChoices.indexOf(winningCombos[i][2]) >= 0){
                        this.playerWinningCombo = winningCombos[i];
                        Game.winner = `${this.name}`;
                        this.playerTotalVictories++;
                        this.playerWinningCombo.forEach(box => {
                            document.querySelector(`#${box}`).style.border = '20px solid gold';
                        })
                    }
                }
            }
        }
    }
}

let playerOne = new Player('Player 1', 'red', 0);
let playerTwo = new Player('Player 2','blue', 1);

const Game = {
    players: [playerOne, playerTwo],
    turn: playerOne.name,
    occupiedSquares: [],
    winner: null,

    checkWinner() {
        if (this.winner === playerOne.name || this.winner === playerTwo.name) {
            console.log(`${this.winner}  wins!`)
            gameText.innerText= `${this.winner}  wins!`;
        } else if (this.occupiedSquares.length === 9 && this.winner === null){
            console.log('it is a draw');
        }
    },
    clearGame(){
        allBoxes.forEach(box => {
            box.style.backgroundColor = null;
            box.style.border = '1px solid black';
        })
        this.winner = null;
        this.occupiedSquares = [];
        this.turn = playerOne.name;
        playerOne.playerChoices = [];
        playerTwo.playerChoices = [];
        gameText.innerHTML = `${Game.turn} click a box to start!`
    }
}

allBoxes.forEach(box =>{
    box.addEventListener('click', (e) => {
        let currentBox = e.target.id;
        if (!Game.occupiedSquares.includes(currentBox)){
            if (Game.turn === null){
                Game.turn = playerOne.name;
            }else if (Game.turn === playerOne.name){
                playerOne.claimBox(currentBox);
                Game.turn = playerTwo.name;
            } else{
                playerTwo.claimBox(currentBox);
                Game.turn = playerOne.name;
            }
            gameText.innerHTML = `It is ${Game.turn}\'s turn!`
            Game.checkWinner();
        } else{
            console.log('try again')
        }
    })
})

nameForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (form.id === 'player1Form') {
            playerOne.changeName();
        } else {
            playerTwo.changeName();
        }
        form.querySelector('input').value = null;
    })
})

clearBtn.addEventListener('click', () => {
    Game.clearGame();
})

gameText.innerHTML = `${Game.turn} click a box to start!`;



