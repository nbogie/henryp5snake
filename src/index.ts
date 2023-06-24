import p5 from "p5";
import Loser from "./Loser";
import Board from "./board";
import { Body, Head, Tail } from "./body";
import Food from "./food";
import { setupColourPalettes } from "./setupColourPalettes";
import snake from "./snake";

const myP5 = new p5(createSketch);

function createSketch(p: p5): void {
    // ------------------------------ GAME PARAMETERS ------------------------------ \\
    //change these to change the base settings of the game;
    let fps = 4; //initial game speed
    let difficulty_increment: number = 1; //how much hard the game gets each time the snake eats food
    let number_of_cells_on_board: number = 20; //the number of squares on each axis of the board

    p.setup = setup;
    p.draw = draw;

    const palette = setupColourPalettes(p);

    const boardSize: number = Math.min(p.windowHeight, p.windowWidth) - 100; //graphical size of the board
    const boardCellCount: number = number_of_cells_on_board + 2; //number of cells on each board axis = 40
    const boardCellSize: number = boardSize / boardCellCount; // the draw size of each board cell based on filling the board area with uniform squares

    const gameBoard: Board = new Board(boardCellCount, boardCellSize); // create a new Board Object
    const playerSnake: snake = new snake(gameBoard); // create a new Snake object
    const gameFood: Food = new Food(boardSize, gameBoard); // create a new Food object

    let score: number = 0;

    function setup(): void {
        const myCanvas = p.createCanvas(p.windowWidth, boardSize); // create the p5 canvas

        myCanvas.mousePressed(handleMousePressed); // function to handle mouse clicks - not used
        p.frameRate(fps); // set the initial frame rate of the game - equates to difficulty
        p.noStroke();
    }

    function draw(): void {
        // p5 draw function
        gameStep(); // execute the code of each iteration, seperated out to allow easy changes to be made on low refresh rate monitors
    }

    function gameStep(): void {
        handleKeyPresses();
        drawAll();
        updateAll();
    }

    function drawAll() {
        clearCanvas(p);
        p.background(palette.colour1);
        drawGameInfo();
        drawBoard();
        drawFood(gameFood);
        drawHeadPart(playerSnake.head);
        // change to retrieve the positions of all the bodies of the snake then
        // draw from those positions
        playerSnake.tail.forEach((segment) => drawBodyPart(segment));
    }

    function updateAll() {
        playerSnake.updatePositions();
        handlePossibleEating();
        handlePossibleGameOver();
    }

    /**
     *
     * @param headPart the head of the snake to be drawn
     */
    function drawHeadPart(headPart: Head | Tail | Body): void {
        drawBlock(headPart, palette.colour2);
    }

    /**
     *
     * @param bodyPart the part of the snakes tail to be drawn
     */
    function drawBodyPart(bodyPart: Head | Tail | Body): void {
        drawBlock(bodyPart, palette.colour3);
    }

    /**
     * takes in the Food object, and uses the x and y values of its position to draw a square
     * @param food_piece a Food object of the game
     */
    function drawFood(food_piece: Food): void {
        drawBlock(food_piece, palette.colour4);
    }

    function drawBlock(block: Head | Tail | Food, colour: string): void {
        const { x, y } = block.position;
        p.fill(colour);
        p.square(x, y, boardCellSize);
    }

    /**
     * does nothing
     */
    function handleMousePressed() {}

    /**
     * Check to see if the head of the snake occupies the same square as the food object, if it does then carry out the code for when food is eaten
     */
    function handlePossibleEating() {
        if (playerSnake.head.position.id === gameFood.position.id) {
            gameFood.moveFood(); //move the food to a new random location
            fps += difficulty_increment; // increase the game speed variable value
            p.frameRate(fps); // set the actual game speed to the game speed variable's value
            playerSnake.eat(); // make the snake eat the food block
            score += fps; //increment the players score by the difficulty
        }
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
     * Draw the border cells of the board in red
     */
    function drawBoard(): void {
        let borderCells = gameBoard.borderCells();
        p.fill(palette.colour5);
        p.stroke("black");
        borderCells.forEach((borderCell) =>
            p.square(borderCell.x, borderCell.y, boardCellSize)
        );
        p.noStroke();
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

    /**
     * Draw p5 text objects on a white background to the right of the gameboard - will cause issues if the screen is portrait not landscape
     */
    function drawGameInfo() {
        p.fill("white");
        p.rect(boardSize, 0, p.width - boardSize, boardSize); // white square to the right of the game board
        p.fill("black");
        p.text(`Score: ${score}`, boardSize + 10, 20); // draws the score text
        p.text(`Difficulty: ${fps}`, boardSize + 10, 40); // draws the difficulty text
    }

    function clearCanvas(p: p5) {
        //@ts-ignore
        p.clear();
    }
    // p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);
}
