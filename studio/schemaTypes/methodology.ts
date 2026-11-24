import { defineField, defineType } from 'sanity'

export const methodology = defineType({
  name: 'methodology',
  title: 'Methodology Blueprint Steps',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Step Title', type: 'string' }),
    defineField({ name: 'desc', title: 'Description', type: 'text' }),
    defineField({ name: 'color', title: 'Color Hex Code', type: 'string' }),
    defineField({ name: 'iconName', title: 'Icon Name (e.g. FaLightbulb)', type: 'string' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' })
  ]
})
