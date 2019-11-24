
// by Meghan Cullen
//
// Creates a spaceship, meteors and health-stars
// The spaceship has to get through a field of meteors in order to get home
// The meteors will hit and take down the spaceship, with some being able to be
// destoryed while others are invincible
// The Health-Stars are special stars that power and repair the spaceship's health

//Whether the game started
let playing = false;
//Whether the game ended
let gameOver = false;

// Our Spaceship
let spaceship;

// The Health-Star
let healthstar

// The three types of meteors
let meteorBronze;
let meteorSilver;
let meteorGold;

//The background
let skyBackground

//The Images of the characters
let spaceshipImage;
let healthstarImage;
let meteorBronzeImage;
let meteorSilverImage;
let meteorGoldImage;


//The array
// One for the number of meteor meteors
let numMeteor = 2;
let meteor = [];

//preload
//
//Sets up the images that will serve as the background and characters to the game
//Additionally, sets up the sounds that will play in the game
function preload() {
  skyBackground = loadImage("assets/images/nightsky.png");

  spaceshipImage = loadImage("assets/images/Ufo.png");
  healthstarImage = loadImage("assets/images/star.png");
  meteorBronzeImage = loadImage("assets/images/MeteorBronze.png")
  meteorSilverImage = loadImage("assets/images/MeteorSilver.png")
  meteorGoldImage = loadImage("assets/images/MeteorGold.png")
}

// setup()
//
// Sets up a canvas
// Creates objects for the spaceship, stars, and meteors
function setup() {
  createCanvas(windowWidth, windowHeight);
  spaceship = new Spaceship(100, 100, 5, spaceshipImage, 40);
  meteorBronze = new Meteor(100, 2000, 15, meteorBronzeImage, 50);
  meteorSilver = new Meteor(100, 2000, 50, meteorSilverImage, 70);
  meteorGold = new Meteor(100, 2000, 85, meteorGoldImage, 70);
  healthstar = new Star(1000, 100, 10, healthstarImage, 50);


//the Meteor Array
// Run a for loop numstar times to generate each star and put it in the array
// with random values for each star
for (let i = 0; i < numMeteor; i++) {
  let meteorX = random(0, width);
  let meteorY = random(0, height);
  let meteorSpeed = random(2, 20);
  let meteorRadius = random(3, 60);
  meteor.push(new Meteor(meteorX, meteorY, meteorSpeed, meteorBronzeImage, meteorRadius));
  meteor.push(new Meteor(meteorX, meteorY, meteorSpeed, meteorSilverImage, meteorRadius));
  meteor.push(new Meteor(meteorX, meteorY, meteorSpeed, meteorGoldImage, meteorRadius));
}
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
// Set the background to a safari scene
  background(skyBackground);
// Check if the game is in play
  if (playing == true) {

// Handle input for the tiger
  spaceship.handleInput();

// Move all the "animals"
  spaceship.move();
  healthstar.move();
  meteorBronze.move();
  meteorSilver.move();
  meteorGold.move();


// Handle the tiger and lion eating any of the star
  spaceship.handleEating(healthstar);

// Handle the tiger taking damage from the meteor lion
  spaceship.handleHurting(meteorBronze);
  spaceship.handleHurting(meteorSilver);
  spaceship.handleHurting(meteorGold);

// Handle the tragic death of the tiger
  spaceship.handleDeath();

// Check to see when the game is over
  checkGameOver();

// Display all the "animals"
  spaceship.display();
  meteorBronze.display();
  meteorSilver.display();
  meteorGold.display();
  healthstar.display();

// Display and making sure the tiger can eat the copies of the star
for (let i = 0; i < meteor.length; i++) {
meteor[i].move();
meteor[i].display();
spaceship.handleHurting(meteor[i]);
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
}

//displayStartMessage
//
//Display's the start message, including instructions, at the beginning of the game
function displayStartMessage() {
  push();
  textAlign(CENTER, CENTER);
  fill(0, 0, 255);
  textSize(49);
  text("WELCOME TO SPACE DODGERS! \n Use the arrow keys to move! \n Grab the Star for Health and Stay Alive!\n Avoid the Asteroids! \n CLICK TO START", width / 2, height / 2);
  pop();
  }

//checkGameOver
//
//See if the tiger died and end the game
function checkGameOver() {
  if (spaceship.death === true) {
    gameOver = true;
    playing = false;
  }
}

//displayGameOver
//
//Display the Game Over message
  function displayGameOver() {
      push();
      textAlign(CENTER, CENTER);
      fill(128, 17, 0);
      textSize(49);
      text("GAME OVER \n You died! \n Reload to Try Again", width / 2, height / 2);
      pop();
    }

//mousePressed
//
//Starts the game when the mouse is clicked
  function mousePressed() {
    playing = true;
    gameOver = false;
  }
