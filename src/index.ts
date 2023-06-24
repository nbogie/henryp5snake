import p5 from "p5";
import { drawAll } from "./drawAll";
import { initialiseGameState } from "./initialiseGameState";
import { updateAll } from "./updateAll";

new p5(createSketch);

function createSketch(p: p5): void {
    p.setup = setup;
    p.draw = draw;

    const gameState = initialiseGameState(p);

    function setup(): void {
        const myCanvas = p.createCanvas(p.windowWidth, gameState.boardSize);
        myCanvas.mousePressed(handleMousePressed);
        p.frameRate(gameState.fps); // set the initial frame rate of the game - equates to difficulty
    }

    function draw(): void {
        gameStep();
    }

    /** execute the code of each iteration, seperated out to allow easy changes to be made on low refresh rate monitors */
    function gameStep(): void {
        updateAll(p, gameState);
        drawAll(p, gameState);
    }

    // p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);

    // function to handle mouse clicks - not used
    function handleMousePressed() {}
}
