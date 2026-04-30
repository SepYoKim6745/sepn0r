import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const labs = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/data/labs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().default('기타'),
    playgroundUrl: z.string().url().optional(),
    downloadFile: z.string().optional(),
    downloadLabel: z.string().optional(),
    downloads: z.array(z.object({
      file: z.string(),
      label: z.string(),
    })).optional(),
    order: z.number().optional(),
    featured: z.boolean().default(false),
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/data/portfolio' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    thumbnail: z.string().optional(),
    tags: z.array(z.string()).default([]),
    liveUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { labs, portfolio };
