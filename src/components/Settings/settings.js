'use strict';

// import userState from "../../user/user";

// Object.defineProperty(exports, "__esModule", { value: true });
// var user_js_1 = require("../../user/user.js");
import userState from '../../user/user.js';
// var handlebars_1 = require("handlebars");
import Handlebars from 'handlebars';
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
    var template = Handlebars.default.templates['settings.hbs'];
    this.parent.innerHTML = template({ user: userState.default, context: this.context });
    var inputCounter = document.querySelector('.input-counter');
    var inputField = document.querySelector('#name-input');
    inputField.value = userState.default.name.length.toString();
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
    Handlebars.default.registerHelper('split', function (str) {
      return str.split('');
    });
    var linkConfirm = document.querySelector('.link-confirm[name=name-description-save]');
    var form = document.querySelector('#name-description-form');
    console.log(linkConfirm);
    linkConfirm === null || linkConfirm === void 0
      ? void 0
      : linkConfirm.addEventListener('click', function (event) {
          event.preventDefault();
          form.submit();
        });
  };
  return Settings;
})();
export default Settings;
