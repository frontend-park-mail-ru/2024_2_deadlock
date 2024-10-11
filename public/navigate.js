import Cards from './components/Cards/cards.js';
import Forms from './components/Forms/forms.js';
import Header from './components/Header/header.js';
import Profile from './components/Profile/profile.js';
import Settings from './components/Settings/settings.js';

const itemsContainer = document.querySelector('.items-container');
const placeForHeader = document.querySelector('.place-for-header');

function renderAuth() {
  placeForHeader.innerHTML = '';
  const forms = new Forms(itemsContainer);
  forms.context.isReg = false;
  forms.render();
}

function renderReg() {
  placeForHeader.innerHTML = '';
  const forms = new Forms(itemsContainer);
  forms.context.isReg = true;
  forms.render();
}

function renderFeed() {
  const cards = new Cards(itemsContainer);
  cards.render();
  const header = new Header(placeForHeader);
  header.render();
}

function renderProfile() {
  const profile = new Profile(itemsContainer);
  profile.context.isPosts = true;
  profile.render();
  const header = new Header(placeForHeader);
  header.render();
}

function renderSettings() {
  const settings = new Settings(itemsContainer);
  settings.render();
  const header = new Header(placeForHeader);
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
  profile: {
    render: renderProfile,
  },
  settings: {
    render: renderSettings,
  },
};

export default function Navigate(url) {
  config[url].render();
  window.history.pushState({}, '', url);
}
