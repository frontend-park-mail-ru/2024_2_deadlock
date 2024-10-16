import Cards from '../components/Cards/cards.js';
import Fields from '../components/Fields/fields.js';
import Forms from '../components/Forms/forms.js';
import Header from '../components/Header/header.js';

const itemsContainer = document.querySelector('.items-container');
const placeForHeader = document.querySelector('.place-for-header');

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
  const cards = new Cards(itemsContainer);
  cards.render();
  header.render();
}

function renderRedactor() {
  const header = new Header(placeForHeader);
  const fields = new Fields(itemsContainer);
  fields.render();
  header.render();
}

export const routes = [
  {
    path: '/feed',
    render: renderFeed,
  },
  {
    path: '/reg',
    render: renderReg,
  },
  {
    path: '/auth',
    render: renderAuth,
  },
  {
    path: '/redactor',
    render: renderRedactor,
  },
];
