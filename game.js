const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let gravity = 0.6;
let jump = -12;
let isJumping = false;
let velocity = 0;

const playerImg = new Image();
playerImg.src = "cuffie.gif";

const obstacleImg = new Image();
obstacleImg.src = "cassa.PNG";

let player = {
  x: 50,
  y: 200,
  width: 40,
  height: 40
};

let obstacles = [];
let frame = 0;

function createObstacle() {
  const minHeight = 30;
  const maxHeight = 60;
  const height = minHeight + Math.random() * (maxHeight - minHeight);
  obstacles.push({
    x: canvas.width,
    y: canvas.height - height,
    width: 40,
    height: height
  });
}

function handleInput() {
  if (!isJumping) {
    velocity = jump;
    isJumping = true;
  }
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") handleInput();
});
document.addEventListener("touchstart", handleInput);

function update() {
  frame++;

  if (frame % Math.floor(120 + Math.random() * 80) === 0) {
    createObstacle();
  }

  velocity += gravity;
  player.y += velocity;

  if (player.y > canvas.height - player.height) {
    player.y = canvas.height - player.height;
    isJumping = false;
  }

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= 6;
  }

  obstacles = obstacles.filter(obs => obs.x + obs.width > 0);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

  for (let obs of obstacles) {
    ctx.drawImage(obstacleImg, obs.x, obs.y, obs.width, obs.height);
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
