import PaginationView from './PaginationView';
import { leftValue } from './utils';

import Observer from '../../scripts/Observer';

import { MAX_NUMBER_OF_INDICATORS } from './constants';

/**
 * Evaluate number of indicators to render.
 * It can not be more than the number of pages
 * or the maximum number of indicators.
 */
const evalNumberOfIndicators = totalPages => Math.min(totalPages, MAX_NUMBER_OF_INDICATORS);

export default class {
  constructor() {
    this.view = new PaginationView();
    this.view.callback = this.onIndicatorSelect.bind(this);
    this.pageSelectObserver = new Observer();
  }

  goToPage({ pageIndex, totalPages }) {
    if (pageIndex === null || totalPages === 0) {
      this.view.renderIndicators(0);
      return;
    }

    if (pageIndex < 0 || pageIndex > totalPages - 1) {
      throw new Error(`Pagination: wrong page index ${pageIndex}`);
    }

    const numberOfIndicators = evalNumberOfIndicators(totalPages);
    const leftIndex = leftValue(pageIndex, numberOfIndicators, totalPages);

    // re-render indicators if number of indicators has changed
    if (numberOfIndicators !== this.view.indicators.length) {
      this.view.renderIndicators(numberOfIndicators);
    }

    // set labels and statuses of indicators
    if (numberOfIndicators) {
      this.view.setupIndicators(leftIndex, pageIndex);
    }
  }

  onIndicatorSelect(pageIndex) {
    this.pageSelectObserver.notify(pageIndex);
  }
}
