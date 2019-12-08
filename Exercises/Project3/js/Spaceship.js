// Spaceship
//
// A class that represents a simple spaceship
// controlled by the WASD keys. It can move around
// the screen and consume star objects to maintain its health.
// It can also shoot lasers to destroy the meteors


class Spaceship {

  // constructor
  //
  // Sets the initial values for the spaceship's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, image, imagebullet, radius) {
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
    //The Star Counter
    this.starEaten = 0;
    //The Dodge Counter
    this.dodges = 0;
    //Shooting and Bullets
    this.shootKey = ENTER;
    this.bullets = [];
    // Display properties
    this.image = image;
    this.bulletImage = imagebullet;
    this.death = false;
    // Input properties
    this.upKey = 87;
    this.downKey = 83;
    this.leftKey = 65;
    this.rightKey = 68;
    // the Bullet properties
    this.maxBullets = 10;
    this.bulletCoolDown = 0;
    this.bulletCoolDownMax = 20;
    // the Death
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

// The bullet cooldown determines when the spaceship can fire again
  this.bulletCoolDown -= 0;
// Constrain the bullet cooldown to avoid weird numbers
  this.bulletCoolDown = constrain(this.bulletCoolDown - 1, 0, this.bulletCoolDownMax)
// Check if the shoot key is pressed and the cooldown is back to zero so you can fire again
  if (keyIsDown(this.shootKey) && this.bulletCoolDown === 0) {
    laserSound.play();
// Create a bullet as an object with position and velocity
  var newBullet = {
// Bullets must start at the location of the spaceship
    x: this.x,
    y: this.y,
    vx: this.normalSpeed,
    radius: 20
  }
// Add the bullet to the bullets array of the spaceship
  this.bullets.push(newBullet);
// Set the cooldown to max so it can start counting down
  this.bulletCoolDown = this.bulletCoolDownMax;
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
// When the Spaceship comes too close to the meteor, it takes damage!
// Takes a meteor object as an argument and checks if the spaceship overlaps it
// If it does, its health depletes
  handleHurting(meteor) {
    let d = dist(this.x, this.y, meteor.x, meteor.y);
    if (d < this.radius + meteor.radius) {
      this.health -= 1;
    }
  }

//handleDodging
//
// Checks to see if the spaceship flew past the meteor and avoided
  handleDodging(meteor){
    // Check if the enemy has moved all the way across the screen
    if (meteor.x < 0) {
      // This means the player dodged so update its dodge statistic
      this.dodges = this.dodges + 1;
      // Tell them how many dodges they have made
      console.log(this.dodges + " DODGES!");
      // Reset the enemy's position to the left at a random height
      meteor.x = width;
      meteor.y = random(0,height);
    if (this.dodges >= 150){
      win = true;
      playing = false;
      displayWinMessage();
    }
    }
  }

// handleBullets
//
// Run a for loop to go through all the bullets in the spaceship and Update
// the position based on velocity
  handleBullets(){
for (var i = 0; i <this.bullets.length; i++){
  this.bullets[i].x += this.bullets[i].vx
  }
}

//handleDamage(meteor)
//
// Runs a for loop that goes through all the bullets, checks if they overlap
// with the meteors, and thus destroy the meteors accordingly
handleDamage(meteor){
  for (var i = 0; i <this.bullets.length; i++){
    // Check if the bullet and meteor overlap
  let d = dist(this.bullets[i].x, this.bullets[i].y, meteor.x, meteor.y);
    if (d < this.bullets[i].radius + meteor.radius) {
      destroySound.play();
    // If they do, decrease the health of the meteor
    // Additionally, the laser has lost it's damaging power
      meteor.health -= 3;
      this.bullets[i].radius -= 10;
    // Constrain the meteor's health to avoid it becoming negative
      meteor.health = constrain(meteor.health, 0, meteor.maxHealth);
    // Reset the meteor once it's been destroyed
        if (meteor.health < 0) {
          meteor.reset();
      }
    }
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
  // Draw the spaceship on the canvas
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
    // draw the bullets all together in the array
    for (var i = 0; i <this.bullets.length; i++){
      image(this.bulletImage, this.bullets[i].x, this.bullets[i].y, this.bullets[i].radius * 2, this.bullets[i].radius * 2);
    }
  }
}
