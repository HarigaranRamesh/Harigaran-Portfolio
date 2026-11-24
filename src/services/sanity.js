import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { defaultProfile } from "../data/profile";
import { skills as defaultSkills } from "../data/skills";
import { projects as defaultProjects } from "../data/projects";
import { experience as defaultExperience } from "../data/experience";
import { education as defaultEducation } from "../data/education";
import { testimonials as defaultTestimonials } from "../data/testimonials";
import { methodology as defaultMethodology } from "../data/methodology";
import { resolveSkillIcon } from "../utils/iconResolver";

const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || "";
const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET || "production";
const SANITY_API_VERSION = "2024-01-01";

export const isSanityConfigured = () => Boolean(SANITY_PROJECT_ID && SANITY_PROJECT_ID.trim() !== "");

export const sanityClient = isSanityConfigured()
    ? createClient({
          projectId: SANITY_PROJECT_ID,
          dataset: SANITY_DATASET,
          apiVersion: SANITY_API_VERSION,
          useCdn: true
      })
    : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export const urlForImage = (source) => {
    if (!source) return null;
    if (typeof source === "string") return source;
    if (source.asset && source.asset.url) return source.asset.url;
    if (builder && source.asset) {
        return builder.image(source).url();
    }
    return null;
};

export const getAssetFileUrl = (asset) => {
    if (!asset) return null;
    if (typeof asset === "string") return asset;
    if (asset.asset?.url) return asset.asset.url;
    if (asset.url) return asset.url;
    return null;
};

export function normalizeProfile(data) {
    if (!data) return defaultProfile;
    return {
        hero: {
            greeting: data.heroGreeting || defaultProfile.hero.greeting,
            titlePrefix: data.heroTitlePrefix || defaultProfile.hero.titlePrefix,
            titleHighlight: data.heroTitleHighlight || defaultProfile.hero.titleHighlight,
            description: data.heroDescription || defaultProfile.hero.description,
            viewWorkButtonText: data.heroViewWorkText || defaultProfile.hero.viewWorkButtonText,
            contactButtonText: data.heroContactText || defaultProfile.hero.contactButtonText,
            exploreText: data.heroExploreText || defaultProfile.hero.exploreText
        },
        about: {
            sectionNumber: data.aboutSectionNumber || defaultProfile.about.sectionNumber,
            sectionTitle: data.aboutSectionTitle || defaultProfile.about.sectionTitle,
            leadText: data.aboutLeadText || defaultProfile.about.leadText,
            bioParagraph1: data.aboutBio1 || defaultProfile.about.bioParagraph1,
            bioParagraph2: data.aboutBio2 || defaultProfile.about.bioParagraph2,
            profileImage: urlForImage(data.profileImage) || defaultProfile.about.profileImage,
            resumeUrl: getAssetFileUrl(data.resumeFile) || data.resumeUrl || defaultProfile.about.resumeUrl,
            resumeButtonText: data.aboutResumeButtonText || defaultProfile.about.resumeButtonText,
            stats: Array.isArray(data.stats) && data.stats.length > 0 ? data.stats : defaultProfile.about.stats
        },
        sections: {
            skillsSectionNumber: data.skillsSectionNumber || defaultProfile.sections.skillsSectionNumber,
            skillsSectionTitle: data.skillsSectionTitle || defaultProfile.sections.skillsSectionTitle,
            skillsDescription: data.skillsDescription || defaultProfile.sections.skillsDescription,
            projectsSectionNumber: data.projectsSectionNumber || defaultProfile.sections.projectsSectionNumber,
            projectsSectionTitle: data.projectsSectionTitle || defaultProfile.sections.projectsSectionTitle,
            projectsViewDetailsText: data.projectsViewDetailsText || defaultProfile.sections.projectsViewDetailsText,
            experienceSectionTitle: data.experienceSectionTitle || defaultProfile.sections.experienceSectionTitle,
            educationSectionTitle: data.educationSectionTitle || defaultProfile.sections.educationSectionTitle,
            methodologySectionNumber: data.methodologySectionNumber || defaultProfile.sections.methodologySectionNumber,
            methodologySectionTitle: data.methodologySectionTitle || defaultProfile.sections.methodologySectionTitle,
            methodologyDescription: data.methodologyDescription || defaultProfile.sections.methodologyDescription,
            testimonialsSectionNumber: data.testimonialsSectionNumber || defaultProfile.sections.testimonialsSectionNumber,
            testimonialsSectionTitle: data.testimonialsSectionTitle || defaultProfile.sections.testimonialsSectionTitle
        },
        brand: {
            logoText: data.brandLogoText || defaultProfile.brand.logoText,
            statusText: data.brandStatusText || defaultProfile.brand.statusText,
            creatorName: data.brandCreatorName || defaultProfile.brand.creatorName,
            githubUrl: data.socialGithub || defaultProfile.brand.githubUrl,
            linkedinUrl: data.socialLinkedin || defaultProfile.brand.linkedinUrl,
            twitterUrl: data.socialTwitter || "",
            leetcodeUrl: data.socialLeetcode || "",
            socialLinks: Array.isArray(data.socialLinks) ? data.socialLinks : [],
            copyrightText: data.brandCopyrightText || defaultProfile.brand.copyrightText,
            preloaderTags: Array.isArray(data.preloaderTags) && data.preloaderTags.length > 0 ? data.preloaderTags : defaultProfile.brand.preloaderTags
        },
        contact: {
            subtitle: data.contactSubtitle || defaultProfile.contact.subtitle,
            title: data.contactTitle || defaultProfile.contact.title,
            description: data.contactDescription || defaultProfile.contact.description,
            email: data.contactEmail || defaultProfile.contact.email,
            quoteText: data.contactQuoteText || defaultProfile.contact.quoteText,
            quoteAuthor: data.contactQuoteAuthor || defaultProfile.contact.quoteAuthor,
            submitButtonText: data.contactSubmitButtonText || defaultProfile.contact.submitButtonText
        }
    };
}

