import { defineField, defineType } from 'sanity'

export const experience = defineType({
  name: 'experience',
  title: 'Work Experience',
  type: 'document',
  fields: [
    defineField({ name: 'role', title: 'Role Title', type: 'string' }),
    defineField({ name: 'company', title: 'Company Name', type: 'string' }),
    defineField({ name: 'duration', title: 'Duration Range', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({
      name: 'tech',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' })
  ]
})
