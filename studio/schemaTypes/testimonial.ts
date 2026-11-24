import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Reviewer Name', type: 'string' }),
    defineField({ name: 'role', title: 'Designation / Project', type: 'string' }),
    defineField({ name: 'company', title: 'Company Name', type: 'string' }),
    defineField({ name: 'text', title: 'Review Quote', type: 'text' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' })
  ]
})
