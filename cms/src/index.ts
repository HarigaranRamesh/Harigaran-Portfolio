import type { Core } from '@strapi/strapi';
import fs from 'fs';
import path from 'path';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    console.log('🚀 Checking Strapi initial data seeding...');

    // 1. Ensure profile image is present in public/uploads
    try {
      const uploadsDir = path.join(strapi.dirs.static.public, 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      const targetImgPath = path.join(uploadsDir, 'profile.jpg');
      const rootAssetImg = path.join(__dirname, '..', '..', 'src', 'assets', 'profile.jpg');
      if (!fs.existsSync(targetImgPath) && fs.existsSync(rootAssetImg)) {
        fs.copyFileSync(rootAssetImg, targetImgPath);
        console.log('✓ Profile image copied to uploads directory.');
      }
    } catch (e) {
      console.warn('Could not copy profile image:', e);
    }

    // 2. Automatically grant Public role permissions for all custom APIs
    try {
      const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' }
      });

      if (publicRole) {
        const publicActions = [
          'api::profile.profile.find',
          'api::project.project.find',
          'api::project.project.findOne',
          'api::skill.skill.find',
          'api::skill.skill.findOne',
          'api::experience.experience.find',
          'api::experience.experience.findOne',
          'api::education.education.find',
          'api::education.education.findOne',
          'api::testimonial.testimonial.find',
          'api::testimonial.testimonial.findOne',
          'api::methodology.methodology.find',
          'api::methodology.methodology.findOne',
        ];

        for (const action of publicActions) {
          const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
            where: { role: publicRole.id, action }
          });
          if (!existing) {
            await strapi.db.query('plugin::users-permissions.permission').create({
              data: { role: publicRole.id, action, enabled: true }
            });
          }
        }
        console.log('✓ Public API permissions automatically configured.');
      }
    } catch (e) {
      console.warn('Error setting public permissions:', e);
    }

    // 3. Seed Profile if empty
    try {
      const profileCount = await strapi.db.query('api::profile.profile').count();
      if (profileCount === 0) {
        await strapi.db.query('api::profile.profile').create({
          data: {
            heroGreeting: 'Engineering the Future',
            heroTitlePrefix: 'MODERN',
            heroTitleHighlight: 'ARCHITECT.',
            heroDescription:
              'Specializing in high-performance Full Stack applications and enterprise-scale architecture. Crafting seamless digital solutions where code meets creativity.',
            heroViewWorkText: 'View Work',
            heroContactText: "Let's Talk",
            heroExploreText: 'Explore',
            aboutSectionNumber: '01.',
            aboutSectionTitle: 'Architecting the Web',
            aboutLeadText:
              'I transform complex problems into elegant digital solutions that live at the intersection of performance and design.',
            aboutBio1:
              'As a Full Stack Developer based in the digital landscape, I specialize in crafting high-performance applications with modern tech stacks. My approach is rooted in clean architecture and user-centric design principles.',
            aboutBio2:
              "Currently, I'm focused on building scalable enterprise solutions and exploring the frontiers of AI-driven web experiences.",
            aboutResumeButtonText: 'Download Resume',
            profileImageUrl: '/uploads/profile.jpg',
            resumeUrl:
              'https://drive.google.com/file/d/1KjIp8G4gvVFprX7KXir4tW6XF7xmdnZB/view?usp=share_link',
            stats: [
              { label: 'Experience', value: '6 Months' },
              { label: 'Projects Completed', value: '3+' },
              { label: 'Technologies', value: '12+' }
            ],
            skillsSectionNumber: '03.',
            skillsSectionTitle: 'Tech Stack',
            skillsDescription:
              "The technologies and tools I use to bring ideas to life. I'm always learning and expanding my horizons.",
            projectsSectionNumber: '02.',
            projectsSectionTitle: 'Recent Endeavors',
            projectsViewDetailsText: 'View Details',
            experienceSectionTitle: 'Work Experience',
            educationSectionTitle: 'Education',
            methodologySectionNumber: '05.',
            methodologySectionTitle: 'Development Blueprint',
            methodologyDescription:
              "I don't just write code; I engineer solutions. My methodology ensures that every project is built with precision, scalability, and performance at its core.",
            testimonialsSectionNumber: '06.',
            testimonialsSectionTitle: 'Voices of Trust',
            brandLogoText: 'HARIGARAN',
            brandStatusText: 'Available for hire',
            brandCreatorName: 'Harigaran R',
            brandCopyrightText: 'Portfolio. All rights reserved.',
            preloaderTags: ['Design', 'Code', 'Experience'],
            socialGithub: 'https://github.com/HarigaranRamesh',
            socialLinkedin: 'https://www.linkedin.com/in/harigaran-ramesh-554887224',
            contactSubtitle: 'Get In Touch',
            contactTitle: "Let's Work Together",
            contactDescription:
              "I'm currently available for freelance projects and open to new opportunities. If you have a project in mind or just want to say hi, send me a message!",
            contactEmail: 'harigaran925@gmail.com',
            contactQuoteText:
              'Great things are not done by impulse, but by a series of small things brought together.',
            contactQuoteAuthor: '- Vincent van Gogh',
            contactSubmitButtonText: 'Send Message'
          }
        });
        console.log('✓ Profile data seeded.');
      }
    } catch (e) {
      console.warn('Error seeding profile:', e);
    }

    // 4. Seed Skills if empty
    try {
      const skillsCount = await strapi.db.query('api::skill.skill').count();
      if (skillsCount === 0) {
        const initialSkills = [
          // Programming Languages
          { name: 'JavaScript', category: 'Programming Languages', color: '#F7DF1E', level: 70, iconName: 'FaJs', order: 1 },
          { name: 'TypeScript', category: 'Programming Languages', color: '#3178C6', level: 70, iconName: 'SiTypescript', order: 2 },

          // Web Development
          { name: 'HTML5', category: 'Web Development', color: '#E34F26', level: 95, iconName: 'FaHtml5', order: 3 },
          { name: 'CSS3', category: 'Web Development', color: '#1572B6', level: 90, iconName: 'FaCss3Alt', order: 4 },
          { name: 'React', category: 'Web Development', color: '#61DAFB', level: 70, iconName: 'FaReact', order: 5 },
          { name: 'Next.js', category: 'Web Development', color: '#ffffff', level: 70, iconName: 'SiNextdotjs', order: 6 },
          { name: 'Redux', category: 'Web Development', color: '#764ABC', level: 50, iconName: 'SiRedux', order: 7 },
          { name: 'Node.js', category: 'Web Development', color: '#339933', level: 60, iconName: 'FaNodeJs', order: 8 },
          { name: 'Express.js', category: 'Web Development', color: '#ffffff', level: 60, iconName: 'SiExpress', order: 9 },
          { name: 'Bootstrap', category: 'Web Development', color: '#7952B3', level: 80, iconName: 'FaBootstrap', order: 10 },
          { name: 'CMS', category: 'Web Development', color: '#4A90E2', level: 60, iconName: 'FaLaptopCode', order: 11 },
          { name: 'Payload CMS', category: 'Web Development', color: '#ffffff', level: 60, iconName: 'SiPayloadcms', order: 12 },

          // Databases & Caching
          { name: 'MongoDB', category: 'Databases & Caching', color: '#47A248', level: 70, iconName: 'SiMongodb', order: 13 },
          { name: 'PostgreSQL', category: 'Databases & Caching', color: '#4169E1', level: 70, iconName: 'SiPostgresql', order: 14 },
          { name: 'Redis', category: 'Databases & Caching', color: '#DC382D', level: 70, iconName: 'SiRedis', order: 15 },
          { name: 'RabbitMQ', category: 'Databases & Caching', color: '#FF6600', level: 65, iconName: 'SiRabbitmq', order: 16 },

          // Version Control
          { name: 'Git', category: 'Version Control', color: '#F05032', level: 80, iconName: 'FaGitAlt', order: 17 },
          { name: 'GitHub', category: 'Version Control', color: '#ffffff', level: 85, iconName: 'FaGithub', order: 18 },

          // Deployment
          { name: 'Netlify', category: 'Deployment', color: '#00C7B7', level: 90, iconName: 'SiNetlify', order: 19 },
          { name: 'Heroku', category: 'Deployment', color: '#430098', level: 80, iconName: 'SiHeroku', order: 20 },
          { name: 'Vercel', category: 'Deployment', color: '#ffffff', level: 90, iconName: 'SiVercel', order: 21 },
          { name: 'Render', category: 'Deployment', color: '#46E3B7', level: 85, iconName: 'SiRender', order: 22 },

          // Tools
          { name: 'VS Code', category: 'Tools', color: '#007ACC', level: 95, iconName: 'VscVscode', order: 23 },
          { name: 'Postman', category: 'Tools', color: '#FF6C37', level: 85, iconName: 'SiPostman', order: 24 },
          { name: 'Bruno', category: 'Tools', color: '#32465A', level: 80, iconName: 'SiBruno', order: 25 },
          { name: 'Docker', category: 'Tools', color: '#2496ED', level: 70, iconName: 'FaDocker', order: 26 },
          { name: 'Slack', category: 'Tools', color: '#4A154B', level: 85, iconName: 'FaSlack', order: 27 }
        ];

        for (const skill of initialSkills) {
          await strapi.db.query('api::skill.skill').create({ data: skill });
        }
        console.log(`✓ ${initialSkills.length} skills seeded.`);
      }
    } catch (e) {
      console.warn('Error seeding skills:', e);
    }

    // 5. Seed Projects if empty
    try {
      const projectsCount = await strapi.db.query('api::project.project').count();
      if (projectsCount === 0) {
        const initialProjects = [
          {
            title: 'E-Commerce Application',
            description: 'A high-performance full-stack platform optimized for scale and speed.',
            challenge: 'Handling complex state management for thousands of products while maintaining a < 2s load time.',
            solution: 'Implemented Redux Toolkit for state and custom middleware for real-time inventory synchronization.',
            impact: 'Achieved a 95+ Lighthouse performance score and handled 500+ concurrent user simulations.',
            tech: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB'],
            features: [
              'Real-time Analytics Dashboard',
              'Secure JWT Authentication',
              'Advanced Multi-level Filtering',
              'Automated Email Notifications'
            ],
            imageUrl: 'https://placehold.co/600x400/1a1a1a/ffffff?text=E-Commerce+App',
            demo: 'https://ecommerce-frontend-dqfz.onrender.com',
            github: 'https://github.com/HarigaranRamesh/E-commerce-Application',
            order: 1
          },
          {
            title: 'Automated HRMS Portal',
            description: 'An internal lifecycle management system focused on workflow automation and security.',
            challenge: 'Managing complex multi-level approval hierarchies for thousands of employees.',
            solution: 'Designed a state-machine based workflow engine to handle dynamic approval layers transparently.',
            impact: 'Reduced manual HR administrative tasks by 40% through end-to-end automation.',
            tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
            features: [
              'Smart Leave Management',
              'Performance Review Engine',
              'Encrypted Document Storage',
              'Real-time Notification System'
            ],
            imageUrl: 'https://placehold.co/600x400/1a1a1a/ffffff?text=HRMS+Portal',
            demo: '#',
            github: '#',
            order: 2
          }
        ];

        for (const proj of initialProjects) {
          await strapi.db.query('api::project.project').create({ data: proj });
        }
        console.log(`✓ ${initialProjects.length} projects seeded.`);
      }
    } catch (e) {
      console.warn('Error seeding projects:', e);
    }

    // 6. Seed Experience if empty
    try {
      const expCount = await strapi.db.query('api::experience.experience').count();
      if (expCount === 0) {
        const initialExperience = [
          {
            role: 'Full Stack Developer',
            company: 'Karma Group Global',
            duration: 'May 2026 - Present',
            description:
              'Developed and maintained full-stack web applications. Collaborated with cross-functional teams to define requirements and features.',
            tech: ['Next.js', 'React', 'Node.js', 'CMS', 'Redis', 'RabbitMQ', 'Payload CMS', 'Slack'],
            order: 1
          },
          {
            role: 'Junior Software developer ',
            company: 'One assist Technologies',
            duration: 'Dec 2025 - March 2026',
            description:
              'Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to define requirements and features.',
            tech: ['React', 'Node.js', 'MongoDB', 'Express.js', 'Postgres SQL', 'Hugging Face'],
            order: 2
          },
          {
            role: 'Frontend developer intern',
            company: 'Stuvels Software Solutions ',
            duration: 'Jan 2025 - Mar 2025',
            description:
              'Built custom websites for personal projects. Managed hosting and deployment on platforms like Netlify and Vercel.',
            tech: ['HTML/CSS', 'JavaScript', 'React', 'Git', 'Github'],
            order: 3
          }
        ];

        for (const exp of initialExperience) {
          await strapi.db.query('api::experience.experience').create({ data: exp });
        }
        console.log(`✓ ${initialExperience.length} work experience entries seeded.`);
      }
    } catch (e) {
      console.warn('Error seeding experience:', e);
    }

    // 7. Seed Education if empty
    try {
      const eduCount = await strapi.db.query('api::education.education').count();
      if (eduCount === 0) {
        const initialEducation = [
          {
            degree: 'Master of Computer Applications',
            institution: 'Bharathiyar University',
            year: '2024 - 2026',
            description:
              'Graduated with First Class with Distinction. key coursework included Data Structures & Algorithms, DBMS, Java, and Web Development.',
            order: 1
          },
          {
            degree: 'Bachelor of Computer Applications',
            institution: 'Bharathiyar University',
            year: '2021 - 2024',
            description:
              'Completed with 75.5% aggregate. Focused on Computer fundamentals, Computer Networking and Operating systems.',
            order: 2
          }
        ];

        for (const edu of initialEducation) {
          await strapi.db.query('api::education.education').create({ data: edu });
        }
        console.log(`✓ ${initialEducation.length} education entries seeded.`);
      }
    } catch (e) {
      console.warn('Error seeding education:', e);
    }

    // 8. Seed Testimonials if empty
    try {
      const testCount = await strapi.db.query('api::testimonial.testimonial').count();
      if (testCount === 0) {
        const initialTestimonials = [
          {
            name: 'Technical Lead',
            role: 'Previous Project',
            company: 'Software Solutions',
            text: 'Harigaran is an exceptional developer who consistently delivers high-quality code. His ability to solve complex architectural challenges is impressive.',
            order: 1
          },
          {
            name: 'Senior Developer',
            role: 'Colleague',
            company: 'Tech Innovations',
            text: 'A proactive problem solver with a deep understanding of modern tech stacks. His attention to performance and user experience is top-notch.',
            order: 2
          },
          {
            name: 'Product Manager',
            role: 'Project Stakeholder',
            company: 'Digital Core',
            text: "Clean code, timely delivery, and a great communicator. He doesn't just build features; he builds products that users love.",
            order: 3
          }
        ];

        for (const test of initialTestimonials) {
          await strapi.db.query('api::testimonial.testimonial').create({ data: test });
        }
        console.log(`✓ ${initialTestimonials.length} testimonials seeded.`);
      }
    } catch (e) {
      console.warn('Error seeding testimonials:', e);
    }

    // 9. Seed Methodology if empty
    try {
      const methCount = await strapi.db.query('api::methodology.methodology').count();
      if (methCount === 0) {
        const initialMethodology = [
          {
            title: '01. Analysis',
            desc: 'Understanding business goals, user needs, and defining the technical requirements for scalability.',
            color: '#64ffda',
            iconName: 'FaLightbulb',
            order: 1
          },
          {
            title: '02. Architecture',
            desc: 'Designing the blueprint, database schema, and selecting the optimal tech stack for the project.',
            color: '#9333ea',
            iconName: 'FaDraftingCompass',
            order: 2
          },
          {
            title: '03. Development',
            desc: 'Engineering clean, maintainable, and well-documented code following SOLID and DRY principles.',
            color: '#2563eb',
            iconName: 'FaCode',
            order: 3
          },
          {
            title: '04. Deployment',
            desc: 'Rigorous testing, optimization, and seamless deployment using modern CI/CD pipelines.',
            color: '#10b981',
            iconName: 'FaRocket',
            order: 4
          }
        ];

        for (const m of initialMethodology) {
          await strapi.db.query('api::methodology.methodology').create({ data: m });
        }
        console.log(`✓ ${initialMethodology.length} methodology steps seeded.`);
      }
    } catch (e) {
      console.warn('Error seeding methodology:', e);
    }

    console.log('🎉 Strapi initial data seeding complete.');
  }
};
