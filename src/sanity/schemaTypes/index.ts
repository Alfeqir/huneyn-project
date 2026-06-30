import { type SchemaTypeDefinition, defineType, defineField } from 'sanity'
import { book } from './book'

// 🎬 1. VIDEO SERIES SCHEMA (Defined inline to bypass compiler bugs)
const videoSeriesType = defineType({
  name: 'videoSeries',
  title: '🎬 Video Broadcasts',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Series Amharic Title',
      type: 'string',
    }),
    defineField({
      name: 'englishTitle',
      title: 'Series English Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'videos',
      title: 'Videos List',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'video',
          title: 'Video Segment',
          fields: [
            defineField({ name: 'id', title: 'Unique Video ID (e.g., v1-1)', type: 'string' }),
            defineField({ name: 'title', title: 'Video Title', type: 'string' }),
            defineField({ name: 'part', title: 'Part Label (e.g., Intro, Part 1)', type: 'string' }),
            defineField({ name: 'duration', title: 'Duration (e.g., 3:37)', type: 'string' }),
            defineField({ name: 'youtubeId', title: 'YouTube Video ID', type: 'string' }),
            defineField({ name: 'isAvailable', title: 'Is Available?', type: 'boolean', initialValue: true }),
          ],
        },
      ],
    }),
  ],
})

// 📝 2. CATEGORIZED NOTE SCHEMA (With Preview Layer Added)
const categorizedNoteType = defineType({
  name: 'categorizedNote',
  title: '📝 Study Notes',
  type: 'document',
  fields: [
    defineField({ name: 'order', title: 'Sort Order Number', type: 'number' }),
    defineField({ name: 'title', title: 'English Title', type: 'string' }),
    defineField({ name: 'amharicTitle', title: 'Amharic Title', type: 'string' }),
    defineField({ name: 'date', title: 'Display Date', type: 'string' }),
    defineField({ name: 'readTime', title: 'Estimated Read Time', type: 'string' }),
    defineField({ name: 'excerpt', title: 'Core Focus / Excerpt', type: 'string' }),
    defineField({ name: 'content', title: 'Main Content Body', type: 'text' }),
    defineField({
      name: 'category',
      title: 'Target Audience Profile Group',
      type: 'string',
      options: {
        list: [
          { title: '🎓 Campus Students', value: 'campus' },
          { title: '📱 Media Users', value: 'media' },
          { title: '🏡 Parents', value: 'parents' },
          { title: '📚 Students of Ilm', value: 'ilm' },
          { title: '✨ Women', value: 'women' },
          { title: '💻 Tech', value: 'tech' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'amharicTitle',
      category: 'category',
    },
    prepare(selection) {
      const { title, subtitle, category } = selection
      const categoryMap: Record<string, string> = {
        campus: '🎓 Campus',
        media: '📱 Media',
        parents: '🏡 Parents',
        ilm: '📚 Ilm',
        women: '✨ Women',
        tech: '💻 Tech',
      }
      const catLabel = categoryMap[category || ''] || '📝 Note'
      return {
        title: title || 'Untitled Note',
        subtitle: `[${catLabel}] — ${subtitle || ''}`,
      }
    },
  },
})

// 🚀 3. EXPORT UNIFIED SCHEMA
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [book, videoSeriesType, categorizedNoteType],
}