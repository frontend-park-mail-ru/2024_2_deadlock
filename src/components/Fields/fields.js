import TextField from './TextField/textfield.js';
import ListField from './ListField/listfield.js';
import Handlebars from 'handlebars';
import FieldsTemplate from './fields.hbs';
import CheckField from './CheckField/checkfield.ts';
import ImageField from './ImageField/imagefield.ts';
import { FieldType, textStyles } from './fieldconstants.ts';
import './fields.css';

const fieldsData = [
  {
    element: FieldType.TEXT,
    textStyle: textStyles.REGULAR,
    id: 1,
    prevID: undefined,
    nextID: 2,
  },
  {
    element: FieldType.LIST,
    id: 2,
    prevID: 1,
    nextID: 3,
  },
  {
    element: FieldType.TEXT,
    textStyle: textStyles.REGULAR,
    id: 3,
    prevID: 2,
    nextID: 4,
  },
  {
    element: FieldType.TEXT,
    textStyle: textStyles.REGULAR,
    id: 4,
    prevID: 3,
    nextID: undefined,
  },
];

export default class Fields {
  constructor(parent) {
    this.parent = parent;
    this.fieldContainer = undefined;
    this.fields = [];
    this.swapWithPrevFunc = this.swapWithPrevFunc.bind(this);
    this.swapWithNextFunc = this.swapWithNextFunc.bind(this);
    this.insertByEnterFunc = this.insertByEnterFunc.bind(this);
    this.deleteFieldFunc = this.deleteFieldFunc.bind(this);
    this.chooseFieldFunc = this.chooseFieldFunc.bind(this);
  }

  render() {
    this.parent.innerHTML = FieldsTemplate({});
    this.fieldContainer = this.parent.querySelector('.fields');
    this.fieldContainer.addEventListener('keydown', this.insertByEnterFunc);

    let prevField = undefined;
    let curField = new ImageField(this.fieldContainer, this.fields.length + 1, textStyles.REGULAR);
    this.insertField(curField, prevField, undefined);
  }

  swapWithPrevFunc(event) {
    const eventId = Number(event.target.dataset.id);
    const curField = this.fields.find((field) => field.id === eventId);
    const prevField = this.fields.find((field) => field.id === curField.prevID);
    this.swap(prevField, curField);
  }

  swapWithNextFunc(event) {
    const eventId = Number(event.target.dataset.id);
    const curField = this.fields.find((field) => field.id === eventId);
    const nextField = this.fields.find((field) => field.id === curField.nextID);
    this.swap(curField, nextField);
  }

  deleteFieldFunc(event) {
    const eventId = Number(event.target.dataset.id);
    const curField = this.fields.find((field) => field.id === eventId);
    const nextField = this.fields.find((field) => field.id === curField.nextID);
    const prevField = this.fields.find((field) => field.id === curField.prevID);
    this.deleteField(curField, prevField, nextField);
  }

  insertByEnterFunc(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const eventId = Number(event.target.dataset.id);
      const curField = this.fields.find((field) => field.id === eventId);
      const nextField = this.fields.find((field) => field.id === curField.nextID);
      const newField = new CheckField(
        this.fieldContainer,
        this.fields.length + 1,
        textStyles.REGULAR,
      );
      this.insertField(newField, curField, nextField);
      const newFieldInput = newField.node.querySelector('.div-input');
      newFieldInput.focus();
    }
  }

  chooseFieldFunc(event) {
    const eventId = Number(event.target.dataset.id);
    const curField = this.fields.find((field) => field.id === eventId);
    const nextField = this.fields.find((field) => field.id === curField.nextID);
    const prevField = this.fields.find((field) => field.id === curField.prevID);
    const newFieldType = event.target.dataset.newFieldType;

    let newField = undefined;
    if (newFieldType === 'text') {
      newField = new TextField(this.fieldContainer, curField.id, textStyles.REGULAR);
    } else if (newFieldType === 'image') {
      newField = new TextField(this.fieldContainer, curField.id, textStyles.REGULAR);
    }

    this.deleteField(curField, prevField, nextField);
    this.insertField(newField, prevField, nextField);
  }

  swap(firstField, secondField) {
    const startField = this.fields.find((field) => field.id === firstField.prevID);
    const endField = this.fields.find((field) => field.id === secondField.nextID);

    this.deleteField(secondField, firstField, endField);
    console.log(secondField);
    this.insertField(secondField, startField, firstField);
  }

  deleteField(curField, prevField = undefined, nextField = undefined) {
    const index = this.fields.indexOf(curField);

    if (index !== -1) {
      this.fields.splice(index, 1);
    }

    curField.delete();

    if (prevField) {
      prevField.nextID = nextField ? nextField.id : undefined;
    }

    if (nextField) {
      nextField.prevID = prevField ? prevField.id : undefined;
    }
  }

  insertField(curField, prevField = undefined, nextField = undefined) {
    console.log(curField, prevField, nextField);
    curField.prevID = prevField ? prevField.id : undefined;
    curField.nextID = nextField ? nextField.id : undefined;
    this.fields.push(curField);
    curField.render();

    if (prevField) {
      prevField.nextID = curField.id;
    }
    if (nextField) {
      nextField.prevID = curField.id;
    }

    const up_button = curField.node.querySelector('.up-href');
    const down_button = curField.node.querySelector('.down-href');
    const delete_button = curField.node.querySelector('.delete-href');

    if (up_button) {
      up_button.addEventListener('click', this.swapWithPrevFunc);
    }
    if (down_button) {
      down_button.addEventListener('click', this.swapWithNextFunc);
    }
    if (delete_button) {
      delete_button.addEventListener('click', this.deleteFieldFunc);
    }

    const chooseTextBtn = curField.node.querySelector('.choose-text-href');
    const chooseImgBtn = curField.node.querySelector('choose-img-btn');

    if (chooseTextBtn) {
      chooseTextBtn.addEventListener('click', this.chooseFieldFunc);
    }
    if (chooseImgBtn) {
      chooseImgBtn.addEventListener('click', this.chooseFieldFunc);
    }
    console.log(this.fields);
  }

  delete() {
    const up_buttons = this.fieldContainer.querySelectorAll('.up-href');
    const down_buttons = this.fieldContainer.querySelectorAll('.down-href');
    const delete_buttons = this.fieldContainer.querySelectorAll('.delete-href');
    up_buttons.forEach((button) => {
      button.removeEventListener('click', this.swapWithPrevFunc);
    });
    down_buttons.forEach((button) => {
      button.removeEventListener('click', this.swapWithNextFunc);
    });
    delete_buttons.forEach((button) => {
      button.removeEventListener('click', this.deleteFieldFunc);
    });
    this.fieldContainer.removeEventListener('keydown', this.insertByEnterFunc);
  }
}
