import './css/styles.css';

import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from './js/pixabay-api';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions';

const form = document.querySelector('.form');
const input = document.querySelector('.input');

form.addEventListener('submit', async function handleSearch(event) {
    event.preventDefault();

    const query = input.value.trim();

    if (!query) {
        iziToast.info({
            title: 'Empty',
            message: 'Type something to search.',
            position: 'topRight',
        });
        return;
    }

    clearGallery();
     showLoader();

    try {
        const images = await getImagesByQuery(query);        

        await new Promise(resolve => setTimeout(resolve, 2000));

        if (images.length === 0) {
            iziToast.warning({
                title: 'No results',
                message: `No images found for "${query}".  Try again.`,
                position: 'topRight',
            });
            input.value = '';
        } else {
            createGallery(images);
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