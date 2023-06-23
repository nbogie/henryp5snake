
import Board from "./board"
import {Head, Body, Tail} from "./body"
import p5 from "p5";
import Cell from "./cell"


interface CellCoordinate {
    x: number;
    y: number;
}

class Snake{
    _length: number;
    _body: (Body | Head | Tail)[];
    _head: Head;
    _tail: Tail[];
    _bodyIndex: number;
    _direction: number;
    _gameBoard: Board;
    
    constructor(_gameBoard: Board){
        this._length = 1;
        this._gameBoard = _gameBoard;
        this._head = new Head({x: 1, y: 1}, this._gameBoard)
        this._body = [this._head];
        this._tail = [];
        this._bodyIndex = 1;
        this._direction = 2;
    }

    eat(){
        let endOfTail = this._body[this._body.length-1]
        let newTail = new Tail(this._bodyIndex, endOfTail.position, endOfTail, this._gameBoard);
        this._body.push(newTail);
        this._tail.push(newTail);
        this._bodyIndex++;
    }


    
    moveHead(){
        const current_x = this._head.positionCoordinate.x;
        const current_y = this._head.positionCoordinate.y;
        let destinationCellCoordinate: CellCoordinate = {x: current_x, y: current_y};

        switch (this._direction) {
            case 0: //up arrow
                destinationCellCoordinate = {x: current_x, y: current_y - 1};
            break;
            case 1: //right arrow
                destinationCellCoordinate = {x: current_x + 1, y: current_y};
            break;
            case 2: //down arrow
                destinationCellCoordinate = {x: current_x, y: current_y + 1};
            break;
            case 3: //left arrow
                destinationCellCoordinate = {x: current_x - 1, y: current_y};
            break;
        }

        let destinationCell: Cell = this._gameBoard.getSpecificCell(destinationCellCoordinate);
        this._head.positionCoordinate = destinationCellCoordinate;
        this._head.updatePosition(destinationCell)
    }

    updatePositions(){
        
        this.moveHead();
        let previousBodyPart = this.head;
        for (let i = 1; i < this._body.length; i++){
            this._body[i].updatePosition(previousBodyPart.previousPosition);
            previousBodyPart = this._body[i];
        }

    }

    get body(): (Body | Head | Tail)[] {
        return this._body;
    }

    checkAutoCannibalism(){
        let retIds = this._tail.map(tailPiece => tailPiece.position._id);
        if (retIds.includes(this.head.position._id)){
            return true
        }
        return false
    }

    checkIfInAWall(){
        if (this._head.position.id === -1){
            return true;
        }
        return false;
    }

    set direction(dir_num: (0 | 1 | 2 | 3)){
        this._direction = dir_num;
    }
    get head(){
        return this._head;
    }


}

export default Snake