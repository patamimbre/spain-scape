import { unstable_flag as flag } from '@vercel/flags/next';

export const isOpenAIEnabled = flag({
  key: 'openai-enabled',
  description: 'Enable OpenAI integration instead of Gemini',
  decide: () => true,
  defaultValue: true,
})

export const isSerapiImagesEnabled = flag({
  key: 'serapi-images-enabled',
  description: 'Use SerAPI to search for images',
  decide: () => false,
  defaultValue: false,
})