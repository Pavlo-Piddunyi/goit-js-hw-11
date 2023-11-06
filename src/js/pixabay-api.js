import axios from "axios";

const API_KEY = '40469967-3d109d17179afef744762c56e'
axios.defaults.baseURL = 'https://pixabay.com/api/';


async function getPhoto(query, page = 1, per_page = 40) {
  const settings = {
    params: {
      key: API_KEY,
      q: query,
      page,
      per_page,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true'
    },
    headers: {
      'Content-Type': 'application/json',
    }
  }
  
  const data = await axios.get('', settings);

  return data
}

export {getPhoto}