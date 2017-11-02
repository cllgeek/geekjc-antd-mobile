import axios from 'axios'

var request = axios.create({
  baseURL: 'https://www.geekjc.com'
});

export default request