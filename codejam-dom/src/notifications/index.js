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
}
