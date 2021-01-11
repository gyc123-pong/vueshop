import axios from '../utils/request';

export const getCategotyDate = () => {
  return axios.get('/categories')
}