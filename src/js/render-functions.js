import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionsDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({ webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
      <a href="${largeImageURL}" class="gallery-item">
      <div class="image-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <ul class="image-stats">
          <li><b>Likes</b> ${likes}</li>
          <li><b>Views</b> ${views}</li>
          <li><b>Comments</b> ${comments}</li>
          <li><b>Downloads</b> ${downloads}</li>
        </ul>
      </div>
    </a>
    </li>
  `
    )
    .join('');
  
  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}
  
export function showLoader() {
    const loader = document.querySelector('.loader');
    loader.classList.remove('hidden');
  }

export function hideLoader() {
    const loader = document.querySelector('.loader');
    loader.classList.add('hidden');
  }