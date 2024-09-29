export const MENU_RENDER_TYPES = {
  SIGNUP: 'SIGNUP',
  LOGIN: 'LOGIN',
}

export class Menu {
  #parent
  #config
  constructor(parent, config) {
      this.#parent = parent;
      this.#config = config;

      this.state = {
          activeLink: null,
          menuElements: {},
      }
  }

  get config() {
      return this.#config;
  }

  render() {
    const template = Handlebars.templates['menu.hbs'];
    const items = this.items.map(([key, { href, text }], index) => {
        let className = 'slider-tab';
        if (index === 0) {
            className += '__active';
        }
        return { key, href, text, className };
    });
    this.#parent.innerHTML = template({ items });
    this.#parent.querySelectorAll('a').forEach((element) => {
        this.state.menuElements[element.dataset.section] = element;
    })
  }

  get items() {
      return Object.entries(this.config.menu);
  }
}