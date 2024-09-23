import Cards from './components/Cards/cards.js';

const cardsCollection = [
  {
    title: 'What is Lorem Ipsum?',
    description: 'text1',
    imageUrl: 'images/1.jpg',
  },
  { title: 'title2', description: 'text2' },
  { title: 'title3', description: 'text3', imageUrl: 'images/2.jpg' },
];

const feed = document.querySelector('.feed');
const cards = new Cards(feed, cardsCollection);
cards.render();
