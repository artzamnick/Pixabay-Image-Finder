import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const GALLERY_SELECTOR = '.gallery';
const LOADER_SELECTOR = '.loader';

const galleryRef = document.querySelector(GALLERY_SELECTOR);
const loaderRef = document.querySelector(LOADER_SELECTOR);

const lightbox = new SimpleLightbox(`${GALLERY_SELECTOR} a`, {
    captionsData: 'alt',
    captionDelay: 250,
});

export function createGallery(images) {
if (!galleryRef) return;

const markup = images
    .map(img => {
        return `
        <li class="gallery__item">
        <a class="gallery__link" href="${img.largeImageURL}">
            <div class="photo-card">
            <img class="photo-card__img" src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
            <div class="info">
                <p class="info-item"><b>Likes</b><br>${img.likes}</p>
                <p class="info-item"><b>Views</b><br>${img.views}</p>
                <p class="info-item"><b>Comments</b><br>${img.comments}</p>
                <p class="info-item"><b>Downloads</b><br>${img.downloads}</p>
            </div>
            </div>
        </a>
        </li>
        `;
    })
    .join('');

galleryRef.insertAdjacentHTML('beforeend', markup);
lightbox.refresh();
}

export function clearGallery() {
    if (!galleryRef) return;
    galleryRef.innerHTML = '';
    lightbox.refresh();
}

export function showLoader() {
    if (!loaderRef) return;
    loaderRef.classList.remove('is-hidden');
}

export function hideLoader() {
    if (!loaderRef) return;
    loaderRef.classList.add('is-hidden');
}