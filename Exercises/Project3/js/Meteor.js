// meteor
//
// A class that represents an meteor that moves freely.
// While it can consume star, it can also deplete the
// spaceship's health if they get too close.


class Meteor {

  // constructor
  //
  // Sets the initial values for the meteor's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, image, radius) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity, speed and Sprint Speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    this.tx = random(0, 1000); // To make x and y noise different
    this.ty = random(0, 1000); // we use random starting values
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    // Display properties
    this.image = image;
    this.radius = this.health; // Radius is defined in terms of health
  }

  // move
  //
  // Sets velocity based on the noise() function and the meteor's speed
  // Moves based on the resulting velocity and handles wrapping
  move() {
    // Set velocity via noise()
    this.vx = -5, -this.speed, this.speed;
    // Update position
    this.x += this.vx;
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the meteor has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
      this.y = random(0,height);
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

  // display
  //
  // Draw the meteor as a lion on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    this.radius = this.health;
    imageMode(CENTER);
    image(this.image,this.x, this.y, this.radius * 3, this.radius * 3);
    pop();
  }
}
