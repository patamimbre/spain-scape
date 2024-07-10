'use server'

import { createServerAction } from 'zsa'
import uuidByString from 'uuid-by-string'
import { redirect } from 'next/navigation'
import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { searchInputSchema, searchOutputSchema } from '@/schemas/search.schema'
import { travelsStorage } from '@/lib/storage/kv'
import { TravelWithImages } from '@/schemas/travel.schema'
import getImagesForLocation from '@/lib/images';
import { isOpenAIEnabled } from '@/lib/flags';

const systemPrompt = `
You are a travel assistant that helps users discover interesting destinations in Spain based on their preferences. Given a user prompt, you will generate a list of 6 unique destinations that match the prompt. Each destination should be represented as an object with the following properties:
name: A concise and enticing name for the destination, around 5 - 10 words.
description: A short description of the destination, around 60-100 words.
tags: An array of 3 relevant tags that describe the destination, such as "nature", "beach", "culture", "history", "food", etc. Each tag should be a single word. Do not repeat tags across destinations.
location: The town, province, and autonomous community where the destination is located, separated by commas(e.g. "Nerja, Málaga, Andalusia").
The destinations should be unique and cover a variety of regions and types of experiences in Spain.The list should include a mix of popular and lesser - known destinations to provide interesting options for the user.`

export const searchAction = createServerAction()
  .input(searchInputSchema, { type: 'formData' })
  .handler(async ({ input }) => {
    const { query } = input
    const searchId = uuidByString(query)

    // If we have already generated results for this query, redirect to the results page
    if (await travelsStorage.hasItem(searchId)) {
      console.log('Results already generated. Redirecting to results page...')
      redirect(`/travels/${searchId}`)
      return // Exit early
    }

    console.log('Generating results for: ', JSON.stringify({
      searchId,
      query,
    }));

    const model = await isOpenAIEnabled() ? openai('gpt-3.5-turbo') : google('models/gemini-1.5-flash-latest')

    // Perform AI logic
    const { object: { results } } = await generateObject({
      model,
      system: systemPrompt,
      prompt: query,
      schema: searchOutputSchema,
    });

    // Fetch images
    console.log('Entries generated. Fetching images...')
    const resultsWithImages = await Promise.all(results.map(async (result) => ({
      ...result,
      images: await getImagesForLocation(result.location)
    })));

    console.log('Images retrieved. Storing on KV...', JSON.stringify(resultsWithImages))

    // Save into KV
    await travelsStorage.setItem<TravelWithImages[]>(searchId, resultsWithImages)

    console.log('Entries saved with id ', searchId)

    // redirect
    redirect(`/travels/${searchId}`)
  })
