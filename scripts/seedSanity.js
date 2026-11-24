import { createClient } from "@sanity/client";

const projectId = process.env.VITE_SANITY_PROJECT_ID || "iudzm87u";
const dataset = process.env.VITE_SANITY_DATASET || "production";
const token = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_TOKEN;

if (!token) {
    console.error("❌ SANITY_AUTH_TOKEN environment variable is required.");
    process.exit(1);
}

const client = createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    token,
    useCdn: false
});

const defaultProfile = {
    hero: {
        greeting: "Engineering the Future",
        titlePrefix: "MODERN",
        titleHighlight: "ARCHITECT.",
        description: "Specializing in high-performance Full Stack applications and enterprise-scale architecture. Crafting seamless digital solutions where code meets creativity.",
        viewWorkButtonText: "View Work",
        contactButtonText: "Let's Talk",
        exploreText: "Explore"
    },
    about: {
        sectionNumber: "01.",
        sectionTitle: "Architecting the Web",
        leadText: "I transform complex problems into elegant digital solutions that live at the intersection of performance and design.",
        bioParagraph1: "As a Full Stack Developer based in the digital landscape, I specialize in crafting high-performance applications with modern tech stacks. My approach is rooted in clean architecture and user-centric design principles.",
        bioParagraph2: "Currently, I'm focused on building scalable enterprise solutions and exploring the frontiers of AI-driven web experiences.",
        resumeUrl: "https://drive.google.com/file/d/1KjIp8G4gvVFprX7KXir4tW6XF7xmdnZB/view?usp=share_link",
        resumeButtonText: "Download Resume",
        stats: [
            { label: "Experience", value: "6 Months" },
            { label: "Projects Completed", value: "3+" },
            { label: "Technologies", value: "12+" }
        ]
    },
    sections: {
        skillsSectionNumber: "03.",
        skillsSectionTitle: "Tech Stack",
        skillsDescription: "The technologies and tools I use to bring ideas to life. I'm always learning and expanding my horizons.",
        projectsSectionNumber: "02.",
        projectsSectionTitle: "Recent Endeavors",
        projectsViewDetailsText: "View Details",
        experienceSectionTitle: "Work Experience",
        educationSectionTitle: "Education",
        methodologySectionNumber: "05.",
        methodologySectionTitle: "Development Blueprint",
        methodologyDescription: "I don't just write code; I engineer solutions. My methodology ensures that every project is built with precision, scalability, and performance at its core.",
        testimonialsSectionNumber: "06.",
        testimonialsSectionTitle: "Voices of Trust"
    },
    brand: {
        logoText: "HARIGARAN",
        statusText: "Available for hire",
        creatorName: "Harigaran R",
        githubUrl: "https://github.com/HarigaranRamesh",
        linkedinUrl: "https://www.linkedin.com/in/harigaran-ramesh-554887224",
        copyrightText: "Portfolio. All rights reserved.",
        preloaderTags: ["Design", "Code", "Experience"]
    },
    contact: {
        subtitle: "Get In Touch",
        title: "Let's Work Together",
        description: "I'm currently available for freelance projects and open to new opportunities. If you have a project in mind or just want to say hi, send me a message!",
        email: "harigaran925@gmail.com",
        quoteText: "Great things are not done by impulse, but by a series of small things brought together.",
        quoteAuthor: "- Vincent van Gogh",
        submitButtonText: "Send Message"
    }
};

