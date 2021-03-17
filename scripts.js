const allBoxes = document.querySelectorAll('.box');
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
    constructor(name, color) {
        this.name = name
        this.color = color
        this.playerChoices = []
        this.playerTotalVictories = 0
    }
    claimBox(currentBox){
        document.querySelector(`#${currentBox}`).style.backgroundColor = `${this.color}`;
        this.playerChoices.push(currentBox);
        this.checkWinningCombos();
    }
    checkWinningCombos(){
        this.playerChoices.sort();
        for (let i = 0; i < winningCombos.length; i++){
            if (this.playerChoices.indexOf(winningCombos[i][0]) >= 0){
                if (this.playerChoices.indexOf(winningCombos[i][1]) >= 0){
                    if (this.playerChoices.indexOf(winningCombos[i][2]) >= 0){
                        Game.winner = `${this.name}`
                        this.playerTotalVictories++
                    }
                }
            }
        }
    }
}

let turn = 'red'
let playerOne = new Player('me', 'red');
let playerTwo = new Player('you','blue');

const Game = {
    players: [playerOne, playerTwo],
    turn: playerOne.name,
    winner: null,

    checkWinner() {
        if (this.winner === playerOne.name || this.winner === playerTwo.name) {
            console.log(`${this.winner}  wins!`)
            this.clearGame()
        }
    },
    clearGame(){
        allBoxes.forEach(box => {
            box.style.backgroundColor = null;
        })
        this.winner = null;
        playerOne.playerChoices = [];
        playerTwo.playerChoices = [];
    }
}

allBoxes.forEach(box =>{
    box.addEventListener('click', (e) => {
        let currentBox = e.target.id;
        if (turn === 'red'){
            playerOne.claimBox(currentBox);
            turn = 'blue';
        } else{
            playerTwo.claimBox(currentBox);
            turn = 'red'
        }
        Game.checkWinner();

    })
})

