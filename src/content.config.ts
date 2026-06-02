import { defineCollection, z } from 'astro:content';
import { contentDefaults } from './config';

const lectures = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lectureNumber: z.number(),
    module: z.string(),
    description: z.string(),
    duration: z.string().default(contentDefaults.duration),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
    prerequisites: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    hasSlides: z.boolean().default(false),
    hasAssignment: z.boolean().default(false),
    slidevUrl: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const assignments = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    assignmentNumber: z.number(),
    lectureRef: z.string(),
    week: z.number().optional(),
    difficulty: z.enum(['easy', 'medium', 'hard']).default('medium'),
    estimatedHours: z.number().optional(),
    points: z.number().optional(),
    submissionFormat: z.string().default(contentDefaults.submissionFormat),
    downloadFile: z.string().optional(),
    dueDate: z.date().optional(),
    draft: z.boolean().default(false),
  }),
});

const selfchecks = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    explanation: z.string(),
    module: z.string(),
    tags: z.array(z.string()).default([]),
    relatedLectures: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  lectures,
  assignments,
  selfchecks,
};
