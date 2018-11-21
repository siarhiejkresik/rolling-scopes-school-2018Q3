import './style.css';

import { leftValue, page } from './utils';

// must be odd
const MAX_NUMBER_OF_INDICATORS = 5;

export default class {
  constructor(callback) {
    this.maxNumberOfIndicators = MAX_NUMBER_OF_INDICATORS;
    this.node = document.createElement('ul');
    this.node.classList.add('pagination');
    this.callback = callback;
    this.addListeners();
  }

  get indicators() {
    return this.node.querySelectorAll('.pagination-page');
  }

  numberOfIndicators(numberOfPages) {
    return Math.min(this.maxNumberOfIndicators, numberOfPages);
  }

  leftIndicatorPageIndex(pageIndex, numberOfPages) {
    const numberOfIndicators = this.maxNumberOfIndicators;
    return leftValue(pageIndex, numberOfIndicators, numberOfPages);
  }

  goToPage(pageIndex, numberOfPages) {
    if (!numberOfPages) {
      return;
    }
    const indicatorsNumbers = this.indicators.length;
    if (!indicatorsNumbers || indicatorsNumbers !== numberOfPages) {
      this.createIndicators(numberOfPages);
    }
    const leftIndex = this.leftIndicatorPageIndex(pageIndex, numberOfPages);
    this.setupIndicators(leftIndex, pageIndex);
  }

  setupIndicators(leftIndex, pageIndex) {
    this.indicators.forEach((node, i) => {
      // set indicator label
      const label = page.indexToNumber(i + leftIndex);
      node.innerHTML = label; // eslint-disable-line no-param-reassign
      // set indicator status
      if (label === page.indexToNumber(pageIndex)) {
        node.classList.add('active');
      } else {
        node.classList.remove('active');
      }
    });
  }

  createIndicators(numberOfPages) {
    const numberOfIndicators = this.numberOfIndicators(numberOfPages);
    const fragment = document.createDocumentFragment();
    Array(numberOfIndicators)
      .fill()
      // eslint-disable-next-line no-unused-vars
      .forEach((_) => {
        const node = this.createIndicator();
        fragment.appendChild(node);
      });
    this.node.innerHTML = '';
    this.node.appendChild(fragment);
  }

  createIndicator() {
    const node = document.createElement('li');
    node.classList.add('pagination-page');
    return node;
  }

  onIndicatorSelect(pageIndex) {
    console.log(pageIndex);
    this.callback(pageIndex);
  }

  addListeners() {
    this.node.addEventListener('pointerup', (e) => {
      if (!e.target.classList.contains('pagination-page')) {
        return;
      }
      const pageNumber = e.target.innerHTML;
      this.onIndicatorSelect(page.numberToIndex(pageNumber));
    });
  }
}
