import p5 from "p5";
import Board from "./board"
import Cell from "./cell"

/**
 * Food object, has two properties: position (a Cell), and the game board.
 * Contains methods for moving itself to a new random position
 */
class Food{
    _position: Cell;
    _gameBoard: Board;

    constructor(_boardSize: number, _gameBoard: Board){
        this._gameBoard = _gameBoard;
        this._position = this.newRandomPosition();
    }

    /**
     * Randomly selects a new cell for the food to be moved to, and updates its position to reference that cell
     */
    moveFood(): void{
        //let newPosition: Cell = this.newRandomPosition();
        let newPosition: Cell = this._gameBoard.getRandomCell();
        this._position = newPosition;
    }

    /**
     * Kinda deprecated, should only be used for determining the initial position of the food
     * @returns A cell reference for its starting position
     */
    newRandomPosition(): Cell{
        let destination_cell: Cell = this._gameBoard.getRandomCell()
        return destination_cell;
    }

    get position(){
        return this._position;
    }
}

export default Food