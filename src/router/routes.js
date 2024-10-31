import Cards from '../components/Cards/cards.js';
import Article from '../components/Fields/article.js';
import Forms from '../components/Forms/forms.js';
import Header from '../components/Header/header.js';
import ViewArticle from '../components/Fields/viewarticle.ts';
import UserApi from '../api/api_user.ts';
import Settings from '../components/Settings/settings.ts';
import Profile from '../components/Profile/profile.ts';

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
  const fields = new Article(itemsContainer);
  fields.render();
  header.render();
}

function renderViewArticle() {
  const header = new Header(placeForHeader);
  const fields = new ViewArticle(itemsContainer);
  fields.render();
  header.render();
}

async function renderProfile(id = 1) {
  const user = await UserApi.getUser(1);
  const profile = new Profile(itemsContainer, user);
  profile.render();
  const header = new Header(placeForHeader);
  header.render();
}

async function renderSettings() {
  const currentUser = await UserApi.getCurrentUser();
  // const settingsResponse = await SettingsApi.getSettings();
  const settings = new Settings(itemsContainer, currentUser);

  settings.render();
  const header = new Header(placeForHeader);
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
  {
    path: '/viewarticle',
    render: renderViewArticle,
  },
  {
    path: `/profile`,
    render: renderProfile,
  },
  {
    path: '/settings',
    render: renderSettings,
  },
];
