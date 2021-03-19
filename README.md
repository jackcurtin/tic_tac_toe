# NEW AGE TIC TAC TOE

### The aesthetic of this game was inspired by the album Structures from Silence by Steve Roach, which I have linked below.
*https://www.youtube.com/watch?v=AsIjyJvhR9A*

This game is best enjoyed at a slow pace, letting the sounds fade out before clicking onto the next square. You can change your name and adjust the color of your tokens with the Player UI's found on the left side of the screen.  You can only enter your name once, but can change your color as many times as you would like. You can also make these adjustments at any point over the course of you game, as well as in between rounds. To reset these values, refresh the page.

Playing is simple - click a square to select it. The text above the UIs will indicate which player is active, as well as who has won after 3 boxes in a row have been selected. To reset the board without clearing the player names, colors, and victory totals, simply press the CLEAR BOARD button below the UIs.

--

I have included my original *pseudocode* at the bottom of this document. When compared with my code/commit history, you'll see that this project diverted from pretty early on. I started by creating the grid with separate *divs* for each box within it. Then I created event listeners for each *div*, which is where I took my first turn away from the original plan. 

As I thought about the winning conditions more, it made more sense to me to store the ids of each box selected within an array distinct for each player rather than the other way around. These arrays could be compared with an array filled with nested arrays of every possible winning condition. Every time a player selects a square, it adds the square to the player specific array of their selections, and compares this array to each array with the winning conditions array with a for loop. Using *indexOf*, it checks to see if the first box within any winning conditions array is found within the player's array. If it is, it moves onto the second box of that winning condition, and then likewise to third. If the third box is found within the player array, the player is declared the winner!

The basic if-else statement structure for the winning conditions was based on the following article from stack overflow:
*https://stackoverflow.com/questions/15672290/javascript-tic-tac-toe-finding-all-possible-combinations-of-numbers-within-an

I learned a lot from this project, but the thing that stood out the most to me was how useful it was using dynamic information within objects and class instances. There were so many times I was able to reference properties of things like "name" and "color" that were dynamic based on player input, yet was able to keep the same logic in tact by using string interpolation within query selectors for specific ids (arguably the most valuable trick I picked up during this project).

Below I have listed my original *pseudocode*:


*Page loads with a blank grid, 3x3
    create grid in HTML
    create event listeners for each box that change their color
        and value to correspond to who clicked them, then make them
        inactive so they cannot be chosen again*
    

*Establish Game class
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
                as the winner and end the game.*
            
*create firstGame instance*

*Establish player class
    properties include:
        color
    create Red and Blue Player instances*
