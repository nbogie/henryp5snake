
import Board from "./board"
import {Head, Body, Tail} from "./body"
import p5 from "p5";


interface CellCoordinate {
    x: number;
    y: number;
}

class Snake{
    _length: number;
    _body: (Body | Head | Tail)[];
    _head: Head;
    _bodyIndex: number;
    _direction: number;
    _gameBoard: Board;
    
    constructor(_gameBoard: Board){
        this._length = 1;
        this._gameBoard = _gameBoard;
        this._head = new Head(this._gameBoard)
        this._body = [this._head];
        this._bodyIndex = 1;
        this._direction = 2;
    }

    //eat(){
    //    this._body.push(new tail(this._bodyIndex))
    //    this._bodyIndex++;
    //}


    //drawTails(){
    //    this._tails.forEach(bodyPiece => bodyPiece.draw())



    
    moveHead(){
        const current_x = this._head.positionCoordinate.x;
        const current_y = this._head.positionCoordinate.y;
        let destinationCellCoordinate: CellCoordinate = {x: current_x, y: current_y};

        switch (this._direction) {
            case 0: //up arrow
                destinationCellCoordinate = {x: current_x - 1, y: current_y};
            break;
            case 1: //right arrow
                destinationCellCoordinate = {x: current_x , y: current_y + 1};
            break;
            case 2: //down arrow
                destinationCellCoordinate = {x: current_x + 1, y: current_y };
            break;
            case 3: //left arrow
                destinationCellCoordinate = {x: current_x, y: current_y - 1};
            break;
        }

        let destinationCell: p5.Vector = this._gameBoard.getSpecificCell(destinationCellCoordinate);
        let currentHeadCell: p5.Vector = this._gameBoard.getSpecificCell(this._head.positionCoordinate);
        this._head.positionCoordinate = destinationCellCoordinate;
        this._head.position = destinationCell;
    }


    get body(): (Body | Head | Tail)[] {
        return this._body;
    }


    set direction(dir_num: (0 | 1 | 2 | 3)){
        this._direction = dir_num;
    }
    get head(){
        return this._head;
    }


}

export default Snake