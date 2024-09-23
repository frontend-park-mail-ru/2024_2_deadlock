export default class Cards {
  constructor(parent, items) {
    this.parent = parent;
    this.items = items;
    console.log(parent);
    console.log(items);
  }

  render() {
    const template = Handlebars.templates['cards.hbs'];
    this.parent.innerHTML = template({ items: this.items });
  }
}
