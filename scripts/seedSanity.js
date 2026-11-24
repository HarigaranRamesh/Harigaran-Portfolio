import { createClient } from "@sanity/client";
import { defaultProfile } from "../src/data/profile.js";
import { skills } from "../src/data/skills.js";
import { projects } from "../src/data/projects.js";
import { experience } from "../src/data/experience.js";
import { education } from "../src/data/education.js";
import { methodology } from "../src/data/methodology.js";
import { testimonials } from "../src/data/testimonials.js";

const projectId = process.env.VITE_SANITY_PROJECT_ID || "iudzm87u";
const dataset = process.env.VITE_SANITY_DATASET || "production";
const token = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_TOKEN;

if (!token) {
    console.error("❌ SANITY_AUTH_TOKEN environment variable is required to write data to Sanity.");
    console.log("👉 Get one from https://www.sanity.io/manage -> Project -> API -> Tokens -> Add API token (Editor permissions)");
    console.log("👉 Then run: SANITY_AUTH_TOKEN=your_token node scripts/seedSanity.js");
    process.exit(1);
}

const client = createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    token,
    useCdn: false
});

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
            imageUrl: p.image,
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
