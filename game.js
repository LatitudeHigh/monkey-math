var square;
var ball;
var pond;
const BALL_RADIUS = 20;

const SQUARE_VELOCITY = 20;

var dx = 4.2;
var dy = 4.2;

var monkeySpeedX = 0;
var monkeySpeedY = 0;

var score = 0;
var scoreLabel;

var accelerateX = false;
var accelerateY = false;
var decelerateX = false;
var decelerateY = false;

function playMusic() {
  var music = new Audio("https://freesound.org/people/maxmakessounds/sounds/353544/");
  music.loop = true;
  music.load();
  music.play();

}

function start(){
// actual start function
    backGround();

    pond = new WebImage("pond.png");
    pond.setSize(50, 50);
    pond.setPosition(600, 350);
    add(pond);
    
    playMusic();
    square = new WebImage("MONKEY.png");
    square.setSize(getWidth()/20, getWidth()/20);
    square.setPosition(30, getHeight() /2);
    add(square);
    
    ball = new WebImage("BANANA.png");
    ball.setSize(getWidth()/20, getWidth()/20)
    ball.setPosition(40, 40);
    add(ball);
    setTimer(play, 2);
    setTimer(updateScore, 250);
    scoreLabel = new Text(score);
    scoreLabel.setPosition(getWidth() - scoreLabel.getWidth(), scoreLabel.getHeight());
    add(scoreLabel);
    keyDownMethod(keyDown);
    keyUpMethod(keyUp);
}

function updateScore() {
    score += 100;
    scoreLabel.setText(score);
    scoreLabel.setPosition(getWidth() - scoreLabel.getWidth(), scoreLabel.getHeight());
}

function drawCircle(r, x, y, color){
    // defines a constant circle.
    var circle = new Circle(r);
    circle.setPosition(x, y);
    circle.setColor(color);
    add(circle);
}

function drawRectangle(w, h, x, y, color) {
    var rect = new Rectangle(w, h);
    rect.setPosition(x, y);
    rect.setColor(color);
    add(rect);
}

function backGround(){
    // create all the colors for the background
    var TREE_TOPS1 = new Color(83, 120, 50)
    var TREE_TOPS2 = new Color(35, 87, 13)
    var TREE_TRUNKZ = new Color(120, 96, 50)
    var CLOUD_GREY = new Color(129, 129, 129)
    var GROUND_BROWN = new Color(24, 71, 0)
    var SKY_BLUE = new Color(154, 179, 179)
    var TREE_TRUNKZ2 = new Color(82, 56, 9)
    var TREE_TRUNKZ3 = new Color(166, 96, 34)
    var TREE_TOPS3 =new Color(70, 85, 14)
    var SUN_YELLOW = new Color(238, 217, 36)

    // adds the green ground rectangle to the canvas
    drawRectangle(getWidth(), getHeight(), 0, 380, GROUND_BROWN)

    // adds the sky to the background
    var skyBackground = new Rectangle(getWidth(), 380);
    skyBackground.setPosition(0, 0);
    skyBackground.setColor(SKY_BLUE);
    add(skyBackground);
    
    // adds the green circles at the top of the trees
    drawCircle
    var circle = new Circle(100);
    circle.setPosition(0, 0);
    circle.setColor(SUN_YELLOW);
    add(circle);
    var circle = new Circle(20);
    circle.setPosition(230, 80);
    circle.setColor(CLOUD_GREY);
    add(circle);
    var circle = new Circle(20);
    circle.setPosition(215, 70);
    circle.setColor(CLOUD_GREY);
    add(circle);
    var circle = new Circle(20);
    circle.setPosition(249, 95);
    circle.setColor(CLOUD_GREY);
    add(circle);
    var circle = new Circle(20);
    circle.setPosition(240, 60);
    circle.setColor(CLOUD_GREY);
    add(circle);
    var rect = new Rectangle(20, 270);
    rect.setPosition(230, 185);
    rect.setColor(TREE_TRUNKZ3);
    add(rect);
    var circle = new Circle(50);
    circle.setPosition(236, 209);
    circle.setColor(TREE_TOPS3);
    add(circle);
    var rect = new Rectangle(20, 260);
    rect.setPosition(180, 150);
    rect.setColor(TREE_TRUNKZ);
    add(rect);
    var circle = new Circle(50);
    circle.setPosition(187, 150);
    circle.setColor(TREE_TOPS1);
    add(circle);
    var rect = new Rectangle(20, 260);
    rect.setPosition(260, 180);
    rect.setColor(TREE_TRUNKZ);
    add(rect);
    var circle = new Circle(50);
    circle.setPosition(266, 186);
    circle.setColor(TREE_TOPS2);
    add(circle);
    var rect = new Rectangle(20, 270);
    rect.setPosition(100, 180);
    rect.setColor(TREE_TRUNKZ2);
    add(rect);
    var circle = new Circle(50);
    circle.setPosition(107, 180);
    circle.setColor(TREE_TOPS2);
    add(circle);
    var rect = new Rectangle(20, 270);
    rect.setPosition(100, 180);
    rect.setColor(TREE_TRUNKZ2);
    add(rect);
    var circle = new Circle(50);
    circle.setPosition(107, 180);
    circle.setColor(TREE_TOPS2);
    add(circle);
    var rect = new Rectangle(20, 270);
    rect.setPosition(50, 190);
    rect.setColor(TREE_TRUNKZ3);
    add(rect);
    var circle = new Circle(50);
    circle.setPosition(56, 190);
    circle.setColor(TREE_TOPS1);
    add(circle);
    var rect = new Rectangle(20, 270);
    rect.setPosition(320, 185);
    rect.setColor(TREE_TRUNKZ3);
    add(rect);
    drawCircle(50, 326, 189, TREE_TOPS1);
    var rect = new Rectangle(20, 230);
    rect.setPosition(360, 205);
    rect.setColor(TREE_TRUNKZ2);
    add(rect);
    drawCircle(60, 368, 230, TREE_TOPS2);
    drawCircle(12, 204, 435, CLOUD_GREY);
    drawCircle(13, 154, 455, CLOUD_GREY);
    drawCircle(12, 390, 455, CLOUD_GREY);
    drawCircle(12, 26, 415, CLOUD_GREY);
}

