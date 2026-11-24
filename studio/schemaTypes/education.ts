import { defineField, defineType } from 'sanity'

export const education = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    defineField({ name: 'degree', title: 'Degree Title', type: 'string' }),
    defineField({ name: 'institution', title: 'Institution / University', type: 'string' }),
    defineField({ name: 'year', title: 'Years', type: 'string' }),
    defineField({ name: 'description', title: 'Description / Coursework', type: 'text' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' })
  ]
})
