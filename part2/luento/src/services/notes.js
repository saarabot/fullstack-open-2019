import axios from 'axios';
//const baseUrl = 'http://localhost:3001/notes';
//const baseUrl = 'https://salty-shore-81914.herokuapp.com/notes'
//backend and frontend at the same address
const baseUrl = '/api/notes'; 

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data).catch(er => console.log(er));
}

const create = newObject => {
    return axios.post(baseUrl, newObject).then(response => response.data);
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data);
}

export default {
    getAll,
    create,
    update
}