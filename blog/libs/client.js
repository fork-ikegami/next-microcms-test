import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'next-microcms-test',
  apiKey: process.env.API_KEY,
});