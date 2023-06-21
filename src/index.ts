import p5 from "p5";

const myP5 = new p5(createSketch);

function createSketch(p: p5) {


    //Crucially, assign the setup and draw functions for the p5 createSketch.
    p.setup = setup;
    p.draw = draw;

    function setup() {
        const myCanvas = p.createCanvas(p.windowWidth, p.windowHeight);

        myCanvas.mousePressed(handleMousePressed);

        // p.noLoop();
    }


    function draw() {
        drawARandomCircle();
    }


    function drawARandomCircle() {
        const colour = getRandomColour();
        p.fill(colour);

        p.noStroke();
        const diameter = p.random(20, 100);
        p.circle(p.mouseX, p.mouseY, diameter);
    }

    function getRandomColour() {
        const palette = ["#556270", "#4ecdc4", "#c7f464", "#ff6b6b", "#c44d58"];
        return p.random(palette);
    }

    function handleMousePressed() {
        p.background("white");
    }


    // p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);
};




