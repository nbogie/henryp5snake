
import snake from "./snake"
import food from "./food"
import p5 from "p5";
import Cell from "./cell"
import Board from "./board";



class BoardArray {
    _array: Cell[][]
    _gameCellsArray: Cell[][];
    _gameCells: Cell[];
    _borderCells: Cell[];
    constructor(_cellCount, _cellSize){
        this.createCellArrays(_cellCount, _cellSize);
        this.populate_gameCells();
        console.log(this.getRandomCell())


    }


    getRandomCell(): Cell{
        let randomCellIndex = Math.floor(Math.random() * this._gameCells.length);
        return this._gameCells[randomCellIndex];
    }


    createCellArrays(cellCount, cellSize): void{ // create an array that contains an array for each row in the table, each row is an array of cells

        let retGridArray: Cell[][] = [];//initialise as an empty array
        let retGameCellsArray: Cell[][] = [];

        let xPos: number = 0; //initialise the x position as 0
        let yPos: number = 0; //initialise the y position as 0
        let cellIdCount: number = 0; // initialise the id counter for the cells


        for (let i = 0; i < cellCount; i++){ // for each row iterate through and DO:
            let pushRowArray: Cell[] = [];// initialise new row as an empty array
            let gamePushRowArray: Cell[] = [];// initialise new row as an empty arrayi
            yPos = i * cellSize; // y position on the canvas of the current row

            for (let j = 0; j < cellCount; j++){ // for each Cell in a row, iterate through and do
                xPos = j * cellSize; // x position on the canvas of the current Cell

                // if current row is the first or last row, or if the current cell is the first or last cell in a row
                if (j === 0 || i === 0 || j === cellCount - 1 || i === cellCount - 1){ 
                    pushRowArray.push(new Cell(-1, xPos, yPos)); // add a boundary cell to the current row array
                } else {
                    pushRowArray.push(new Cell(cellIdCount, xPos, yPos)); // otherwise add a normal cell
                    gamePushRowArray.push(new Cell(cellIdCount, xPos, yPos)); // otherwise add a normal cell
                    cellIdCount++; // incremement the id counter of the valid cells
                }
            }
            retGridArray.push(pushRowArray); // push the whole row that is an array of Cells to the return array
            retGameCellsArray.push(gamePushRowArray); // push the whole row that is an array of Cells to the return array 
        }
        this._array = retGridArray;
        this._gameCellsArray = retGameCellsArray; //return the whole array of rows of Cells
    }

    populate_gameCells(){
        let retGameArray: Cell[] = [];
        let retBorderArray: Cell[] = [];

        for (let i of this._array){
            for (let j of i){
                if (j.id === -1){
                    retBorderArray.push(j);
                } else {
                    retGameArray.push(j);
                }
            }


        }
        this._gameCells = retGameArray;
        this._borderCells = retBorderArray;
    }



    get array(){
        return this._array;
    }

    get gameCellsArray(){
        return this._gameCellsArray;
    }

    get borderCells(){
        return this._borderCells;
    }

    get gameCells(){
        return this._gameCells;
    }

}




export default BoardArray