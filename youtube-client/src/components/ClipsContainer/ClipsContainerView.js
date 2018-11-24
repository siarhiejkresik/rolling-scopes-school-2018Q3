import ClipCard from '../ClipCard';

export default class {
  constructor() {
    this.node = document.createElement('div');
    this.node.classList.add('clips');

    this.offsetX = 0;
  }

  get numberOfCards() {
    return this.node.children.length;
  }

  addCards(data) {
    const startDataId = this.numberOfCards;
    data.items.forEach((cardData, i) => {
      const card = new ClipCard({ cardData, dataId: startDataId + i });
      this.node.appendChild(card);
    });
  }

  translateX(dx) {
    if (dx) {
      this.offsetX += dx;
    }
    this.node.style.transform = `translate3d(${this.offsetX}px, 0, 0)`;
  }

  translateToCard(cardIndex, cardFullWidth) {
    this.offsetX = -cardFullWidth * cardIndex;
    this.translateX();
  }

  translateToPage({ pageIndex, cardsPerPage, cardFullWidth }) {
    const cardIndex = pageIndex * cardsPerPage;
    this.translateToCard(cardIndex, cardFullWidth);
  }

  reset() {
    this.node.innerHTML = '';
    this.offsetX = 0;
    this.translateX();
  }
}
