export const ApiPaths = {
  baseUrl: 'http://localhost:8000/api/v1',
  user: {
    login: '/login',
    register: '/register',
    logout: '/logout',
  },
  article: {
    url: '/article',
    field: '/article/field/',
  },
  fields: '/fields/',
  feed: '/feed',
  image: '/image',
  swap: '/swap',
};

// export const ApiPaths = {
//   baseUrl: 'http://localhost:8000/api/v1',
//   user: {
//     baseUrl: `${baseUrl}`,
//     login: `${user.baseUrl}/login`,
//     register: `${user.baseUrl}/register`,
//     logout: `${user.baseUrl}/logout`,
//   },
//   feed: {
//     baseUrl: `${this.baseUrl}/feed`,
//   },
//   article: {
//     baseUrl: `${this.baseUrl}/article`,
//     field: {
//       baseUrl: `${this.article.baseUrl}/field/`,
//     },
//   },
//   image: '/image',
//   swap: '/swap',
// };
