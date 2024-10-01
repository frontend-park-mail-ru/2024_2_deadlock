import Forms from './components/Forms/forms.js';
import Cards from './components/Cards/cards.js';
import Navigate from './navigate.js';

window.addEventListener('popstate', () => {
  const path = window.location.pathname.slice(1);
  Navigate(path);
});

Navigate('feed');
