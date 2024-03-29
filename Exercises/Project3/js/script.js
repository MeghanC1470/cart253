// SPACE DODGERS
//
// by Meghan Cullen
//
// Creates a spaceship, meteors and health-stars
// The spaceship has to get through a field of meteors in order to get home
// The meteors will hit and take down the spaceship, but can be destroyed by
// the Spaceship's laser
// The Health-Stars are special stars that power and repair the spaceship's health

// Whether the game started
let playing = false;
// Whether the game ended
let gameOver = false;
// Whether the player won the game
let win = false;

// Whether our levels have been activated
let levelOne = false; // The first phase of Bronze Meteors
let levelTwo = false; // The second phase of Silver Meteors
let levelTwoInitialized = false;
let levelThree = false; // The third and final phase of Gold Meteors
let levelThreeInitialized = false;

// Our Spaceship
let spaceship;

// The Health-Star
let healthStar;

// The background images
let skyBackground;
let gameStartImage;
let gameOverImage;
let gameWinImage;

// The music and sounds
let spaceMusic;
let laserSound;
let destroySound;

// The font
let spaceFont;

// The Images of the objects
let spaceshipImage;
let bulletImage;
let healthStarImage;
let meteorBronzeImage;
let meteorSilverImage;
let meteorGoldImage;

// The arrays
// One for the number of meteors
let numMeteor = 9;
// One for the Spaceship's lasers
let bullets = [];

// preload
//
// Sets up the images that will serve as the background and characters to the game
// Additionally, sets up the sounds that will play in the game
// As well as font
function preload() {
  skyBackground = loadImage("assets/images/Galaxy.png");

  spaceshipImage = loadImage("assets/images/Ufo.png");
  bulletImage = loadImage("assets/images/laser2.png");
  healthStarImage = loadImage("assets/images/star.png");
  meteorBronzeImage = loadImage("assets/images/MeteorBronze.png");
  meteorSilverImage = loadImage("assets/images/MeteorSilver.png");
  meteorGoldImage = loadImage("assets/images/MeteorGold.png");

  gameStartImage = loadImage("assets/images/GameBeginScreen.png");
  gameOverImage = loadImage("assets/images/GameOverScreen.png");
  gameWinImage = loadImage("assets/images/GameWinScreen.png");

  spaceMusic = loadSound("assets/sounds/SpaceshipMusic.mp3");
  laserSound = loadSound("assets/sounds/Lasersound.wav");
  destroySound = loadSound("assets/sounds/DestroyMeteorSound.wav");

  spaceFont = loadFont("assets/font/SPACEMAN.TTF");
}

// function generateMeteors
//
// Sets up the meteor array and runs a for loop numMeteor times to generate each
// meteor with random values, all inside a function that can be called upon.
// The spaceship's bullets will also be set up in a for loop here as well
function generateMeteors(meteorImage){
  let meteor = [];
for (let i = 0; i < numMeteor; i++) {
  let meteorX = random(0, width);
  let meteorY = random(0, height);
  let meteorSpeed = random(2, 20);
  let meteorRadius = random(10, 60);
  meteor.push(new Meteor(meteorX, meteorY, meteorSpeed, meteorImage, meteorRadius));
    }
  return meteor;
for (var i = 0; i <spaceship.bullets.length; i++){
  spaceship.bullets[i].x += spaceship.bullets[i].vx
  }
}

