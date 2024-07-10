
import 'server-only';
import { createStorage, prefixStorage } from "unstorage";
import vercelKVDriver from "unstorage/drivers/vercel-kv";

const storage = createStorage({
  driver: vercelKVDriver({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  }),
});

export const travelsStorage = prefixStorage(storage, "travels");
export const locationImagesStorage = prefixStorage(storage, "location-images");