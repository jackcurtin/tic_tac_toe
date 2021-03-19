const allBoxes = document.querySelectorAll('.box');
const gameText = document.querySelector('h2');
const clearBtn = document.querySelector('#clearBtn');
const nameForms = document.querySelectorAll('.name-input');
const colorSelectors = document.querySelectorAll('select');
const colorOptions = document.querySelector('#playerOneColor') //since both options are the same, only need to select player 1
const allSounds = document.querySelectorAll('audio');
const winningCombos = [
    ['box1', 'box2', 'box3'],
    ['box1', 'box4', 'box7'],
    ['box1', 'box5', 'box9'],
    ['box2', 'box5', 'box8'], //every winning condition in its own array nested within one large array
    ['box3', 'box5', 'box7'],
    ['box3', 'box6', 'box9'],
    ['box4', 'box5', 'box6'],
    ['box7', 'box8', 'box9']
];

class Player {
    constructor(name, color,playerIndex, token) {
        this.name = name;
        this.nameChanged = false; //limits player from changing more than once
        this.color = color;
        this.playerChoices = []; //fills each time a new box is added
        this.playerWinningCombo = []; //fills when player wins so the winning squares can be selected for animation
        this.playerTotalVictories = 0; //used to update UI each time player wins
        this.playerIndex = playerIndex; //used for specific references to player when changing name/cuing sound
        this.token = token;
    }

    changeName(){
        if (this.nameChanged === false) {
            this.name = nameForms[this.playerIndex].querySelector('input').value;
            this.nameChanged = true; //makes it so player cannot change their name more than once
            game.clearGame(); //resets game if player renames mid round
        } else {
            alert ('You have already chosen your name') //would eventually integrate this into UI rather than alert
        }
    }

    changeColor(color) {
        this.color = color; //sets player color to passed hex code
        this.playerChoices.forEach(box => {
            document.querySelector(`#${box}TokenArea`).style.color = this.color; // changes all selected tokens to new color
        })
    }

    claimBox(currentBox){
        let tokenArea = document.createElement('p'); //creates new element to put tokens in
        tokenArea.classList.add('animate__animated', 'animate__fadeIn'); //adds fade in animation to new token div
        tokenArea.id = `${currentBox}TokenArea`; //sets ID of new token based on the id of the current box
        tokenArea.innerHTML = `${this.token}`; //writes X or O, depending on player
        tokenArea.style.color = `${this.color}`; //colors it based on player color
        document.querySelector(`#${currentBox}`).appendChild(tokenArea); //adds new token div into the selected box
        allSounds[this.playerIndex].load(); //loads sound effect based on player (allows sounds to overlap)
        allSounds[this.playerIndex].play();//plays sound effect based on player
        this.playerChoices.push(currentBox); //adds the id of current selected box to array of player choices
        game.occupiedSquares.push(currentBox); // adds id of current box to array of occupied squares
        this.checkWinningCombos(); // checks to see if player has won with new square
    }
    checkWinningCombos(){
        for (let i = 0; i < winningCombos.length; i++){ //runs for loop for every possible winning condition
            if (this.playerChoices.indexOf(winningCombos[i][0]) >= 0){ // passes if playerChoices array includes first box within any winning combo array
                if (this.playerChoices.indexOf(winningCombos[i][1]) >= 0){ //checks if playerChoices includes the second box with the same winning combo as before
                    if (this.playerChoices.indexOf(winningCombos[i][2]) >= 0){ //same as above but for third box
                        this.playerWinningCombo = winningCombos[i]; //if they match 3 boxes from one of the winning combos, adds that combo to playerWinningCombo array
                        game.winner = `${this.name}`; //sets winner property within game object
                        this.playerTotalVictories++; //increments for each victory
                        this.playerWinningCombo.forEach(box => { //runs through playerWinningCombo array
                            let victorySquares = document.querySelector(`#${box}`); //selects each box
                            victorySquares.style.border = '15px solid #f5f4f4'; //emboldens each border
                            victorySquares.classList.add('animate__animated', 'animate__pulse', 'animate__repeat-2'); //animates it
                            allSounds[allSounds.length-1].load(); //loads victory chimes
                            setTimeout(function () {
                                allSounds[allSounds.length - 1].play(); //plays victory chimes, offset to prevent overlap with player specific tone
                            },1310);
                            })
                    }
                }
            }
        }
    }
}

