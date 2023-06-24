import p5 from "p5";
import Board from "./board";
import Cell from "./cell";

interface CellCoordinate {
    x: number;
    y: number;
}

/**
 * Base class for the body components of the snake
 */

class Body {
    _id: number;
    _position: Cell;
    _pre_tail: Tail | Head;
    _positionCoordinate: CellCoordinate;
    _gameBoard: Board;
    _previousPosition: Cell;

    constructor(_positionCoordinate: CellCoordinate, _gameBoard: Board) {
        //console.log(_positionCoordinate, _gameBoard);
        this._gameBoard = _gameBoard;
        this._positionCoordinate = _positionCoordinate;
        //console.log(_gameBoard, _positionCoordinate);
        this._position = _gameBoard.getSpecificCell(_positionCoordinate);
        this._previousPosition = this._position;
    }

    /**
     *
     * @param new_position the position to which the body object should be moved to on the next iteration
     */
    updatePosition(new_position) {
        this.previousPosition = this.position;
        this.position = new_position;
    }

    // ------------------------------------------- GETTER METHODS ------------------------------------------- \\
    get position() {
        return this._position;
    }
    get positionCoordinate() {
        return this._positionCoordinate;
    }
    get previousPosition() {
        return this._previousPosition;
    }
    // ------------------------------------------- SETTER METHODS ------------------------------------------- \\
    set position(new_position: Cell) {
        this._position = new_position;
    }
    set previousPosition(current_position: Cell) {
        this._previousPosition = current_position;
    }
    set positionCoordinate(new_coordinate: CellCoordinate) {
        this._positionCoordinate = new_coordinate;
    }
}

/**
 * I no longer remember why this originally needed to be its own class
 */
class Head extends Body {
    constructor(_startCoordinate: CellCoordinate, _gameBoard: Board) {
        super(_startCoordinate, _gameBoard);
    }
}

/**
 * Extends the body object to allow the storing of
 */
class Tail extends Body {
    _pre_tail: Tail | Head;
    constructor(
        _id: number,
        _position: Cell,
        _pre_tail: Head | Tail,
        _gameBoard: Board
    ) {
        super(_position.coordinate, _gameBoard);
        this._pre_tail = _pre_tail;
    }
}

export { Head, Body, Tail };
