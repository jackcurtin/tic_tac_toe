Page loads with a blank grid, 3x3
    create grid in HTML, style with flexbox
    create event listeners for each box that change their color
        and value to correspond to who clicked them, then make them
        inactive so they cannot be chosen again
    

Establish Game class
    properties include:
        whose turn it is - starts on player 1
        who has won - starts null
    methods include:
        scan board to for matches
            called once selection is made - if no winner yet, will
            shift turn to next player - if 3 in a row, will call
            declare winner function
        declare winner
            called by scan board, will take declare the current turn-holder
                as the winner and end the game.
            
create firstGame instance

Establish player class
    properties include:
        color
    create Red and Blue Player instances


