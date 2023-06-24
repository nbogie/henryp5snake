import p5 from "p5";
import { GameState } from "./GameState";
import { Body, Head, Tail } from "./body";
import Food from "./food";

export function drawAll(p: p5, gs: GameState) {
    clearCanvas(p);
    p.background(gs.palette.colour1);
    drawGameInfo();
    drawBoard();
    drawFood(gs.gameFood);
    drawHeadPart(gs.playerSnake.head);
    // change to retrieve the positions of all the bodies of the snake then
    // draw from those positions
    gs.playerSnake.tail.forEach((segment) => drawBodyPart(segment));

    /*
     * @param headPart the head of the snake to be drawn
     */
    function drawHeadPart(headPart: Head | Tail | Body): void {
        drawBlock(headPart, gs.palette.colour2);
    }

    /**
     *
     * @param bodyPart the part of the snakes tail to be drawn
     */
    function drawBodyPart(bodyPart: Head | Tail | Body): void {
        drawBlock(bodyPart, gs.palette.colour3);
    }

    /**
     * takes in the Food object, and uses the x and y values of its position to draw a square
     * @param food_piece a Food object of the game
     */
    function drawFood(food_piece: Food): void {
        drawBlock(food_piece, gs.palette.colour4);
    }

    function drawBlock(block: Head | Tail | Food, colour: string): void {
        const { x, y } = block.position;
        p.fill(colour);
        p.square(x, y, gs.boardCellSize);
    }
    /**
     * Draw p5 text objects on a white background to the right of the gameboard - will cause issues if the screen is portrait not landscape
     */
    function drawGameInfo() {
        p.fill("white");
        p.rect(gs.boardSize, 0, p.width - gs.boardSize, gs.boardSize); // white square to the right of the game board
        p.fill("black");
        p.text(`Score: ${gs.score}`, gs.boardSize + 10, 20); // draws the score text
        p.text(`Difficulty: ${gs.fps}`, gs.boardSize + 10, 40); // draws the difficulty text
    }

    /**
     * Draw the border cells of the board in red
     */
    function drawBoard(): void {
        let borderCells = gs.gameBoard.borderCells();
        p.fill(gs.palette.colour5);
        p.stroke("black");
        borderCells.forEach((borderCell) =>
            p.square(borderCell.x, borderCell.y, gs.boardCellSize)
        );
        p.noStroke();
    }
}

function clearCanvas(p: p5) {
    //@ts-ignore
    p.clear();
}
