import { defaultProfile } from "../data/profile";
import { skills as defaultSkills } from "../data/skills";
import { projects as defaultProjects } from "../data/projects";
import { experience as defaultExperience } from "../data/experience";
import { education as defaultEducation } from "../data/education";
import { testimonials as defaultTestimonials } from "../data/testimonials";
import { methodology as defaultMethodology } from "../data/methodology";
import { resolveSkillIcon } from "../utils/iconResolver";

const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_API_URL || "";
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN || "";

/**
 * Check if a valid remote Strapi instance is configured.
 * In production, if no remote URL is configured, we immediately return static data (0ms delay, 0 console errors).
 */
export const isStrapiActive = () => {
    if (!STRAPI_BASE_URL) return false;
    if (import.meta.env.PROD && (STRAPI_BASE_URL.includes("localhost") || STRAPI_BASE_URL.includes("127.0.0.1"))) {
        return false;
    }
    return true;
};

/**
 * Resolves a media file path or object from Strapi into an absolute accessible URL.
 */
export const getStrapiMediaUrl = (media) => {
    if (!media) return null;

    if (typeof media === "string") {
        if (media.startsWith("http://") || media.startsWith("https://") || media.startsWith("data:")) {
            return media;
        }
        return `${STRAPI_BASE_URL}${media.startsWith("/") ? "" : "/"}${media}`;
    }

    // Strapi media objects (v4 / v5)
    const url = media.url || media.attributes?.url || media.data?.attributes?.url || media.data?.url;
    if (!url) return null;

    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
        return url;
    }

    return `${STRAPI_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
};

/**
 * Universal unpacker for Strapi v4 and v5 nested JSON structures.
 */
export const normalizeStrapiData = (data) => {
    if (data === null || data === undefined) return null;

    // If array, map each item
    if (Array.isArray(data)) {
        return data.map((item) => normalizeStrapiData(item));
    }

    // If object with 'data' field (standard Strapi wrapper)
    if (typeof data === "object" && "data" in data) {
        return normalizeStrapiData(data.data);
    }

    // If object with 'attributes' field (Strapi v4)
    if (typeof data === "object" && data.attributes) {
        const result = { id: data.id, ...data.attributes };
        for (const key of Object.keys(result)) {
            result[key] = normalizeStrapiData(result[key]);
        }
        return result;
    }

    // Generic object traversal
    if (typeof data === "object") {
        const result = {};
        for (const key of Object.keys(data)) {
            result[key] = normalizeStrapiData(data[key]);
        }
        return result;
    }

    return data;
};

/**
 * Fetch wrapper with timeout and fallback support
 */
async function fetchStrapiEndpoint(endpoint, params = "populate=*") {
    if (!isStrapiActive()) {
        return null;
    }

    const url = `${STRAPI_BASE_URL}/api/${endpoint}?${params}`;
    const headers = {
        "Content-Type": "application/json"
    };

    if (STRAPI_TOKEN) {
        headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    try {
        const response = await fetch(url, {
            headers,
            signal: controller.signal
        });
        clearTimeout(timeout);

        if (!response.ok) {
            throw new Error(`Strapi API Error: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return normalizeStrapiData(json);
    } catch {
        clearTimeout(timeout);
        // Silently fall back to default data if Strapi is offline or unconfigured
        return null;
    }
}

/**
 * Profile, Hero, Brand, and Contact Data: Single Type `profile`
 */
export async function fetchProfile() {
    try {
        const data = await fetchStrapiEndpoint("profile", "populate=*");
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
                profileImage: getStrapiMediaUrl(data.profileImage) || getStrapiMediaUrl(data.profileImageUrl) || defaultProfile.about.profileImage,
                resumeUrl: getStrapiMediaUrl(data.resumeFile) || data.resumeUrl || defaultProfile.about.resumeUrl,
                resumeButtonText: data.aboutResumeButtonText || defaultProfile.about.resumeButtonText,
                stats: Array.isArray(data.stats) && data.stats.length > 0
                    ? data.stats
                    : defaultProfile.about.stats
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
                preloaderTags: Array.isArray(data.preloaderTags) && data.preloaderTags.length > 0
                    ? data.preloaderTags
                    : defaultProfile.brand.preloaderTags
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
    } catch {
        return defaultProfile;
    }
}

/**
 * Projects: Collection Type `projects`
 */
