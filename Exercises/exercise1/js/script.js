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

//Meghan's Additions
//The current position and size of the triangle
let triangleX;
let triangleY;
let triangleSize = 100;

//The current position and size of the rectangle
let rectangleX;
let rectangleY;
let rectangleSize = 100;

//The Text
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

//Meghan's Additions
  // Start the triangle off screen to the middle left to the right
  triangleX = -100;
  triangleY = height/2;
  triangleSize = 100;

  //Start the Rectangle off screen from the bottom to the top of the screen
  rectangleX = width + -rectangleSize/1;
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

  //Make a yellow circle
  fill(255,255,0);
  //Attach the yellow circle to the mouse's position
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

//Meghan's Additions
  //Move triangle left to right across the middle of the screen
  triangleX +=1;
  //Make the triangle transparent green
  fill(0,255,0,10);
  //Display the triangle
  triangle(triangleX,triangleY,triangleX+triangleSize,triangleY,triangleX+triangleSize/2,triangleY-triangleSize);

  //Move the Rectangle from the bottom to the top of the screen
  rectangleY -= 1;
  //Make the rectangle transparent purple
  fill(138,0,184,10);
  //Display the rectangle
  rect(rectangleX,rectangleY,rectangleSize,rectangleSize);

  //Display the Text on screen
  fill(0);
  textSize(30);
  text(Color, width/2.5, height /2.5);
}
