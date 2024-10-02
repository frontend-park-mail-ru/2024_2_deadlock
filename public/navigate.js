import Cards from './components/Cards/cards.js';
import Forms from './components/Forms/forms.js';
import Header from './components/Header/header.js';

const itemsContainer = document.querySelector('.items-container');
const placeForHeader = document.querySelector('.place-for-header');

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
          text1 text1 text1 text1 text1 text1 text text1 text1 text1 text1 text1 `,
    imageUrl: 'images/1.jpg',
  },
];

function renderAuth() {
  const forms = new Forms(itemsContainer);
  forms.context.isReg = false;
  forms.render();
}

function renderReg() {
  const forms = new Forms(itemsContainer);
  forms.context.isReg = true;
  forms.render();
}

function renderFeed() {
  const header = new Header(placeForHeader);
  const cards = new Cards(itemsContainer, cardsCollection);
  cards.render();
  header.render();
}

const config = {
  feed: {
    render: renderFeed,
  },
  reg: {
    render: renderReg,
  },
  auth: {
    render: renderAuth,
  },
};

export default function Navigate(url) {
  placeForHeader.innerHTML = '';
  config[url].render();
  window.history.pushState({}, '', url);
}
