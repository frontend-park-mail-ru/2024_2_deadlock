import Forms from './components/Forms/forms.js';
import Cards from './components/Cards/cards.js';
import Navigator from './router/navigator.js';
import UserState from './user/user.js';
import registerHelpers from './handlebars/helpers.js';

registerHelpers();
Navigator.handleRouteChange();

// function getCaretPosition() {
//   const selection = window.getSelection();

//   if (selection.isCollapsed) {
//     // Каретка находится в этом узле
//     const caretNode = selection.anchorNode;
//     // А это позиция каретки внутри узла
//     const caretOffset = selection.anchorOffset;
//     console.log('A', caretNode, caretOffset);
//     // Тут можно, например, через caretNode.parentNode добраться до блока, в котором лежит этот узел.
//   } else {
//     // Выделение начинается в этом узле
//     const startContainer = selection.anchorNode;
//     // А заканчивается в этом узле
//     const endConteiner = selection.focusOffset;
//     console.log('B', startContainer, endConteiner);
//   }
// }

// function makeSelectedTextBold() {
//   console.log('yes');
//   try {
//     const selection = window.getSelection();
//     if (!selection.isCollapsed) {
//       let range = selection.getRangeAt(0);
//       console.log('yesyes');
//       const span = document.createElement('span');
//       span.classList.add('bold');
//       range.surroundContents(span);
//     }
//   } catch (error) {
//     console.error('Ошибка при обортывании выделенного текста:', error);
//   }
// }

// let up_buttons = document.querySelectorAll('.up-href');
// up_buttons.forEach((button) => {
//   button.addEventListener('click', (event) => {
//     let id = Number(event.target.dataset.id);

//     let cur = document.querySelector(`.div-input[data-id="${id}"]`);
//     let downer = document.querySelector(`.div-input[data-id="${id - 1}"]`);

//     let tempClass = cur.className;
//     let temp = cur.innerHTML;

//     cur.innerHTML = downer.innerHTML;
//     cur.className = downer.className;
//     downer.innerHTML = temp;
//     downer.className = tempClass;
//   });
// });

// let down_buttons = document.querySelectorAll('.down-href');
// down_buttons.forEach((button) => {
//   button.addEventListener('click', (event) => {
//     let id = Number(event.target.dataset.id);

//     let cur = document.querySelector(`.div-input[data-id="${id}"]`);
//     let downer = document.querySelector(`.div-input[data-id="${id + 1}"]`);

//     let tempClass = cur.className;
//     let temp = cur.innerHTML;

//     cur.innerHTML = downer.innerHTML;
//     cur.className = downer.className;
//     downer.innerHTML = temp;
//     downer.className = tempClass;
//   });
// });

// let down_buttons = document.querySelectorAll('.down-href');
// down_buttons.forEach((button) => {
//   button.addEventListener('click', (event) => {
//   });
// });

// let header_buttons = document.querySelectorAll('.make-header-href');
// header_buttons.forEach((button) => {
//   button.addEventListener('click', (event) => {
//     let id = Number(event.target.dataset.id);
//     let cur = document.querySelector(`.div-input[data-id="${id}"]`);
//     cur.classList.remove('regular-text');
//     cur.classList.add('header-text');
//   });
// });

// let text_buttons = document.querySelectorAll('.make-text-href');
// text_buttons.forEach((button) => {
//   button.addEventListener('click', (event) => {
//     let id = Number(event.target.dataset.id);
//     let cur = document.querySelector(`.div-input[data-id="${id}"]`);
//     cur.classList.remove('header-text');
//     cur.classList.add('regular-text');
//   });
// });

// document.querySelector('.redactor-container').addEventListener('click', makeSelectedTextBold);
// document.querySelector('.redactor-container').addEventListener('focus', getCaretPosition);
