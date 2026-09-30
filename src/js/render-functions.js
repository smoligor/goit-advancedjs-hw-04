import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('#gallery');
const loader = document.querySelector('#loader');
const loadMoreBtn = document.querySelector('#load-more');

let lightbox = null;

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class="gallery__item">
            <a class="gallery__link" href="${largeImageURL}">
                <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
            </a>
            <div class="info">
                <p class="info-item"><b>Likes</b><br>${likes}</p>
                <p class="info-item"><b>Views</b><br>${views}</p>
                <p class="info-item"><b>Comments</b><br>${comments}</p>
                <p class="info-item"><b>Downloads</b><br>${downloads}</p>
            </div>
        </li>
    `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  }
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.style.display = 'block';
}

export function hideLoader() {
  loader.style.display = 'none';
}

export function showLoadMoreButton() {
  loadMoreBtn.style.display = 'block';
}

export function hideLoadMoreButton() {
  loadMoreBtn.style.display = 'none';
}
