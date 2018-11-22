// TODO refactor indicators to radio button group

import { page } from './utils';

const INDICATOR_NODE = {
  class: 'pagination-page',
  selectedClass: 'active',
};

const createIndicator = () => {
  const node = document.createElement('li');
  node.classList.add(INDICATOR_NODE.class);
  return node;
};

export default class {
  constructor(callback) {
    this.node = document.createElement('ul');
    this.node.classList.add('pagination');

    this.callback = callback;
    this.addListeners();
  }

  get indicators() {
    return this.node.querySelectorAll(`.${INDICATOR_NODE.class}`);
  }

  renderIndicators(numberOfIndicators) {
    this.node.innerHTML = '';

    if (!numberOfIndicators) {
      return;
    }

    const fragment = document.createDocumentFragment();
    Array(numberOfIndicators)
      .fill()
      // eslint-disable-next-line no-unused-vars
      .forEach((_) => {
        const node = createIndicator();
        fragment.appendChild(node);
      });
    this.node.appendChild(fragment);
  }

  /**
   * Set labels and statuses of the indicators.
   *
   * @param {*} leftIndex page index for the most left indicator
   * @param {*} pageIndex page index of the current page
   */
  setupIndicators(leftIndex, pageIndex) {
    this.indicators.forEach((node, i) => {
      // set indicator label
      const label = page.indexToNumber(i + leftIndex);
      node.innerHTML = label; // eslint-disable-line no-param-reassign
      // set indicator status
      if (label === page.indexToNumber(pageIndex)) {
        node.classList.add(INDICATOR_NODE.selectedClass);
      } else {
        node.classList.remove(INDICATOR_NODE.selectedClass);
      }
    });
  }

  addListeners() {
    this.node.addEventListener('pointerup', (e) => {
      if (!e.target.classList.contains(INDICATOR_NODE.class)) {
        return;
      }
      const pageNumber = e.target.innerHTML;
      this.callback(page.numberToIndex(pageNumber));
    });
  }
}
