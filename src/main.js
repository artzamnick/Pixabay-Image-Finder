import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('.form-input');

if (!form || !input) {
    console.error('Не знайдено .form або .form-input в DOM.');
}

form.addEventListener('submit', onSearchSubmit);

function onSearchSubmit(event) {
    event.preventDefault();
    const query = input.value.trim();

if (!query) {
    iziToast.warning({
        title: 'Увага',
        message: 'Будь ласка, введіть слово для пошуку.',
        position: 'topRight',
        timeout: 3000,
    });
    return;
}

clearGallery();
showLoader();

getImagesByQuery(query)
    .then(data => {
    if (!data || !Array.isArray(data.hits)) {
        throw new Error('Unexpected response from API');
    }

    if (data.hits.length === 0) {
        iziToast.info({
            title: 'Немає результатів',
            message: 'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
            timeout: 4000,
        });
        return;
    }

    createGallery(data.hits);
    iziToast.success({
        title: 'Успіх',
        message: `Знайдено ${data.hits.length} зображень за запитом "${query}".`,
        position: 'topRight',
        timeout: 3000,
        });
    })
    .catch(err => {
        console.error(err);
        iziToast.error({
        title: 'Помилка',
        message: 'Не вдалося завантажити зображення. Перевірте інтернет-зʼєднання або повторіть спробу.',
        position: 'topRight',
        timeout: 5000,
    });
    })
    .finally(() => {
        hideLoader();
    });
}