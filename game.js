const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let gravity = 0.5;
let isJumping = false;

let box = {
  x: 50,
  y: 300,
  w: 40,
  h: 40,
  dy: 0
};

let obstacles = [];
let frame = 0;
let gameOver = false;

function drawBox() {
  ctx.fillStyle = "#8E60F0";
  ctx.fillRect(box.x, box.y, box.w, box.h);
}

function drawObstacles() {
  ctx.fillStyle = "#ffffff";
  obstacles.forEach(ob => ctx.fillRect(ob.x, ob.y, ob.w, ob.h));
}

function updateObstacles() {
  if (frame % 100 === 0) {
    obstacles.push({ x: 800, y: 320, w: 40, h: 40 });
  }
  obstacles.forEach(ob => ob.x -= 5);
  obstacles = obstacles.filter(ob => ob.x + ob.w > 0);
}

function detectCollision() {
  for (let ob of obstacles) {
    if (
      box.x < ob.x + ob.w &&
      box.x + box.w > ob.x &&
      box.y < ob.y + ob.h &&
      box.y + box.h > ob.y
    ) {
      gameOver = true;
    }
  }
}

function update() {
  if (gameOver) return;

  frame++;
  box.dy += gravity;
  box.y += box.dy;

  if (box.y > 300) {
    box.y = 300;
    box.dy = 0;
    isJumping = false;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBox();
  updateObstacles();
  drawObstacles();
  detectCollision();

  requestAnimationFrame(update);
}

document.addEventListener("keydown", function (e) {
  if ((e.code === "Space" || e.code === "ArrowUp") && !isJumping) {
    box.dy = -10;
    isJumping = true;
  }
});

document.addEventListener("touchstart", function () {
  if (!isJumping) {
    box.dy = -10;
    isJumping = true;
  }
});

update();