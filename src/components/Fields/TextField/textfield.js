import { textStyles } from '../fieldconstants.ts';
import Handlebars from 'handlebars';
import TextFieldTemplate from './textfield.hbs';

export default class TextField {
  constructor(parent, id, textStyle, prevID, nextID) {
    this.parent = parent;
    this.id = id;
    this.textStyle = textStyle;
    this.node = undefined;
    this.makeTextFunc = this.makeText.bind(this);
    this.makeHeaderFunc = this.makeHeader.bind(this);
  }

  render() {
    const template = TextFieldTemplate;
    const prevElement = this.parent.querySelector(`.field[data-id="${this.prevID}"]`);

    if (prevElement) {
      prevElement.insertAdjacentHTML('afterend', template({ element: this }));
    } else {
      this.parent.insertAdjacentHTML('afterbegin', template({ element: this }));
    }

    this.node = this.parent.querySelector(`.field[data-id="${this.id}"]`);
    const text_button = this.node.querySelector('.make-text-href');
    const header_button = this.node.querySelector('.make-header-href');

    header_button.addEventListener('click', this.makeHeaderFunc);
    text_button.addEventListener('click', this.makeTextFunc);
  }

  makeHeader(event) {
    console.log(event.target);
    this.changeTextStyle(this.id, textStyles.HEADER);
  }

  makeText(event) {
    console.log(event.target);
    this.changeTextStyle(this.id, textStyles.REGULAR);
  }

  changeTextStyle(id, textStyle) {
    let cur = this.node.querySelector('.div-input');
    cur.classList.remove(this.textStyle);
    this.textStyle = textStyle;
    cur.classList.add(this.textStyle);
  }

  delete() {
    const text_button = this.node.querySelector('.make-text-href');
    const header_button = this.node.querySelector('.make-header-href');

    text_button.removeEventListener('click', this.makeTextFunc);
    header_button.removeEventListener('click', this.makeHeaderFunc);

    this.node.remove();
  }
}
