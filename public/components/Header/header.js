import Navigate from '../../navigate.js';

export default class Header {
  constructor(parent) {
    this.parent = parent;
  }

  render() {
    const template = Handlebars.templates['header.hbs'];
    this.parent.innerHTML = template({});

    const enterButton = document.querySelector('#enter-button');
    enterButton.addEventListener('click', (event) => {
      event.preventDefault();
      Navigate('auth');
    });
  }
}
