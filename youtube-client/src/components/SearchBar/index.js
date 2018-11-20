import './style.css';

export default class {
  constructor(onSearchCallback) {
    this.node = document.createElement('input');

    this.node.id = 'search';
    this.node.type = 'search';
    this.node.placeholder = 'Search the youtube...';
    this.node.required = true;
    this.node.autocomplete = 'off';
    this.onSearchCallback = onSearchCallback;
    this.node.oninput = this.onInput.bind(this);
  }

  render(node) {
    node.appendChild(this.node);
  }

  onInput() {
    this.onSearchCallback(this.node.value);
  }
}
