// Predator
//
// A class that represents a simple predator
// controlled by the arrow keys. It can move around
// the screen and consume Prey objects to maintain its health.


class Predator {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, image, radius) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity, speed and Sprint Speed
    this.vx = 0;
    this.vy = 0;
    this.normalSpeed = speed;
    this.sprintSpeed = speed + 5;
    this.currentSpeed = this.normalSpeed;
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 0.1;
    this.healthGainPerEat = 1;
    //The Prey Counter
    this.preyEaten = 0;
    // Display properties
    this.image = image;
    this.radius = this.health; // Radius is defined in terms of health
    this.death = false;
    // Input properties
    this.upKey = UP_ARROW;
    this.downKey = DOWN_ARROW;
    this.leftKey = LEFT_ARROW;
    this.rightKey = RIGHT_ARROW;

    this.gameOver;
  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the predator's
  // velocity appropriately.
  // Additionally sets the shift key to make the Predator sprint
  handleInput() {
    if (keyIsDown(SHIFT)) {
      this.currentSpeed = this.sprintSpeed;
    }
    else {
      this.currentSpeed = this.normalSpeed;
  }
    // Horizontal movement
    if (keyIsDown(this.leftKey)) {
      this.vx = -this.currentSpeed;
    }
    else if (keyIsDown(this.rightKey)) {
      this.vx = this.currentSpeed;
    }
    else {
      this.vx = 0;
    }
    // Vertical movement
    if (keyIsDown(this.upKey)) {
      this.vy = -this.currentSpeed;
    }
    else if (keyIsDown(this.downKey)) {
      this.vy = this.currentSpeed;
    }
    else {
      this.vy = 0;
    }
  }


  // move
  //
  // Updates the position according to velocity
  // Lowers health (as a cost of living)
  // Handles wrapping
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update health
    this.health = this.health - this.healthLossPerMove;
    this.health = constrain(this.health, 0, this.maxHealth);
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the predator has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    }
    else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    }
    else if (this.y > height) {
      this.y -= height;
    }
  }

  // handleEating
  //
  // Takes a Prey object as an argument and checks if the predator
  // overlaps it. If so, reduces the prey's health and increases
  // the predator's. If the prey dies, it gets reset.
  handleEating(prey) {
    // Calculate distance from this predator to the prey
    let d = dist(this.x, this.y, prey.x, prey.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + prey.radius) {
      // Increase predator health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease prey health by the same amount
      prey.health -= this.healthGainPerEat;
      // Check if the prey died and reset it if so
      if (prey.health < 0) {
        prey.reset();
      }
    }
  }

//handleHurting
//
// When the tiger comes too close to the lion, it gets attacked and takes damage!
// Takes a Enemy object as an argument and checks if the predator overlaps it
// If it does, its health depletes
  handleHurting(enemy) {
    let d = dist(this.x, this.y, enemy.x, enemy.y);
    if (d < this.radius + enemy.radius) {
      this.health -= 3;
    }
  }

//handleDeath
//
// Checks to see if the predator's health has reached zero
// If so, the predator is dead, this will be essential to making the Game Over
// function in the Script
  handleDeath() {
    if (this.health <= 0) {
    this.death = true;
    }
  }

  // display
  //
  // Draw the predator as a tiger on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    this.radius = this.health;
    imageMode(CENTER);
    if(this.radius > 1) {
      image(this.image,this.x, this.y, this.radius * 3, this.radius * 3);
    }
    pop();
  }
}
