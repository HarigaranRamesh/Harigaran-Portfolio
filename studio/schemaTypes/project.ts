import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Project Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'challenge', title: 'The Challenge', type: 'text' }),
    defineField({ name: 'solution', title: 'The Solution', type: 'text' }),
    defineField({ name: 'impact', title: 'Impact & Outcome', type: 'text' }),
    defineField({
      name: 'tech',
      title: 'Tech Stack Tags',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({ name: 'image', title: 'Screenshot', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'imageUrl', title: 'Image URL (optional fallback)', type: 'url' }),
    defineField({ name: 'demo', title: 'Live Demo Link', type: 'url' }),
    defineField({ name: 'github', title: 'GitHub Link', type: 'url' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' })
  ]
})
