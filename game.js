`qvar square, banana;
var ball;
var pond;
const BALL_RADIUS = 20;

const SQUARE_VELOCITY = 20;

var dx = 4.2;
var dy = 4.2;

// add velocities for banana

var monkeySpeedX = 0;
var monkeySpeedY = 0;

var score = 0;
var scoreLabel;

var accelerateX = false;
var accelerateY = false;
var decelerateX = false;
var decelerateY = false;

var homescreen = true;



function startGame() {
    if (homescreen) {
        homescreen = false;
        pond = new WebImage("background.png");
        pond.setSize(getWidth(), getHeight());
        pond.setPosition(0, 0);
        add(pond);

        square = new WebImage("MONKEY.png");
        square.setSize(getWidth() / 20, getWidth() / 20);
        square.setPosition(30, getHeight() / 2);
        add(square);

        banana = new WebImage("BANANA.png");
        banana.setSize(getWidth() / 20, getWidth() / 20);
        banana.setPosition(getWidth() - 50, 70)

        ball = new WebImage("BANANA.png");
        ball.setSize(getWidth() / 20, getWidth() / 20)
        ball.setPosition(40, 40);
        add(ball);
        
        setTimer(play, 2);
        setTimer(updateScore, 250);
        scoreLabel = new Text(score);
        scoreLabel.setPosition(getWidth() - scoreLabel.getWidth(), scoreLabel.getHeight());
        add(scoreLabel);
        keyDownMethod(keyDown);
        keyUpMethod(keyUp);
        var song = new Audio("05 Unused Song (1).mp3");

        // Play the song
        song.play();
        song.loop = true

        playMusic();
    }
}

function backGround() {
    stone = new WebImage("startscreen.png")
    stone.setSize(getWidth(), getHeight());
    stone.setPosition(0, 0);
    add(stone);
}

function start() {
    // actual start function
    backGround();
    mouseClickMethod(startGame);
}

function updateScore() {
    score += 100;
    scoreLabel.setText(score);
    scoreLabel.setPosition(getWidth() - scoreLabel.getWidth(), scoreLabel.getHeight());
}

function drawCircle(r, x, y, color) {
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



function keyUp(e) {
    // makes the keyboard control the squares
    if (e.keyCode == Keyboard.UP) {
        decelerateY = false;
    }

    if (e.keyCode == Keyboard.DOWN) {
        accelerateY = false;
    }

    if (e.keyCode == Keyboard.LEFT) {
        decelerateX = false;
    }

    if (e.keyCode == Keyboard.RIGHT) {
        accelerateX = false;
    }
}

function keyDown(e) {
    // makes the keyboard control the squares
    if (e.keyCode == Keyboard.UP) {
        decelerateY = true;
    }

    if (e.keyCode == Keyboard.DOWN) {
        accelerateY = true;
    }

    if (e.keyCode == Keyboard.LEFT) {
        decelerateX = true;
    }

    if (e.keyCode == Keyboard.RIGHT) {
        accelerateX = true;
    }
}

function moveMonkey() {
    if (accelerateX) {
        monkeySpeedX += 0.3;
    }
    if (decelerateX) {
        monkeySpeedX -= 0.3;
    }
    if (accelerateY) {
        monkeySpeedY += 0.3;
    }
    if (decelerateY) {
        monkeySpeedY -= 0.3;
    }
    if (square.getX() <= 0) {
        monkeySpeedX = Math.abs(monkeySpeedX);
    }
    if (square.getX() + square.getWidth() >= getWidth()) {
        monkeySpeedX = -Math.abs(monkeySpeedX);
    }
    if (square.getY() <= 0) {
        monkeySpeedY = Math.abs(monkeySpeedY);
    }
    if (square.getY() + square.getHeight() >= getHeight()) {
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
    collisionCheck(ball);
}


function isWalls() {
    // checks if the ball had come in contact with any of the walls and makes the ball bounce off the walls.
    //bounce of right wall
    if (ball.getX() + ball.getWidth() > getWidth()) {
        (dx) = (-dx - .15);
    }

    // Bounce off left wall
    if (ball.getX() < 0) {
        (dx) = (-dx + .15);
    }

    // Bounce off bottom wall
    if (ball.getY() + ball.getHeight() > getHeight()) {
        (dy) = (-dy - .15);
    }

    // Bounce off top wall
    if (ball.getY() < 0) {
        (dy) = (-dy + .15);
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

    if (response == answer) {
        console.log("CORRECT!");
        return true;
    } else {
        console.log("Oops, the answer is " + answer);
        return false;
    }
}

function resetSpeed() {
    dx = dy = 4.2;
    monkeySpeedX = monkeySpeedY = 0;
}

function collisionCheck(banana) {
    // this function checks if the ball and square have collided
    var revive = false;
    if (banana.containsPoint(square.getX(), square.getY())) {
        revive = askMathQuestion();
    } else if (banana.containsPoint(square.getX() + 40, square.getY() + 40)) {
        revive = askMathQuestion();
    } else if (banana.containsPoint(square.getX() + 40, square.getY())) {
        revive = askMathQuestion();
    } else if (banana.containsPoint(square.getX(), square.getY() + 40)) {
        revive = askMathQuestion();
    }
    if (revive) {
        accelerateX = false;
        accelerateY = false;
        decelerateX = false;
        decelerateY = false;
        banana.setPosition(BALL_RADIUS, BALL_RADIUS)
        resetSpeed();
        setTimer(updateScore, 1000);
        score = 0;
    }
}
