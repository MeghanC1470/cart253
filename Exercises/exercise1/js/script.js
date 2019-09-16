// Exercise 1 - Movement
// Pippin Barr
//
// Starter code for exercise 1.
// Draws a moving square and circle that intersect
// in the middle of the canvas.

// The current position and size of the circle
let circleX;
let circleY;
let circleSize = 100;

// The current position and size of the square
let squareX;
let squareY;
let squareSize = 100;

//The current position and size of the triangle
let triangleX;
let triangleY;
let triangleSize = 100;

//The current position and size of the Purple rectangle
let rectangleX;
let rectangleY;
let rectangleSize = 100;

//The current position and size of the Text
let Color = "What a Colorful World!";




// preload()
//
// Nothing here

function preload() {

}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);
  fill(255,0,0);
  stroke(100,0,0);

  // Start the circle off screen to the bottom left
  // We divide the size by two because we're drawing from the center
  circleX = -circleSize/2;
  circleY = height + circleSize/2;

  // Start the square off screen to the bottom right
  // We divide the size by two because we're drawing from the center
  squareX = width + squareSize/2;
  squareY = height + squareSize/2;

  // Start the triangle off screen to the middle left to the right
  triangleX = -100;
  triangleY = height/2;
  triangleSize = 100;

  //Purple Rectangle Moving up from the bottom of the screen to the top
  rectangleX = width + -rectangleSize/1
  rectangleY = height + rectangleSize/1;


  // We'll draw rectangles from the center
  rectMode(CENTER);
  // We won't have a stroke in this
  noStroke();
}


// draw()
//
// Change the circle and square's positions so they move
// Draw the circle and square on screen

function draw() {
  // We don't fill the background so we get a drawing effect

  //Set up the circle that will be attached to the mouse
  fill(255,255,0);
  ellipse(mouseX,mouseY,25,25);

  // Move circle up and to the right
  circleX += 1;
  circleY -= 1;
  // Make the circle transparent red
  fill(255,0,0,10);
  // Display the circle
  ellipse(circleX,circleY,circleSize,circleSize);

  // Move square up and to the left
  squareX -= 1;
  squareY -= 1;
  // Make the square transparent blue
  fill(0,0,255,10);
  // Display the square
rect(squareX,squareY,squareSize,squareSize);

  //Move triangle left to right across the middle
  triangleX +=1;
  //Make the triangle transparent green
  fill(0,255,0,10);
  //Display the triangle
  triangle(triangleX,triangleY,triangleX+triangleSize,triangleY,triangleX+triangleSize/2,triangleY-triangleSize);

  //Purple Square Moving up
  rectangleY -= 1;
  rectangleX -= 1;
  //Make the rectangle purple
  fill(138,0,184,10);
  //Display the rectangle
  rect(rectangleX,rectangleY,rectangleSize,rectangleSize);

  //Text
  fill(0);
  textSize(30);
  text(Color, width/2.5, height /2.5);
}
