import p5 from "p5";
import Board from "./board"

interface CellCoordinate {
    x: number;
    y: number;
}

class Body{
    _id: number;
    _position: p5.Vector;
    _pre_tail: Tail | Head;
    _positionCoordinate: CellCoordinate;

    constructor(_positionCoordinate, _gameBoard){
        this._positionCoordinate = _positionCoordinate;
        this._position = _gameBoard.getSpecificCell(_positionCoordinate);
    }



    get position(){
        return this._position;
    }
    
    get positionCoordinate(){
        return this._positionCoordinate;
    }

    set position(new_position: p5.Vector){
        this._position = new_position;
    }

    set positionCoordinate(new_coordinate: CellCoordinate){
        this._positionCoordinate = new_coordinate;
    }
}



class Head extends Body{
    constructor(_gameBoard){
        super({x: 0, y: 0}, _gameBoard);
    }

}



class Tail extends Body{
    _pre_tail: Tail | Head;
    constructor(_id, _position, _pre_tail, _gameBoard){
        super(_position, _gameBoard);
        this._pre_tail = _pre_tail;
    }


}

export {Head, Body, Tail}