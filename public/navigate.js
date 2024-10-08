import Cards from './components/Cards/cards.js';
import Forms from './components/Forms/forms.js';
import Header from './components/Header/header.js';
import Profile from './components/Profile/profile.js';

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

function renderProfile() {
  const profile = new Profile(itemsContainer);
  profile.context.isPosts = true;
  profile.render();
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
  profile: {
    render: renderProfile,
  },
};

export default function Navigate(url) {
  placeForHeader.innerHTML = '';
  config[url].render();
  window.history.pushState({}, '', url);
}
