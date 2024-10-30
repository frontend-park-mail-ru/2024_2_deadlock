import Cards from '../components/Cards/cards.js';
import Forms from '../components/Forms/forms.js';
import Header from '../components/Header/header.js';
import Profile from '../components/Profile/profile.ts';
import Settings from '../components/Settings/settings.ts';
import UserApi from '../api/api_user.js';
import UserState from '../user/user.ts';
import SettingsApi from '../api/api_settings.ts'

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
    path: `/profile`,
    render: renderProfile,
  },
  {
    path: '/settings',
    render: renderSettings,
  },
];
