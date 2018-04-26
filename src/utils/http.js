import axios from 'axios';
// import { Message } from 'element-ui';
// import router from '../router';
import { getCookie } from '../utils/cookie';

axios.defaults.timeout = 5000;
axios.defaults.baseURL = '';
axios.defaults.withCredentials=true;

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    const token = getCookie('token');
    const newConfig = config;
    newConfig.data = JSON.stringify(config.data);
    newConfig.headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      newConfig.params = { token };
    }
    return newConfig;
  },
  (error) => {
    if (error.response) {
      // Message.error('错了哦，这是一条错误消息');
    }
    Promise.reject(error);
  },
);


// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.data.status === 400) {
      // router.push({
      //   // path: '/login',
      //   // querry: { redirect: router.currentRoute.fullPath }, // 从哪个页面跳转
      // });
    }
    return response.data;
  },
  error => Promise.reject(error),
);


export default axios;
