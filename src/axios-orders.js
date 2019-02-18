import axios from 'axios';

const instance = axios.create({
  baseURL:'https://burger-app-acd79.firebaseio.com/'
});
  
export default instance;