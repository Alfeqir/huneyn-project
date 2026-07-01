import { type SchemaTypeDefinition, defineType, defineField } from 'sanity'
import { book } from './book'

// 🎬 1. VIDEO SERIES SCHEMA
const videoSeriesType = defineType({
  name: 'videoSeries',
  title: '🎬 Video Broadcasts',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Series Amharic Title', type: 'string' }),
    defineField({ name: 'englishTitle', title: 'Series English Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
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

// 📝 2. CATEGORIZED NOTE SCHEMA
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
    select: { title: 'title', subtitle: 'amharicTitle', category: 'category' },
    prepare(selection) {
      const { title, subtitle, category } = selection
      const categoryMap: Record<string, string> = {
        campus: '🎓 Campus', media: '📱 Media', parents: '🏡 Parents',
        ilm: '📚 Ilm', women: '✨ Women', tech: '💻 Tech',
      }
      const catLabel = categoryMap[category || ''] || '📝 Note'
      return { title: title || 'Untitled Note', subtitle: `[${catLabel}] — ${subtitle || ''}` }
    },
  },
})

// 🎓 3. INLINE COURSE TRACK SCHEMA
const courseTrackType = defineType({
  name: 'courseTrack',
  title: '🎓 Academy Courses',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Course Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug / ID Variable', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({
      name: 'domain',
      title: 'Knowledge Domain',
      type: 'string',
      options: {
        list: [
          { title: 'Foundations', value: 'Foundations' },
          { title: 'Aqeedah', value: 'Aqeedah' },
          { title: 'Fiqh', value: 'Fiqh' },
          { title: 'Qur\'an Studies', value: 'Qur\'an Studies' },
          { title: 'Hadith Studies', value: 'Hadith Studies' },
          { title: 'Tazkiyah', value: 'Tazkiyah' },
          { title: 'Character & Manners', value: 'Character & Manners' },
          { title: 'Da\'wah & Leadership', value: 'Da\'wah & Leadership' },
          { title: 'Research & Academic Skills', value: 'Research & Academic Skills' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'personas',
      title: 'Target Personas',
      description: 'Which pathways should this course appear under?',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '🌱 Foundation Seeker', value: 'beginner' },
          { title: '📚 Student of Knowledge', value: 'student' },
          { title: '📢 Da\'wah Worker', value: 'dawah' },
          { title: '🏡 Parent & Family Builder', value: 'parent' },
          { title: '🎓 Future Teacher', value: 'teacher' },
          { title: '✨ Sisters Pathway', value: 'sisters' },
        ],
      },
    }),
    defineField({ name: 'excerpt', title: 'Short Summary Excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'objectives', title: 'Learning Objectives', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'reflections', title: 'Structural Reflection Questions', type: 'array', of: [{ type: 'text', rows: 2 }] }),
  ],
})

// 📖 4. INLINE ACADEMY LESSON SCHEMA
const lessonType = defineType({
  name: 'lesson',
  title: '📖 Academy Lessons',
  type: 'document',
  fields: [
    defineField({ name: 'courseRef', title: 'Belongs to Course Track', type: 'reference', to: [{ type: 'courseTrack' }], validation: (Rule) => Rule.required() }),
    defineField({ name: 'number', title: 'Lesson Number (Order)', type: 'number', validation: (Rule) => Rule.required().min(1) }),
    defineField({ name: 'title', title: 'Lesson Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'youtubeId', title: 'YouTube Video ID (e.g., WLvHsOOWLPg)', type: 'string' }),
    defineField({ name: 'duration', title: 'Duration String (e.g., 18:20)', type: 'string' }),
  ],
  orderings: [
    { title: 'Lesson Number', name: 'numberAsc', by: [{ field: 'number', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'courseRef.title', number: 'number' },
    prepare({ title, subtitle, number }) {
      return {
        title: `${number || '?'}. ${title || 'Untitled Lesson'}`,
        subtitle: subtitle ? `Course: ${subtitle}` : 'No Course Assigned',
      }
    },
  },
})

// 🚀 5. EXPORT UNIFIED SCHEMA STRIP
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [book, videoSeriesType, categorizedNoteType, courseTrackType, lessonType],
}