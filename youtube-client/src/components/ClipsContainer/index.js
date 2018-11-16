import './style.css';

import ClipCard from '../ClipCard';
import Swipeable, { SWIPE } from '../SwipeableContainer';

const NUMBER_OF_VISIBLE_CARDS = {
  MAX: 4,
  MIN: 1,
};

// const NUMBER_OF_CARDS = 9;

const getPropertyValueFromCSS = (element, property) => {
  const value = getComputedStyle(element).getPropertyValue(property);
  const parsedValue = parseInt(value, 10);
  if (Number.isNaN(parsedValue)) {
    throw new Error(`can not parse ${property} from ${element} to integer`);
  }
  return parsedValue;
};

export default class {
  constructor(swipe) {
    this.node = document.createElement('div');
    this.node.id = 'clips';
    this.swipeableArea = new Swipeable(swipe, this.onSwipe.bind(this));

    this.cardWidth = 0;
    this.cardMargin = 0;
    this.cardsPerPage = 0;
    this.onWindowResize();

    this.startX = null;
    this.startY = null;
    this.offsetX = 0;

    this.addListeners();
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
  get currentPage() {
    const page = 1 + Math.trunc(-this.offsetX / this.cardFullWidth / this.cardsPerPage);
    return page;
  }

  /**
   * Return index of the most left visible card.
   */
  get leftVisibleCardIndex() {
    return (this.currentPage - 1) * this.cardsPerPage;
  }

  get numberOfCards() {
    // TODO store link to live collection
    return this.node.querySelectorAll('.card').length;
  }

  get numberOfPages() {
    return Math.ceil(this.numberOfCards / this.cardsPerPage);
  }

  get isLastPage() {
    return this.currentPage === this.numberOfPages;
  }

  evalPageNumberByCardIndex(cardIndex) {
    return 1 + Math.trunc(cardIndex / this.cardsPerPage);
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

  goToPage(pageNumber) {
    if (pageNumber < 1) {
      this.goToPage(1);
      return;
    }
    if (pageNumber > this.numberOfPages) {
      this.goToPage(this.numberOfPages);
      return;
    }
    this.goToCard((pageNumber - 1) * this.cardsPerPage);
  }

  translating() {
    this.node.style.transform = `translate(${this.offsetX}px, 0)`;
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

    /* FIX we must return to back visible ’state’
    after resizing browser window back to previous size */
    // the most left visible card before resizing must be visible after window resizing
    const page = this.evalPageNumberByCardIndex(leftVisibleCardIndex);
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
        this.goToPage(this.currentPage + 1);
        break;
      case SWIPE.directions.right:
        this.goToPage(this.currentPage);
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
