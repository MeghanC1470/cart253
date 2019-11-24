// spaceship
//
// A class that represents a simple spaceship
// controlled by the arrow keys. It can move around
// the screen and consume star objects to maintain its health.
// For simplicity, it will be known as a spaceship


class Spaceship {

  // constructor
  //
  // Sets the initial values for the spaceship's properties
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
    this.radius = radius;
    this.healthGainPerEat = 1;
    //The star Counter
    this.starEaten = 0;
    //The Dodge Counter
    this.dodges = 0;
    // Display properties
    this.image = image;
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
  // Checks if an arrow key is pressed and sets the spaceship's
  // velocity appropriately.
  // Additionally sets the shift key to make the spaceship sprint
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
    this.health = constrain(this.health, 0, this.maxHealth);
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the spaceship has gone off the canvas and
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
  // Takes a star object as an argument and checks if the spaceship
  // overlaps it. If so, reduces the star's health and increases
  // the spaceship's. If the star dies, it gets reset.
  handleEating(star) {
    // Calculate distance from this spaceship to the star
    let d = dist(this.x, this.y, star.x, star.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + star.radius) {
      // Increase spaceship health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease star health by the same amount
      star.health -= this.healthGainPerEat;
      // Check if the star died and reset it if so
      if (star.health < 0) {
        star.reset();
      }
    }
  }

//handleHurting
//
// When the tiger comes too close to the lion, it gets attacked and takes damage!
// Takes a meteor object as an argument and checks if the spaceship overlaps it
// If it does, its health depletes
  handleHurting(meteor) {
    let d = dist(this.x, this.y, meteor.x, meteor.y);
    if (d < this.radius + meteor.radius) {
      this.health -= 1;
    }
  }

  handleDodging(){
    // Check if the enemy has moved all the way across the screen
    if (meteor.X > width) {
      // This means the player dodged so update its dodge statistic
      dodges = dodges + 1;
      // Tell them how many dodges they have made
      console.log(dodges + " DODGES!");
      //Reset the enemy's velocity so that it increases after each pass
      meteor.vx = (meteor.vx + 1);
      // Reset the enemy's position to the left at a random height
      meteor.x = 0;
      meteor.y = random(0,height);
      //Reset the enemy's size so that it increases after each pass
      meteor.radius = meteor.radius + 5;
    }
  }


//handleDeath
//
// Checks to see if the spaceship's health has reached zero
// If so, the spaceship is dead, this will be essential to making the Game Over
// function in the Script
  handleDeath() {
    if (this.health <= 0) {
    this.death = true;
    }
  }

  // display
  //
  // Draw the spaceship as a tiger on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    this.radius = this.health;
    imageMode(CENTER);
    if (this.radius > 1) {
    image(this.image,this.x, this.y, this.radius * 2, this.radius * 2);
  }
    pop();
  }
}
