
import snake from "./snake"
import food from "./food"
import p5 from "p5";
import Cell from "./cell"



interface RowArray {
    rowCells: Cell[];
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
        let cellIdCount: number = 0;


        for (let i = 0; i < cellCount; i++){ // for each row
            pushRowArray = {rowCells: []}; //the RowArray of each row
            yPos = i * cellSize;
            for (let j = 0; j < cellCount; j++){
                xPos = j * cellSize;
                if (j === 0 || i === 0 || j === cellCount - 1 || i === cellCount - 1){
                    pushRowArray.rowCells.push(new Cell(-1, xPos, yPos));
                } else {
                    pushRowArray.rowCells.push(new Cell(cellIdCount, xPos, yPos));
                    cellIdCount++;
                }
                
            }
                retGridArray.rowArrays.push(pushRowArray);
        }
        return retGridArray
    }

    getRandomCell(): Cell{
        let rand_y_index: number = 1 + Math.floor(Math.random()*this._boardArray.rowArrays.length - 2);
        let rand_row = this._boardArray.rowArrays[rand_y_index];
        let rand_x_index: number = 1 + Math.floor(Math.random()*rand_row.rowCells.length - 2);
        let rand_cell = rand_row.rowCells[rand_x_index];
        return rand_cell;
    }

    getSpecificCell(cellCoordinate: CellCoordinate): Cell{
        let specific_row = this._boardArray.rowArrays[cellCoordinate.y];
        let specific_cell = specific_row.rowCells[cellCoordinate.x];
        return specific_cell;
    }

    getCellById(idToFind){
        this._boardArray
    }

    getArrayOfCells(): Cell[]{
        console.log("check1")
        let cells: Cell[] = [];
        //this._boardArray.rowArrays.forEach(row => row.forEach(cellInRow => cells.push(cellInRow)))
        
        for (let i: number = 1; i < (this._cellCount - 1); i++){
            let currentRow: RowArray = this._boardArray.rowArrays[i];
            for (let j: number = 1; i < (this._cellCount - 1); j++){
                let currentCell: Cell = currentRow.rowCells[j]
                cells.push(currentCell)
            }
        }
        console.log(this._cellCount)
        //console.log(cells);
        return cells;
    }
}



export default Board