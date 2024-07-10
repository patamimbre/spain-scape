import type { LocationImage } from '../types';

const BASE_URL = 'https://pixabay.com/api';
const IMAGE_TYPE = 'photo';

export async function getImages(query: string) {
  const params = new URLSearchParams({
    key: process.env.PIXABAY_API_KEY!,
    q: query,
    image_type: IMAGE_TYPE,
  });

  const url = new URL(BASE_URL)
  url.search = params.toString();

  const response = await fetch(url.toString());
  if (!response.ok) {
    console.error('Failed to fetch images', response);
    throw new Error('Failed to fetch images');
  }

  const json = await response.json() as { hits: [{
    largeImageURL: string;
    previewURL: string;
  }]};

  return json.hits.map((image) => ({
    url: image.largeImageURL,
    thumbnail: image.previewURL,
    title: query,
  })) as LocationImage[];
}
