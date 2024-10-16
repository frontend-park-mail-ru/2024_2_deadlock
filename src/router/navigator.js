import { routes } from './routes.js';

class Navigator {
  constructor() {
    this.routes = routes;
    this.currentRoute = null;
    this.handlePopState = this.handlePopState.bind(this);
    window.addEventListener('popstate', this.handlePopState);
  }

  handleRouteChange() {
    const currentPath = window.location.pathname;
    const route = this.routes.find((elem) => elem.path === currentPath);
    if (route) {
      this.currentRoute = route;
      this.currentRoute.render();
    } else {
      console.error(`path ${currentPath} not found`);
    }
  }

  handlePopState(event) {
    this.handleRouteChange();
  }

  navigateTo(path) {
    const currentPath = window.location.pathname;
    if (currentPath != path) {
      window.history.pushState({ path }, '', path);
    }
    this.handleRouteChange();
  }
}

export default new Navigator();
