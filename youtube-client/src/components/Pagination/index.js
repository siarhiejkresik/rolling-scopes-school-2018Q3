import './style.css';

import { leftValue, page } from './utils';

const INDICATOR_NODE_CLASS = 'pagination-page';
// must be odd
const MAX_NUMBER_OF_INDICATORS = 5;

const createIndicator = () => {
  const node = document.createElement('li');
  node.classList.add(INDICATOR_NODE_CLASS);
  return node;
};

export default class {
  constructor(callback) {
    this.maxNumberOfIndicators = MAX_NUMBER_OF_INDICATORS;
    this.node = document.createElement('ul');
    this.node.classList.add('pagination');
    this.callback = callback;
    this.addListeners();
  }

  get indicators() {
    return this.node.querySelectorAll(`.${INDICATOR_NODE_CLASS}`);
  }

  /**
   * Evaluate number of indicators to render.
   * It can not be more than the number of pages
   * or the maximum number of indicators.
   *
   * @param {} numberOfPages number of pages.
   */
  evalNumberOfIndicators(numberOfPages) {
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
      this.renderIndicators(numberOfPages);
    }
    const leftIndex = this.leftIndicatorPageIndex(pageIndex, numberOfPages);
    this.setupIndicators(leftIndex, pageIndex);
  }

  /**
   * Set indicators labels and statuses.
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
        node.classList.add('active');
      } else {
        node.classList.remove('active');
      }
    });
  }

  renderIndicators(numberOfPages) {
    const numberOfIndicators = this.evalNumberOfIndicators(numberOfPages);
    const fragment = document.createDocumentFragment();
    Array(numberOfIndicators)
      .fill()
      // eslint-disable-next-line no-unused-vars
      .forEach((_) => {
        const node = createIndicator();
        fragment.appendChild(node);
      });
    this.node.innerHTML = '';
    this.node.appendChild(fragment);
  }

  onIndicatorSelect(pageIndex) {
    this.callback(pageIndex);
  }

  addListeners() {
    this.node.addEventListener('pointerup', (e) => {
      if (!e.target.classList.contains(INDICATOR_NODE_CLASS)) {
        return;
      }
      const pageNumber = e.target.innerHTML;
      this.onIndicatorSelect(page.numberToIndex(pageNumber));
    });
  }
}
