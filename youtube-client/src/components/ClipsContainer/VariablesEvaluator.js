import { CSS_VARIABLES, NUMBER_OF_VISIBLE_CARDS } from './constants';

const getPropertyValueFromCSS = (element, property) => {
  const value = getComputedStyle(element).getPropertyValue(property);
  const parsedValue = parseInt(value, 10);
  if (Number.isNaN(parsedValue)) {
    throw new Error(`can not parse ${property} from ${element} to integer`);
  }
  return parsedValue;
};

export default class {
  constructor() {
    this.element = document.documentElement;
    this.cardFullWidth = null;
    this.cardsPerPage = null;
    this.update();
  }

  update() {
    this.calcCardFullWidth();
    this.calcCardsPerPage();
    this.writeCardsPerPage();
  }

  get cardWidth() {
    return getPropertyValueFromCSS(this.element, CSS_VARIABLES.cardWidth);
  }

  get cardMargin() {
    return getPropertyValueFromCSS(this.element, CSS_VARIABLES.cardMargin);
  }

  calcCardFullWidth() {
    const cardFullWidth = this.cardWidth + this.cardMargin * 2;
    this.cardFullWidth = cardFullWidth;
  }

  calcCardsPerPage() {
    const { innerWidth } = window;
    let number = Math.trunc(innerWidth / this.cardFullWidth);
    number = Math.max(NUMBER_OF_VISIBLE_CARDS.min, number);
    number = Math.min(NUMBER_OF_VISIBLE_CARDS.max, number);
    this.cardsPerPage = number;
  }

  /**
   * Write cards per page value to the css variable
   */
  writeCardsPerPage() {
    this.element.style.setProperty(CSS_VARIABLES.cardsPerPage, this.cardsPerPage);
  }
}
