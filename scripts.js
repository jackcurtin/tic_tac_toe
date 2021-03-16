console.log('scripts loaded');

const allBoxes = document.querySelectorAll('.box');

class Game {
    constructor() {
        this.turn = 'red';
        this.winner = null;
    }
    scanBoard(){

    }
}


allBoxes.forEach(box =>{
    box.addEventListener('click', () => {
        box.style.background = 'red';
        box.setAttribute('value', 'red')
    })
})