// import './style.css';

const MOVEMENT_FACTOR = 2;

// const isInsideNodeBoundaries = (node, X, Y) => {
//   const {
//     x, y, width, height,
//   } = node.getBoundingClientRect();
//   console.log(`X:${X} (${x}, ${x + width}) | Y:${Y} (${y}, ${y + height})`);
//   return !(X < x || X > x + width || Y < y || Y > y + height);
// };

export default class {
  constructor(node, targetNode) {
    this.node = node;
    // this.targetNode = targetNode;

    this.isMoving = false;
    this.startX = null;
    this.translate = 0;

    this.addListeners();
  }

  translating(dx) {
    this.translate += dx;
    // this.targetNode.style.transform = `translate(${this.translate}px, 0)`;
  }

  addListeners() {
    this.node.addEventListener('pointerup', this.onPointerUp.bind(this), true);
    this.node.addEventListener('pointerdown', this.onPointerDown.bind(this), true);
    this.node.addEventListener('pointermove', this.onPointerMove.bind(this), true);
  }

  onPointerDown(e) {
    this.startX = e.x;
    if (this.isMoving) {
      throw new Error('two pointer down');
    }
    this.isMoving = true;
    console.log('from onPointerDown', this.isMoving);
  }

  onPointerUp(e) {
    this.isMoving = false;
    const x = e.x;
    let directionX;
    if (x < this.startX) {
      directionX = 'left';
    } else if (x > this.startX) {
      directionX = 'right';
      console.log('moved:', x - this.startX, directionX);
    }

    this.startX = null;

    const swipeEvent = new CustomEvent('swipe', { detail: directionX });
    this.node.dispatchEvent(swipeEvent);
    console.log('from onPointerUp', this.isMoving);
  }

  onPointerMove(e) {
    // TODO check container boundaries
    if (!this.isMoving) {
      return;
    }

    const dx = e.movementX;
    this.translating(dx);
  }
}
