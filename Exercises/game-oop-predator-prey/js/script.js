// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

let playing = false;


// Our predator
let tiger;

// The three prey
let antelope;
let zebra;
let bee;

//background
let safariBackground

//characters
let tigerFace;
let antelopeFace;
let zebraFace;
let beeFace;



//preload
//
//Sets up the images that will serve as the background and characters to the game
//Additionally, sets up the sounds that will play in the game
function preload() {
  safariBackground = loadImage("assets/images/Safari.jpg");
  tigerFace = loadImage("assets/images/Tiger.png");
  antelopeFace = loadImage("assets/images/Antelope.png")
  zebraFace = loadImage("assets/images/Zebra.png")
  beeFace = loadImage("assets/images/Bee.png")
}

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(100, 100, 5, tigerFace, 40);
  antelope = new Prey(100, 100, 10, antelopeFace, 50);
  zebra = new Prey(100, 100, 8, zebraFace, 60);
  bee = new Prey(100, 100, 20, beeFace, 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(safariBackground);
  displayStartMessage();

  if (playing == true) {

  // Handle input for the tiger
  tiger.handleInput();

  // Move all the "animals"
  tiger.move();
  antelope.move();
  zebra.move();
  bee.move();

  // Handle the tiger eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  // Display all the "animals"
  tiger.display();
  antelope.display();
  zebra.display();
  bee.display();

 }
}

///////////////////////////////

function displayStartMessage() {
  push();
  textAlign(CENTER, CENTER);
  fill(128, 17, 0);
  textSize(49);
  text("WELCOME TO SAVANNAH HUNT! \n Keep Eating to Stay Alive! \n Watch out! Some things shouldn't be eaten... \n CLICK TO START", width / 2, height / 2);
  pop();
  }

  function mousePressed() {
    playing = true;
    gameOver = false;
  }