const skills = [
    { category: "Programming Languages", items: [
        { name: "JavaScript", iconName: "FaJs", color: "#F7DF1E", level: 70 },
        { name: "TypeScript", iconName: "FaJs", color: "#3178C6", level: 70 },
    ]},
    { category: "Web Development", items: [
        { name: "HTML5", iconName: "FaHtml5", color: "#E34F26", level: 95 },
        { name: "CSS3", iconName: "FaCss3Alt", color: "#1572B6", level: 90 },
        { name: "React", iconName: "FaReact", color: "#61DAFB", level: 70 },
        { name: "Next.js", iconName: "SiNextdotjs", color: "#ffffff", level: 70 },
        { name: "Redux", iconName: "SiRedux", color: "#764ABC", level: 50 },
        { name: "Node.js", iconName: "FaNodeJs", color: "#339933", level: 60 },
        { name: "Express.js", iconName: "SiExpress", color: "#ffffff", level: 60 },
        { name: "Bootstrap", iconName: "FaBootstrap", color: "#7952B3", level: 80 },
        { name: "CMS", iconName: "FaLaptopCode", color: "#4A90E2", level: 60 },
        { name: "Payload CMS", iconName: "SiPayloadcms", color: "#ffffff", level: 60 },
    ]},
    { category: "Databases & Caching", items: [
        { name: "MongoDB", iconName: "SiMongodb", color: "#47A248", level: 70 },
        { name: "PostgreSQL", iconName: "SiPostgresql", color: "#4169E1", level: 70 },
        { name: "Redis", iconName: "SiRedis", color: "#DC382D", level: 70 },
        { name: "RabbitMQ", iconName: "SiRabbitmq", color: "#FF6600", level: 65 },
    ]},
    { category: "Version Control", items: [
        { name: "Git", iconName: "FaGitAlt", color: "#F05032", level: 80 },
        { name: "GitHub", iconName: "FaGithub", color: "#ffffff", level: 85 },
    ]},
    { category: "Deployment", items: [
        { name: "Netlify", iconName: "SiNetlify", color: "#00C7B7", level: 90 },
        { name: "Heroku", iconName: "SiHeroku", color: "#430098", level: 80 },
        { name: "Vercel", iconName: "SiVercel", color: "#ffffff", level: 90 },
        { name: "Render", iconName: "SiRender", color: "#46E3B7", level: 85 },
    ]},
    { category: "Tools", items: [
        { name: "VS Code", iconName: "VscVscode", color: "#007ACC", level: 95 },
        { name: "Postman", iconName: "SiPostman", color: "#FF6C37", level: 85 },
        { name: "Bruno", iconName: "SiBruno", color: "#32465A", level: 80 },
        { name: "Docker", iconName: "FaDocker", color: "#2496ED", level: 70 },
        { name: "Slack", iconName: "FaSlack", color: "#4A154B", level: 85 },
    ]}
];

const projects = [
    {
        title: "E-Commerce Application",
        description: "A high-performance full-stack platform optimized for scale and speed.",
        challenge: "Handling complex state management for thousands of products while maintaining a < 2s load time.",
        solution: "Implemented Redux Toolkit for state and custom middleware for real-time inventory synchronization.",
        impact: "Achieved a 95+ Lighthouse performance score and handled 500+ concurrent user simulations.",
        tech: ["React", "Redux", "Node.js", "Express", "MongoDB"],
        features: [
            "Real-time Analytics Dashboard",
            "Secure JWT Authentication",
            "Advanced Multi-level Filtering",
            "Automated Email Notifications"
        ],
        imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=E-Commerce+App",
        demo: "https://ecommerce-frontend-dqfz.onrender.com",
        github: "https://github.com/HarigaranRamesh/E-commerce-Application"
    },
    {
        title: "Automated HRMS Portal",
        description: "An internal lifecycle management system focused on workflow automation and security.",
        challenge: "Managing complex multi-level approval hierarchies for thousands of employees.",
        solution: "Designed a state-machine based workflow engine to handle dynamic approval layers transparently.",
        impact: "Reduced manual HR administrative tasks by 40% through end-to-end automation.",
        tech: ["React", "Node.js", "Express.js", "MongoDB"],
        features: [
            "Smart Leave Management",
            "Performance Review Engine",
            "Encrypted Document Storage",
            "Real-time Notification System"
        ],
        imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=HRMS+Portal",
        demo: "#",
        github: "#"
    }
];

const experience = [
    {
        role: "Full Stack Developer",
        company: "Karma Group Global",
        duration: "May 2026 - Present",
        description: "Developed and maintained full-stack web applications. Collaborated with cross-functional teams to define requirements and features.",
        tech: ["Next.js", "React", "Node.js", "CMS", "Redis", "RabbitMQ", "Payload CMS", "Slack"]
    },
    {
        role: "Junior Software developer ",
        company: "One assist Technologies",
        duration: "Dec 2025 - March 2026",
        description: "Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to define requirements and features.",
        tech: ["React", "Node.js", "MongoDB", "Express.js", "Postgres SQL", "Hugging Face"]
    },
    {
        role: "Frontend developer intern",
        company: "Stuvels Software Solutions ",
        duration: "Jan 2025 - Mar 2025",
        description: "Built custom websites for personal projects. Managed hosting and deployment on platforms like Netlify and Vercel.",
        tech: ["HTML/CSS", "JavaScript", "React", "Git", "Github"]
    }
];

