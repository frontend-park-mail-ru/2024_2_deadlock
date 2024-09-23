import ArticleApi from '../../api/api_articles.js';
import templates from './cards.hbs';

export default class Cards {
  constructor(parent) {
    this.parent = parent;
    this.items = items;
  }

  async render() {
    const template = Handlebars.templates['cards.hbs'];
    this.items = await ArticleApi.getArticles();
    this.parent.innerHTML = template({ items: this.items });
  }
}
