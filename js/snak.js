

var canvas;
var ctx;

var head;
var apple;
var ball;

var dots;
var apple_x;
var apple_y;

var leftDirection = false;
var rightDirection = true;
var upDirection = false;
var downDirection = false;
var inGame = true;    

var zoom = 1;

const DOT_SIZE = 10;
const ALL_DOTS = 900;
const MAX_RAND = 29;
const DELAY = 140;
const C_HEIGHT = 600;
const C_WIDTH = 600;    

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

var x = new Array(ALL_DOTS);
var y = new Array(ALL_DOTS);   


function init() {
    canvas = document.createElement('canvas')
    canvas.width = 600;
    canvas.height = 600;
    document.body.appendChild(canvas);
    //create canvas element
    ctx = canvas.getContext('2d');

    loadImages();
    createSnake();
    locateApple();
    setTimeout("gameCycle()", DELAY);
}    

const loadImages = _ => {
    head = new Image();
    head.src = 'head.png';    
    
    ball = new Image();
    ball.src = 'dot.png'; 
    
    apple = new Image();
    apple.src = 'apple.png'; 
}

const createSnake = _ => {
    dots = 3;

    for (var z = 0; z < dots; z++) {
        x[z] = 50 - z * 10;
        y[z] = 50;
    }
}

function checkApple() {
    if ((x[0] == apple_x) && (y[0] == apple_y)) {
        dots++;
        locateApple();
    }
}    

const doDrawing = _ => {
    
    ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);
    
    if (inGame) {
        ctx.drawImage(apple, apple_x, apple_y);

        for (var z = 0; z < dots; z++) {
            (z == 0) ? ctx.drawImage(head, x[z], y[z]) : ctx.drawImage(ball, x[z], y[z]);
        }
    } else {
        gameOver();
    }        
}

const gameOver = _ => {
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle'; 
    ctx.textAlign = 'center'; 
    ctx.font = 'normal bold 18px serif';
    
    ctx.fillText('Game over', C_WIDTH/2, C_HEIGHT/2);
}

function checkApple() {
    if ((x[0] == apple_x) && (y[0] == apple_y)) {
        dots++;
        console.log('e')
        locateApple();
    }
}

const move = _ => {

    for (var z = dots; z > 0; z--) {
        x[z] = x[(z - 1)];
        y[z] = y[(z - 1)];
    }

    if (leftDirection) {
        x[0] -= DOT_SIZE;
    }

    if (rightDirection) {
        x[0] += DOT_SIZE;
    }

    if (upDirection) {
        y[0] -= DOT_SIZE;
    }

    if (downDirection) {
        y[0] += DOT_SIZE;
    }
}    

const checkCollision = _ => {

    for (var z = dots; z > 0; z--) {

        if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z])) {
            inGame = false;
        }
    }

    if (y[0] >= C_HEIGHT) {
        inGame = false;
    }

    if (y[0] < 0) {
       inGame = false;
    }

    if (x[0] >= C_WIDTH) {
      inGame = false;
    }

    if (x[0] < 0) {
      inGame = false;
    }
}

const locateApple = _ => {

    var r = Math.floor(Math.random() * MAX_RAND);
    apple_x = r * DOT_SIZE;

    r = Math.floor(Math.random() * MAX_RAND);
    apple_y = r * DOT_SIZE;
}    

const gameCycle = _ => {
    
    if (inGame) {

        checkApple();
        checkCollision();
        move();
        doDrawing();
        setTimeout("gameCycle()", DELAY);
    }
}

onkeydown = function(e) {
    var key = e.keyCode;
    
    if ((key == LEFT_KEY) && (!rightDirection)) {
        leftDirection = true;
        upDirection = false;
        downDirection = false;
    } else if ((key == RIGHT_KEY) && (!leftDirection)) {
        rightDirection = true;
        upDirection = false;
        downDirection = false;
    } else if ((key == UP_KEY) && (!downDirection)) {
        upDirection = true;
        rightDirection = false;
        leftDirection = false;
    } else if ((key == DOWN_KEY) && (!upDirection)) {
        downDirection = true;
        rightDirection = false;
        leftDirection = false;
    } else if (e.key == '+') {
        zoom += 0.1;
        canvas.style.transform = `translate(-50%, 50%) scale(${zoom})`
    } else if (e.key == '-' || e.key == '-') {
        zoom -= 0.1;
        canvas.style.transform = `translate(-50%, 50%) scale(${zoom})`
    }
};