const education = [
    {
        degree: "Master of  Computer Applications ",
        institution: "Bharathiyar University",
        year: "2024 - 2026",
        description: "Graduated with First Class with Distinction. key coursework included Data Structures & Algorithms, DBMS,Java , and Web Development."
    },
    {
        degree: "Bachelore of Computer Applications",
        institution: "Bharathiyar University",
        year: "2021 - 2024",
        description: "Completed with 75.5% aggregate. Focused on Computer fundamentals , Computer Networking and Operating systems ."
    }
];

const methodology = [
    {
        title: "01. Analysis",
        desc: "Understanding business goals, user needs, and defining the technical requirements for scalability.",
        color: "#64ffda",
        iconName: "FaLightbulb"
    },
    {
        title: "02. Architecture",
        desc: "Designing the blueprint, database schema, and selecting the optimal tech stack for the project.",
        color: "#9333ea",
        iconName: "FaDraftingCompass"
    },
    {
        title: "03. Development",
        desc: "Engineering clean, maintainable, and well-documented code following SOLID and DRY principles.",
        color: "#2563eb",
        iconName: "FaCode"
    },
    {
        title: "04. Deployment",
        desc: "Rigorous testing, optimization, and seamless deployment using modern CI/CD pipelines.",
        color: "#10b981",
        iconName: "FaRocket"
    }
];

const testimonials = [
    {
        name: "Technical Lead",
        role: "Previous Project",
        text: "Harigaran is an exceptional developer who consistently delivers high-quality code. His ability to solve complex architectural challenges is impressive.",
        company: "Software Solutions"
    },
    {
        name: "Senior Developer",
        role: "Colleague",
        text: "A proactive problem solver with a deep understanding of modern tech stacks. His attention to performance and user experience is top-notch.",
        company: "Tech Innovations"
    },
    {
        name: "Product Manager",
        role: "Project Stakeholder",
        text: "Clean code, timely delivery, and a great communicator. He doesn't just build features; he builds products that users love.",
        company: "Digital Core"
    }
];

