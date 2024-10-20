import Forms from './components/Forms/forms.js';
import Cards from './components/Cards/cards.js';
import Navigator from './router/navigator.js';
import UserState from './user/user.js';
import Header from './components/Header/header.js';
import registerHelpers from './handlebars/helpers.js';
import styles from 'index.css';


// const Body = document.getElementsByTagName('body')[0];
// const PlaceForHeader = document.createElement('div');
// PlaceForHeader.classList.add('place-for-header');
// const MainContent = document.createElement('div');
// MainContent.classList.add('main-content');
// const ItemsContainer = document.createElement('div');
// ItemsContainer.classList.add('items-container');
// MainContent.appendChild(ItemsContainer);
// Body.appendChild(PlaceForHeader);
// Body.appendChild(MainContent);

registerHelpers();
Navigator.handleRouteChange();