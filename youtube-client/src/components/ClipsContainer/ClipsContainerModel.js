import VariablesEvaluator from './VariablesEvaluator';
import Observer from '../../scripts/Observer';

export default class {
  constructor() {
    this.pageIndex = null;
    this.variables = new VariablesEvaluator();

    this.q = '';
    this.nextPageToken = undefined;
    this.totalResults = 0;

    this.pageIndexObserver = new Observer();
  }

  get totalPages() {
    return Math.ceil(this.totalResults / this.variables.cardsPerPage);
  }

  get leftVisibleCardIndex() {
    return this.variables.cardsPerPage * this.pageIndex;
  }

  reset() {
    this.q = '';
    this.totalResults = 0;
    this.nextPageToken = undefined;
    this.setPageIndex(null);
  }

  setPageIndex(index) {
    const newIndex = this.boundPageIndex(index);
    this.pageIndex = newIndex;

    this.pageIndexObserver.notify({
      pageIndex: this.pageIndex,
      cardsPerPage: this.variables.cardsPerPage,
      cardFullWidth: this.variables.cardFullWidth,
      totalPages: this.totalPages,
    });
  }

  goPage(pageIndex) {
    this.setPageIndex(pageIndex);
  }

  goNextPage() {
    this.setPageIndex(this.pageIndex + 1);
  }

  goPrevPage() {
    this.setPageIndex(this.pageIndex - 1);
  }

  goFirstPage() {
    this.setPageIndex(0);
  }

  boundPageIndex(index) {
    if (index === null) {
      return index;
    }

    let newIndex = index;
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= this.totalPages) {
      newIndex = this.totalPages - 1;
    }
    return newIndex;
  }

  evalPageIndexByCardIndex(cardIndex) {
    return Math.trunc(cardIndex / this.variables.cardsPerPage);
  }
}
