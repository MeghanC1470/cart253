"use strict";

// Pong
// by Pippin Barr
//
// A "simple" implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Up and down keys control the right hand paddle, W and S keys control
// the left hand paddle

// Whether the game has started
let playing = false;
// Whether the game has ended
let gameOver = false;

// BALL

// A ball object with the properties of
// position, size, velocity, and speed
let ball = {
  x: 0,
  y: 0,
  size: 20,
  vx: 0,
  vy: 0,
  speed: 5
}

// PADDLES

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
let leftPaddle = {
  x: 0,
  y: 0,
  w: 40,
  h: 40,
  vy: 0,
  speed: 5,
  upKey: 87,
  downKey: 83
}

// RIGHT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
let rightPaddle = {
  x: 0,
  y: 0,
  w: 40,
  h: 40,
  vy: 0,
  speed: 5,
  upKey: 38,
  downKey: 40
}

// A variable to hold the beep sound we will play on bouncing
//And background music
let beepSFX;
let hockeyMusic;

//The point counter for each side
let leftPaddleScore = 0
let rightPaddleScore = 0

//Our air hockey background
let backgroundHockey;


// preload()
//
// Loads the beep audio for the sound of bouncing, as well as the background music
//As well as the images being used
function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
  hockeyMusic = new Audio("assets/sounds/HockeyThemeMusic.mp3");

  backgroundHockey = loadImage("assets/images/hockeyBackground.png")
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(640, 480);
  rectMode(CENTER);
  noStroke();

  setupPaddles();
  resetBall();

  //Set up the music
  hockeyMusic.play();
}

// setupPaddles()
//
// Sets the starting positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle position
  leftPaddle.x = 0 + leftPaddle.w;
  leftPaddle.y = height / 2;

  // Initialise the right paddle position
  rightPaddle.x = width - rightPaddle.w;
  rightPaddle.y = height / 2;
}

