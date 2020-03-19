import axios from 'axios';
import regeneratorRuntime from 'regenerator-runtime';

export const auth = async (link, data) => {
  return await axios({
    method: 'post',
    url: link,
    validateStatus: function (status) {
      return status >= 200 && status < 400; // default
    },
    data
  });
}