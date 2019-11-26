
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

let levelOne = false;
let levelTwo = false;
let levelThree = false;

// Our Spaceship
let spaceship;

// The Health-Star
let healthStar

// The three types of meteors
let meteorBronze;
let meteorSilver;
let meteorGold;

//The background
let skyBackground

//The Images of the characters
let spaceshipImage;
let bulletImage;
let healthStarImage;
let meteorBronzeImage;
let meteorSilverImage;
let meteorGoldImage;


//The array
// One for the number of meteor meteors
let numMeteor = 5;
let meteor = [];

//preload
//
//Sets up the images that will serve as the background and characters to the game
//Additionally, sets up the sounds that will play in the game
function preload() {
  skyBackground = loadImage("assets/images/Galaxy.png");

  spaceshipImage = loadImage("assets/images/Ufo.png");
  bulletImage = loadImage("assets/images/laser2.png");
  healthStarImage = loadImage("assets/images/star.png");
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
  spaceship = new Spaceship(100, 100, 5, spaceshipImage, bulletImage, 40);
  healthStar = new Star(1000, 100, 10, healthStarImage, 50);


//the Meteor Array
// Run a for loop numMeteor times to generate each meteor and put it in the array
// with random values for each star
for (let i = 0; i < numMeteor; i++) {
  let meteorX = random(0, width);
  let meteorY = random(0, height);
  let meteorSpeed = random(2, 20);
  let meteorRadius = random(10, 60);
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
  healthStar.move();

//DODGES
if (playing == true){
  levelOne = true;
}

if (levelOne = true){
  meteor = [];
  for (let i = 0; i < numMeteor; i++) {
    let meteorX = random(0, width);
    let meteorY = random(0, height);
    let meteorSpeed = random(2, 20);
    let meteorRadius = random(10, 60);
    meteor.push(new Meteor(meteorX, meteorY, meteorSpeed, meteorBronzeImage, meteorRadius));
}

if (spaceship.dodges >= 5 && levelOne == true){
  levelTwo = true;
}

// meteor
if (spaceship.dodges < 50){
  //lvl 2
  if (levelTwo == true){
    meteor = [];
    for (let i = 0; i < numMeteor; i++) {
      let meteorX = random(0, width);
      let meteorY = random(0, height);
      let meteorSpeed = random(2, 20);
      let meteorRadius = random(10, 60);
      meteor.push(new Meteor(meteorX, meteorY, meteorSpeed, meteorBronzeImage, meteorRadius));
      meteor.push(new Meteor(meteorX, meteorY, meteorSpeed, meteorSilverImage, meteorRadius));
  }
}

if (spaceship.dodges >= 8 && levelTwo == true){
  levelThree = true;
}
if (levelThree == true){
  meteor = [];
      for (let i = 0; i < numMeteor; i++) {
      let meteorX = random(0, width);
      let meteorY = random(0, height);
      let meteorSpeed = random(2, 20);
      let meteorRadius = random(10, 60);
      meteor.push(new Meteor(meteorX, meteorY, meteorSpeed, meteorBronzeImage, meteorRadius));
      meteor.push(new Meteor(meteorX, meteorY, meteorSpeed, meteorSilverImage, meteorRadius));
      meteor.push(new Meteor(meteorX, meteorY, meteorSpeed, meteorGoldImage, meteorRadius));
}
}

// Handle the tiger and lion eating any of the star
  spaceship.handleEating(healthStar);

  //
  spaceship.handleBullets();

// Handle the tragic death of the tiger
  spaceship.handleDeath();

// Check to see when the game is over
  checkGameOver();

// Display all the "animals"
  spaceship.display();
  healthStar.display();

// Display and making sure the tiger can eat the copies of the star
for (let i = 0; i < meteor.length; i++) {
meteor[i].move();
meteor[i].display();
spaceship.handleHurting(meteor[i]);
spaceship.handleDodging(meteor[i]);
}
 }
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
