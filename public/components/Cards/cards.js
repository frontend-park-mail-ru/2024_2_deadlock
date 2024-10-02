import Ajax from '../../ajax.js';

export default class Cards {
  constructor(parent, items) {
    this.parent = parent;
    this.items = {};
  }

  async render() {
    const template = Handlebars.templates['cards.hbs'];
    await this.getCurrentCards2();
    this.parent.innerHTML = template({ items: this.items });
  }

  async getCurrentCards2() {
    const response = await Ajax({
      url: 'http://localhost:8000/api/v1/feed',
      method: 'GET',
    });

    switch (response.status) {
      case 200:
        this.items = response.body.data;
        console.log(this.items);
        break;
      default:
        console.error('Error', response.status, response.error);
    }
  }
}
