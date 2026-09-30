import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './render-functions.js';

const searchForm = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('#load-more');

let query = '';
let page = 1;
const perPage = 15;

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  query = event.currentTarget.elements.query.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Caution',
      message: 'Please enter a search query',
      position: 'topRight',
    });
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } else {
      createGallery(data.hits);

      if (data.totalHits > perPage) {
        showLoadMoreButton();
      }
    }
  } catch (error) {
    handleSearchError();
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);
    smoothScroll();

    const totalPages = Math.ceil(data.totalHits / perPage);
    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    handleSearchError();
  } finally {
    hideLoader();
  }
});

function handleSearchError() {
  iziToast.error({
    title: 'Error',
    message: 'Something went wrong. Please try again later.',
    position: 'topRight',
  });
}

function smoothScroll() {
  const galleryItem = document.querySelector('.gallery__item');
  if (galleryItem) {
    const { height } = galleryItem.getBoundingClientRect();
    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });
  }
}