export function normalizeSkills(raw) {
    if (!raw || !Array.isArray(raw) || raw.length === 0) return defaultSkills;
    const groups = {};
    for (const item of raw) {
        const categoryName = item.category || "General";
        if (!groups[categoryName]) {
            groups[categoryName] = {
                category: categoryName,
                items: []
            };
        }
        groups[categoryName].items.push({
            name: item.name,
            color: item.color || "#61DAFB",
            level: typeof item.level === "number" ? item.level : 75,
            icon: resolveSkillIcon(item.iconName)
        });
    }
    return Object.values(groups);
}

export function normalizeProjects(raw) {
    if (!raw || !Array.isArray(raw) || raw.length === 0) return defaultProjects;
    return raw.map((p, index) => {
        const fallback = defaultProjects[index] || {};
        return {
            id: p._id || index + 1,
            title: p.title || fallback.title || "Project",
            description: p.description || fallback.description || "",
            challenge: p.challenge || fallback.challenge || "",
            solution: p.solution || fallback.solution || "",
            impact: p.impact || fallback.impact || "",
            tech: Array.isArray(p.tech) && p.tech.length > 0 ? p.tech : (fallback.tech || []),
            features: Array.isArray(p.features) && p.features.length > 0 ? p.features : (fallback.features || []),
            image: urlForImage(p.image) || p.imageUrl || fallback.image,
            demo: p.demo || fallback.demo || "#",
            github: p.github || fallback.github || "#"
        };
    });
}

export function normalizeExperience(raw) {
    if (!raw || !Array.isArray(raw) || raw.length === 0) return defaultExperience;
    return raw.map((item, index) => ({
        id: item._id || index + 1,
        role: item.role,
        company: item.company,
        duration: item.duration,
        description: item.description,
        tech: Array.isArray(item.tech) ? item.tech : []
    }));
}

