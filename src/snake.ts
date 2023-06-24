import Board from "./board";
import { Body, Head, Tail } from "./body";
import Cell from "./cell";
import { Direction } from "./direction";

/**
 * Defines an x and y coordinate within the gameboard grid, not to be confused with x and y coordinates of the canvas, these coordinates are integers between 0 and the board size
 */
interface CellCoordinate {
    x: number;
    y: number;
}

/**
 * The snake object handles the organisation of its body parts, it is an array of body parts the first element of which is always a Head object, and all subsequent elements of which are Tail objects
 */
export interface Snake {
    /** an array that contains all the body objects of the snake */
    body: (Body | Head | Tail)[];
    head: Head;
    tail: Tail[];
    bodyIndex: number;
    direction: Direction;
    gameBoard: Board;
}

export function createSnake(gameBoard: Board): Snake {
    const head = new Head({ x: 1, y: 1 }, gameBoard);
    return {
        gameBoard: gameBoard,
        head,
        body: [head],
        tail: [], // and array that contains only the tail objects of the snake
        bodyIndex: 1,
        direction: "down",
    };
}
/**
 * Causes the snake to assimilate the nutrients of the food object, growing a new tail piece and adding that tail piece to the body and tail arrays
 */
export function eat(s: Snake): void {
    let endOfTail = s.body[s.body.length - 1];
    let newTail = new Tail(
        s.bodyIndex,
        endOfTail.position,
        endOfTail,
        s.gameBoard
    );
    s.body.push(newTail);
    s.tail.push(newTail);
    s.bodyIndex++;
}

/**
 * determines the cell the head will move to next based on the current direction which is determined by the last arrow key pressed, and then updates the position of the head object of the snake
 */
function moveHead(s: Snake): void {
    const current_x = s.head.positionCoordinate.x; // deprecated - replace with the cells position coordinate
    const current_y = s.head.positionCoordinate.y; // deprecated - replace with the cells position coordinate
    let destinationCellCoordinate: CellCoordinate = {
        x: current_x,
        y: current_y,
    };
    const movementOffsetLookup = {
        up: { x: 0, y: -1 },
        right: { x: 1, y: 0 },
        down: { x: 0, y: 1 },
        left: { x: -1, y: 0 },
    };
    const offset = movementOffsetLookup[s.direction];

    destinationCellCoordinate = {
        x: current_x + offset.x,
        y: current_y + offset.y,
    };

    let destinationCell: Cell = s.gameBoard.getSpecificCell(
        destinationCellCoordinate
    ); // get the reference to the new cell the head will move to
    s.head.positionCoordinate = destinationCellCoordinate; // deprecated - replace with the cells position coordinate
    s.head.updatePosition(destinationCell); // update the position of the head with the reference to the destination Cell
}

/**
 * iterate through each of the elements within the snakes body and update their positions
 */
export function updatePositions(s: Snake): void {
    moveHead(s);

    let previousBodyPart = s.head;
    for (let i = 1; i < s.body.length; i++) {
        s.body[i].updatePosition(previousBodyPart.previousPosition);
        previousBodyPart = s.body[i];
    }
}

/**
 *
 * @returns boolean value - true if the snake has eaten itself, false if it has not
 */
export function checkAutoCannibalism(s: Snake): boolean {
    let retIds = s.tail.map((tailPiece) => tailPiece.position._id);
    if (retIds.includes(s.head.position._id)) {
        return true;
    }
    return false;
}

/**
 *
 * @returns boolean value - true if the snake has slithered into a wall, false if it has not
 */
export function checkIfInAWall(s: Snake): boolean {
    if (s.head.position.id === -1) {
        return true;
    }
    return false;
}
