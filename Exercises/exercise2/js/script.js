/******************************************************

Game - The Artful Dodger
Pippin Barr

A simple dodging game with keyboard controls

******************************************************/

// Our brave hero Bug and our evil enemy Bird
let testbird;
let testbug;

// The position and size of our avatar
let avatarX;
let avatarY;
let avatarSize = 10;

// The speed and velocity of our avatar circle
let avatarSpeed = 10;
let avatarVX = 0;
let avatarVY = 0;

// The position and size of the enemy circle
let enemyX;
let enemyY;
let enemySize = 50;

// The speed and velocity of our enemy circle
let enemySpeed = 10;
let enemyVX = 5;


// How many dodges the player has made
let dodges = 0;

function preload() {

  //Load in the images of the bird and the bug
  testbird = loadImage("assets/images/kTKnrA6pc.png");
  testbug = loadImage("assets/images/Testbug.png");
}

// setup()
//
// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(500,500);

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height,);

  // No stroke so it looks cleaner
  noStroke();
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {

  // A night sky background - all ellipses are stars unless mentioned otherwise
  background (46,80,201);
  fill(255);
  ellipse (120,250,3,3);
  ellipse (50,50,3,3);
  ellipse (300,50,3,3);
  ellipse (60,450,3,3);
  ellipse (300,400,3,3);
  ellipse (450,350,3,3);

  //One special ellipse is our moon
  ellipse (400,100,100,100);
  // To create a crescent moon, add a smaller circle, put it over the Moon, then make it the same color as the sky
  fill (46,80,201);
  ellipse (430,100,90,90);

//Place the image of the bug onto the avatar
  imageMode(CENTER);
  image(testbug,avatarX,avatarY,50,50);
//Place the image of the bird onto the enemy: it will follow its increasing size later
  imageMode(CENTER);
  image(testbird,enemyX,enemyY,enemySize,enemySize);

  // Display the number of successful dodges (the score)
  textAlign(RIGHT,TOP);
  textSize(70);
  textFont('Georgia');
  fill(255);
  text(dodges,width,0);

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;



  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;


  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  //Add a semi-transparent red background if the player reaches a score over 10
  if (dodges > 10) {
    background (255, 81, 71, 100);
  }

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0,height);
    enemySize = 50;
    //Reset the velocity after each hit to the bug
    enemyVX = 5;
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the dodge counter
    dodges = 0;
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    //Reset the enemy's position and size
    enemyX = 0;
    enemyY = random(0,height);
    enemySize = 50;
    //Reset the velocity
    enemyVX = 5;
    //Reset the player's position and dodge counter
    avatarX = width/2;
    avatarY = height/2;
    dodges = 0;
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    //Reset the enemy's velocity so that it increases after each pass
    enemyVX = (enemyVX + 1);
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
    //Reset the enemy's size so that it increases after each pass
    enemySize = enemySize + 5;
  }

  // Display the number of successful dodges in the console
  console.log(dodges);
}
