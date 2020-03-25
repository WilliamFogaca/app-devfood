import axios from 'axios';

const API = axios.create({
  baseURL: 'https://receitas.devari.com.br/'
});

export const post = (link, data, token = null) => {
  return API.post(
    link, 
    data,
    {headers: token !== null ? {'Authorization': `Token ${token}`} : ''}
  );
}

export const get = (link, token) => {
  const headers = {
    'Authorization': `Token ${token}`
  }
  return API.get(
    link, 
    { headers }
  );
}

export const put = (link, data, token) => {
  const headers = {
    'Authorization': `Token ${token}`
  }
  return API.put(
    link, 
    data,
    { headers }
  );
}

export const deleteR = (link, token) => {
  const headers = {
    'Authorization': `Token ${token}`
  }
  return API.delete(
    link, 
    { headers }
  );
}