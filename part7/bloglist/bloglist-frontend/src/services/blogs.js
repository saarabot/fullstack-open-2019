import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

const setToken = (t) => {
  console.log(t);
  token = `bearer ${t}`;
};

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
};

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const addLike = async updatedBlog => {
  console.log('like!')
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config);
  return response.data;
};

const remove = async id => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
}

export default { getAll, setToken, create, addLike, remove }