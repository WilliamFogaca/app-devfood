import axios from 'axios';
import regeneratorRuntime from 'regenerator-runtime';

export const post = async (link, data, token = null) => {
  return await axios({
    method: 'POST',
    url: link,
    validateStatus: function (status) {
      return status >= 200 && status < 400; // default
    },
    data,
    headers: token !== null ? {'Authorization': `Token ${token}`} : ''
  });
}

export const get = (link, token) => {
  return axios({
    method: 'GET',
    url: link,
    validateStatus: function (status) {
      return status >= 200 && status < 400; // default
    },
    headers: {'Authorization': `Token ${token}`}
  });
}

export const put = (link, token) => {
  return axios({
    method: 'PUT',
    url: link,
    validateStatus: function (status) {
      return status >= 200 && status < 400; // default
    },
    headers: {'Authorization': `Token ${token}`}
  });
}

export const deleteR = (link, token) => {
  return axios({
    method: 'DELETE',
    url: link,
    validateStatus: function (status) {
      return status >= 200 && status < 400; // default
    },
    headers: {'Authorization': `Token ${token}`}
  });
}