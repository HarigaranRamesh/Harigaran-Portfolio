import { defineField, defineType } from 'sanity'

export const profile = defineType({
  name: 'profile',
  title: 'Profile & Identity',
  type: 'document',
  fields: [
    defineField({ name: 'heroGreeting', title: 'Hero Greeting', type: 'string' }),
    defineField({ name: 'heroTitlePrefix', title: 'Hero Title Prefix', type: 'string' }),
    defineField({ name: 'heroTitleHighlight', title: 'Hero Title Highlight', type: 'string' }),
    defineField({ name: 'heroDescription', title: 'Hero Description', type: 'text' }),
    defineField({ name: 'heroViewWorkText', title: 'View Work Button Label', type: 'string' }),
    defineField({ name: 'heroContactText', title: 'Contact Button Label', type: 'string' }),
    defineField({ name: 'heroExploreText', title: 'Explore Text', type: 'string' }),

    defineField({ name: 'aboutSectionNumber', title: 'About Section Number', type: 'string' }),
    defineField({ name: 'aboutSectionTitle', title: 'About Section Title', type: 'string' }),
    defineField({ name: 'aboutLeadText', title: 'About Lead Text', type: 'text' }),
    defineField({ name: 'aboutBio1', title: 'Bio Paragraph 1', type: 'text' }),
    defineField({ name: 'aboutBio2', title: 'Bio Paragraph 2', type: 'text' }),
    defineField({ name: 'aboutResumeButtonText', title: 'Resume Button Label', type: 'string' }),
    defineField({ name: 'profileImage', title: 'Profile Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'resumeFile', title: 'Resume PDF Document', type: 'file' }),
    defineField({ name: 'resumeUrl', title: 'Resume URL (Google Drive / external)', type: 'url' }),

    defineField({
      name: 'stats',
      title: 'Experience Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Stat Label', type: 'string' },
            { name: 'value', title: 'Stat Value', type: 'string' }
          ]
        }
      ]
    }),

    defineField({ name: 'brandLogoText', title: 'Brand Logo Text', type: 'string' }),
    defineField({ name: 'brandStatusText', title: 'Brand Status Text', type: 'string' }),
    defineField({ name: 'brandCreatorName', title: 'Creator Name', type: 'string' }),
    defineField({ name: 'brandCopyrightText', title: 'Copyright Notice', type: 'string' }),

    defineField({ name: 'socialGithub', title: 'GitHub URL', type: 'url' }),
    defineField({ name: 'socialLinkedin', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'socialTwitter', title: 'Twitter/X URL', type: 'url' }),
    defineField({ name: 'socialLeetcode', title: 'LeetCode URL', type: 'url' }),

    defineField({ name: 'contactSubtitle', title: 'Contact Subtitle', type: 'string' }),
    defineField({ name: 'contactTitle', title: 'Contact Title', type: 'string' }),
    defineField({ name: 'contactDescription', title: 'Contact Description', type: 'text' }),
    defineField({ name: 'contactEmail', title: 'Contact Email', type: 'string' }),
    defineField({ name: 'contactQuoteText', title: 'Quote Text', type: 'text' }),
    defineField({ name: 'contactQuoteAuthor', title: 'Quote Author', type: 'string' }),
    defineField({ name: 'contactSubmitButtonText', title: 'Submit Button Label', type: 'string' }),

    defineField({ name: 'skillsSectionNumber', title: 'Skills Section Number', type: 'string' }),
    defineField({ name: 'skillsSectionTitle', title: 'Skills Section Title', type: 'string' }),
    defineField({ name: 'skillsDescription', title: 'Skills Description', type: 'text' }),

    defineField({ name: 'projectsSectionNumber', title: 'Projects Section Number', type: 'string' }),
    defineField({ name: 'projectsSectionTitle', title: 'Projects Section Title', type: 'string' }),
    defineField({ name: 'projectsViewDetailsText', title: 'View Details Label', type: 'string' }),

    defineField({ name: 'experienceSectionTitle', title: 'Experience Section Title', type: 'string' }),
    defineField({ name: 'educationSectionTitle', title: 'Education Section Title', type: 'string' }),

    defineField({ name: 'methodologySectionNumber', title: 'Methodology Section Number', type: 'string' }),
    defineField({ name: 'methodologySectionTitle', title: 'Methodology Section Title', type: 'string' }),
    defineField({ name: 'methodologyDescription', title: 'Methodology Description', type: 'text' }),

    defineField({ name: 'testimonialsSectionNumber', title: 'Testimonials Section Number', type: 'string' }),
    defineField({ name: 'testimonialsSectionTitle', title: 'Testimonials Section Title', type: 'string' })
  ]
})
