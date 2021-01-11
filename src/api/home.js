import axios from '../utils/request';

export function getHome() {
  return axios.get('/index-infos');
}