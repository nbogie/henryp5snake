import p5 from "p5";

import Board from "./board"
import snake from "./snake"
import Food from "./food"
import {Head, Body, Tail} from "./body"

const myP5 = new p5(createSketch);



function createSketch(p: p5): void {


    // ------------------------------ GAME PARAMETERS ------------------------------ \\
    //change these to change the base settings of the game;
    let fps = 2; //initial game speed
    let difficult_increment:number = 1; //how much hard the game gets each time the snake eats food
    let number_of_cells_on_board:number = 20; //the number of squares on each axis of the board
    //Crucially, assign the setup and draw functions for the p5 createSketch.
    p.setup = setup;
    p.draw = draw;

    
    
    
    const boardSize: number = Math.min(p.windowHeight, p.windowWidth) - 100; //graphical size of the board
    const boardCellCount: number = number_of_cells_on_board + 2//number of cells on each board axis = 40
    const boardCellSize: number = boardSize / boardCellCount;

    const gameBoard: Board = new Board(boardCellCount, boardCellSize)
    const playerSnake: snake = new snake(gameBoard);
    const gameFood: Food = new Food(boardSize, gameBoard);


    
    let score = 0;

    function setup():void {
        const myCanvas = p.createCanvas(p.windowHeight, p.windowWidth);

        myCanvas.mousePressed(handleMousePressed);
        p.frameRate(fps);
        p.noStroke();

    }


    function draw():void {
        gameStep();
    }

    function gameStep(): void{
        keyPressed();
        if (playerSnake.head.position.id === -1){
            console.log("lost")
            gameOver();
        }
        p.clear();



        p.background("green")

        drawGameInfo();
        //playerSnake.move
        drawFood(gameFood);
        drawBoard();
        playerSnake.updatePositions();
        playerSnake.body.forEach(segment => drawBodyPart(segment)); // change to retrieve the positions of all the bodies of the snake then draw from those positions
        checkIfEating();
        checkIfLost();
    }



    function drawBodyPart(bodyPart: Head | Tail | Body): void {
        let x: number = bodyPart.position.x;
        let y: number = bodyPart.position.y;
        let n: number = boardCellSize;
        p.fill("white")
        p.square(x, y, n);
    }

    

    function drawFood(food_piece: Food): void{
        let x: number = food_piece.position.x;
        let y: number = food_piece.position.y;
        let n: number = boardCellSize;
        p.fill("orange")
        p.square(x, y, n);
    }

    function handleMousePressed() {
    }

    function checkIfEating(){
        if (playerSnake.head.position.id === gameFood.position.id){
            eatTheFood();
            fps++;
            p.frameRate(fps);
            playerSnake.eat();
            score++;
        }
    }

    function eatTheFood(){
        gameFood.moveFood();
    }

    function keyPressed(): void {
        if (p.keyCode === p.UP_ARROW) { //w
            playerSnake.direction = 0;
        } else if (p.keyCode === p.RIGHT_ARROW) {
            playerSnake.direction = 1;
        } else if (p.keyCode === p.DOWN_ARROW) {
            playerSnake.direction = 2;
        } else if (p.keyCode === p.LEFT_ARROW) {
            playerSnake.direction = 3;
        }
    }

    function drawBoard(){
        let borderCells = gameBoard.boarderCells();
        p.fill("red");
        borderCells.forEach(borderCell => p.square(borderCell.x, borderCell.y, boardCellSize))
    }

    function checkIfLost(){
        let autoCannibalismCheck = playerSnake.checkAutoCannibalism();
        let concussionCheck = playerSnake.checkIfInAWall();

        if (autoCannibalismCheck || concussionCheck){
            gameOver();
        }
    }

    function gameOver(){
        p.clear();
        
        //p.background("black");
        p.fill("white");
        p.text("YOU LOSE!", 200, 200);
        
        p.noLoop();
    }

    function drawGameInfo(){
        p.rect(boardSize, 0, (p.windowWidth - boardSize), boardSize)
        p.fill("black");
        p.text(`Score: ${score}`, (boardSize + 10), 20);
        p.text(`Difficulty: ${fps}`, (boardSize + 10), 40);
    }


    // p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);
};




