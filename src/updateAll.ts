import p5 from "p5";
import { GameState } from "./GameState";
import Loser from "./Loser";
import {
    checkAutoCannibalism,
    checkIfInAWall,
    eat,
    updatePositions,
} from "./snake";

export function updateAll(p: p5, gs: GameState): void {
    handleKeyPresses(gs, p);
    updatePositions(gs.playerSnake);
    handlePossibleEating(gs, p);
    handlePossibleGameOver(gs, p);
}

/**
 * Check to see if the head of the snake occupies the same square as the food object, if it does then carry out the code for when food is eaten
 */
function handlePossibleEating(gs: GameState, p: p5) {
    if (gs.playerSnake.head.position.id === gs.gameFood.position.id) {
        gs.gameFood.moveFood(); //move the food to a new random location
        gs.fps += gs.difficulty_increment; // increase the game speed variable value
        p.frameRate(gs.fps); // set the actual game speed to the game speed variable's value
        eat(gs.playerSnake); // make the snake eat the food block
        gs.score += gs.fps; //increment the players score by the difficulty
    }
}
/**
 * checks to see if the snake has eaten itself or slithered into a wall, if it has it will trigger gameOver();
 */
function handlePossibleGameOver(gs: GameState, p: p5): void {
    let autoCannibalismCheck = checkAutoCannibalism(gs.playerSnake); //check to see if the snake has eaten itself
    let concussionCheck = checkIfInAWall(gs.playerSnake); //check to see if the snake has run into a wall

    if (autoCannibalismCheck || concussionCheck) {
        // if the snake has eaten itself or run into a wall, game over
        gameOver(p);
    } // otherwise do nothing and loop again
}

/**
 * sets the direction of the snake based on arrow key press - up: 0, right: 1, down: 2, left: 3
 */
function handleKeyPresses(gs: GameState, p: p5): void {
    if (p.keyCode === p.UP_ARROW) {
        gs.playerSnake.direction = "up";
    } else if (p.keyCode === p.RIGHT_ARROW) {
        gs.playerSnake.direction = "right";
    } else if (p.keyCode === p.DOWN_ARROW) {
        gs.playerSnake.direction = "down";
    } else if (p.keyCode === p.LEFT_ARROW) {
        gs.playerSnake.direction = "left";
    }
}
function gameOver(p: p5): Loser {
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
