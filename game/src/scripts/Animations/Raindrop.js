// https://codepen.io/SidneyD/pen/MYbzPj?editors=0010

let start;
let duration;
let ctx;
let cW;
let cH;
let area = {};

let raindrops;
const rainStrength = 15;

function initCanvas(verticalAxis) {
  cW = ctx.canvas.width;
  cH = ctx.canvas.height;
  if (verticalAxis < 1 / 2) {
    area.left = 0;
    area.right = 2 * verticalAxis * cW;
    area.width = area.right - area.left;
  } else {
    area.left = (2 * verticalAxis - 1) * cW;
    area.right = cW;
    area.width = area.right - area.left;
  }
}

class Raindrops {
  constructor() {
    this.x;
    this.y;
    this.s;
    this.width;
    this.height;
    this.drops = [];
    this.splashes = [];
  }
  addDrop() {
    this.x = Math.random() * (area.width + 100) - 100 + area.left;
    this.y = 0;
    this.s = Math.random() * 7 + 2;
    this.drops.push({
      x: this.x,
      y: this.y,
      velY: 2,
      width: this.s / 3,
      height: this.s * 1.2,
      speed: this.s,
      life: 60
    });
  }
  render() {
    for (let i = 0; i < rainStrength; i++) {
      this.addDrop();
    }
    ctx.save();
    ctx.clearRect(0, 0, cW, cH);
    ctx.fillStyle = 'rgba(50, 80, 200, 1)';
    for (let i = 0; i < this.drops.length; i++) {
      let drop = this.drops[i];
      ctx.fillRect(drop.x, drop.y, drop.width, drop.height);
      drop.y += drop.speed * 2;
      drop.x += 2;
      if (drop.y + drop.height > cH) {
        this.splashes.push(drop);
        this.drops.splice(i, 1);
      }
    }
    for (let i = 0; i < this.splashes.length; i++) {
      let splash = this.splashes[i];
      ctx.fillRect(splash.x, splash.y, splash.width / 3, splash.height / 3);
      splash.y -= splash.velY * splash.speed / 6;
      splash.life--;
      splash.velY -= 0.1;
      splash.x += 0.15 * splash.speed;
      if (splash.life <= 0) {
        this.splashes.splice(i, 1);
      }
    }
    ctx.restore();
  }
}

function init() {
  raindrops = new Raindrops();
  loop();
}

function render() {
  raindrops.render();
}

function loop() {
  const time = new Date().getTime();
  if (time < start + duration) {
    window.requestAnimationFrame(loop);
    render();
  } else {
    ctx.clearRect(0, 0, cW, cH);
    ctx.restore();
  }
}

export default function run(context, verticalAxis) {
  start = new Date().getTime();
  duration = 5000;
  ctx = context;
  ctx.save();
  initCanvas(verticalAxis);
  init();
}


