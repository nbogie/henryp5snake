import p5 from "p5";

import Board from "./board"
import snake from "./snake"
import Food from "./food"
import {Head, Body, Tail} from "./body"

const myP5 = new p5(createSketch);


function createSketch(p: p5): void {


    //Crucially, assign the setup and draw functions for the p5 createSketch.
    p.setup = setup;
    p.draw = draw;
    
    let fps = 3;
    
    const boardSize: number = Math.min(p.windowHeight, p.windowWidth) - 100; //graphical size of the board
    const boardCellCount: number = 40//number of cells on each board axis = 40
    const boardCellSize: number = boardSize / boardCellCount;

    const gameBoard: Board = new Board(boardCellCount, boardCellSize)
    const playerSnake: snake = new snake(gameBoard);
    const gameFood: Food = new Food(boardSize, gameBoard);

    function setup():void {
        const myCanvas = p.createCanvas(boardSize, boardSize);

        myCanvas.mousePressed(handleMousePressed);
        p.frameRate(fps);
        p.noStroke();

    }


    function draw():void {
        gameStep();
    }

    function gameStep(): void{
        p.clear();
        p.background("blue")
        keyPressed();
        //playerSnake.move
        drawFood(gameFood);
        playerSnake.moveHead();
        playerSnake.body.forEach(segment => drawBodyPart(segment)); // change to retrieve the positions of all the bodies of the snake then draw from those positions
        checkIfEating();
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
        console.log(playerSnake.head.position, gameFood.position)
        if (playerSnake.head.position === gameFood.position){
            eatTheFood();
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

    // p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);
};




