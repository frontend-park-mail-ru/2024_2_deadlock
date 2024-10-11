'use strict';
// Object.defineProperty(exports, "__esModule", { value: true });
import userState from '../../user.js';
// var user_js_1 = require("../../user.js");
var MAINPOPULAR = 'mainPopular';
var MAINLATEST = 'mainLatest';
var MAINOWN = 'mainOwn';
var SORTBYPOPULARITY = 'sortByPopularity';
var SORTBYDATE = 'sortByDate';
var Settings = /** @class */ (function () {
  function Settings(parent) {
    this.parent = parent;
    this.context = {
      isNameCorrect: true,
      isDescriptionCorrect: true,
      description: '',
      mainDefault: MAINPOPULAR,
      sort: SORTBYPOPULARITY,
    };
  }
  Settings.prototype.render = function () {
    var template = Handlebars.templates['settings.hbs'];
    this.parent.innerHTML = template({ user: userState.default, context: this.context });
  };
  return Settings;
})();
export default Settings;
