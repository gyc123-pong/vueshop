import axios from '../utils/request';

export const getCart = (params) => {
  return axios.get('/shop-cart', params)
}

export const addCart = (params) => {
  return axios.post('/shop-cart', params)
}