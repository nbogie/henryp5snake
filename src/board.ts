import snake from "./snake";
import food from "./food";
import p5 from "p5";
import Cell from "./cell";
import BoardArray from "./board_array";

interface CellCoordinate {
    x: number;
    y: number;
}

/**
 * The game board object, contains a property that is an array of Cells, along with properties for the draw size of each cell and the count of cells on an axis
 */
class Board {
    _cellCount: number; //number of cells on each axis of the board
    _cellSize: number; //the visual size of each cell in pixels
    _boardArray: BoardArray; // the object that contains the arrays that contains the board cells

    constructor(_cellCount: number, _cellSize: number) {
        this._cellCount = _cellCount;
        this._cellSize = _cellSize;
        this._boardArray = new BoardArray(this._cellCount, this._cellSize);
    }

    getRandomCell(): Cell {
        return this._boardArray.getRandomCell();
    }

    getSpecificCell(cellCoordinate: CellCoordinate): Cell {
        let specific_cell: Cell =
            this._boardArray.gameCellsArray[cellCoordinate.y][cellCoordinate.x];
        return specific_cell;
    }

    /*getCellById(idToFind){
        this._boardArray
    }*/

    boarderCells() {
        return this._boardArray.borderCells;
    }
}

export default Board;
