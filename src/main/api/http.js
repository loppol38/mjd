'use strict'

import axios from 'axios'
import qs from 'qs'
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true

const http = axios.create({
  baseURL: process.env.VUE_APP_AXIOS_BASEURL,
  timeout: 10000,
  transformRequest: [data => qs.stringify(data, { arrayFormat: 'repeat' })]
})

// http.interceptors.request.use(
//   function (config) {
//     let token = utils.sessionStorage.getToken()
//     if (process.env.VUE_APP_MOCK_TOKEN) {
//       token = process.env.VUE_APP_MOCK_TOKEN;
//     }
//     config.headers.common["Authorization"] = token;
//     let url = config.url;
//     if (url.indexOf("?") === -1) {
//       url += `?t=${Date.now()}`;
//     } else {
//       url += `&t=${Date.now()}`;
//     }
//     config.url = url;
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );
//
// http.interceptors.response.use(
//   function (response) {
//     let token = response.headers.token;
//     if (token) {
//       utils.sessionStorage.saveToken(token);
//     }
//     let data = response.data;
//     if (!data) {
//       return Promise.reject(new Error("请求失败！"));
//     } else if (!data.succ) {
//       console.error(response);
//       return Promise.reject(new Error(data.msg));
//     }
//     return data.content;
//   },
//   function (error) {
//     if (error.response) {
//       console.error(error);
//       if (error.response.code === 202) {
//         return Promise.reject(new Error(error.response.data.msg));
//       }
//     }
//     return Promise.reject(new Error("请求失败！"))
//   }
// )

export default http
