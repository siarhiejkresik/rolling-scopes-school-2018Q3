import './style.css';

const DELAY = 500;

export default class {
  constructor(onSearchCallback) {
    this.node = document.createElement('input');

    this.node.id = 'search';
    this.node.type = 'search';
    this.node.placeholder = 'Search the youtube...';
    this.node.required = true;
    this.node.autofocus = true;
    this.node.autocomplete = 'off';
    this.onInputCallback = onSearchCallback;
    this.node.oninput = this.onInput.bind(this);

    this.timer = null;
  }

  render(node) {
    node.appendChild(this.node);
  }

  onInput() {
    clearTimeout(this.timer);
    this.timer = setTimeout(this.triggerInputEvent.bind(this), DELAY);
  }

  triggerInputEvent() {
    this.onInputCallback(this.node.value);
  }
}
