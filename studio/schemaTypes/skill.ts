import { defineField, defineType } from 'sanity'

export const skill = defineType({
  name: 'skill',
  title: 'Skills',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Skill Name', type: 'string' }),
    defineField({ name: 'category', title: 'Category', type: 'string' }),
    defineField({ name: 'level', title: 'Proficiency Level (%)', type: 'number' }),
    defineField({ name: 'color', title: 'Color Hex Code', type: 'string' }),
    defineField({ name: 'iconName', title: 'React Icon Name (e.g. FaReact, SiMongodb)', type: 'string' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' })
  ]
})
