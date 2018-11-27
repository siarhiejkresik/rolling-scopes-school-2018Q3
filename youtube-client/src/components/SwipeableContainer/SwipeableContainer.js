// TODO fire onPointerUp when pointer goes out of container bounds
import { SWIPE } from './constants';

const w = () => Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

export default class {
  constructor(node, onSwipeCallback) {
    this.node = node;
    this.onSwipeCallback = onSwipeCallback;
    this.phase = SWIPE.phases.waiting;
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
    if (this.phase !== SWIPE.phases.waiting) {
      throw new Error('two pointer down');
    }
    this.phase = SWIPE.phases.start;
    this.startX = e.x;
    this.dispatchSwipeEvent();
  }

  onPointerUp(e) {
    if (this.phase !== SWIPE.phases.move) {
      return;
    }

    const { x } = e;
    const eventData = {};

    // set canceled to true if swipe movement is not long enough
    const dx = e.x - this.startX;
    const treshold = Math.min(
      SWIPE.distanceTreshold.px,
      (SWIPE.distanceTreshold.viewportPercent * w()) / 100,
    );
    eventData.canceled = Math.abs(dx) < treshold;

    // set swipe direction
    let directionX;
    if (x < this.startX) {
      directionX = SWIPE.directions.left;
    } else if (x > this.startX) {
      directionX = SWIPE.directions.right;
    }
    eventData.directionX = directionX;

    this.phase = SWIPE.phases.end;
    this.dispatchSwipeEvent(eventData);

    // reset state
    this.startX = null;
    this.phase = SWIPE.phases.waiting;
  }

  onPointerMove(e) {
    if (this.phase === SWIPE.phases.waiting) {
      return;
    }
    this.phase = SWIPE.phases.move;

    const dx = e.movementX;
    this.dispatchSwipeEvent({ dx });
  }
}
