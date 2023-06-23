import p5 from "p5";
import Board from "./board"
import Cell from "./cell"

interface CellCoordinate {
    x: number;
    y: number;
}

class Body{
    _id: number;
    _position: Cell;
    _pre_tail: Tail | Head;
    _positionCoordinate: CellCoordinate;
    _gameBoard: Board;
    _previousPosition: Cell;

    constructor(_positionCoordinate: CellCoordinate, _gameBoard: Board){
        //console.log(_positionCoordinate, _gameBoard);
        this._gameBoard = _gameBoard;
        this._positionCoordinate = _positionCoordinate;
        //console.log(_gameBoard, _positionCoordinate);
        this._position = _gameBoard.getSpecificCell(_positionCoordinate);
        this._previousPosition = this._position;
    }

    updatePosition(new_position){
        this.previousPosition = this.position;
        this.position = new_position;
    }

    get position(){
        return this._position;
    }
    
    get positionCoordinate(){
        return this._positionCoordinate;
    }
    
    get previousPosition(){
        return this._previousPosition;
    }

    set position(new_position: Cell){
        this._position = new_position;
    }

    set previousPosition(current_position: Cell){
        this._previousPosition = current_position;
    }

    set positionCoordinate(new_coordinate: CellCoordinate){
        this._positionCoordinate = new_coordinate;
    }
}



class Head extends Body{
    constructor(_startCoordinate, _gameBoard: Board){
        super(_startCoordinate, _gameBoard);
    }


}



class Tail extends Body{
    _pre_tail: Tail | Head;
    constructor(_id, _position, _pre_tail, _gameBoard){
        super(_position.coordinate, _gameBoard);
        this._pre_tail = _pre_tail;
    }


}

export {Head, Body, Tail}