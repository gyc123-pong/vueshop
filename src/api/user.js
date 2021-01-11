import axios from '../utils/request';
import request from '../utils/request';

//登录接口
export const login = (params) => {
  return request.post('/user/login', params)
}
// 注册接口
export const register = (params) => {
  return request.post('/user/register', params)
}

export const logout = () => {
  return axios.get('/user/logout')
}
//个人信息
export function getUserInfo() {
  return axios.get('/user/info');
}
