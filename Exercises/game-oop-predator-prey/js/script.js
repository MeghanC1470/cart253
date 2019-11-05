// Predator-Prey Simulation
// by Meghan Cullen
//
// Creates a predator, an enemy and three prey (of different sizes and speeds) and a distraction
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.
// The enemy will not only eat prey, but will damage the predator if they get too close
// The distraction does just that, distracts you!

//Whether the game started
let playing = false;
//Whether the game ended
let gameOver = false;


// Our predator
let tiger;

// The Enemy
let lion;

// The three prey
let antelope;
let zebra;
let bee;

let numPrey = 100; // How many Prey to simulate
let prey = []; // An empty array to store them in (we'll create them in setup())

// The distraction
let bird;

//The background
let safariBackground

//The Images of the characters
let tigerFace;
let lionFace;
let antelopeFace;
let zebraFace;
let beeFace;
let birdFace;

// The Music
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
  birdFace = loadImage("assets/images/Dud.png")

  safariMusic = loadSound("assets/sounds/SafariTimeMusic.mp3")
}


// setup()
//
// Sets up a canvas
// Creates objects for the predator, enemy, three prey and distraction
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(100, 100, 5, tigerFace, 40);
  lion = new Enemy(100, 1000, 15, lionFace, 50);
  antelope = new Prey(1000, 100, 10, antelopeFace, 50);
  zebra = new Prey(1000, 100, 8, zebraFace, 60);
  bee = new Prey(1000, 100, 20, beeFace, 15);
  bird = new Dud(1000, 100, 20, birdFace, 30);

/////////



// Set the music
  safariMusic.loop();
}


// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Set the background to a safari scene
  background(safariBackground);
  // Set the Title Message

  if (playing == true) {

  // Handle input for the tiger
  tiger.handleInput();

  // Move all the "animals"
  tiger.move();
  lion.move();
  antelope.move();
  zebra.move();
  bee.move();
  bird.move();

  // Handle the tiger and lion eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  lion.handleEating(antelope);
  lion.handleEating(zebra);
  lion.handleEating(bee);

  // Hand the tiger taking damage from the enemy lion
tiger.handleHurting(lion);

tiger.handleDeath();

  checkGameOver();

  // Display all the "animals"
  tiger.display();
  antelope.display();
  zebra.display();
  bee.display();
  lion.display();
  bird.display();
 }
 else {
   // Once the game is over, display a Game Over Message
 if (gameOver == true) {
    displayGameOver();
  }
    // Otherwise we display the message to start the game
  else {
    displayStartMessage();
  }
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

function checkGameOver() {
  if (tiger.death === true) {
    gameOver = true;
    playing = false;
  }
}

  function displayGameOver() {
      push();
      textAlign(CENTER, CENTER);
      fill(128, 17, 0);
      textSize(49);
      text("You DIED", width / 2, height / 2);
      pop();
    }


/////
  function mousePressed() {
    playing = true;
    gameOver = false;
  }
