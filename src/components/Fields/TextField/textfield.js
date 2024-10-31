import { textStyles } from '../fieldconstants.ts';
import Handlebars from 'handlebars';
import TextFieldTemplate from './textfield.hbs';
import FieldApi from '../../../api/api_fields.ts';
import { FieldType } from '../fieldconstants.ts';

export default class TextField {
  constructor(parent, id, prevID, nextID, value) {
    this.parent = parent;
    this.id = id;
    this.node = undefined;
    this.timeOut = undefined;
    this.value = value;
    this.fieldtype = FieldType.TEXT;
    this.prevID = prevID;
    this.nextID = nextID;
    this.updateStateFunc = this.updateStateFunc.bind(this);
  }

  render() {
    const template = TextFieldTemplate;
    const prevElement = this.prevID
      ? this.parent.querySelector(`.field[data-id="${this.prevID}"]`)
      : undefined;
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
    const InputField = this.node.querySelector('.div-input');
    InputField.addEventListener('input', this.updateStateFunc);
  }

  updateStateFunc(event) {
    clearTimeout(this.timeOut);
    this.readContent();
    this.timeOut = setTimeout(() => {
      FieldApi.EditField(this.id, this.fieldtype, this.value);
    }, 2000);
  }

  readContent() {
    const div_input = this.node.querySelector('.div-input');
    this.value = div_input.innerText;
  }

  delete() {
    this.readContent();
    this.node.remove();
  }
}
