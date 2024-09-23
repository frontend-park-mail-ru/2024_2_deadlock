import Cards from './components/Cards/cards.js';

const cardsCollection = [
  { title: 'What is Lorem Ipsum?', description: 'text1', imageUrl: 'image1.jpg' },
  { title: 'title2', description: 'text2' },
  { title: 'title3', description: 'text3', imageUrl: 'image3.jpg' },
];

const feed = document.querySelector('.feed');
const cards = new Cards(feed, cardsCollection);
cards.render();
