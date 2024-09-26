import Cards from './components/Cards/cards.js';

const cardsCollection = [
  {
    title: 'What is Lorem Ipsum? What is Lorem Ipsum?',
    description: `text1 text1 text1 text1 text1 text1 text text1 text1 text1 text1 
      text1 text1 text text1 text1 text1 text1 text1 text1 text text1 text1  
      text1 text1 text1 text1 text text1 text1 text1 text1 text1 text1 text 
      text1 text1 text1 text1 text1 text1 text text1 text1 text1 text1 
      text1 text1 text text1 text1 text1 text1 text1 text1 text text1 text1  
      text1 text1 text1 text1 text text1 text1 text1 text1 text1 text1 text 
      `,
    imageUrl: 'images/1.jpg',
  },
  {
    title: 'title2',
    description: `text1 text1 text1 text1 text1 text1 text text1 text1 text1 text1 
      text1 text1 text text1 text1 text1 text1 text1 text1 text text1 text1  
      `,
  },
  {
    title: 'title3',
    description: `text1 text1 text1 text1 text1 text1 text text1 text1 text1 text1 
      text1 text1 text text1 text1 text1 text1 text1 text1 text text1 text1  
      text1 text1 text1 text1 text text1 text1 text1 text1 text1 text1 text 
      text1 text1 text1 text1 text1 text1 text text1 text1 text1 text1 text1 
      text1 text text1 text1 text1 text1 text1 text1 text`,
    imageUrl: 'images/1.jpg',
  },
  {
    title: 'title4',
    description: `text1 text1 text1 text1 text1 text1 text text1 text1 text1 text1 
      text1 text1 text text1 text1 text1 text1 text1 text1 text text1 text1  
      `,
  },
  {
    title: 'title3',
    description: `text1 text1 text1 text1 text1 text1 text text1 text1 text1 text1 
      text1 text1 text text1 text1 text1 text1 text1 text1 text text1 text1  
      text1 text1 text1 text1 text text1 text1 text1 text1 text1 text1 text 
      text1 text1 text1 text1 text1 text1 text text1 text1 text1 text1 text1 
      text1 text text1 text1 text1 text1 text1 text1 text`,
    imageUrl: 'images/1.jpg',
  },
];

const feed = document.querySelector('.main-content__feed');
const cards = new Cards(feed, cardsCollection);
cards.render();
