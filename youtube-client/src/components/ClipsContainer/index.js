import './style.css';

import ClipCard from '../ClipCard';
import Swipeable, { SWIPE } from '../SwipeableContainer';
import { search } from '../../api/youtube-v3';

const NUMBER_OF_VISIBLE_CARDS = {
  MAX: 4,
  MIN: 1,
};

const getPropertyValueFromCSS = (element, property) => {
  const value = getComputedStyle(element).getPropertyValue(property);
  const parsedValue = parseInt(value, 10);
  if (Number.isNaN(parsedValue)) {
    throw new Error(`can not parse ${property} from ${element} to integer`);
  }
  return parsedValue;
};

export default class {
  constructor(swipe, pagination) {
    this.node = document.createElement('div');
    this.node.id = 'clips';
    this.swipeableArea = new Swipeable(swipe, this.onSwipe.bind(this));
    this.pagination = pagination;
    this.pagination.pageSelectObserver.subscribe(this.goToPage.bind(this));

    // dimensions that are getted from css, must be setted in pixels
    this.cardWidth = 0;
    this.cardMargin = 0;

    this.cardsPerPage = 0;
    this.onWindowResize();

    this.startX = null;
    this.startY = null;
    this.offsetX = 0;

    this.q = '';

    this.addListeners();
  }

  onSearch(q) {
    if (!q) {
      this.reset();
      return;
    }
    this.q = q;
    search(q).then(result => this.onVideosGetted(result));
  }

  onVideosGetted(e) {
    // TODO
    console.log(e);
    const totalResults = Math.ceil(e.pageInfo.totalResults / this.cardsPerPage);
    this.pagination.numberOfPages = Math.ceil(totalResults / this.cardsPerPage);
    console.log(this.pagination.numberOfPages);

    this.reset();
    if (totalResults) {
      this.addCards(e);
    } else {
      this.node.innerHTML = 'Nothing...';
      this.pagination.numberOfPages = 0;
      console.log(this.pagination.numberOfPages);
      this.goToPage(0);
    }
  }

  reset() {
    this.node.innerHTML = '';
    this.offsetX = 0;
    this.q = '';
  }

  addCards(data) {
    data.items.forEach((cardData, i) => {
      const card = ClipCard(cardData, i);
      this.node.appendChild(card);
    });
  }

  /**
   * Evaluate and return card element width including card margins.
   */
  get cardFullWidth() {
    return 2 * this.cardMargin + this.cardWidth;
  }

  /**
   * Evaluate and return current page number. Page numbering starts with 1.
   */
  get currentPageIndex() {
    const page = Math.trunc(-this.offsetX / this.cardFullWidth / this.cardsPerPage);
    return page;
  }

  /**
   * Return index of the most left visible card.
   */
  get leftVisibleCardIndex() {
    return this.currentPageIndex * this.cardsPerPage;
  }

  get numberOfCards() {
    // TODO store link to live collection
    return this.node.querySelectorAll('.card').length;
  }

  get numberOfPages() {
    return Math.ceil(this.numberOfCards / this.cardsPerPage);
  }

  evalPageNumberByCardIndex(cardIndex) {
    return Math.trunc(cardIndex / this.cardsPerPage);
  }

  evalNumberOfCardsPerPage() {
    const { outerWidth } = window;
    let cards = Math.trunc(outerWidth / this.cardFullWidth);
    cards = cards < NUMBER_OF_VISIBLE_CARDS.MIN ? NUMBER_OF_VISIBLE_CARDS.MIN : cards;
    cards = cards > NUMBER_OF_VISIBLE_CARDS.MAX ? NUMBER_OF_VISIBLE_CARDS.MAX : cards;
    document.documentElement.style.setProperty('--cards', cards);
    return cards;
  }

  goToCard(index) {
    this.offsetX = -this.cardFullWidth * index;
    this.translating();
  }

  goToPage(pageIndex) {
    if (pageIndex < 0) {
      this.goToPage(0);
      return;
    }
    if (pageIndex >= this.numberOfPages) {
      this.goToPage(this.numberOfPages - 1);
      return;
    }
    this.goToCard(pageIndex * this.cardsPerPage);
    //
    this.pagination.goToPage(pageIndex, this.numberOfPages);
  }

  translating() {
    this.node.style.transform = `translate3d(${this.offsetX}px, 0, 0)`;
  }

  addListeners() {
    window.onresize = this.onWindowResize.bind(this);
  }

  onWindowResize() {
    // store index of the most left visible card
    const { leftVisibleCardIndex } = this;

    // update dimensions from css
    this.cardWidth = getPropertyValueFromCSS(document.documentElement, '--w');
    this.cardMargin = getPropertyValueFromCSS(document.documentElement, '--m');

    // evaluate new number of cards per page
    this.cardsPerPage = this.evalNumberOfCardsPerPage();

    // the most left visible card before resizing must be visible after window resizing
    const page = this.evalPageNumberByCardIndex(leftVisibleCardIndex);
    // this.pagination.numberOfPages = Math.ceil(e.pageInfo.totalResults / this.cardsPerPage);
    this.goToPage(page);
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

  onSwipeEnd({ directionX }) {
    switch (directionX) {
      case SWIPE.directions.left:
        this.goToPage(this.currentPageIndex + 1);
        break;
      case SWIPE.directions.right:
        this.goToPage(this.currentPageIndex);
        break;
      default:
    }
  }

  onSwipeMove({ dx }) {
    this.offsetX += dx;
    this.translating();
  }

  render(node) {
    node.appendChild(this.node);
  }
}
