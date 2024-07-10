import { locationImagesStorage } from "@/lib/storage/kv";
import { getImages as getImagesFromSerapi } from "./sources/serpapi";
import { getImages as getImagesFromPixabay } from "./sources/pixabay";
import type { LocationImage } from "./types";
import { isSerapiImagesEnabled } from "@/lib/flags";

export default async function getImagesForLocation(location: string) {
  const useSerapi = await isSerapiImagesEnabled();

  // Try to fetch from the storage first only if SerAPI is enabled
  if (useSerapi) {
    const imagesFromStorage = await locationImagesStorage.getItem<LocationImage[]>(location);
    if (imagesFromStorage) return imagesFromStorage;
  }

  console.log('Fetching images from API...')
  const getImageFn = useSerapi ? getImagesFromSerapi : getImagesFromPixabay;
  const imagesFromApi = await getImageFn(location);

  if (useSerapi && imagesFromApi && imagesFromApi.length > 0) {
    await locationImagesStorage.setItem<LocationImage[]>(location, imagesFromApi);
  }

  return imagesFromApi;
}