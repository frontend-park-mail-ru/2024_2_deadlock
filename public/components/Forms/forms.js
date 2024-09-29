export default class Form {
  constructor(parent, items) {
    this.parent = parent;
    this.items = items;
  }

  render() {
    const template = Handlebars.templates['forms.hbs'];
    this.parent.innerHTML = template({ items: this.items });
  }
}
