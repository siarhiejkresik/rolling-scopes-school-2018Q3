export default class {
  constructor() {
    this.subscribers = [];
  }

  subscribe(fn) {
    this.subscribers.push(fn);
  }

  unsubscribe(fn) {
    this.subscribers = this.subscribers.filter(s => s !== fn);
  }

  notify(e) {
    this.subscribers.forEach(s => s(e));
  }
}