export function normalizeEducation(raw) {
    if (!raw || !Array.isArray(raw) || raw.length === 0) return defaultEducation;
    return raw.map((item, index) => ({
        id: item._id || index + 1,
        degree: item.degree,
        institution: item.institution,
        year: item.year,
        description: item.description
    }));
}

export function normalizeMethodology(raw) {
    if (!raw || !Array.isArray(raw) || raw.length === 0) return defaultMethodology;
    return raw.map((item, index) => ({
        id: item._id || index + 1,
        title: item.title,
        desc: item.desc,
        color: item.color || "#64ffda",
        iconName: item.iconName || "FaLightbulb"
    }));
}

export function normalizeTestimonials(raw) {
    if (!raw || !Array.isArray(raw) || raw.length === 0) return defaultTestimonials;
    return raw.map((item, index) => ({
        id: item._id || index + 1,
        name: item.name,
        role: item.role,
        text: item.text,
        company: item.company
    }));
}

/**
 * Fetch portfolio data securely via serverless backend API (/api/portfolio)
 * This ensures NO CMS keys, endpoints or tokens are exposed to the client browser.
 */
export async function fetchBackendPortfolio() {
    try {
        const res = await fetch("/api/portfolio");
        if (!res.ok) return null;
        const json = await res.json();
        if (!json.success || !json.data) return null;
        return {
            profile: normalizeProfile(json.data.profile),
            skills: normalizeSkills(json.data.skills),
            projects: normalizeProjects(json.data.projects),
            experience: normalizeExperience(json.data.experience),
            education: normalizeEducation(json.data.education),
            methodology: normalizeMethodology(json.data.methodology),
            testimonials: normalizeTestimonials(json.data.testimonials)
        };
    } catch {
        return null;
    }
}

export async function fetchSanityProfile() {
    if (!isSanityConfigured() || !sanityClient) return defaultProfile;
    try {
        const data = await sanityClient.fetch('*[_type == "profile"][0]');
        return normalizeProfile(data);
    } catch {
        return defaultProfile;
    }
}

export async function fetchSanitySkills() {
    if (!isSanityConfigured() || !sanityClient) return defaultSkills;
    try {
        const raw = await sanityClient.fetch('*[_type == "skill"] | order(order asc)');
        return normalizeSkills(raw);
    } catch {
        return defaultSkills;
    }
}

export async function fetchSanityProjects() {
    if (!isSanityConfigured() || !sanityClient) return defaultProjects;
    try {
        const raw = await sanityClient.fetch('*[_type == "project"] | order(order asc)');
        return normalizeProjects(raw);
    } catch {
        return defaultProjects;
    }
}

export async function fetchSanityExperience() {
    if (!isSanityConfigured() || !sanityClient) return defaultExperience;
    try {
        const raw = await sanityClient.fetch('*[_type == "experience"] | order(order asc)');
        return normalizeExperience(raw);
    } catch {
        return defaultExperience;
    }
}

export async function fetchSanityEducation() {
    if (!isSanityConfigured() || !sanityClient) return defaultEducation;
    try {
        const raw = await sanityClient.fetch('*[_type == "education"] | order(order asc)');
        return normalizeEducation(raw);
    } catch {
        return defaultEducation;
    }
}

export async function fetchSanityMethodology() {
    if (!isSanityConfigured() || !sanityClient) return defaultMethodology;
    try {
        const raw = await sanityClient.fetch('*[_type == "methodology"] | order(order asc)');
        return normalizeMethodology(raw);
    } catch {
        return defaultMethodology;
    }
}

export async function fetchSanityTestimonials() {
    if (!isSanityConfigured() || !sanityClient) return defaultTestimonials;
    try {
        const raw = await sanityClient.fetch('*[_type == "testimonial"] | order(order asc)');
        return normalizeTestimonials(raw);
    } catch {
        return defaultTestimonials;
    }
}
