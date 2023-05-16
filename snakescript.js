// Following variables set up the board for the game
var blockSize = 25;
var totalRows = 17;
var totalCols = 17;
var board;
var context;

// Creates an object for the snake to store where its body parts are
var snake = {
    x: blockSize * 5,
    y: blockSize * 5,
    body: [],
    speedX: 0,
    speedY: 0
};

// Creates a object to store where the food is
var food = {
    x: 0,
    y: 0
};

// Creates boolean value to check if the game is active
var gameOver = false;

// Sets up the game when the window is loaded
window.onload = function() {
    board = document.getElementById("board");
    board.height = totalRows * blockSize;
    board.width = totalCols * blockSize;
    context = board.getContext("2d");

    generateFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000 / 10);
};

// Will run continously
function update() {
    if (gameOver) {
      return;
    }

    // Runs the functions that make up different aspects of the game
    moveSnake();
    checkCollision();
    clearBoard();
    drawFood();
    drawSnake();
}

// Checks for inputs then moves the snake objects accordingly
function moveSnake() {
    snake.x += snake.speedX * blockSize;
    snake.y += snake.speedY * blockSize;

    var newHead = { x: snake.x, y: snake.y };
    snake.body.unshift(newHead);

    if (snake.x === food.x && snake.y === food.y)
    {
      generateFood();
    }
    else
    {
      snake.body.pop();
    }
}

// Checks to see if snake is colliding with a boarder to end game, (currently disabled snake self collisions because its broken)
function checkCollision() {
    if (
      snake.x < 0 ||
      snake.x >= totalCols * blockSize ||
      snake.y < 0 ||
      snake.y >= totalRows * blockSize //||
      //isSnakeCollision()
    )
    {
      gameOver = true;
      alert("Game Over, reload to replay");
    }
  }

// Function not currently used, but is here for possible later implementation
function isSnakeCollision() {
    for (var i = 0; i < snake.body.length; i++) {
      if (snake.x === snake.body[i].x && snake.y === snake.body[i].y)
      {
        return true;
      }
    }

    return false;
}

// Clears the game window
function clearBoard() {
    context.fillStyle = "purple";
    context.fillRect(0, 0, board.width, board.height);
}

// Draws the food
function drawFood() {
    context.fillStyle = "yellow";
    context.fillRect(food.x, food.y, blockSize, blockSize);
}

// Draws the snake
function drawSnake() {
    context.fillStyle = "white";
    context.fillRect(snake.x, snake.y, blockSize, blockSize);

    for (var i = 0; i < snake.body.length; i++)
    {
      context.fillRect(
        snake.body[i].x,
        snake.body[i].y,
        blockSize,
        blockSize
      );
    }
}

// Changes the direction of the snake if input is sensed
function changeDirection(e) {
    if (e.code === "ArrowUp" && snake.speedY !== 1)
    {
      snake.speedX = 0;
      snake.speedY = -1;
    }
    else if (e.code === "ArrowDown" && snake.speedY !== -1)
    {
      snake.speedX = 0;
      snake.speedY = 1;
    }
    else if (e.code === "ArrowLeft" && snake.speedX !== 1)
    {
      snake.speedX = -1;
      snake.speedY = 0;
    }
    else if (e.code === "ArrowRight" && snake.speedX !== -1)
    {
      snake.speedX = 1;
      snake.speedY = 0;
    }
}

// Generates a new location for the food (only used when food is eaten)
function generateFood() {
    food.x = Math.floor(Math.random() * totalCols) * blockSize;
    food.y = Math.floor(Math.random() * totalRows) * blockSize;
}
