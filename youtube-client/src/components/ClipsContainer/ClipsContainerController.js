import ClipsContainerView from './ClipsContainerView';
import ClipsContainerModel from './ClipsContainerModel';

import { SWIPE } from '../SwipeableContainer';
import { NUMBER_OF_PAGES_TO_PREFETCH } from './constants';

export default class {
  constructor() {
    this.view = new ClipsContainerView();
    this.model = new ClipsContainerModel();

    this.addListeners();
  }

  addListeners() {
    window.onresize = this.onWindowResize.bind(this);
    this.model.pageIndexObserver.subscribe(this.view.translateToPage.bind(this.view));
    this.model.pageIndexObserver.subscribe(this.checkIfMoreDataNeeded.bind(this));
  }

  reset() {
    this.view.reset();
    this.model.reset();
  }

  // Check if we must download the next chunk of data
  checkIfMoreDataNeeded() {
    if (this.model.pageIndex === null || !this.model.nextPageToken) {
      return;
    }
    const numberOfPages = Math.trunc(this.view.numberOfCards / this.model.variables.cardsPerPage);
    const numberOfPagesFromRight = numberOfPages - (this.model.pageIndex + 1);
    if (numberOfPagesFromRight < NUMBER_OF_PAGES_TO_PREFETCH) {
      this.api.requestNext();
    }
  }

  onGoToPage(pageIndex) {
    this.model.goPage(pageIndex);
  }

  onResponseOk(e) {
    const { q, nextPageToken } = e;
    const { totalResults } = e.pageInfo;

    // for new search
    if (q !== this.model.q) {
      this.reset();
    }

    this.view.addCards(e);

    this.model.q = q;

    /* the total number of items returned in responses may not by equal
    to the number of items declared in the totalResults key */
    if (nextPageToken) {
      this.model.totalResults = totalResults;
    } else {
      this.model.totalResults = this.view.numberOfCards;
    }

    this.model.nextPageToken = nextPageToken;

    // for the first server response for the given phrase
    if (this.model.pageIndex === null) {
      this.model.goFirstPage();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  onResponseErr() {
    // TODO
  }

  onWindowResize() {
    // store index of the most left visible card
    const cardIndex = this.model.leftVisibleCardIndex;

    this.model.variables.update();

    // the most left visible card before resizing must be visible after window resizing
    const pageIndex = this.model.evalPageIndexByCardIndex(cardIndex);
    this.model.goPage(pageIndex);
  }

  onSwipe(e) {
    switch (e.phase) {
      case SWIPE.phases.move:
        this.onSwipeMove(e);
        break;
      case SWIPE.phases.end:
        this.onSwipeEnd(e);
        break;
      default:
    }
  }

  onSwipeEnd({ directionX, canceled }) {
    if (canceled) {
      this.model.goPage(this.model.pageIndex);
      return;
    }
    switch (directionX) {
      case SWIPE.directions.left:
        this.model.goNextPage();
        break;
      case SWIPE.directions.right:
        this.model.goPrevPage();
        break;
      default:
    }
  }

  onSwipeMove({ dx }) {
    this.view.translateX(dx);
  }
}