export async function fetchProjects() {
    try {
        const raw = await fetchStrapiEndpoint("projects", "populate=*&sort=order:asc,createdAt:desc");
        if (!raw || !Array.isArray(raw) || raw.length === 0) {
            return defaultProjects;
        }

        return raw.map((p, index) => {
            const fallback = defaultProjects[index] || {};
            // Parse tech and features if stored as comma strings, JSON, or relation
            let tech = p.tech;
            if (typeof tech === "string") {
                try {
                    tech = JSON.parse(tech);
                } catch {
                    tech = tech.split(",").map((s) => s.trim());
                }
            }

            let features = p.features;
            if (typeof features === "string") {
                try {
                    features = JSON.parse(features);
                } catch {
                    features = features.split("\n").map((s) => s.trim()).filter(Boolean);
                }
            }

            return {
                id: p.id || index + 1,
                title: p.title || fallback.title || "Project",
                description: p.description || fallback.description || "",
                challenge: p.challenge || fallback.challenge || "",
                solution: p.solution || fallback.solution || "",
                impact: p.impact || fallback.impact || "",
                tech: Array.isArray(tech) && tech.length > 0 ? tech : (fallback.tech || []),
                features: Array.isArray(features) && features.length > 0 ? features : (fallback.features || []),
                image: getStrapiMediaUrl(p.image) || getStrapiMediaUrl(p.imageUrl) || fallback.image || "https://placehold.co/600x400/1a1a1a/ffffff?text=Project",
                demo: p.demo || fallback.demo || "#",
                github: p.github || fallback.github || "#"
            };
        });
    } catch {
        return defaultProjects;
    }
}

/**
 * Skills: Collection Type `skills`
 */
export async function fetchSkills() {
    try {
        const raw = await fetchStrapiEndpoint("skills", "populate=*&sort=order:asc,name:asc");
        if (!raw || !Array.isArray(raw) || raw.length === 0) {
            return defaultSkills;
        }

        const groups = {};
        for (const item of raw) {
            const categoryName = item.category || "General";
            if (!groups[categoryName]) {
                groups[categoryName] = {
                    category: categoryName,
                    items: []
                };
            }

            const iconSource = item.iconImage ? getStrapiMediaUrl(item.iconImage) : item.iconName;
            groups[categoryName].items.push({
                name: item.name,
                color: item.color || "#61DAFB",
                level: typeof item.level === "number" ? item.level : 75,
                icon: resolveSkillIcon(iconSource)
            });
        }

        return Object.values(groups);
    } catch {
        return defaultSkills;
    }
}

/**
 * Experience: Collection Type `experiences`
 */
export async function fetchExperience() {
    try {
        const raw = await fetchStrapiEndpoint("experiences", "populate=*&sort=order:asc,createdAt:desc");
        if (!raw || !Array.isArray(raw) || raw.length === 0) {
            return defaultExperience;
        }

        return raw.map((item, index) => {
            let tech = item.tech;
            if (typeof tech === "string") {
                try {
                    tech = JSON.parse(tech);
                } catch {
                    tech = tech.split(",").map((s) => s.trim());
                }
            }

            return {
                id: item.id || index + 1,
                role: item.role,
                company: item.company,
                duration: item.duration,
                description: item.description,
                tech: Array.isArray(tech) ? tech : []
            };
        });
    } catch {
        return defaultExperience;
    }
}

/**
 * Education: Collection Type `educations`
 */
export async function fetchEducation() {
    try {
        const raw = await fetchStrapiEndpoint("educations", "populate=*&sort=order:asc,createdAt:desc");
        if (!raw || !Array.isArray(raw) || raw.length === 0) {
            return defaultEducation;
        }

        return raw.map((item, index) => ({
            id: item.id || index + 1,
            degree: item.degree,
            institution: item.institution,
            year: item.year,
            description: item.description
        }));
    } catch {
        return defaultEducation;
    }
}

/**
 * Methodology: Collection Type `methodologies`
 */
export async function fetchMethodology() {
    try {
        const raw = await fetchStrapiEndpoint("methodologies", "populate=*&sort=order:asc,createdAt:desc");
        if (!raw || !Array.isArray(raw) || raw.length === 0) {
            return defaultMethodology;
        }

        return raw.map((item, index) => ({
            id: item.id || index + 1,
            title: item.title,
            desc: item.desc,
            color: item.color || "#64ffda",
            iconName: item.iconName || "FaLightbulb"
        }));
    } catch {
        return defaultMethodology;
    }
}

/**
 * Testimonials: Collection Type `testimonials`
 */
export async function fetchTestimonials() {
    try {
        const raw = await fetchStrapiEndpoint("testimonials", "populate=*&sort=order:asc,createdAt:desc");
        if (!raw || !Array.isArray(raw) || raw.length === 0) {
            return defaultTestimonials;
        }

        return raw.map((item, index) => ({
            id: item.id || index + 1,
            name: item.name,
            role: item.role,
            text: item.text,
            company: item.company
        }));
    } catch {
        return defaultTestimonials;
    }
}
