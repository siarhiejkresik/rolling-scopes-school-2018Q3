const LOCALSTORAGE_KEY = 'NotifierDisabled';
const NAVBAR_INDICATORS_GROUP_NAME = 'indicators';
const INDICATOR_ID_PATTERN = 'id-';
const MESSAGE_ELEMENT_CLASS = 'message';
const KEYS_MAP = {
  PREV: 'Digit1',
  NEXT: 'Digit2',
  CLOSE: 'Digit3',
  DISABLE: 'Digit4',
};
export default class Notifier {
  constructor(id) {
    this.numberOfMessages = null;
    this._activeMessageIndex = null;

    // notifier elements
    this.root = document.getElementById(id);
    this.closeButton = this.root.querySelector('.notification-close');
    this.disableCheckBox = this.root.querySelector('.notification-disable input');
    this.messagesArea = this.root.querySelector('.notification-messages');
    this.navBar = this.root.querySelector('.notification-navigation');
    this.navBarIndicators = this.navBar.querySelector('.notification-indicators');
    this.navBarLeft = this.navBar.querySelector('.notification-left');
    this.navBarRight = this.navBar.querySelector('.notification-right');

    this.eventListeners = {};
    this.eventListenersObj = [
      { target: this.root, event: 'click', fn: this.handleNavBarClickEvent },
      { target: window, event: 'keypress', fn: this.handleKeyPressEvent },
    ];
  }
  static isDisabled() {
    return localStorage.getItem(LOCALSTORAGE_KEY) === String(true);
  }

  static toggleDisable(boolFlag) {
    localStorage.setItem(LOCALSTORAGE_KEY, boolFlag);
  }
  renderMessages(messages) {
    const fragment = document.createDocumentFragment();
    messages.forEach((message) => {
      const li = document.createElement('li');
      li.classList.add(`${MESSAGE_ELEMENT_CLASS}`);
      li.innerHTML = message;
      li.hidden = true;
      fragment.appendChild(li);
    });
    this.messagesArea.appendChild(fragment);
  }

  renderNavbarIndicators() {
    const fragment = document.createDocumentFragment();
    Array(this.numberOfMessages)
      .fill()
      .forEach((_, i) => {
        const id = `${INDICATOR_ID_PATTERN}${i}`;
        // create indicator
        const input = document.createElement('input');
        input.setAttribute('type', 'radio');
        input.setAttribute('name', NAVBAR_INDICATORS_GROUP_NAME);
        input.setAttribute('id', id);
        fragment.appendChild(input);
        // create label for indicator
        const label = document.createElement('label');
        label.setAttribute('for', id);
        fragment.appendChild(label);
      });
    this.navBarIndicators.appendChild(fragment);
  }

  addEventListeners() {
    this.eventListenersObj.forEach(({ target, event, fn }) => {
      const bindedFn = fn.bind(this);
      target.addEventListener(event, bindedFn);
      this.eventListeners[fn] = bindedFn;
    });
  }

  removeEventListeners() {
    this.eventListenersObj.forEach(({ target, event, fn }) => {
      const bindedFn = this.eventListeners[fn];
      target.removeEventListener(event, bindedFn);
    });
    this.eventListeners = {};
  }

  handleKeyPressEvent({ code }) {
    switch (code) {
      case KEYS_MAP.PREV:
        this.activeMessageIndex -= 1;
        break;
      case KEYS_MAP.NEXT:
        this.activeMessageIndex += 1;
        break;
      case KEYS_MAP.CLOSE:
        this.close();
        break;
      case KEYS_MAP.DISABLE:
        {
          const value = !this.disableCheckBox.checked;
          this.disableCheckBox.checked = value;
          Notifier.toggleDisable(value);
        }
        break;
      default:
    }
  }
