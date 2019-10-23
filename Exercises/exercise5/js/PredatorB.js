class PredatorB {

  // constructor
  //
  // Sets the initial values for the PredatorB's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, fillColor, radius) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity, speed, and sprint
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
    // The Prey Counter
    this.preyEaten = 0;
    // Display properties
    this.fillColor = fillColor;
    this.radius = this.health; // Radius is defined in terms of health
    // Input properties
    this.upKey = 87;
    this.downKey = 83;
    this.leftKey = 65;
    this.rightKey = 68;
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
      // Check if the prey died, let the counter count that death and reset it if so
      if (prey.health < 0) {
        this.preyEaten = this.preyEaten + 1
        //reset
        prey.reset();
      }
    }
  }

  // display
  //
  // Draw the predator as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    fill(this.fillColor);
    strokeWeight(this.preyEaten);
    stroke(0,0,255);
    //Make the square
    this.radius = this.health;
    rectMode(CENTER);
    rect(this.x, this.y, this.radius * 2, this.radius * 2)

    //Display the text to show how much prey has been eaten
    noStroke();
    textAlign(RIGHT,TOP);
    textSize(70);
    textFont('Georgia');
    fill(255, 0, 0);
    text(this.preyEaten,70,100);
    pop();
  }
}
