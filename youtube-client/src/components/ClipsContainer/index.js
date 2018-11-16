import './style.css';

import ClipCard from '../ClipCard';
import Swipeable, { SWIPE } from '../SwipeableContainer';

const NUMBER_OF_VISIBLE_CARDS = {
  MAX: 4,
  MIN: 1,
};

// const NUMBER_OF_CARDS = 9;

export default class {
  constructor(swipe) {
    this.node = document.createElement('div');
    this.node.id = 'clips';
    this.swipeableArea = new Swipeable(swipe, this.onSwipe.bind(this));

    this.cardWidth = 200;
    this.cardMargin = 20;
    this.cardsPerPage = this.evalNumberOfCardsPerPage();
    this.pageNumber = 0;

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

  get cardFullWidth() {
    return 2 * this.cardMargin + this.cardWidth;
  }

  get currentPage() {
    const page = 1 + Math.trunc(-this.offsetX / this.cardFullWidth / this.cardsPerPage);
    return page;
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
    this.cardsPerPage = this.evalNumberOfCardsPerPage();
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
