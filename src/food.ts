import p5 from "p5";
import Board from "./board"

class Food{
    _position: p5.Vector;
    _gameBoard: Board;

    constructor(_boardSize: number, _gameBoard){
        this._position = this.placeFood(_boardSize);
        this._gameBoard = _gameBoard;
    }

    placeFood(boardSize){
        let start_x: number = Math.floor(Math.random()*boardSize);
        let start_y: number = Math.floor(Math.random()*boardSize);
        return new p5.Vector(start_x, start_y)
    }

    moveFood(){
        let newPosition: p5.Vector = this.newRandomPosition();
        this._position = newPosition;
    }

    newRandomPosition(): p5.Vector{
        let destination_cell: p5.Vector = this._gameBoard.getRandomCell()
        let destination_x = destination_cell.x;
        let destination_y = destination_cell.y;
    
        return new p5.Vector(destination_x, destination_y)
    }

    get position(){
        return this._position;
    }

    drawFood(){
        
    }
}

export default Food