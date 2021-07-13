import axios from 'axios';

const config = {
  headers: {'Accept': 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
},
};
const instance = axios.create(config);

instance.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json; charset=UTF-8';
  return config;
});
export default instance;
