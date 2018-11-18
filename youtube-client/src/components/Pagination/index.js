import './style.css';

// must be odd
const MAX_NUMBER_OF_INDICATORS = 5;

/**
 * Given length `n` of an array of natural numbers `(0...n-1)`
 * and a number `c` from that array,
 * return the first element of a subarray of length `m`,
 * where `c` is the center element of that subarray.
 *
 * Examples:
 *
 * [0 1 2 [3 4 5* 6 7] 8 9] -> 3, m=5, n=10
 *
 * [0 1 [2 3* 4] 5 6 7 8 9] -> 2, m=3, n=10
 *
 * [[0 1* 2 3 4] 5 6 7 8 9] -> 0, m=5, n=10
 *
 * [0 1 2 3 4 5 6 [7 8 9*] -> 0, m=3, n=10
 *
 * [[0 1 2 3 4 ]] -> 0, m=6, n=5
 *
 * @param {*} centerValue the center element of subarray
 * @param {*} subArrLength length of subarray
 * @param {*} arrLength length of array of natural numbers from 0 to arrLength - 1
 */
const leftValue = (centerValue, subArrLength, arrLength) => {
  if (arrLength <= subArrLength) {
    return 0;
  }
  const left = centerValue - Math.trunc(subArrLength / 2);
  // left value can not be negative
  if (left < 0) {
    return 0;
  }
  // right value can not be more than the last value of array
  if (left + subArrLength > arrLength - 1) {
    return arrLength - subArrLength;
  }

  return left;
};

const page = {
  indexToNumber: index => index + 1,
  numberToIndex: number => parseInt(number - 1, 10),
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
    if (!this.indicators.length) {
      this.createIndicators(numberOfPages);
    }
    const leftIndex = this.leftIndicatorPageIndex(pageIndex, numberOfPages);
    this.setupIndicators(leftIndex, pageIndex);
  }

  setupIndicators(leftIndex, pageIndex) {
    this.indicators.forEach((node, i) => {
      // set indicator label
      const label = page.indexToNumber(i + leftIndex);
      // eslint-disable-next-line no-param-reassign
      node.innerHTML = label;
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
    this.node.appendChild(fragment);
  }

  createIndicator() {
    const node = document.createElement('li');
    node.classList.add('pagination-page');
    return node;
  }

  onIndicatorSelect(pageIndex) {
    console.log(pageIndex);
    this.callback(pageIndex)
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
