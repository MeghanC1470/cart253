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

// The Enemy
let lion;

//background
let safariBackground

//characters
let tigerFace;
let lionFace;
let antelopeFace;
let zebraFace;
let beeFace;


//
let safariMusic;



//preload
//
//Sets up the images that will serve as the background and characters to the game
//Additionally, sets up the sounds that will play in the game
function preload() {
  safariBackground = loadImage("assets/images/Safari.jpg");
  tigerFace = loadImage("assets/images/Tiger.png");
  lionFace = loadImage("assets/images/Lion.png");
  antelopeFace = loadImage("assets/images/Antelope.png")
  zebraFace = loadImage("assets/images/Zebra.png")
  beeFace = loadImage("assets/images/Bee.png")

  safariMusic = loadSound("assets/sounds/SafariTimeMusic.mp3")
}

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(100, 100, 5, tigerFace, 40);
  lion = new Enemy(100, 1000, 10, lionFace, 40);
  antelope = new Prey(1000, 100, 10, antelopeFace, 50);
  zebra = new Prey(1000, 100, 8, zebraFace, 60);
  bee = new Prey(1000, 100, 20, beeFace, 15);

  safariMusic.loop();
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
  lion.move();

  // Handle the tiger eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);
  //
  lion.handleEating(antelope);
  lion.handleEating(zebra);
  lion.handleEating(bee);


//
tiger.handleHurting(lion);

  // Display all the "animals"
  tiger.display();
  antelope.display();
  zebra.display();
  bee.display();
  lion.display();
 }
}

///////////////////////////////

function displayStartMessage() {
  push();
  textAlign(CENTER, CENTER);
  fill(128, 17, 0);
  textSize(49);
  text("WELCOME TO TIGER HUNT! \n Hold SHIFT to run and keep Eating to Stay Alive! \n Watch out! Some things shouldn't be eaten... \n CLICK TO START", width / 2, height / 2);
  pop();
  }

/////
  function mousePressed() {
    playing = true;
    gameOver = false;
  }
