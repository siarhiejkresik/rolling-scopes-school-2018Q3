import './style.css';

import ClipCard from '../ClipCard';
import Swipeable from '../SwipeableContainer';

const NUMBER_OF_VISIBLE_CARDS = {
  MAX: 4,
  MIN: 1,
};

const NUMBER_OF_CARDS = 9;

export default class {
  constructor() {
    this.node = document.createElement('div');
    this.node.id = 'clips';
    this.addCards();
    // this.swipeableContainer = new Swipeable(this.node);

    this.cardWidth = 200;
    // this.cardHeight;
    this.cardMargin = 20;
    this.cardsPerPage = this.evalNumberOfCardsPerPage();
    this.pageNumber = 0;

    this.startX = null;
    this.startY = null;
    this.translate = 0;

    this.addListeners();
  }

  addCards() {
    for (let i = 0; i < NUMBER_OF_CARDS; i += 1) {
      const card = new ClipCard();
      card.node.innerHTML = i;
      this.node.appendChild(card.node);
    }
  }

  get cardFullWidth() {
    return 2 * this.cardMargin + this.cardWidth;
  }

  get currentPage() {
    const page = 1 + Math.trunc(-this.translate / this.cardFullWidth / this.cardsPerPage);
    return page;
  }

  get numberOfPages() {
    return Math.ceil(NUMBER_OF_CARDS / this.cardsPerPage);
  }

  get isLastPage() {
    return this.currentPage === this.numberOfPages;
  }

  evalNumberOfCardsPerPage() {
    const { innerWidth } = window;
    let cards = Math.trunc(innerWidth / this.cardFullWidth);
    cards = cards < NUMBER_OF_VISIBLE_CARDS.MIN ? NUMBER_OF_VISIBLE_CARDS.MIN : cards;
    cards = cards > NUMBER_OF_VISIBLE_CARDS.MAX ? NUMBER_OF_VISIBLE_CARDS.MAX : cards;
    // console.log(innerWidth, cards);
    document.documentElement.style.setProperty('--cards', cards);
    return cards;
  }

  goToCard(index) {
    const dx = this.cardFullWidth * index;
    this.translating(-dx);
    console.log('go to card:', index);
  }

  goToPage(pageNumber) {
    if (pageNumber < 1) {
      console.log('go to page', pageNumber);
      this.goToPage(1);
      return;
    }
    if (pageNumber > this.numberOfPages) {
      this.goToPage(this.numberOfPages);
      console.log('go to page', pageNumber);
      return;
    }
    this.goToCard((pageNumber - 1) * this.cardsPerPage);
    console.log('go to page', pageNumber);
  }

  translating(dx) {
    this.translate += dx;
    this.node.style.transform = `translate(${this.translate}px, 0)`;
    // console.log(this.currentPage);
  }

  addListeners() {
    window.onresize = this.onWindowResize.bind(this);
    // this.node.addEventListener('swipe', this.onSwipe.bind(this));
    // this.node.addEventListener('pointerdown', this.onPointerDown.bind(this));
    // this.node.addEventListener('pointerup', this.onPointerUp.bind(this));
    // this.node.addEventListener('pointermove', this.onPointerMove.bind(this));
  }

  onWindowResize() {
    this.cardsPerPage = this.evalNumberOfCardsPerPage();
  }

  onSwipe(e) {
    // return
    const directionX = e.detail;
    console.log(directionX);
    switch (directionX) {
      case 'left':
        this.goToPage(this.currentPage + 1);
        break;
      case 'right':
        this.goToPage(this.currentPage - 1);
        break;
      default:
    }
  }

  // onPointerDown(e) {
  //   this.startX = e.x;
  //   this.startY = e.y;
  //   this.isMoving = true;
  //   console.log('from onPointerDown', this.isMoving);
  // }

  // onPointerUp() {
  //   switch (this.isMoving) {
  //     case 'left':
  //       this.goToPage(this.currentPage + 1);
  //       break;
  //     case 'right':
  //       this.goToPage(this.currentPage);
  //       break;
  //     default:
  //   }
  //   this.isMoving = false;
  //   console.log('from onPointerUp', this.isMoving);
  // }

  // onPointerMove({ x }) {
  //   // TODO check container boundaries
  //   if (!this.isMoving || this.startX === null || this.startY === null) {
  //     return;
  //   }

  //   const distX = Math.trunc(x - this.startX) * 2;

  //   if (distX > 0) {
  //     this.isMoving = 'right';
  //   } else if (distX < 0) {
  //     this.isMoving = 'left';
  //   }

  //   if (distX) {
  //     this.translate += distX;
  //     this.translating();
  //     this.startX = x;
  //   }
  // }

  render(node) {
    node.appendChild(this.node);
  }
}
