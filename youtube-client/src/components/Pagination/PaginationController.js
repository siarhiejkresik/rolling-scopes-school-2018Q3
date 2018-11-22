import PaginationView from './PaginationView';
import Observer from '../../scripts/Observer';

import { leftValue } from './utils';

const MAX_NUMBER_OF_INDICATORS = 5; // it's better to set this to odd number

export default class {
  constructor(numberOfPages = 0) {
    this.numberOfPages = numberOfPages;
    this.view = new PaginationView();
    this.view.callback = this.onIndicatorSelect.bind(this);
    this.pageSelectObserver = new Observer();
  }

  goToPage(pageIndex) {
    if (pageIndex < 0 || pageIndex > this.numberOfPages - 1) {
      throw new Error(`Pagination: wrong page index ${pageIndex}`);
    }

    const numberOfIndicators = this.evalNumberOfIndicators();
    const leftIndex = this.evalLeftIndicatorPageIndex(
      pageIndex,
      numberOfIndicators,
      this.numberOfPages,
    );

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

  /**
   * Evaluate number of indicators to render.
   * It can not be more than the number of pages
   * or the maximum number of indicators.
   */
  evalNumberOfIndicators() {
    return Math.min(this.numberOfPages, MAX_NUMBER_OF_INDICATORS);
  }

  evalLeftIndicatorPageIndex(pageIndex, numberOfIndicators) {
    return leftValue(pageIndex, numberOfIndicators, this.numberOfPages);
  }
}
