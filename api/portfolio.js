import { createClient } from "@sanity/client";

// Server-side backend environment variables (never bundled or exposed to client/browser)
const projectId = process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.VITE_SANITY_DATASET || "production";
const token = process.env.SANITY_AUTH_TOKEN || process.env.SANITY_TOKEN;

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (!projectId) {
        return res.status(200).json({ success: false, reason: "No Sanity project configured" });
    }

    try {
        const client = createClient({
            projectId,
            dataset,
            apiVersion: "2024-01-01",
            token: token || undefined,
            useCdn: true
        });

        const [profile, skills, projects, experience, education, methodology, testimonials] = await Promise.all([
            client.fetch('*[_type == "profile"][0]'),
            client.fetch('*[_type == "skill"] | order(order asc)'),
            client.fetch('*[_type == "project"] | order(order asc)'),
            client.fetch('*[_type == "experience"] | order(order asc)'),
            client.fetch('*[_type == "education"] | order(order asc)'),
            client.fetch('*[_type == "methodology"] | order(order asc)'),
            client.fetch('*[_type == "testimonial"] | order(order asc)')
        ]);

        return res.status(200).json({
            success: true,
            data: {
                profile,
                skills,
                projects,
                experience,
                education,
                methodology,
                testimonials
            }
        });
    } catch (error) {
        return res.status(200).json({
            success: false,
            error: error.message
        });
    }
}
