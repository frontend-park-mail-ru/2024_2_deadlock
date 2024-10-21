import ArticleApi from '../../api/api_articles.js';
import templates from './cards.hbs';

export default class Cards {
  constructor(parent) {
    this.parent = parent;
  }

  async render() {
    this.items = await ArticleApi.getArticles();
    this.parent.innerHTML = templates({ items: this.items });
  }
}
