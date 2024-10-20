import { textStyles } from '../fieldconstants.ts';
import Handlebars from 'handlebars';
import ListFieldTemplate from './listfield.hbs';

export default class ListField {
  constructor(parent, id, prevID, nextID) {
    this.parent = parent;
    this.id = id;
    this.node = undefined;
    this.prevID = prevID;
    this.nextID = nextID;
    this.enterHandlerFunc = this.enterHandlerFunc.bind(this);
  }

  render() {
    const template = ListFieldTemplate;
    const prevElement = this.parent.querySelector(`.field[data-id="${this.prevID}"]`);

    if (prevElement) {
      prevElement.insertAdjacentHTML('afterend', template({ element: this }));
    } else {
      this.parent.insertAdjacentHTML('afterbegin', template({ element: this }));
    }

    this.node = this.parent.querySelector(`.field[data-id="${this.id}"]`);
    this.node.addEventListener('keydown', this.enterHandlerFunc);
  }

  enterHandlerFunc(event) {
    let liElements = event.target.getElementsByTagName('li');
    let lastElement = undefined;
    if (liElements.length > 0) {
      lastElement = liElements[liElements.length - 1];
    }
    if (lastElement && lastElement.textContent === '') {
      event.preventDefault();
      lastElement.remove();
    } else if (lastElement && lastElement.textContent.trim() !== '') {
      event.stopImmediatePropagation(); // Останавливаем распространение события для предотвращения вызова родительских обработчиков
    }
  }

  delete() {
    this.node.remove();
  }
}
