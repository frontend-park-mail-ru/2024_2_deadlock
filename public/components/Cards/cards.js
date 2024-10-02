const cardsCollection = [
  {
    Title: 'What is Lorem Ipsum? What is Lorem Ipsum?',
    Body: `text1 text1 text1 text1 text1 text1 text text1 text1 text1 text1 
          text1 text1 text text1 text1 text1 text1 text1 text1 text text1 text1  
          text1 text1 text1 text1 text text1 text1 text1 text1 text1 text1 text 
          text1 text1 text1 text1 text1 text1 text text1 text1 text1 text1 
          text1 text1 text text1 text1 text1 text1 text1 text1 text text1 text1  
          text1 text1 text1 text1 text text1 text1 text1 text1 text1 text1 text 
          `,
    MediaUrl: 'images/1.jpg',
  },
  {
    Title: 'title2',
    Body: `text1 text1 text1 text1 text1 text1 text text1 text1 text1 text1 
          text1 text1 text text1 text1 text1 text1 text1 text1 text text1 text1  
          `,
  },
  {
    Title: 'title3',
    Body: `text1 text1 text1 text1 text1 text1 text text1 text1 text1 text1 
          text1 text1 text text1 text1 text1 text1 text1 text1 text text1 text1  
          text1 text1 text1 text1 text text1 text1 text1 text1 text1 text1 text 
          text1 text1 text1 text1 text1 text1 text text1 text1 text1 text1 text1 
          text1 text text1 text1 text1 text1 text1 text1 text`,
    MediaUrl: 'images/1.jpg',
  },
  {
    Title: 'title4',
    Body: `text1 text1 text1 text1 text1 text1 text text1 text1 text1 text1 
          text1 text1 text text1 text1 text1 text1 text1 text1 text text1 text1  
          `,
  },
  {
    Title: 'title3',
    Body: `text1 text1 text1 text1 text1 text1 text text1 text1 text1 text1 
          text1 text1 text text1 text1 text1 text1 text1 text1 text text1 text1  
          text1 text1 text1 text1 text text1 text1 text1 text1 text1 text1 text 
          text1 text1 text1 text1 text1 text1 text text1 text1 text1 text1 text1 `,
    MediaUrl: 'images/1.jpg',
  },
];

export default class Cards {
  constructor(parent, items) {
    this.parent = parent;
    this.items = {};
  }

  render() {
    const template = Handlebars.templates['cards.hbs'];
    this.getCurrentCards();
    this.parent.innerHTML = template({ items: this.items });
  }

  getCurrentCards() {
    this.items = cardsCollection;
  }

  async getCurrentCards2() {
    const response = await Ajax({
      url: 'http://localhost:8000/api/v1/cards',
      method: 'GET',
    });

    switch (response.status) {
      case 200:
        this.items = response.body;
        break;
      default:
        console.error('Error', response.status, response.error);
    }
  }
}