function keyUp(e) {
  	// makes the keyboard control the squares
    if(e.keyCode == Keyboard.UP) {
          decelerateY = false;
    }
    
    if(e.keyCode == Keyboard.DOWN){
          accelerateY = false;
    }

    if(e.keyCode == Keyboard.LEFT) {
        decelerateX = false;
    }
   
    if(e.keyCode == Keyboard.RIGHT) {
        accelerateX = false;
    }
}

function keyDown(e){
	// makes the keyboard control the squares
    if(e.keyCode == Keyboard.UP) {
          decelerateY = true;
    }
    
    if(e.keyCode == Keyboard.DOWN){
          accelerateY = true;
    }

    if(e.keyCode == Keyboard.LEFT) {
        decelerateX = true;
    }
   
    if(e.keyCode == Keyboard.RIGHT) {
        accelerateX = true;
    }
}

function moveMonkey() {
    if(accelerateX) {
      monkeySpeedX += 0.25;
    }
    if(decelerateX) {
      monkeySpeedX -= 0.25;
    }
    if(accelerateY) {
      monkeySpeedY += 0.25;
    }
    if(decelerateY) {
      monkeySpeedY -= 0.25;
    }
    if(square.getX() <= 0) {
        monkeySpeedX = Math.abs(monkeySpeedX);
    }
    if(square.getX() + square.getWidth() >= getWidth()) {
        monkeySpeedX = -Math.abs(monkeySpeedX);
    }
    if(square.getY() <= 0) {
        monkeySpeedY = Math.abs(monkeySpeedY);
    }
    if(square.getY() + square.getHeight() >= getHeight()) {
        monkeySpeedY = -Math.abs(monkeySpeedY);
    }
    monkeySpeedX *= 0.99;
    monkeySpeedY *= 0.99;
    square.move(monkeySpeedX, monkeySpeedY);
}

function play() {
    // makes the ball move
    isWalls();
    ball.move(dx, dy);
    moveMonkey();
    // collisionCheck();
}


function isWalls() {
    // checks if the ball had come in contact with any of the walls and makes the ball bounce off the walls.
    //bounce of right wall
	if(ball.getX() + ball.getWidth() > getWidth()){
		(dx) = (-dx - .10);
	}
	
	// Bounce off left wall
	if(ball.getX() < 0){
		(dx) = (-dx + .10);
	}
	
	// Bounce off bottom wall
	if(ball.getY() + ball.getHeight() > getHeight()){
		(dy) = (-dy - .10);
	}
	
	// Bounce off top wall
	if(ball.getY() < 0){
		(dy) = (-dy + .10);
	}
}

/* This function simplifies a numerator, denomanitor pair into
 * its simplest form
 * For example
 *   8/2 -> 4
 *   9/3 -> 3
 *   6/8 -> 3/4
 */
function simplifyProblem(int1, int2) {
    var sum = int1 + int2;
    return sum;
}

function askMathQuestion() {
    // this function sets up the math questions that are asked to the user
    int1 = Randomizer.nextInt(1, 100);
    int2 = Randomizer.nextInt(1, 100);
    var response = prompt("if you have " + int1 + " bananas in a pile, and " + int2 + " bananas in a pile how many bananas do you have?");

    var answer = simplifyProblem(int1, int2);
    
    if(response == answer) {
        console.log("CORRECT!");
        return true;
    } else {
        console.log("Oops, the answer is "  + answer);
        return false;
    }
}

function resetSpeed() {
  dx = dy = 4.2;
  monkeySpeedX = monkeySpeedY = 0;
}

function collisionCheck() {
    // this function checks if the ball and square have collided
    var revive = false;
    if(ball.containsPoint(square.getX(), square.getY())) {
        revive = askMathQuestion();
    } else if(ball.containsPoint(square.getX() + 40, square.getY() + 40)) {
        revive = askMathQuestion();
    } else if(ball.containsPoint(square.getX() + 40, square.getY())) {
        revive = askMathQuestion();
    } else if(ball.containsPoint(square.getX(), square.getY() + 40)) {
        revive = askMathQuestion();
    }
    if(revive) {
        ball.setPosition(BALL_RADIUS, BALL_RADIUS)
        resetSpeed();
        setTimer(updateScore, 1000);
    }
}
