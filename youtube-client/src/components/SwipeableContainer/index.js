const MOVEMENT_FACTOR = 2;

export const SWIPE = {
  directions: {
    left: 'left',
    right: 'right',
  },
  phases: {
    wait: 'wait',
    start: 'swipeStart',
    move: 'swipeMove',
    end: 'swipeEnd',
  },
};
export default class {
  constructor(node, targetNode) {
    this.node = node;
    this.targetNode = targetNode;
    this.phase = SWIPE.phases.wait;
    this.startX = null;

    this.addListeners();
  }

  addListeners() {
    this.node.addEventListener('pointerup', this.onPointerUp.bind(this), true);
    this.node.addEventListener('pointerdown', this.onPointerDown.bind(this), true);
    this.node.addEventListener('pointermove', this.onPointerMove.bind(this), true);
  }

  dispatchSwipeEvent(detail) {
    const detailWithphase = Object.assign({ phase: this.phase }, detail);
    const swipeEvent = new CustomEvent('swipe', { detail: detailWithphase, bubbles: true });
    this.node.dispatchEvent(swipeEvent);
  }

  onPointerDown(e) {
    if (this.phase !== SWIPE.phases.wait) {
      throw new Error('two pointer down');
    }
    this.phase = SWIPE.phases.start;
    this.startX = e.x;
    this.dispatchSwipeEvent();
  }

  onPointerUp(e) {
    this.phase = SWIPE.phases.end;

    const { x } = e;
    let directionX;
    if (x < this.startX) {
      directionX = SWIPE.directions.left;
    } else if (x > this.startX) {
      directionX = SWIPE.directions.right;
    }

    this.dispatchSwipeEvent({ directionX });

    this.startX = null;
    this.phase = SWIPE.phases.wait;
  }

  onPointerMove(e) {
    if (this.phase === SWIPE.phases.wait) {
      return;
    }
    this.phase = SWIPE.phases.move;

    const dx = e.movementX;
    this.dispatchSwipeEvent({ dx });
  }
}
