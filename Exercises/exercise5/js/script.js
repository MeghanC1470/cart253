// Predator-Prey Simulation
// by Meghan Cullen
//
// Creates two predators and three prey (of different sizes and speeds)
// The predators chase the prey using the arrow and WASD keys and consumes them.
// The predators lose health over time, so they must keep eating to survive.

// Our predators
let tiger;
let lion;

// The three prey
let antelope;
let zebra;
let bee;

// setup()
//
// Sets up a canvas
// Creates objects for the two predators and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(100, 100, 5, color(200, 200, 0), 40);
  lion = new PredatorB(100, 200, 5, color(255,0,0), 40);
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0);

  // Handle input for the tiger and lion
  tiger.handleInput();
  lion.handleInput();

  // Move all the "animals"
  tiger.move();
  lion.move();
  antelope.move();
  zebra.move();
  bee.move();


  // Handle the tiger eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);
  // Handle the lion eating any of the prey
  lion.handleEating(antelope);
  lion.handleEating(zebra);
  lion.handleEating(bee);

  // Display all the "animals"
  tiger.display();
  lion.display();
  antelope.display();
  zebra.display();
  bee.display();
}
