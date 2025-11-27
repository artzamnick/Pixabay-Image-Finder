import { getImagesByQuery } from './js/pixabay-api.js';
import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton,
    refs,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('.form-input');

const loadMoreBtn = refs.loadMoreRef;
const gallery = refs.galleryRef;

let currentQuery = ''; 
let page = 1;            
let totalHits = 0;       
const PER_PAGE = 15;     

if (!form || !input) {
console.error('Не знайдено .form або .form-input в DOM.');
}

form.addEventListener('submit', onSearchSubmit);
if (loadMoreBtn) loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearchSubmit(e) {
e.preventDefault();
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

const isNewSearch = query !== currentQuery;
if (isNewSearch) {
    currentQuery = query;
    page = 1;
    totalHits = 0;
    clearGallery();
    hideLoadMoreButton();
}
await fetchAndRender();
}

async function onLoadMore() {
await fetchAndRender();
scrollAfterLoad();
}

async function fetchAndRender() {
if (!currentQuery) return;
showLoader();
try {
    const data = await getImagesByQuery(currentQuery, page);

    if (!data || !Array.isArray(data.hits)) {
    throw new Error('Unexpected response from API');
    }

    if (data.hits.length === 0 && page === 1) {
    iziToast.info({
        title: 'Немає результатів',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        timeout: 4000,
    });
    hideLoadMoreButton();
    return;
    }

    if (page === 1) {
    totalHits = data.totalHits || 0;
    iziToast.success({
        title: 'Успіх',
        message: `Знайдено ${totalHits} зображень за запитом "${currentQuery}".`,
        position: 'topRight',
        timeout: 3000,
    });
    }

    createGallery(data.hits);

    const loadedImagesCount = (page - 1) * PER_PAGE + data.hits.length;

    if (loadedImagesCount >= totalHits) {
    hideLoadMoreButton();
    iziToast.info({
        title: 'Кінець колекції',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        timeout: 4000,
    });
    } else {
    showLoadMoreButton();
    page += 1;
    }
} catch (err) {
    console.error(err);
    iziToast.error({
    title: 'Помилка',
    message: 'Не вдалося завантажити зображення. Перевірте інтернет-зʼєднання або повторіть спробу.',
    position: 'topRight',
    timeout: 5000,
    });
} finally {
    hideLoader();
}
}

function scrollAfterLoad() {
if (!gallery) return;
const firstCard = gallery.querySelector('.gallery__item');
if (!firstCard) return;
const { height } = firstCard.getBoundingClientRect();
window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
});
}