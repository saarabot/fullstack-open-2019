import axios from 'axios'
const baseUrl = '/api/users'

let token = null;

const getAll = async () => {
    console.log('get all users')
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.get(baseUrl, config)
  return request.data
};


const get = async id => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(`${baseUrl}/${id}`, config);
  return response.data;
}

export default { getAll, get }