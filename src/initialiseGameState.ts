import p5 from "p5";
import { GameState } from "./GameState";
import Board from "./board";
import Food from "./food";
import { setupColourPalettes } from "./setupColourPalettes";
import snake from "./snake";

export function initialiseGameState(p: p5): GameState {
    const number_of_cells_on_board = 20;
    const boardSize: number = Math.min(p.windowHeight, p.windowWidth) - 100; //graphical size of the board
    const boardCellCount: number = number_of_cells_on_board + 2; //number of cells on each board axis = 40
    const boardCellSize: number = boardSize / boardCellCount; // the draw size of each board cell based on filling the board area with uniform squares
    const gameBoard: Board = new Board(boardCellCount, boardCellSize); // create a new Board Object

    let gameState: GameState = {
        boardCellSize,
        boardSize,
        number_of_cells_on_board,
        difficulty_increment: 1, //how much hard the game gets each time the snake eats food
        fps: 4,
        gameBoard,
        gameFood: new Food(boardSize, gameBoard),
        palette: setupColourPalettes(p),
        playerSnake: new snake(gameBoard),
        score: 0,
    };
    return gameState;
}
