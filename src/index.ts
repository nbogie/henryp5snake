import p5 from "p5";
import Loser from "./Loser";
import { drawAll } from "./drawStuff";
import { initialiseGameState } from "./initialiseGameState";

const myP5 = new p5(createSketch);

function createSketch(p: p5): void {
    // ------------------------------ GAME PARAMETERS ------------------------------ \\
    //change these to change the base settings of the game;

    p.setup = setup;
    p.draw = draw;

    const gameState = initialiseGameState(p);
    const { playerSnake } = gameState;

    function setup(): void {
        const myCanvas = p.createCanvas(p.windowWidth, gameState.boardSize);

        myCanvas.mousePressed(handleMousePressed); // function to handle mouse clicks - not used
        p.frameRate(gameState.fps); // set the initial frame rate of the game - equates to difficulty
        p.noStroke();
    }

    function draw(): void {
        // p5 draw function
        gameStep(); // execute the code of each iteration, seperated out to allow easy changes to be made on low refresh rate monitors
    }

    function gameStep(): void {
        handleKeyPresses();
        drawAll(p, gameState);
        updateAll();
    }

    function updateAll() {
        playerSnake.updatePositions();
        handlePossibleEating();
        handlePossibleGameOver();
    }

    /**
     * does nothing
     */
    function handleMousePressed() {}

    /**
     * Check to see if the head of the snake occupies the same square as the food object, if it does then carry out the code for when food is eaten
     */
    function handlePossibleEating() {
        if (playerSnake.head.position.id === gameState.gameFood.position.id) {
            gameState.gameFood.moveFood(); //move the food to a new random location
            gameState.fps += gameState.difficulty_increment; // increase the game speed variable value
            p.frameRate(gameState.fps); // set the actual game speed to the game speed variable's value
            playerSnake.eat(); // make the snake eat the food block
            gameState.score += gameState.fps; //increment the players score by the difficulty
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

    /**
     *
     * @returns What the player is
     */
    function gameOver(): Loser {
        clearCanvas(p); // destroy everything theyve accomplished
        p.fill("white");
        p.text("YOU LOSE!", 200, 200); //let them know theyve lost

        p.noLoop(); // stop the game
        return new Loser();
    }

    function clearCanvas(p: p5) {
        //@ts-ignore
        p.clear();
    }
    // p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);
}
