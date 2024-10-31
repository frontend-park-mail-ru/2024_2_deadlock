import { textStyles } from '../fieldconstants.js';
import Handlebars from 'handlebars';
import CheckFieldTemplate from './checkfield.hbs';
import { FieldType } from '../fieldconstants';
import styles from 'fields.css';

export default class CheckField {
  parent: HTMLElement;
  id: string;
  prevID: string;
  nextID: string;
  node?: HTMLElement;
  fieldtype: FieldType;

  constructor(parent: HTMLElement, id: string, prevID?: string, nextID?: string) {
    this.parent = parent;
    this.id = id;
    this.prevID = prevID;
    this.nextID = nextID;
    this.fieldtype = FieldType.CHECK;
  }

  render() {
    const template = CheckFieldTemplate;
    const prevElement = this.parent.querySelector(`.field[data-id="${this.prevID}"]`);
    const readOnlyVal = this.parent.dataset.readonly === 'true';

    if (prevElement) {
      prevElement.insertAdjacentHTML(
        'afterend',
        template({ element: this, readOnly: readOnlyVal }),
      );
    } else {
      this.parent.insertAdjacentHTML(
        'afterbegin',
        template({ element: this, readOnly: readOnlyVal }),
      );
    }

    this.node = this.parent.querySelector(`.field[data-id="${this.id}"]`);
    console.log('check field node', this.node);
  }

  delete() {
    this.node.remove();
  }
}
