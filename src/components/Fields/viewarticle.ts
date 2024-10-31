import TextField from './TextField/textfield.js';
import ListField from './ListField/listfield.js';
import Handlebars from 'handlebars';
import FieldsTemplate from './fields.hbs';
import CheckField from './CheckField/checkfield';
import ImageField from './ImageField/imagefield';
import ArticleApi from '../../api/api_article';
import { FieldType, textStyles } from './fieldconstants';
import './fields.css';

interface Field {
  fieldtype: FieldType;
  prevID: string;
  nextID: string;
  id: string;
  render(): void;
}

type ResponseField = {
  id: string;
  type: string;
  content: string;
  prevID: string;
  nextID: string;
};

type ArticleResponseBody = {
  id: string;
  title: string;
  createdAt: string;
  authorID: number;
  fields: ResponseField[];
};

export default class ViewArticle {
  id: string;
  title: string;
  createdAt: string;
  authorID: number;
  fields: Field[];
  parent: HTMLElement;
  fieldContainer: HTMLElement;
  readOnly: boolean;
  constructor(parent: HTMLElement) {
    this.id = undefined;
    this.title = undefined;
    this.createdAt = undefined;
    this.authorID = undefined;
    this.fields = [];
    this.parent = parent;
    this.fieldContainer = undefined;
    this.readOnly = true;
  }

  async render() {
    const responseBody = await this.getArticleInfo();
    this.id = responseBody.id;
    this.authorID = responseBody.authorID;
    this.createdAt = responseBody.createdAt;
    this.title = responseBody.title;
    this.parent.innerHTML = FieldsTemplate({ article: this });
    this.fieldContainer = this.parent.querySelector('.fields');
    this.fields = this.collectFieldList(responseBody.fields);
    this.displayFields();
  }

  async getArticleInfo(): Promise<ArticleResponseBody> {
    const response = await ArticleApi.getArticle(this.id);
    if (!response.isApiError) {
      const responseBody = response.body as ArticleResponseBody;
      return responseBody;
    }
  }

  collectFieldList(fields: ResponseField[]): Field[] {
    let res: Field[] = [];
    fields.forEach((field) => {
      switch (field.type) {
        case FieldType.TEXT:
          let a = new TextField(
            this.fieldContainer,
            field.id,
            field.prevID,
            field.nextID,
            field.content,
          );
          res.push(a);
          break;
        case FieldType.IMAGE:
          res.push(
            new ImageField(
              this.fieldContainer,
              field.id,
              field.prevID,
              field.nextID,
              field.content,
            ),
          );
          break;
        case FieldType.CHECK:
          res.push(new CheckField(this.fieldContainer, field.id, field.prevID, field.nextID));
          break;
      }
    });
    return res;
  }

  displayFields() {
    let prevField: Field | undefined = undefined;
    this.fields.forEach((field) => {
      const curField = field;
      this.insertField(curField, prevField);
      prevField = curField;
    });
  }

  insertField(curField: Field, prevField?: Field, nextField?: Field) {
    curField.prevID = prevField ? prevField.id : undefined;
    curField.nextID = nextField ? nextField.id : undefined;
    curField.render();

    if (prevField) {
      prevField.nextID = curField.id;
    }
    if (nextField) {
      nextField.prevID = curField.id;
    }
  }
}