// setup()
//
// Sets up a canvas
// Creates objects for the spaceship, stars, and meteors
function setup() {
  createCanvas(windowWidth, windowHeight);
  spaceship = new Spaceship(100, 100, 5, spaceshipImage, bulletImage, 40);
  healthStar = new Star(1000, 100, 10, healthStarImage, 50);
// Sets up the music
  spaceMusic.loop();
// The generateMeteors function is called upon and put in with a Bronze Meteor Image
  meteor = generateMeteors(meteorBronzeImage);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
// Set the background to a galaxy scene
  background(skyBackground);
// Check if the game is in play
  if (playing == true) {

// Handle input for the spaceship
  spaceship.handleInput();

// Move all the spaceship and star
  spaceship.move();
  healthStar.move();

// Check if the dodging goal to unlock level two is passed
if (spaceship.dodges >= 30){
  levelTwo = true;
}
// Run level Two with another array of Silver Meteors using .concat.
// .concat is used to join two or more arrays, that way the Bronze Array can run
// alongside the Silver Array. Special thanks to PartyLich on StockOverflow.com
// (https://stackoverflow.com/questions/59217800/javascript-atom-array-problems)
if (levelTwo == true && levelTwoInitialized == false){
    meteor = meteor.concat(generateMeteors(meteorSilverImage));
    levelTwoInitialized = true;
  }

// Check if the second dodging goal to unlock level three is passed
if (spaceship.dodges >= 70){
  levelThree = true;
}
// Run Level Three with third array of Gold Meteors using .concat.
if (levelThree == true && levelThreeInitialized == false){
  meteor = meteor.concat(generateMeteors(meteorGoldImage));
  levelThreeInitialized = true;
}

// Handle the Spaceship consuming the star for health
  spaceship.handleEating(healthStar);

// Handle the Spaceship's lasers
  spaceship.handleBullets();

// Handle the death of the Spaceship
  spaceship.handleDeath();

// Check to see when the game is over
  checkGameOver();

// Display all the objects
  spaceship.display();
  healthStar.display();

// Display the meteor arrays and any actions done to the meteors by the spaceship
// in a for loop, displaying movement, damage by the meteor to the Spaceship,
// checking if the Spaceship dodged the meteor, or if the Spaceship lasers damaged it
for (let i = 0; i < meteor.length; i++) {
  meteor[i].move();
  spaceship.handleHurting(meteor[i]);
  spaceship.handleDodging(meteor[i]);
  spaceship.handleDamage(meteor[i]);
  meteor[i].display();
  if (meteor[i].health <= 0){
  meteor[i].reset();
    }
  }
  // Display the dodge counter on the screen (adapted from Exercise 2)
  textAlign(RIGHT,TOP);
  textSize(100);
  textFont(spaceFont);
  fill(255);
  text(spaceship.dodges,width,0);
}
else {
// Once the player wins the game, display a Win Message
   if (win == true) {
     displayWinMessage();
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
}

// displayStartMessage
//
// Display's the start message, including instructions, at the beginning of the game
function displayStartMessage() {
    push();
    textFont(spaceFont);
    background(gameStartImage);
    textAlign(CENTER,CENTER);
    fill(255);
    textSize(27);
    text(".:WELCOME TO SPACE DODGERS!:.\n \n You must clear 150 Asteroids in order to get home! \n Use WASD to move the Ship! \n Press Enter to Shoot, Shift to Speed up! \n Catch the Star to gain Health! \n \n .:CLICK TO START:.", width / 2, height / 2);
  pop();
  }

// checkGameOver
//
// See if the spaceship died and end the game
function checkGameOver() {
    if (spaceship.death === true) {
      gameOver = true;
      playing = false;
  }
}

// displayGameOver
//
// Display the Game Over message
function displayGameOver() {
    push();
    textFont(spaceFont);
    background(gameOverImage);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0);
    textSize(49);
    text(".:GAME OVER:. \n \n You died! \n Reload to Try Again", width / 2, height / 2);
    pop();
    }

// checkWinGame
//
// See if the player dodged a certain number of meteors and end the game
function checkWinGame(){
    if (spaceship.dodges === 200){
      console.log("win");
      winGame = true;
      playing = false;
      }
    }

// displayWinMessage
//
// Display the Win Message
function displayWinMessage() {
    push();
    textFont(spaceFont);
    background(gameWinImage);
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(49);
    text(".:CONGRATULATIONS!:. \n \n .:| You Got Home Safe! |:. \n .:| Reload to Play Again! |:.", width / 2, height / 2);
    pop();
    }

//mousePressed
//
//Starts the game when the mouse is clicked
function mousePressed() {
    playing = true;
    gameOver = false;
  }
