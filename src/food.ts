import p5 from "p5";
import Board from "./board"
import Cell from "./cell"

class Food{
    _position: Cell;
    _gameBoard: Board;

    constructor(_boardSize: number, _gameBoard){
        this._gameBoard = _gameBoard;
        this._position = this.newRandomPosition();
    }


    moveFood(){
        let newPosition: Cell = this.newRandomPosition();
        this._position = newPosition;
    }

    newRandomPosition(): Cell{
        let destination_cell: Cell = this._gameBoard.getRandomCell()
    
        return destination_cell;
    }

    get position(){
        return this._position;
    }

    drawFood(){
        
    }
}

export default Food