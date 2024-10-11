import Ajax from '../ajax/ajax.js';
import { ApiPaths } from './api_config.js';

class ArticleApi {
  constructor(url) {
    this.url = url;
  }

  async getArticles() {
    const response = await Ajax({
      url: `${this.url}${ApiPaths.feed}`,
      method: 'GET',
    });
    let answer = {};
    switch (response.status) {
      case 200:
        answer = response.body.data;
        break;
      default:
        console.error('Error', response.status, response.error);
    }
    return answer;
  }
}

export default new ArticleApi(`${ApiPaths.baseUrl}`);
