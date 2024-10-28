// import UserState from '../user/user';
// import Ajax from '../ajax/ajax.js';
// import Profile from '../components/Profile/profile.js';
// import { ApiPaths } from './api_config.js';
// import userState from '../user/user';

// class ProfileApi {
//   url: string;
//   constructor(url: string) {
//     this.url = url;
//   }

//   async getProfile(){
//     const response = await Ajax({
//       url: `${this.url}${ApiPaths.user.users}`,
//       method: 'GET',
//     });

//     let answer = {};
//     let isApiError: boolean = false;
//     let apiErrorText: string = '';

//     switch (response.status) {
//       case 200:
//         answer = response.body.data;
//         break;
//       case 404:
//         isApiError = true;
//         apiErrorText = 'Пользователь с таким именем не существует';
//         break;
//       default:
//         isApiError = true;
//         apiErrorText = 'Ошибка на стороне сервера';
//     }
//     return answer;
//   }
// }


// export default new ProfileApi(`${ApiPaths.baseUrl}`);
