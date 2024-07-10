import { getJson } from 'serpapi';
import type { LocationImage } from '../types';

const ENGINE = 'google_images';
const GOOGLE_DOMAIN = 'google.es';
const GOOGLE_HL = 'es';
const GOOGLE_GL = 'es';

export async function getImages(query: string) {
  const json = await getJson({
    engine: ENGINE,
    q: query,
    google_domain: GOOGLE_DOMAIN,
    hl: GOOGLE_HL,
    gl: GOOGLE_GL,
    api_key: process.env.SERPAPI_API_KEY,
  });

  return json.images_results.map((image: any) => ({
    url: image.original,
    thumbnail: image.thumbnail,
    title: image.title,
  })) as LocationImage[];
}