async function seed() {
    console.log(`🚀 Seeding Sanity dataset '${dataset}' for project '${projectId}'...`);

    // 1. Profile
    console.log("📝 Creating profile document...");
    const profileDoc = {
        _id: "portfolio-profile",
        _type: "profile",
        heroGreeting: defaultProfile.hero.greeting,
        heroTitlePrefix: defaultProfile.hero.titlePrefix,
        heroTitleHighlight: defaultProfile.hero.titleHighlight,
        heroDescription: defaultProfile.hero.description,
        heroViewWorkText: defaultProfile.hero.viewWorkButtonText,
        heroContactText: defaultProfile.hero.contactButtonText,
        heroExploreText: defaultProfile.hero.exploreText,

        aboutSectionNumber: defaultProfile.about.sectionNumber,
        aboutSectionTitle: defaultProfile.about.sectionTitle,
        aboutLeadText: defaultProfile.about.leadText,
        aboutBio1: defaultProfile.about.bioParagraph1,
        aboutBio2: defaultProfile.about.bioParagraph2,
        resumeUrl: defaultProfile.about.resumeUrl,
        aboutResumeButtonText: defaultProfile.about.resumeButtonText,
        stats: defaultProfile.about.stats,

        skillsSectionNumber: defaultProfile.sections.skillsSectionNumber,
        skillsSectionTitle: defaultProfile.sections.skillsSectionTitle,
        skillsDescription: defaultProfile.sections.skillsDescription,
        projectsSectionNumber: defaultProfile.sections.projectsSectionNumber,
        projectsSectionTitle: defaultProfile.sections.projectsSectionTitle,
        projectsViewDetailsText: defaultProfile.sections.projectsViewDetailsText,
        experienceSectionTitle: defaultProfile.sections.experienceSectionTitle,
        educationSectionTitle: defaultProfile.sections.educationSectionTitle,
        methodologySectionNumber: defaultProfile.sections.methodologySectionNumber,
        methodologySectionTitle: defaultProfile.sections.methodologySectionTitle,
        methodologyDescription: defaultProfile.sections.methodologyDescription,
        testimonialsSectionNumber: defaultProfile.sections.testimonialsSectionNumber,
        testimonialsSectionTitle: defaultProfile.sections.testimonialsSectionTitle,

        brandLogoText: defaultProfile.brand.logoText,
        brandStatusText: defaultProfile.brand.statusText,
        brandCreatorName: defaultProfile.brand.creatorName,
        socialGithub: defaultProfile.brand.githubUrl,
        socialLinkedin: defaultProfile.brand.linkedinUrl,
        brandCopyrightText: defaultProfile.brand.copyrightText,
        preloaderTags: defaultProfile.brand.preloaderTags,

        contactSubtitle: defaultProfile.contact.subtitle,
        contactTitle: defaultProfile.contact.title,
        contactDescription: defaultProfile.contact.description,
        contactEmail: defaultProfile.contact.email,
        contactQuoteText: defaultProfile.contact.quoteText,
        contactQuoteAuthor: defaultProfile.contact.quoteAuthor,
        contactSubmitButtonText: defaultProfile.contact.submitButtonText
    };
    await client.createOrReplace(profileDoc);
    console.log("✅ Profile document seeded.");

    // 2. Skills
    console.log("⚡ Seeding skills...");
    let skillIndex = 0;
    for (const group of skills) {
        for (const item of group.items) {
            skillIndex++;
            const skillDoc = {
                _id: `skill-${skillIndex}`,
                _type: "skill",
                name: item.name,
                category: group.category,
                level: item.level,
                color: item.color,
                iconName: item.iconName,
                order: skillIndex
            };
            await client.createOrReplace(skillDoc);
        }
    }
    console.log(`✅ ${skillIndex} skills seeded.`);

    // 3. Projects
    console.log("🚀 Seeding projects...");
    for (let i = 0; i < projects.length; i++) {
        const p = projects[i];
        const projectDoc = {
            _id: `project-${i + 1}`,
            _type: "project",
            title: p.title,
            description: p.description,
            challenge: p.challenge,
            solution: p.solution,
            impact: p.impact,
            tech: p.tech,
            features: p.features,
            imageUrl: p.imageUrl,
            demo: p.demo,
            github: p.github,
            order: i + 1
        };
        await client.createOrReplace(projectDoc);
    }
    console.log(`✅ ${projects.length} projects seeded.`);

    // 4. Experience
    console.log("💼 Seeding experience...");
    for (let i = 0; i < experience.length; i++) {
        const exp = experience[i];
        const expDoc = {
            _id: `experience-${i + 1}`,
            _type: "experience",
            role: exp.role,
            company: exp.company,
            duration: exp.duration,
            description: exp.description,
            tech: exp.tech,
            order: i + 1
        };
        await client.createOrReplace(expDoc);
    }
    console.log(`✅ ${experience.length} experiences seeded.`);

    // 5. Education
    console.log("🎓 Seeding education...");
    for (let i = 0; i < education.length; i++) {
        const edu = education[i];
        const eduDoc = {
            _id: `education-${i + 1}`,
            _type: "education",
            degree: edu.degree,
            institution: edu.institution,
            year: edu.year,
            description: edu.description,
            order: i + 1
        };
        await client.createOrReplace(eduDoc);
    }
    console.log(`✅ ${education.length} educations seeded.`);

    // 6. Methodology
    console.log("📐 Seeding methodology...");
    for (let i = 0; i < methodology.length; i++) {
        const m = methodology[i];
        const methDoc = {
            _id: `methodology-${i + 1}`,
            _type: "methodology",
            title: m.title,
            desc: m.desc,
            color: m.color,
            iconName: m.iconName,
            order: i + 1
        };
        await client.createOrReplace(methDoc);
    }
    console.log(`✅ ${methodology.length} methodology steps seeded.`);

    // 7. Testimonials
    console.log("💬 Seeding testimonials...");
    for (let i = 0; i < testimonials.length; i++) {
        const t = testimonials[i];
        const testDoc = {
            _id: `testimonial-${i + 1}`,
            _type: "testimonial",
            name: t.name,
            role: t.role,
            company: t.company,
            text: t.text,
            order: i + 1
        };
        await client.createOrReplace(testDoc);
    }
    console.log(`✅ ${testimonials.length} testimonials seeded.`);

    console.log("🎉 ALL DATA SEEDED SUCCESSFULLY INTO SANITY CLOUD!");
}

seed().catch(err => {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
});