// draw()
//
// Calls the appropriate functions to run the game
// See how tidy it looks?!
function draw() {
  // Fill the background
  background(backgroundHockey);

  if (playing) {
    // If the game is in play, we handle input and move the elements around
    handleInput(leftPaddle);
    handleInput(rightPaddle);
    updatePaddle(leftPaddle);
    updatePaddle(rightPaddle);
    updateBall();

    checkBallWallCollision();
    checkBallPaddleCollision(leftPaddle);
    checkBallPaddleCollision(rightPaddle);

    //The score board
    totalScore();

    // Check if the ball went out of bounds and respond if so
    // (Note how we can use a function that returns a truth value
    // inside a conditional!)
    if (ballIsOutOfBounds()) {
      // If it went off either side, reset it
      resetBall();
      // This is where we would likely count points, depending on which side
      // the ball went off...
      if (ballIsOutOfBounds()) {
        leftPaddleScore();
        rightPaddleScore();
      }
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

  // We always display the paddles and ball so it looks like Pong! (Or in this case, air hockey)
  displayPaddle(leftPaddle);
  displayPaddle(rightPaddle);
  displayBall();
}

// handleInput()
//
// Checks the mouse and keyboard input to set the velocities of the
// left and right paddles respectively.
function handleInput(paddle) {
  // Move the paddle based on its up and down keys
  // If the up key is being pressed
  if (keyIsDown(paddle.upKey)) {
    // Move up
    paddle.vy = -paddle.speed;
  }
  // Otherwise if the down key is being pressed
  else if (keyIsDown(paddle.downKey)) {
    // Move down
    paddle.vy = paddle.speed;
  }
  else {
    // Otherwise stop moving
    paddle.vy = 0;
  }
}

// updatePositions()
//
// Sets the positions of the paddles and ball based on their velocities
function updatePaddle(paddle) {
  // Update the paddle position based on its velocity
  paddle.y += paddle.vy;
}

// updateBall()
//
// Sets the position of the ball based on its velocity
function updateBall() {
  // Update the ball's position based on velocity
  ball.x += ball.vx;
  ball.y += ball.vy;
}

// ballIsOutOfBounds()
//
// Checks if the ball has gone off the left or right
// Returns true if so, false otherwise
function ballIsOutOfBounds() {
  // Check for ball going off the sides (Left)
  if (ball.x > width) {
    background(255,0,0);
    return true;
  }
  // Check for ball going off the sides (Right)
  else {
    if (ball.x < 0) {
      background(0,0,255);
      return true;
    }
    else {
    return false;
    }
  }
}

// checkBallWallCollision()
//
// Check if the ball has hit the top or bottom of the canvas
// Bounce off if it has by reversing velocity
// Play a sound
function checkBallWallCollision() {
  // Check for collisions with top or bottom...
  if (ball.y < 0 || ball.y > height) {
    // It hit so reverse velocity
    ball.vy = -ball.vy;
    // Play our bouncing sound effect by rewinding and then playing
    beepSFX.currentTime = 0;
    beepSFX.play();
  }
}

// checkBallPaddleCollision(paddle)
//
// Checks for collisions between the ball and the specified paddle
function checkBallPaddleCollision(paddle) {
  // VARIABLES FOR CHECKING COLLISIONS

  // We will calculate the top, bottom, left, and right of the
  // paddle and the ball to make our conditionals easier to read...
  let ballTop = ball.y - ball.size / 2;
  let ballBottom = ball.y + ball.size / 2;
  let ballLeft = ball.x - ball.size / 2;
  let ballRight = ball.x + ball.size / 2;

  let paddleTop = paddle.y - paddle.h / 2;
  let paddleBottom = paddle.y + paddle.h / 2;
  let paddleLeft = paddle.x - leftPaddle.w / 2;
  let paddleRight = paddle.x + paddle.w / 2;

  // First check the ball is in the vertical range of the paddle
  if (ballBottom > paddleTop && ballTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      // Then the ball is touching the paddle
      // Reverse its vx so it starts travelling in the opposite direction
      ball.vx = -ball.vx;
      // Play our bouncing sound effect by rewinding and then playing
      beepSFX.currentTime = 0;
      beepSFX.play();
    }
  }
}

// displayPaddle(paddle)
//
// Draws the specified paddle
function displayPaddle(paddle) {
  // Draw the paddles
  fill(0,0,255);
  ellipse(rightPaddle.x, rightPaddle.y, rightPaddle.w, rightPaddle.h);
  fill(171,15,0);
  ellipse(leftPaddle.x, leftPaddle.y, leftPaddle.w, leftPaddle.h);
}

// displayBall()
//
// Draws the ball on screen as a square
function displayBall() {
  // Draw the ball
  push();
  fill(0,255,0);
  ellipse(ball.x, ball.y, ball.size, ball.size);
  pop();
}

// resetBall()
//
// Sets the starting position and velocity of the ball
function resetBall() {
  // Initialise the ball's position and velocity based on who wins the round
  if (ball.x > width) {
    ball.x = leftPaddle.x + 30;
    ball.vx = ball.speed;
  }
  else {
    ball.x = rightPaddle.x + -30;
    ball.vx = -ball.speed;
  }
  ball.y = height / 2;
  ball.vy = ball.speed;
}
//totalScore()
//
//Keeps the Score and tells who is winning via console.log
function totalScore() {
if (ball.x > width) {
  leftPaddleScore += 1;
  console.log("Red won a Point!");
}
if (ball.x < 0) {
  rightPaddleScore += 1;
  console.log("Blue won a Point!")
    }

if (leftPaddleScore === 5 || rightPaddleScore === 5) {
  playing = false
  gameOver = true
}
  }

// displayStartMessage()
//
// Shows a message about how to start the game
function displayStartMessage() {
  push();
  textAlign(CENTER, CENTER);
  fill(0,0,255);
  textSize(32);
  text("WELCOME TO AIR HOCKEY \n First to 5 Points Wins! \n CLICK TO START", width / 2, height / 2);
  pop();
}

//displayGameOver
//
//Shows a message that stops the game and shows which side won
function displayGameOver (){
if (leftPaddleScore === 5) {
push();
textAlign(CENTER, TOP);
fill(171,15,0);
textSize(32);
text("GAME OVER: RED WINS\n Restart to Play Again", width / 2, height / 2);
pop();
}

if (rightPaddleScore === 5) {
push();
textAlign(CENTER, TOP);
fill(0,0,255);
textSize(32);
text("GAME OVER: BLUE WINS\n Restart to Play Again", width / 2, height / 2);
pop();
  }
}
// mousePressed()
//
// Here to require a click to start playing the game
// Which will help us be allowed to play audio in the browser
function mousePressed() {
  playing = true;
  gameOver = false;
}
