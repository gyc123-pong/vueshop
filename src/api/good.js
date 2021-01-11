import axios from '../utils/request';

//点击搜索的商品
export const getDetail = (id) => {
  return axios.get(`/goods/detail/${id}`)
}