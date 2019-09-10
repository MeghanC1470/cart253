// Exercise 0 - Spiritual Self-Portrait
// Meghan Cullen
// 04 September 2019
//
// Uses p5's set of shape and colour functions to draw a head and body
// Wearing my favorite black sweater and crossing my eyes, a trait of Meghan that is familiar and unique


// setup()
//
// Draws a beautiful face on the canvas and puts hair and a sweater on it!

function setup() {

  // Set up the canvas and makes the background into a green colour - Meghan's favorite color

  createCanvas(500,500);
  noStroke();
  background(0,190,0);
  fill(0,220,0);
  rect(50,50,400,400);
  fill(0,260,0)
  rect(100,100,300,300);

//Creating the Hair in the Back of the head using Ellipses
noStroke();
fill(89,40,0)
ellipse(180,300,100,300)
ellipse(320,300,100,300)

//Creating the Body and Sweater
  noStroke();
  fill(0,0,0);
  ellipse(250,500,300,400);
  fill(255,216,191);

  //Creating the Head and Round Cheeks
  ellipseMode(CENTER);
  ellipse(250,250,200,200);
  ellipse(220,290,150,150);
  ellipse(280,290,150,150);

  //One last step: Creating the Sweater Collar
  fill(0,0,0);
  ellipse(250,356,250,50);

//Creating the Hair over my face
  fill(89,40,0)
  ellipse(250,170,185,70)

  // Draw the beautiful long eyelashes

  stroke(0);
  line(190,230,160,230)
  line(190,230,160,220)
  line(290,230,340,230)
  line(290,230,340,220)

  // Draw the white backgrounds of the eyes
  noStroke();
  fill(255);
  ellipse(200,225,50,50);
  ellipse(300,225,50,50);


  // Draw the pupils, making them green like the real Meghan! And crossed, a unique little quirk of Meghan :)
  fill(0,97,13);
  noStroke();
  ellipse(215,225,20,20);
  ellipse(300,225,20,20);

  // Draw the nose

  // Nose colour
  fill(255,175,135);

  //Triangle as the nose
  triangle(250,230,230,290,270,290);

  // Creating A lovely smile!
  //Create the teeth and lip - never a fan of make-up, so thin lip!
  fill(255);
  stroke(255,120,120);

  //Creating the curved smile
  curve(250,200,300,310,200,310,100,100);

}

// draw()
//
// Does nothing.

function draw() {
  // Nothing here for now.
}
