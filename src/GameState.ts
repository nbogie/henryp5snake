import { Palette } from "./setupColourPalettes";
import Food from "./food";
import snake from "./snake";
import board from "./board";

export interface GameState {
    boardCellSize: number;
    boardSize: number;
    palette: Palette;
    gameFood: Food;
    playerSnake: snake;
    gameBoard: board;
    score: number;
    /** initial game speed */
    fps: number;
    /**how much hard the game gets each time the snake eats food*/
    difficulty_increment: 1;
    /** the number of squares on each axis of the board */
    number_of_cells_on_board: 20;
}