let playerOne = new Player('Player 1', '#cae4db', 0, 'X');
let playerTwo = new Player('Player 2','#f05454', 1, 'O');

const game = {
    players: [playerOne, playerTwo],
    turn: playerOne.name,
    occupiedSquares: [], //used to prevent players from selecting the same squares
    winner: null,
    running: true, //used to turn off the board and prevent further square selection after winner has been declared

    checkWinner() {
        if (this.winner === playerOne.name || this.winner === playerTwo.name) {
            gameText.innerText= `${this.winner}  wins!`;
            this.running = false; //turns off board
        } else if (this.occupiedSquares.length === 9 && this.winner === null){ //if all squares are occupied and no one has a match
            allSounds[2].load();
            setTimeout(function () {
                allSounds[2].play(); //plays specific sound for a tie, offset a bit to accommodate player specific chime
            },100);
            gameText.innerText= `It is a draw`;
            this.running = false;
        }
    },
    clearGame(){
        allBoxes.forEach(box => {
            box.innerHTML = ''; //clears tokens
            box.classList.remove('animate__animated', 'animate__pulse',); //removes victory animation so it can be added again
            box.style.border = '1px solid #f5f4f4'; //resets all borders
        })
        this.winner = null;
        this.occupiedSquares = [];
        this.turn = playerOne.name;
        playerOne.playerChoices = [];
        playerTwo.playerChoices = [];
        gameText.innerHTML = `${game.turn} click a box to start!`;
        this.running = true; //makes board active again
    }
}

allBoxes.forEach(box =>{
    box.addEventListener('click', (e) => {
        let currentBox = e.currentTarget.id; //passes the name of the box through claimBox function based on box id
        if (game.running === true) { //only allows selection if no result has been declared
            if (!game.occupiedSquares.includes(currentBox)) { //if the square has not been occupied yet
                if (game.turn === playerOne.name) { //check if it is player one's turn
                    playerOne.claimBox(currentBox); //if so, run claimBox for player One
                    game.turn = playerTwo.name; // after box is claimed, set turn to player two
                } else {
                    playerTwo.claimBox(currentBox);
                    game.turn = playerOne.name;
                }
                gameText.innerHTML = `It is ${game.turn}\'s turn!`; //display whose turn it is
                game.checkWinner(); //after each box is claimed, check and see if the winner property through claimBox => checkWinningCombos
                if (game.winner === playerOne.name){
                    document.querySelector('#playerOneVictories').innerHTML = `Victories: ${playerOne.playerTotalVictories}`; //updates victory count based on player property
                } else {
                    document.querySelector('#playerTwoVictories').innerHTML = `Victories: ${playerTwo.playerTotalVictories}`;
                }
            } else {
                gameText.innerHTML = 'Square already selected, try a different one';
            }
        } else {
            gameText.innerText = `${game.winner} has already won. 
            Clear the board to play again!`;
        }
    })
})

nameForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (form.id === 'player1Form') {
            playerOne.changeName();
            document.querySelector('#playerOneNametag').innerHTML = `${playerOne.name}`; //sets nametag on specific player UI
        } else {
            playerTwo.changeName();
            document.querySelector('#playerTwoNametag').innerHTML = `${playerTwo.name}`;
        }
        form.querySelector('input').value = null; //empties input field
    })
})

colorSelectors.forEach(color => {
    color.addEventListener('change', (e) => {
        e.preventDefault();
        let newColor = e.target.value; //takes hex color code from selector
        if (color.id === 'playerOneColor') { // if the selector was in player one UI
            playerOne.changeColor(newColor); //passes hex color code into change color function for player one
        } else {
            playerTwo.changeColor(newColor);
        }
    })
})

clearBtn.addEventListener('click', () => {
    game.clearGame();
})

gameText.innerHTML = `${game.turn} click a box to start!`;