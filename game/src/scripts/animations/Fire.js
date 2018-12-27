// https://www.davepagurek.com/blog/fire-particles-for-html5-canvas/

let start;
let duration;
let ctx;
let cW;
let cH;
let groundHeight = 40;
let area = {};

let particles;
let max = 60;
let speed = 3;
let size = 20;

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
  area.center = verticalAxis * cW;
  ctx.globalCompositeOperation = 'lighter';
  particles = [];
}

class Particle {
  constructor(x, y, xs, ys) {
    this.x = x;
    this.y = y;
    this.xs = xs;
    this.ys = ys;
    this.life = 0;
  }
}

function render() {
  //Adds ten new particles every frame
  for (let i = 0; i < 10; i++) {
    //Adds a particle at the mouse position, with random horizontal and vertical speeds
    let p = new Particle(
      area.center,
      cH - groundHeight,
      (Math.random() * 2 * speed - speed) / 2,
      0 - Math.random() * 2 * speed
    );
    particles.push(p);
  }

  //Clear the ctx so we can draw the new frame
  ctx.clearRect(0, 0, cW, cH);

  //Cycle through all the particles to draw them
  for (let i = 0; i < particles.length; i++) {
    //Set the file colour to an RGBA value where it starts off red-orange, but progressively gets more grey and transparent the longer the particle has been alive for
    ctx.fillStyle =
      'rgba(' +
      (260 - particles[i].life * 2) +
      ',' +
      (particles[i].life * 2 + 50) +
      ',' +
      particles[i].life * 2 +
      ',' +
      (max - particles[i].life) / max * 0.4 +
      ')';

    ctx.beginPath();
    //Draw the particle as a circle, which gets slightly smaller the longer it's been alive for
    ctx.arc(
      particles[i].x,
      particles[i].y,
      (max - particles[i].life) / max * (size / 2) + size / 2,
      0,
      2 * Math.PI
    );
    ctx.fill();

    //Move the particle based on its horizontal and vertical speeds
    particles[i].x += particles[i].xs;
    particles[i].y += particles[i].ys;

    particles[i].life++;
    //If the particle has lived longer than we are allowing, remove it from the array.
    if (particles[i].life >= max) {
      particles.splice(i, 1);
      i--;
    }
  }
}

function playAnimation() {
  loop();
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

import soundSource from '../../assets/sounds/Fire.ogg';
const playSound = (src, duration) => {
  const audio = document.getElementById('audio');
  audio.src = src;
  audio.type = 'audio/ogg; codecs="vorbis"';
  audio.play();
  setTimeout(() => {
    audio.pause();
    audio.src = undefined;
  }, duration);
};

export default function run(context, verticalAxis) {
  start = new Date().getTime();
  duration = 5000;
  ctx = context;
  ctx.save();
  initCanvas(verticalAxis);
  playSound(soundSource, duration);
  playAnimation();
}
