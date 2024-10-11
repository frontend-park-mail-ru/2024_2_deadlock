import ArticleApi from '../../api/api_articles.js';
<<<<<<< HEAD
import templates from './cards.hbs';
=======
>>>>>>> 1d08ef7 (app fix: fixed history api)

export default class Cards {
  constructor(parent) {
    this.parent = parent;
<<<<<<< HEAD
    this.items = items;
=======
>>>>>>> 1d08ef7 (app fix: fixed history api)
  }

  async render() {
    const template = Handlebars.templates['cards.hbs'];
    this.items = await ArticleApi.getArticles();
    this.parent.innerHTML = template({ items: this.items });
  }
}
