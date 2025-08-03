import axios from 'axios';

export async function getImagesByQuery(query) {
    const API_KEY = '51593230-95869a69d21a93ebacba8501d';
    const BASE_URL = 'https://pixabay.com/api/';
    
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=28`;

    const response = await axios.get(url);
    return response.data.hits;
}