import { defineField, defineType } from 'sanity'

export const book = defineType({
  name: 'book',
  title: 'Books (Library)',
  type: 'document',
  fields: [
    defineField({
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleAm',
      title: 'Title (Amharic / አማርኛ)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL Handle)',
      type: 'slug',
      options: {
        source: 'titleEn',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Book Cover Image',
      type: 'image',
      options: {
        hotspot: true, // Allows you to crop/center the cover nicely
      },
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description (English)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'descriptionAm',
      title: 'Description (Amharic / አማርኛ)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'downloadUrl',
      title: 'Read / Download URL Link',
      type: 'url',
    }),
    {
        name: 'pdfFile',
        title: 'Book PDF File',
        type: 'file',
        options: {
          accept: '.pdf' // Restricts uploads strictly to PDF documents
        }
      },
      {
        name: 'excerptEn',
        title: 'Sample Excerpt / Chapter (English)',
        type: 'text',
        description: 'Paste a few paragraphs or a brief chapter preview in English.'
      },
      {
        name: 'excerptAm',
        title: 'Sample Excerpt / Chapter (Amharic)',
        type: 'text',
        description: 'Paste a few paragraphs or a brief chapter preview in Amharic.'
      }
  ],
})