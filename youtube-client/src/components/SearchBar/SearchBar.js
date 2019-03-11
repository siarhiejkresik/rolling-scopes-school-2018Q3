import { DELAY } from './constants';

import Observer from '../../scripts/Observer';

export default class {
  constructor() {
    this.node = document.createElement('input');
    this.node.classList.add('search');
    this.node.type = 'search';
    this.node.placeholder = 'Search the youtube...';
    this.node.required = true;
    this.node.autofocus = true;
    this.node.autocomplete = 'off';
    this.node.oninput = this.onInput.bind(this);
    this.timer = null;

    this.inputEventObserver = new Observer();
  }

  onInput() {
    clearTimeout(this.timer);
    this.timer = setTimeout(this.triggerInputEvent.bind(this), DELAY);
  }

  triggerInputEvent() {
    this.inputEventObserver.notify(this.node.value);
  }
}
