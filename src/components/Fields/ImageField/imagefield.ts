import { textStyles } from '../fieldconstants.js';
import Handlebars from 'handlebars';
import ImageFieldTemplate from './imagefield.hbs';
import { FieldType, ImageVars } from '../fieldconstants';
import styles from 'fields.css';
import imagefieldstyles from 'imagefield.css';
import FieldApi from '../../../api/api_fields';

type ImageResponceBody = {
  data: string;
};

export default class ImageField {
  parent: HTMLElement;
  id: string;
  prevID: string;
  nextID: string;
  filename: string;
  fieldtype: FieldType;
  readOnly: boolean;
  handleImageSelectFunc: (event: Event) => void;
  handleImageUploadFunc: (event: Event) => void;
  node?: Element;
  value?: string;

  constructor(parent: HTMLElement, id: string, prevID?: string, nextID?: string, value?: string) {
    this.parent = parent;
    this.id = id;
    this.prevID = prevID;
    this.nextID = nextID;
    this.filename = ImageVars.DEFAULT_FILENAME;
    this.fieldtype = FieldType.IMAGE;
    this.readOnly = false;
    this.value = value;
    this.handleImageSelectFunc = this.handleImageSelect.bind(this);
    this.handleImageUploadFunc = this.handleImageUpload.bind(this);
  }

  render() {
    const template = ImageFieldTemplate;
    const prevElement = this.parent.querySelector(`.field[data-id="${this.prevID}"]`);
    this.readOnly = this.parent.dataset.readonly === 'true';

    if (prevElement) {
      prevElement.insertAdjacentHTML(
        'afterend',
        template({ element: this, readOnly: this.readOnly }),
      );
    } else {
      this.parent.insertAdjacentHTML(
        'afterbegin',
        template({ element: this, readOnly: this.readOnly }),
      );
    }

    this.node = this.parent.querySelector(`.field[data-id="${this.id}"]`);

    const image = this.node.querySelector(`.image-content`) as HTMLImageElement;
    const imagePlaceholder = this.node.querySelector(`.image-placeholder`);

    if (this.value) {
      image.classList.add('element-visible');
      imagePlaceholder.classList.add('element-hidden');
    } else {
      image.classList.add('element-hidden');
      imagePlaceholder.classList.add('element-visible');
    }

    if (!this.readOnly) {
      const imageContainer = this.node.querySelector(`.field-image`);
      imageContainer.addEventListener('click', this.handleImageSelectFunc);

      const imageInputElement = this.node.querySelector(`.image-input`);
      imageInputElement.addEventListener('change', this.handleImageUploadFunc);
    }
  }

  handleImageSelect(event: Event): void {
    event.preventDefault();
    const imageInput = this.node.querySelector('.image-input') as HTMLInputElement;
    imageInput.click();
  }

  async handleImageUpload(event: Event): Promise<void> {
    event.preventDefault();
    const imageInputElement = event.target as HTMLInputElement;

    if (imageInputElement.files && imageInputElement.files.length > 0) {
      const file = imageInputElement.files[0];
      const formData = new FormData();
      formData.append(this.filename, file);

      const responce = await FieldApi.SendFieldImage(formData, this.id.toString());
      if (!responce.isApiError) {
        const body: ImageResponceBody = responce.body as ImageResponceBody;
        this.value = body.data;
        this.displayFieldImage(this.value);
      }
    }
    FieldApi.EditField(this.id, this.fieldtype, this.value);
  }

  displayFieldImage(url: string) {
    const image = this.node.querySelector(`.image-content`) as HTMLImageElement;
    const imagePlaceholder = this.node.querySelector(`.image-placeholder`);
    image.src = url;
    image.classList.remove('element-hidden');
    image.classList.add('element-visible');
    imagePlaceholder.classList.remove('element-visible');
    imagePlaceholder.classList.add('element-hidden');
  }

  delete(): void {
    this.node.remove();
  }
}
