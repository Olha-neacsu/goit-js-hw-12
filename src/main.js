import './css/styles.css';

import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from './js/pixabay-api';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton, showEndMessage, hideEndMessage } from './js/render-functions';

hideLoadMoreButton();
hideEndMessage();
hideLoader();

const form = document.querySelector('.form');
const input = document.querySelector('.input');
const loadMoreBtn = document.querySelector('.load-more');

const IMAGES_PER_PAGE = 15;
let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

form.addEventListener('submit', async function handleSearch(event) {
    event.preventDefault();

    const query = input.value.trim();

    if (!query) {
        iziToast.info({
            title: 'Empty',
            message: 'Type something to search.',
            position: 'topRight',
            color: 'red',
        });
        return;
    }
    
    currentQuery = query;
    currentPage = 1;
    clearGallery();
    hideLoadMoreButton();
    showLoader();

    try {
        const data = await getImagesByQuery(currentQuery, currentPage);
        totalHits = data.totalHits;

        await new Promise(resolve => setTimeout(resolve, 2000));

        if (data.hits.length === 0) {
            iziToast.warning({
                title: 'No results',
                message: `No images found for "${query}".`,
                position: 'topRight',
            });
            input.value = '';
        } else {
            createGallery(data.hits);

            const loadedImages = currentPage * IMAGES_PER_PAGE;

            if (loadedImages < totalHits) {
                showLoadMoreButton();
                hideEndMessage();
            } else {
                hideLoadMoreButton();
                showEndMessage();
            }


            input.value = '';
        }
} catch (error) {
    iziToast.error({
        title: 'Error',
        message: `Something went wrong: ${error.message}.`,
        position: 'topRight',
    });
} finally {
    hideLoader();
}
});

loadMoreBtn.addEventListener('click', async () => {
    currentPage += 1;
    showLoader();
    hideLoadMoreButton();

    try {
        const data = await getImagesByQuery(currentQuery, currentPage);
        createGallery(data.hits);

        const cardHeight = document.querySelector('.gallery-item').getBoundingClientRect().height;

        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
        });

        const loadedImages = currentPage * IMAGES_PER_PAGE;

        if (loadedImages < totalHits) {
            showLoadMoreButton();
            hideEndMessage();
        } else {
            hideLoadMoreButton();
            showEndMessage();
        }

    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: `Failed to load more: ${error.message}.`,
            position: 'topRight',
        });
    } finally {
        hideLoader();
    }
});