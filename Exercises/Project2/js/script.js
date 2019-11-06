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


//The arrays
// One for the number of prey and one for the distraction bird
let numPrey = 2; // How many Prey to simulate
let prey = []; // An empty array to store them in

let numDud = 2;
let dud = [];

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
  lion = new Enemy(100, 2000, 15, lionFace, 50);
  antelope = new Prey(1000, 100, 10, antelopeFace, 50);
  zebra = new Prey(1000, 100, 8, zebraFace, 60);
  bee = new Prey(1000, 100, 20, beeFace, 15);
  bird = new Dud(1000, 100, 20, birdFace, 30);


//the Prey Array
// Run a for loop numPrey times to generate each Prey and put it in the array
// with random values for each prey
for (let i = 0; i < numPrey; i++) {
  let preyX = random(0, width);
  let preyY = random(0, height);
  let preySpeed = random(2, 20);
  let preyRadius = random(3, 60);
  prey.push(new Prey(preyX, preyY, preySpeed, zebraFace, preyRadius));
  prey.push(new Prey(preyX, preyY, preySpeed, antelopeFace, preyRadius));
  prey.push(new Prey(preyX, preyY, preySpeed, beeFace, preyRadius));
}

// the Dud Array
// Just like the Prey array, will generate different duds to throw off the player
for (let i = 0; i < numPrey; i++) {
  let dudX = random(0, width);
  let dudY = random(0, height);
  let dudSpeed = random(2, 20);
  let dudRadius = random(3, 60);
  dud.push(new Dud(dudX, dudY, dudSpeed, birdFace, dudRadius));
}

// Set the music
  safariMusic.loop();
}


// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Set the background to a safari scene
  background(safariBackground);
  // Check if the game is in play
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

// Handle the tiger taking damage from the enemy lion
  tiger.handleHurting(lion);

// Handle the tragic death of the tiger
  tiger.handleDeath();

// Check to see when the game is over
  checkGameOver();

// Display all the "animals"
  tiger.display();
  antelope.display();
  zebra.display();
  bee.display();
  lion.display();
  bird.display();

// Display and making sure the tiger can eat the copies of the prey
  for (let i = 0; i < prey.length; i++) {
  prey[i].move();
  prey[i].display();
  tiger.handleEating(prey[i]);
  lion.handleEating(prey[i]);
}

// Display the copies of the bird
for (let i = 0; i < dud.length; i++) {
   dud[i].move();
   dud[i].display();
}
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

//displayStartMessage
//
//Display's the start message, including instructions, at the beginning of the game
function displayStartMessage() {
  push();
  textAlign(CENTER, CENTER);
  fill(128, 17, 0);
  textSize(49);
  text("WELCOME TO TIGER HUNT! \n Use the arrow keys to move! \n Hold SHIFT to run and keep Eating to Stay Alive! \n Watch out! Some things shouldn't be eaten... \n CLICK TO START", width / 2, height / 2);
  pop();
  }

//checkGameOver
//
//See if the tiger died and end the game
function checkGameOver() {
  if (tiger.death === true) {
    gameOver = true;
    playing = false;
  }
}

//displayGameOver
//
//Display the Game Over message
  function displayGameOver() {
      push();
      textAlign(CENTER, CENTER);
      fill(128, 17, 0);
      textSize(49);
      text("GAME OVER \n You died! \n Reload to Try Again", width / 2, height / 2);
      pop();
    }

//mousePressed
//
//Starts the game when the mouse is clicked
  function mousePressed() {
    playing = true;
    gameOver = false;
  }
