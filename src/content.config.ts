import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content collections.
 * Adding a new publication / project / news item / experience entry
 * = dropping a Markdown file into the matching folder. See CLAUDE.md.
 */

const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    /** First author is rendered in bold — put yourself first when first-author. */
    authors: z.array(z.string()),
    venue: z.string(),
    /** Short label used on badges, e.g. "ICCC". */
    venueAbbr: z.string(),
    year: z.number(),
    /** E.g. "First-author paper". */
    status: z.string().optional(),
    /** Abstract paragraph. */
    summary: z.string().optional(),
    links: z
      .array(z.object({ label: z.string(), url: z.string() }))
      .default([]),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    /** Eyebrow category shown above the title. */
    tag: z.string(),
    /** E.g. "Published at ICCC", "Ongoing". */
    status: z.string(),
    start: z.string().optional(),
    end: z.string().optional(),
    /** One-paragraph teaser for cards. */
    summary: z.string(),
    /** Optional lead-in rendered in accent color before summary on cards. */
    summaryLead: z.string().optional(),
    /** Featured projects appear on the home page. */
    featured: z.boolean().default(false),
    /** research = scientific research; course = course projects (second section on the projects page). */
    category: z.enum(['research', 'course']).default('research'),
    links: z
      .array(z.object({ label: z.string(), url: z.string() }))
      .default([]),
    image: z.string().optional(),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    date: z.coerce.date(),
    text: z.string(),
    link: z.string().optional(),
    linkLabel: z.string().optional(),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    role: z.string(),
    org: z.string(),
    /** Full legal name, shown on the Internship page (CV page keeps the short org). */
    orgFull: z.string().optional(),
    start: z.string(),
    end: z.string(),
  }),
});

export const collections = { publications, projects, news, experience };
