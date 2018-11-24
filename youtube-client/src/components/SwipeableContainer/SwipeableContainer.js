// TODO fire onPointerUp when pointer goes out of container bounds
import { SWIPE } from './constants';

export default class {
  constructor(node, onSwipeCallback) {
    this.node = node;
    this.onSwipeCallback = onSwipeCallback;
    this.phase = SWIPE.phases.wait;
    this.startX = null;

    this.addListeners();
  }

  addListeners() {
    const eventsMap = {
      pointerup: this.onPointerUp,
      pointerdown: this.onPointerDown,
      pointermove: this.onPointerMove,
    };

    Object
      .entries(eventsMap)
      .forEach(([event, handler]) => this.node.addEventListener(event, handler.bind(this)));
  }

  dispatchSwipeEvent(eventData) {
    const eventDataWithPhase = Object.assign({ phase: this.phase }, eventData);
    this.onSwipeCallback(eventDataWithPhase);
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
