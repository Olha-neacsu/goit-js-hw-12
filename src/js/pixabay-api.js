import axios from 'axios';
    
    export async function getImagesByQuery(query, page = 1) {
    const API_KEY = '51593230-95869a69d21a93ebacba8501d';
    const BASE_URL = 'https://pixabay.com/api/';
    const PER_PAGE = 15;


    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGE}&page=${page}`;

    const response = await axios.get(url);
    return response.data;
}