import Board from "./board";
import { Head, Body, Tail } from "./body";
import p5 from "p5";
import Cell from "./cell";

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
class Snake {
    _body: (Body | Head | Tail)[];
    _head: Head;
    _tail: Tail[];
    _bodyIndex: number;
    _direction: number;
    _gameBoard: Board;

    /**
     *
     * @param _gameBoard the Board object of the game itself
     */
    constructor(_gameBoard: Board) {
        this._gameBoard = _gameBoard; // the Board object
        this._head = new Head({ x: 1, y: 1 }, this._gameBoard); // the Head object of the snake
        this._body = [this._head]; // an array that contains all the body objects of the snake
        this._tail = []; // and array that contains only the tail objects of the snake
        this._bodyIndex = 1;
        this._direction = 2;
    }

    /**
     * Causes the snake to assimilate the nutrients of the food object, growing a new tail piece and adding that tail piece to the body and tail arrays
     */
    eat(): void {
        let endOfTail = this._body[this._body.length - 1];
        let newTail = new Tail(
            this._bodyIndex,
            endOfTail.position,
            endOfTail,
            this._gameBoard
        );
        this._body.push(newTail);
        this._tail.push(newTail);
        this._bodyIndex++;
    }

    /**
     * determines the cell the head will move to next based on the current direction which is determined by the last arrow key pressed, and then updates the position of the head object of the snake
     */
    moveHead(): void {
        const current_x = this._head.positionCoordinate.x; // deprecated - replace with the cells position coordinate
        const current_y = this._head.positionCoordinate.y; // deprecated - replace with the cells position coordinate
        let destinationCellCoordinate: CellCoordinate = {
            x: current_x,
            y: current_y,
        };

        switch (this._direction) {
            case 0: //up arrow
                destinationCellCoordinate = { x: current_x, y: current_y - 1 };
                break;
            case 1: //right arrow
                destinationCellCoordinate = { x: current_x + 1, y: current_y };
                break;
            case 2: //down arrow
                destinationCellCoordinate = { x: current_x, y: current_y + 1 };
                break;
            case 3: //left arrow
                destinationCellCoordinate = { x: current_x - 1, y: current_y };
                break;
        }

        let destinationCell: Cell = this._gameBoard.getSpecificCell(
            destinationCellCoordinate
        ); // get the reference to the new cell the head will move to
        this._head.positionCoordinate = destinationCellCoordinate; // deprecated - replace with the cells position coordinate
        this._head.updatePosition(destinationCell); // update the position of the head with the reference to the destination Cell
    }

    /**
     * iterate through each of the elements within the snakes body and update their positions
     */
    updatePositions(): void {
        this.moveHead();
        let previousBodyPart = this.head;
        for (let i = 1; i < this._body.length; i++) {
            this._body[i].updatePosition(previousBodyPart.previousPosition);
            previousBodyPart = this._body[i];
        }
    }

    /**
     *
     * @returns boolean value - true if the snake has eaten itself, false if it has not
     */
    checkAutoCannibalism(): boolean {
        let retIds = this._tail.map((tailPiece) => tailPiece.position._id);
        if (retIds.includes(this.head.position._id)) {
            return true;
        }
        return false;
    }

    /**
     *
     * @returns boolean value - true if the snake has slithered into a wall, false if it has not
     */
    checkIfInAWall(): boolean {
        if (this._head.position.id === -1) {
            return true;
        }
        return false;
    }

    // ------------------------------------------- GETTER METHODS ------------------------------------------- \\
    get body(): (Head | Tail)[] {
        return this._body;
    }
    get tail(): Tail[] {
        return this._tail;
    }
    get head(): Head {
        return this._head;
    }
    // ------------------------------------------- SETTER METHODS ------------------------------------------- \\
    set direction(dir_num: 0 | 1 | 2 | 3) {
        this._direction = dir_num;
    }
}

export default Snake;
