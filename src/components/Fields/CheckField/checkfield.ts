import { textStyles } from '../fieldconstants.js';
import Handlebars from 'handlebars';
import CheckFieldTemplate from './checkfield.hbs';
import { FieldType } from '../fieldconstants';
import styles from 'fields.css';

export default class CheckField {
    
    parent:Element;
    id: number;
    textStyle: string;
    prevID: number;
    nextID: number;
    node?: Element;

  constructor(parent: Element, id: number, textStyle: string, prevID: number, nextID: number) {
    this.parent = parent;
    this.id = id;
    this.textStyle = textStyle;
    this.prevID = prevID;
    this.nextID = nextID;
  }

  render() {
    const template = CheckFieldTemplate;
    const prevElement = this.parent.querySelector(`.field[data-id="${this.prevID}"]`);

    if (prevElement) {
      prevElement.insertAdjacentHTML('afterend', template({ element: this }));
    } else {
      this.parent.insertAdjacentHTML('afterbegin', template({ element: this }));
    }

    this.node = this.parent.querySelector(`.field[data-id="${this.id}"]`);
    console.log("check field node", this.node);
  }

  delete() {
    this.node.remove();
  }
}