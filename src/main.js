import './css/styles.css';

import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from './js/pixabay-api';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions';

hideLoadMoreButton();
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

//     try {
//         const images = await getImagesByQuery(query);

//         await new Promise(resolve => setTimeout(resolve, 2000));

//         if (images.length === 0) {
//             iziToast.warning({
//                 title: 'No results',
//                 message: `No images found for "${query}".  Try again.`,
//                 position: 'topRight',
//             });
//             input.value = '';
//         } else {
//             createGallery(images);
//             input.value = '';
//         }
//     } catch (error) {
//         iziToast.error({
//             title: 'Error',
//             message: `Something went wrong: ${error.message}.`,
//             position: 'topRight',
//         });
//     } finally {
//         hideLoader();
//     }
// });

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
            } else {
                hideLoadMoreButton();
                iziToast.info({
          title: 'End of Results',
          message: `You've reached the end of search results.`,
          position: 'topRight',
        });
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

        if (loadedImages >= totalHits) {
            hideLoadMoreButton();
            iziToast.info({
                title: 'End of Results',
                message: `We're sorry, but you've reached the end of search results.`,
                position: 'topRight',
            });
        } else {
            showLoadMoreButton();
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