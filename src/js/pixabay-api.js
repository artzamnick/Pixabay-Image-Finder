import axios from 'axios';

const API_KEY = '53386228-9ccf01ca4b721fbc8928b7547';
const BASE_URL = 'https://pixabay.com/api/';

export function getImagesByQuery(query, page = 1, per_page = 40) {
return axios
    .get(BASE_URL, {
    params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page,
    },
    })
    .then(response => response.data);
}