"use strict";

/******************************************************

Game - Chaser
Pippin Barr

A "simple" game of cat and mouse. The player is a circle and can move with keys,
if they overlap the (randomly moving) prey they "eat it" by sucking out its life
and adding it to their own. The player "dies" slowly over time so they have to keep
eating to stay alive.

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, screen wrap.

******************************************************/

// Track whether the game is over
let gameOver = false;

// Player image, position, size, velocity
let playerCat;
let playerX;
let playerY;
let playerRadius = 25;
let playerVX = 0;
let playerVY = 0;
let playerNormalSpeed = 2;
let playerSprintSpeed = 4;
let playerCurrentSpeed = playerNormalSpeed;
// Player health
let playerHealth;
let playerMaxHealth = 255;
// Player fill color
let playerFill = 50;

// Prey image, position, size, velocity
let preyRat;
let preyX;
let preyY;
let preyRadius = 25;
let preyVX;
let preyVY;
let preyMaxSpeed = 5;
// Prey health
let preyHealth;
let preyMaxHealth = 100;
// Prey fill color
let preyFill = 200;
//Noise for the prey's spontanious movement
let preyXNoise = 0.0;
let preyYNoise = 0.0;

// Amount of health obtained per frame of "eating" (overlapping) the prey
let eatHealth = 10;
// Number of prey eaten during the game (the "score")
let preyEaten = 0;

//The background
let woodfloor;

//The Player sound effect
let meow;
//Background music!
let pixelMusic;


//preload()
//
//Sets up the images that will serve as the background and characters to the game
//Additionally, sets up the sounds that will play in the game
function preload() {
  //Images
  woodfloor = loadImage("assets/images/Woodfloor.png");
  preyRat = loadImage("assets/images/Rat.png");
  playerCat = loadImage("assets/images/Cat.png");

  //Cat meowing sound effect
  meow = loadSound("assets/sounds/cat_meow2.wav");

  //Music
  pixelMusic = loadSound("assets/sounds/Pixel Music - Loop Royalty Free Stock Music.mp3");
}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(500,500);
  noStroke();

  //Set up the music
  pixelMusic.loop();

  // We're using simple functions to separate code out
  setupPrey();
  setupPlayer();
  preyYNoise = random()*100;
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width / 5;
  preyY = height / 2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4 * width / 5;
  playerY = height / 2;
  playerHealth = playerMaxHealth;

}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  //Set the background as a wooden floor
  background(woodfloor);

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();
  }
  else {
    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerCurrentSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerCurrentSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerCurrentSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerCurrentSpeed;
  }
  else {
    playerVY = 0;
  }

  //Allow the Player to sprint faster
  if (keyIsDown(SHIFT)) {
    playerCurrentSpeed = playerSprintSpeed;
  }
  else {
    playerCurrentSpeed = playerNormalSpeed;
  }

  //However, if the Player Sprints, they lose Health faster
  if (keyIsDown(SHIFT)){
    playerMaxHealth = playerMaxHealth - 2;
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {

  // Update position
  playerX = playerX + playerVX;
  playerY = playerY + playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    // Off the left side, so add the width to reset to the right
    playerX = playerX + width;
  }
  else if (playerX > width) {
    // Off the right side, so subtract the width to reset to the left
    playerX = playerX - width;
  }

  if (playerY < 0) {
    // Off the top, so add the height to reset to the bottom
    playerY = playerY + height;
  }
  else if (playerY > height) {
    // Off the bottom, so subtract the height to reset to the top
    playerY = playerY - height;
  }
}

// updateHealth()
//
// Reduce the player's health (happens every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health
  playerHealth = playerHealth - 0.5;
  // Constrain the result to a sensible range
  playerHealth = constrain(playerHealth, 0, playerMaxHealth);
  // Check if the player is dead (0 health)
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  let d = dist(playerX, playerY, preyX, preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = playerHealth + eatHealth;
    // Constrain to the possible range
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    // Reduce the prey health
    preyHealth = preyHealth - eatHealth;
    // Constrain to the possible range
    preyHealth = constrain(preyHealth, 0, preyMaxHealth);

//Make the Player bigger and slower after eating too much prey
  if (preyHealth === 0) {
    playerRadius = playerRadius + 5;
    playerNormalSpeed = playerNormalSpeed - 0.1;

//Make the Player meow once they eat the prey
  if (preyHealth === 0) {
    meow.play();
  }

    // Check if the prey died (health 0)
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0, width);
      preyY = random(0, height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten = preyEaten + 1;
      //Make the prey faster after each previous one is eaten
      preyMaxSpeed = preyMaxSpeed + 2;
      }
    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  // Change the prey's velocity at random intervals
  // random() will be < 0.05 5% of the time, so the prey
  // will change direction on 5% of frames
  if (random() < 0.05) {
    // Set velocity based on noise values to get a new direction
    // and speed of movement
    //
    // Use map() to convert from the 0-1 range of the noise() function
    // to the appropriate range of velocities for the prey
    preyVX = map(noise(preyXNoise), 0, 1, -preyMaxSpeed, preyMaxSpeed);
    preyVY = map(noise(preyYNoise), 0, 1, -preyMaxSpeed, preyMaxSpeed);
  }
  // Set noise to random speeds and velocities
  preyXNoise+= 0.1;
  preyYNoise+= 0.1;

  // Update prey position based on velocity
  preyX = preyX + preyVX;
  preyY = preyY + preyVY;

  // Screen wrapping
  if (preyX < 0) {
    preyX = preyX + width;
  }
  else if (preyX > width) {
    preyX = preyX - width;
  }

  if (preyY < 0) {
    preyY = preyY + height;
  }
  else if (preyY > height) {
    preyY = preyY - height;
  }
}

// drawPrey()
//
// Draw the Prey as a rat with alpha based on health
function drawPrey() {
  image(preyRat,preyX, preyY, preyRadius * 3, preyRadius * 1.5);
  fill(preyFill, preyHealth);
}

// drawPlayer()
//
// Draw the Player as a cat with alpha value based on health
// Set up the tint that while fade out the Player as they lose health
function drawPlayer() {
  push();
  tint(255,255,255,playerHealth);
  image(playerCat,playerX, playerY, playerRadius * 3, playerRadius * 3);
  pop();


}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  // Set up the font
  textFont('Georgia');
  textSize(30);
  textAlign(CENTER, CENTER);
  fill(255);
  // Set up the text to display
  let gameOverText = ".:|GAME OVER|:.\n"; // \n means "new line"
  gameOverText = gameOverText + "You ate " + preyEaten + " prey\n";
  gameOverText = gameOverText + "before you died.\n";
  gameOverText = gameOverText + "Restart to Play Again";
  // Display it in the centre of the screen
  text(gameOverText, width / 2, height / 2);
}
