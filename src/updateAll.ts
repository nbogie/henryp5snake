import p5 from "p5";
import { GameState } from "./GameState";
import Loser from "./Loser";

export function updateAll(p: p5, gs: GameState): void {
    const { playerSnake } = gs;
    handleKeyPresses();
    playerSnake.updatePositions();
    handlePossibleEating();
    handlePossibleGameOver();

    /**
     * Check to see if the head of the snake occupies the same square as the food object, if it does then carry out the code for when food is eaten
     */
    function handlePossibleEating() {
        if (playerSnake.head.position.id === gs.gameFood.position.id) {
            gs.gameFood.moveFood(); //move the food to a new random location
            gs.fps += gs.difficulty_increment; // increase the game speed variable value
            p.frameRate(gs.fps); // set the actual game speed to the game speed variable's value
            playerSnake.eat(); // make the snake eat the food block
            gs.score += gs.fps; //increment the players score by the difficulty
        }
    }
    /**
     * checks to see if the snake has eaten itself or slithered into a wall, if it has it will trigger gameOver();
     */
    function handlePossibleGameOver(): void {
        let autoCannibalismCheck = playerSnake.checkAutoCannibalism(); //check to see if the snake has eaten itself
        let concussionCheck = playerSnake.checkIfInAWall(); //check to see if the snake has run into a wall

        if (autoCannibalismCheck || concussionCheck) {
            // if the snake has eaten itself or run into a wall, game over
            gameOver();
        } // otherwise do nothing and loop again
    }

    /**
     * sets the direction of the snake based on arrow key press - up: 0, right: 1, down: 2, left: 3
     */
    function handleKeyPresses(): void {
        if (p.keyCode === p.UP_ARROW) {
            playerSnake.direction = "up";
        } else if (p.keyCode === p.RIGHT_ARROW) {
            playerSnake.direction = "right";
        } else if (p.keyCode === p.DOWN_ARROW) {
            playerSnake.direction = "down";
        } else if (p.keyCode === p.LEFT_ARROW) {
            playerSnake.direction = "left";
        }
    }
    function gameOver(): Loser {
        clearCanvas(p); // destroy everything theyve accomplished
        p.fill("white");
        p.text("YOU LOSE!", 200, 200); //let them know theyve lost

        p.noLoop(); // stop the game
        return new Loser();
    }

    /**
     *
     * @returns What the player is
     */

    function clearCanvas(p: p5) {
        //@ts-ignore
        p.clear();
    }
}
