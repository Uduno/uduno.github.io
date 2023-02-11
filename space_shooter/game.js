let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
ctx.imageSmoothingEnabled = false;

const h = cnv.height;
const w = cnv.width;

let x = w / 2;
let y = h;

let bg = new Image();
bg.src = "img/back.jpg";
let v = new Image();
v.src = "img/vaisseau.png";

class Player {
  constructor() {
    this.x = w / 2;
    this.y = h - 80;
    this.pv = 3;
    this.score = 0;
    this.dgt = 1;
    this.w = 50;
    this.h = 80;
  }
  drawPlayer() {
    ctx.beginPath();
    ctx.drawImage(v, this.x, this.y, this.w, this.h);
    ctx.closePath();
  }
}

function move(player) {
  let rect = cnv.getBoundingClientRect();
  function isTouchDevice() {
    return (
      true ==
      ("ontouchstart" in window ||
        (window.DocumentTouch && document instanceof DocumentTouch))
    );
  }
  if (isTouchDevice() === true) {
    document.ontouchmove = (event) => {
      player.x = event.touches[0].clientX;
      player.y = event.touches[0].clientY;
    };
  } else {
    cnv.addEventListener("mousemove", (e) => {
      player.x = e.clientX - rect.left;
      player.y = e.clientY - rect.top;
    });
  }
}

function score(player) {
  ctx.beginPath();
  ctx.font = '30px pixel';
  ctx.fillStyle = "white";
  ctx.fillText('Score: ' + player.score, 50, h - 50);
  ctx.closePath();
}

function drawPv(player) {
  for (let i = player.pv; i > 0; i--) {
    ctx.beginPath();
    ctx.drawImage(v, w - (i * 35), h - 60, 30, 40);
    ctx.closePath();
  }
}

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 15;
    this.h = 15;
  }

  drawBullet() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.w, this.h);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + 15);
    ctx.lineTo(this.x + 7.5, this.y + 30);
    ctx.lineTo(this.x + 15, this.y + 15);
    ctx.lineTo(this.x, this.y + 15);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
  }
}

let bullets = [];
function shoot(player) {
  let bullet = new Bullet(player.x + 15, player.y - 15);
  bullets.push(bullet);
}
function drawBullets() {
  for (let index = 0; index < bullets.length; index++) {
    if (bullets[index].y < 0) {
      bullets.splice(index, 1);
    }

    for (let i = 0; i < ennemis.length; i++) {
      //console.log(verify_contact(bullets[i],ennemis[i]))
      if (isColliding(bullets[index], ennemis[i])) {
        bullets.splice(i, 1);
        if (ennemis[i].pv != 0) {
          ennemis[i].pv = ennemis[i].pv - 1;
          if (bullets[index] != undefined) { bullets.splice(i, 1); }
        }
        break;
      }
    }
    if (bullets[index] != undefined) {
      bullets[index].drawBullet();
      bullets[index].y -= 30;
    }

  }
}

class Ennemi {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.centerx = this.x;
    this.centery = this.y;
    this.pv_max = Math.floor(Math.random() * (20 - 5) + 5);
    this.pv = this.pv_max;
    this.point = Math.floor(Math.random() * (10 - 1) + 1) * 5;
    this.dgt = 1;
    this.name = "img/ennemi1.png";
    this.img = new Image();
    this.img.src = this.name;
    this.w = 50;
    this.h = 80;
    this.speed = Math.random() * 0.5;
    this.radius = Math.floor(Math.random() * (40 - 20) + 20);
    this.compt = 1;
  }

  dead() {
    if (this.pv == 0) { return true; }
    return false;
  }

  circle_move() {
    if (this.dead == true) {
      return;
    }
    this.x = this.centerx + this.radius * Math.cos(this.speed);
    this.y = this.centery + this.radius * Math.sin(this.speed);
    this.speed += 0.1;
  }

}

let ennemis = [];
function addEnnemi() {
  if (ennemis.length < 5) {
    for (let index = ennemis.length; index < 10; index++) {
      let a = Math.floor(Math.random() * (w - 10) + 10);
      let b = Math.floor(Math.random() * (h / 4 - 0) + 0);
      let ennemi = new Ennemi(a, b);
      ennemis.push(ennemi);
    }
  }
}


function isColliding(object1, object2) {
  if (object1 == undefined) { return false }
  return (
    object1.x <= object2.x + object2.w &&
    object1.x + object1.w >= object2.x &&
    object1.y <= object2.y + object2.h &&
    object1.y + object1.h >= object2.y
  );
}

function drawEnnemi(player) {
  for (let index = 0; index < ennemis.length; index++) {
    const ennemy = ennemis[index];
    ctx.beginPath();
    ctx.rect(ennemy.x, ennemy.y - 10, (50 / ennemy.pv_max) * ennemy.pv_max, 5);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.rect(ennemy.x, ennemy.y - 10, (50 / ennemy.pv_max) * ennemy.pv, 5);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.drawImage(ennemy.img, ennemy.x, ennemy.y, ennemy.w, ennemy.h);
    ctx.closePath();
    if (ennemis[index].dead() == true) {
      player.score += ennemis[index].point;
      ennemis.splice(index, 1);
      continue;
    }

    ennemis[index].circle_move();
  }
}



class Bomb {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 20;
    this.h = 20;
    this.img = new Image();
    this.img.src = "img/bombe.png";
  }

  drawBomb() {
    ctx.beginPath();
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    ctx.closePath();
  }
}

let bombs = [];
function attack() {
  let ennemi = ennemis[Math.floor(Math.random() * ennemis.length)];
  let bomb = new Bomb(ennemi.x + 10, ennemi.y + 80);
  bombs.push(bomb);
}

function drawBombs(player) {
  for (let index = 0; index < bombs.length; index++) {
    if (bombs[index].y > h) {
      bombs.splice(index, 1);
    }

    if (isColliding(bombs[index], player)) {
      bombs.splice(index, 1);
      if (player.pv != 0) {
        player.pv = player.pv - 1;
      }
      break;
    }

    if (bombs[index] != undefined) {
      bombs[index].drawBomb();
      bombs[index].y += 20;
    }
  }
}
let player = new Player();


function update() {
  ctx.clearRect(0, 0, h, w);
  ctx.drawImage(bg, 0, 0, h, w);
  if (player.pv > 0) {
    player.drawPlayer();
    move(player);
    drawPv(player);
    drawBullets();
    drawBombs(player);
    drawEnnemi(player);
    addEnnemi();
    score(player);
  } else {
    ctx.beginPath();
    ctx.font = "50px pixel";
    ctx.textAlign = "center";
    ctx.fillStyle = "red";
    ctx.fillText("Game Over!", w / 2, h / 2 - 50);
    ctx.font = '30px pixel';
    ctx.fillStyle = "white";
    ctx.fillText('Score: ' + player.score, w / 2, h / 2 - 15);
    ctx.closePath();
    setTimeout(() => {
      document.location.reload();
    }, 3000);    
  }


}

setInterval(update, 100);
setInterval(shoot, 150, player);
setInterval(attack, 500);
