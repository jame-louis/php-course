import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const lectures = await getCollection('lectures', ({ data }) => !data.draft);
  const assignments = await getCollection('assignments', ({ data }) => !data.draft);

  const index = [
    ...lectures.map(entry => ({
      title: entry.data.title,
      description: entry.data.description,
      content: entry.body?.slice(0, 800) || '',
      slug: `${import.meta.env.BASE_URL}lectures/${entry.slug}`,
      type: 'lectures',
    })),
    ...assignments.map(entry => ({
      title: entry.data.title,
      description: '',
      content: entry.body?.slice(0, 800) || '',
      slug: `${import.meta.env.BASE_URL}assignments/${entry.slug}`,
      type: 'assignments',
    })),
  ];

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
};
