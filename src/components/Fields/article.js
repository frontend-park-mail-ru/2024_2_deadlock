import TextField from './TextField/textfield.js';
import ListField from './ListField/listfield.js';
import Handlebars from 'handlebars';
import FieldsTemplate from './fields.hbs';
import CheckField from './CheckField/checkfield.ts';
import ImageField from './ImageField/imagefield.ts';
import { FieldType, textStyles } from './fieldconstants.ts';
import './fields.css';

export default class Article {
  constructor(parent) {
    this.id = undefined;
    this.title = undefined;
    this.createdAt = undefined;
    this.authorID = undefined;
    this.fields = [];
    this.parent = parent;
    this.fieldContainer = undefined;
    this.swapWithPrevFunc = this.swapWithPrevFunc.bind(this);
    this.swapWithNextFunc = this.swapWithNextFunc.bind(this);
    this.insertByEnterFunc = this.insertByEnterFunc.bind(this);
    this.deleteFieldFunc = this.deleteFieldFunc.bind(this);
    this.chooseFieldFunc = this.chooseFieldFunc.bind(this);
    this.changeCheckFieldFunc = this.changeCheckFieldFunc.bind(this);
    this.readOnly = false;
  }

  render() {
    this.parent.innerHTML = FieldsTemplate({});
    this.fieldContainer = this.parent.querySelector('.fields');
    this.fieldContainer.addEventListener('keydown', this.insertByEnterFunc);

    let curField = new TextField(this.fieldContainer, this.fields.length + 1);
    this.insertField(curField, undefined, undefined);
  }

  swapWithPrevFunc(event) {
    const eventId = Number(event.target.dataset.id);
    const curField = this.fields.find((field) => field.id === eventId);
    const prevField = this.fields.find((field) => field.id === curField.prevID);
    this.swap(prevField, curField);
    console.log(this.fields);
  }

  swapWithNextFunc(event) {
    const eventId = Number(event.target.dataset.id);
    const curField = this.fields.find((field) => field.id === eventId);
    const nextField = this.fields.find((field) => field.id === curField.nextID);
    this.swap(curField, nextField);
    console.log(this.fields);
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
      const newField = new CheckField(this.fieldContainer, this.fields.length + 1);
      this.insertField(newField, curField, nextField);
      const newFieldInput = newField.node.querySelector('.div-input');
      newFieldInput.addEventListener('input', this.changeCheckFieldFunc);
      newFieldInput.addEventListener('keydown', this.changeCheckFieldFunc);
      newFieldInput.focus();
    }
  }

  changeCheckFieldFunc(event) {
    const eventId = Number(event.target.dataset.id);
    const curField = this.fields.find((field) => field.id === eventId);
    const nextField = this.fields.find((field) => field.id === curField.nextID);
    const prevField = this.fields.find((field) => field.id === curField.prevID);
    this.changeFieldType(curField, prevField, nextField);
  }

  chooseFieldFunc(event) {
    const eventId = Number(event.target.dataset.id);
    const curField = this.fields.find((field) => field.id === eventId);
    const nextField = this.fields.find((field) => field.id === curField.nextID);
    const prevField = this.fields.find((field) => field.id === curField.prevID);
    const newFieldType = event.target.dataset.newFieldType;
    this.changeFieldType(curField, prevField, nextField, newFieldType);
  }

  swap(firstField, secondField) {
    if (!firstField || !secondField) {
      return;
    }
    const startField = this.fields.find((field) => field.id === firstField.prevID);
    const endField = this.fields.find((field) => field.id === secondField.nextID);

    this.deleteField(secondField, firstField, endField);
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

  changeFieldType(
    curField,
    prevField = undefined,
    nextField = undefined,
    newFieldType = FieldType.TEXT,
  ) {
    let newField = undefined;
    if (newFieldType === FieldType.TEXT) {
      newField = new TextField(this.fieldContainer, curField.id);
    } else if (newFieldType === FieldType.IMAGE) {
      newField = new ImageField(this.fieldContainer, curField.id);
    }

    this.deleteField(curField, prevField, nextField);
    this.insertField(newField, prevField, nextField);

    if (newField instanceof ImageField) {
      const imageCaption = new TextField(this.fieldContainer, this.fields.length + 1);
      this.insertField(imageCaption, newField, nextField);
    }
  }

  insertField(curField, prevField = undefined, nextField = undefined) {
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
    const chooseImgBtn = curField.node.querySelector('.choose-img-href');

    if (chooseTextBtn) {
      chooseTextBtn.addEventListener('click', this.chooseFieldFunc);
    }
    if (chooseImgBtn) {
      chooseImgBtn.addEventListener('click', this.chooseFieldFunc);
    }
  }

  delete() {
    const up_buttons = this.fieldContainer.querySelectorAll('.up-href');
    const down_buttons = this.fieldContainer.querySelectorAll('.down-href');
    const delete_buttons = this.fieldContainer.querySelectorAll('.delete-href');
    const chooseTextBtns = curField.node.querySelectorAll('.choose-text-href');
    const chooseImgBtns = curField.node.querySelectorAll('choose-img-btn');

    up_buttons.forEach((button) => {
      button.removeEventListener('click', this.swapWithPrevFunc);
    });
    down_buttons.forEach((button) => {
      button.removeEventListener('click', this.swapWithNextFunc);
    });
    delete_buttons.forEach((button) => {
      button.removeEventListener('click', this.deleteFieldFunc);
    });
    chooseImgBtns.forEach((button) => {
      button.removeEventListener('click', this.chooseFieldFunc);
    });
    chooseTextBtns.forEach((button) => {
      button.removeEventListener('click', this.chooseFieldFunc);
    });
    this.fieldContainer.removeEventListener('keydown', this.insertByEnterFunc);
  }
}
