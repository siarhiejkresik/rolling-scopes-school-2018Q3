// https://codepen.io/mcdorli/post/creating-lightnings-with-javascript-and-html5-canvas
// https://codepen.io/mcdorli/pen/AXgmPJ?editors=0010#0

let start;
let duration;
let ctx;
let cW;
let cH;
let area = {};
let center;
let groundHeight;
let maxDifference;

let minSegmentHeight = 5;
let color = 'hsl(180, 80%, 80%)';
let roughness = 2;

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
  ctx.strokeStyle = color;
  ctx.shadowColor = color;
  center = { y: 20 };
  groundHeight = cH;
  maxDifference = area.width / 5;
}

function render() {
  ctx.shadowBlur = 0;
  ctx.globalCompositeOperation = 'source-over';
  ctx.clearRect(0, 0, cW, cH);
  ctx.globalCompositeOperation = 'lighter';
  ctx.shadowBlur = 15;
  let lightning = createLightning();
  ctx.beginPath();
  for (let i = 0; i < lightning.length; i++) {
    ctx.lineTo(lightning[i].x, lightning[i].y);
  }
  ctx.stroke();
}

function createLightning() {
  let segmentHeight = groundHeight - center.y;
  let lightning = [];
  lightning.push({ x: area.center, y: center.y });
  lightning.push({
    x: area.left + Math.random() * (area.width - 100) + 50,
    y: groundHeight + (Math.random() - 0.9) * 50
  });
  let currDiff = maxDifference;
  while (segmentHeight > minSegmentHeight) {
    let newSegments = [];
    for (let i = 0; i < lightning.length - 1; i++) {
      let start = lightning[i];
      let end = lightning[i + 1];
      let midX = (start.x + end.x) / 2;
      let newX = midX + (Math.random() * 2 - 1) * currDiff;
      newSegments.push(start, { x: newX, y: (start.y + end.y) / 2 });
    }

    newSegments.push(lightning.pop());
    lightning = newSegments;

    currDiff /= roughness;
    segmentHeight /= 2;
  }
  return lightning;
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

import soundSource from '../../assets/sounds/Lightnings.ogg';
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
