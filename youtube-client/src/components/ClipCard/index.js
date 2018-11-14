import './style.css';

export default class {
  constructor() {
    this.node = document.createElement('div');
    this.node.classList.add('card');
    this.node.required = true;
    // this.node.innerHTML = '1';
  }
}
