'use strict';
// Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_js_1 = require('handlebars/dist/handlebars.js');
var user_js_1 = require('../../user/user.js');
var MAIN_POPULAR = 'mainPopular';
var MAIN_LATEST = 'mainLatest';
var MAIN_OWN = 'mainOwn';
var SORT_BY_POPULARITY = 'sortByPopularity';
var SORT_BY_DATE = 'sortByDate';
var MAX_NAME_LENGTH = 30;
var Settings = /** @class */ (function () {
  function Settings(parent) {
    this.parent = parent;
    this.context = {
      isNameCorrect: true,
      isDescriptionCorrect: true,
      description: '',
      mainDefault: MAIN_POPULAR,
      sort: SORT_BY_POPULARITY,
    };
  }
  Settings.prototype.render = function () {
    var template = handlebars_js_1.default.templates['settings.hbs'];
    this.parent.innerHTML = template({ user: user_js_1.default, context: this.context });
    var inputCounter = document.querySelector('.input-counter');
    var inputField = document.querySelector('#name-input');
    var inputLength = inputField.value.length;
    console.log(inputField);
    console.log(inputLength);
    var countHandler = function () {
      if (inputCounter && inputLength) {
        var difference = MAX_NAME_LENGTH - inputLength;
        inputCounter.textContent = difference.toString();
      }
    };
    inputField === null || inputField === void 0
      ? void 0
      : inputField.addEventListener('click', function (event) {
          countHandler();
        });
    document.addEventListener('DOMContentLoaded', function (event) {
      countHandler();
    });
  };
  return Settings;
})();
export default Settings;
