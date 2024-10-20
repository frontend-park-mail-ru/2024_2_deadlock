import Forms from './components/Forms/forms.js';
import Cards from './components/Cards/cards.js';
import Navigator from './router/navigator.js';
import UserState from './user/user.js';
import registerHelpers from './handlebars/helpers.js';

registerHelpers();
Navigator.handleRouteChange();
