
import snake from "./snake"
import food from "./food"
import p5 from "p5";



interface RowArray {
    rowCells: p5.Vector[];
}

interface BoardArray {
    rowArrays: RowArray[];
}

interface CellCoordinate {
    x: number;
    y: number;
}


class Board{
    _cellCount: number; //number of cells on each axis of the board
    _cellSize: number; //the visual size of each cell in pixels
    _boardArray: BoardArray; // the object that contains the arrays that contains the board cells
    constructor(_cellCount, _cellSize){
        this._cellCount = _cellCount; 
        this._cellSize = _cellSize;
        this._boardArray = this.createBoard(_cellCount, _cellSize);
    }

    createBoard(cellCount: number, cellSize: number): BoardArray {

        let retGridArray: BoardArray = {rowArrays: []};//empty array
        let pushRowArray: RowArray = {rowCells: []}
        let xPos:number = 0;
        let yPos:number = 0;

        for (let i = 0; i < cellCount; i++){ // for each row
            pushRowArray = {rowCells: []}; //the RowArray of each row
            xPos = i * cellSize;
            for (let j = 0; j < cellCount; j++){
                yPos = j * cellSize;  
                pushRowArray.rowCells.push(new p5.Vector(xPos, yPos));
            }
            retGridArray.rowArrays.push(pushRowArray);
        }
        return retGridArray
    }

    getRandomCell(): p5.Vector{
        let rand_y: number = Math.floor(Math.random()*this._boardArray.rowArrays.length);
        let rand_row = this._boardArray.rowArrays[rand_y];
        let rand_x: number = Math.floor(Math.random()*rand_row.rowCells.length);
        let rand_cell = rand_row.rowCells[rand_x];
        return rand_cell;
    }

    getSpecificCell(cellCoordinate: CellCoordinate): p5.Vector{
        let specific_row = this._boardArray.rowArrays[cellCoordinate.y];
        let specific_cell = specific_row.rowCells[cellCoordinate.x];
        return specific_cell;
    }
}



export default Board