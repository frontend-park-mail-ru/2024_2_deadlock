(() => {
  'use strict';
  async function t({ method: t, url: e, body: r = null }) {
    const s = { credentials: 'include', method: t, header: { 'Content-Type': 'application/json' } };
    'POST' === t && (s.body = JSON.stringify(r));
    const o = await fetch(e, s);
    let i;
    try {
      i = await o.json();
    } catch {
      return {
        status: o.status,
        error: 'failed to parse respBody',
        body: 'failed to parse respBody',
      };
    }
    return o.status >= 400 ? { status: o.status, error: i } : { status: o.status, body: i };
  }
  class e {
    constructor(t, e) {
      (this.parent = t), (this.items = {});
    }
    async render() {
      const t = Handlebars.templates['cards.hbs'];
      await this.getCurrentCards2(), (this.parent.innerHTML = t({ items: this.items }));
    }
    async getCurrentCards2() {
      const e = await t({ url: 'http://dead-vc.ru/api/v1/feed', method: 'GET' });
      200 === e.status
        ? ((this.items = e.body.data), console.log(this.items))
        : console.error('Error', e.status, e.error);
    }
  }
  const r = new (class {
    constructor() {
      (this.isAuthorized = !1), (this.email = '');
    }
    login() {
      this.isAuthorized = !0;
    }
    logout() {
      this.isAuthorized = !1;
    }
    setEmail(t) {
      this.email = t;
    }
    removeEmail() {
      this.email = '';
    }
  })();
  class s {
    constructor(t) {
      this.parent = t;
    }
    render() {
      const t = Handlebars.templates['header.hbs'];
      (this.parent.innerHTML = t({ user: r })),
        r.isAuthorized
          ? document.querySelector('#logout-button').addEventListener('click', (t) => {
              t.preventDefault(), this.Logout();
            })
          : document.querySelector('#enter-button').addEventListener('click', (t) => {
              t.preventDefault(), a('auth');
            });
    }
    async Logout() {
      const e = await t({ url: 'http://dead-vc.ru/api/v1/logout', method: 'POST' });
      200 === e.status
        ? (console.log('Logout successful', e.status, e.body),
          r.logout(),
          r.removeEmail(),
          a('feed'))
        : console.error('Error', e.status, e.error);
    }
  }
  const o = document.querySelector('.items-container'),
    i = document.querySelector('.place-for-header'),
    n = {
      feed: {
        render: function () {
          const t = new s(i);
          new e(o).render(), t.render();
        },
      },
      reg: {
        render: function () {
          const t = new c(o);
          (t.context.isReg = !0), t.render();
        },
      },
      auth: {
        render: function () {
          const t = new c(o);
          (t.context.isReg = !1), t.render();
        },
      },
    };
  function a(t) {
    (i.innerHTML = ''), n[t].render(), window.history.pushState({}, '', t);
  }
  class c {
    constructor(t) {
      (this.parent = t),
        (this.context = {
          isReg: !1,
          isEmailCorrect: !0,
          isPasswordCorrect: !0,
          isPasswordRepeatCorrect: !0,
          isApiError: !1,
          apiErrorText: '',
        });
    }
    isValidEmail(t) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
    }
    isValidPassword(t) {
      return /^[a-zA-Z0-9?!_\-*$]{6,}$/.test(t);
    }
    render() {
      console.log('new form, isEmailCorrect: ', this.context);
      const t = Handlebars.templates['forms.hbs'];
      (this.parent.innerHTML = t({ context: this.context })),
        document
          .querySelector('.auth-form-inputs')
          .addEventListener('submit', this.handleSubmit.bind(this)),
        document.querySelector('#authhref').addEventListener('click', (t) => {
          t.preventDefault(), a('auth');
        }),
        document.querySelector('#reghref').addEventListener('click', (t) => {
          t.preventDefault(), a('reg');
        });
    }
    handleSubmit(t) {
      t.preventDefault();
      const e = document.querySelector('#email-input'),
        r = document.querySelector('#password-input'),
        s = e.value.trim(),
        o = r.value.trim(),
        i = this.isValidEmail(s),
        n = this.isValidPassword(o);
      if (
        ((this.context.isEmailCorrect = !!i),
        (this.context.isPasswordCorrect = !!n),
        console.log(s, o),
        this.context.isReg)
      ) {
        const t = document.querySelector('#password-input-repeat').value.trim();
        this.context.isPasswordRepeatCorrect = t === o;
      }
      this.context.isEmailCorrect &&
      this.context.isPasswordCorrect &&
      this.context.isPasswordRepeatCorrect
        ? this.context.isReg
          ? this.Register({ password: o, email: s })
          : this.Login({ password: o, email: s })
        : this.render();
    }
    async Register({ password: e, email: s }) {
      const o = await t({
        url: 'http://dead-vc.ru/api/v1/register',
        method: 'POST',
        body: { password: e, email: s },
      });
      switch (o.status) {
        case 200:
          (this.context.isApiError = !1), r.login(), r.setEmail(s), a('feed');
          break;
        case 409:
          console.error('User with this email already exists', o.status, o.error),
            (this.context.isApiError = !0),
            (this.context.apiErrorText = 'Пользователь с этим именем существует'),
            this.render();
          break;
        default:
          console.error('Error', o.status, o.error),
            (this.context.isApiError = !0),
            (this.context.apiErrorText = 'Ошибка на стороне сервера'),
            this.render();
      }
    }
    async Login({ password: e, email: s }) {
      const o = await t({
        url: 'http://dead-vc.ru/api/v1/login',
        method: 'POST',
        body: { password: e, email: s },
      });
      switch (o.status) {
        case 200:
          (this.context.isApiError = !1), r.login(), r.setEmail(s), a('feed');
          break;
        case 404:
          console.error('User not found', o.status, o.error),
            (this.context.isApiError = !0),
            (this.context.apiErrorText = 'Неверный логин или пароль'),
            this.render();
          break;
        default:
          (this.context.isApiError = !0),
            (this.context.apiErrorText = 'Ошибка на стороне сервера'),
            console.error('Error', o.status, o.error),
            this.render();
      }
    }
  }
  window.addEventListener('popstate', () => {
    a(window.location.pathname.slice(1));
  }),
    a('feed');
})();
