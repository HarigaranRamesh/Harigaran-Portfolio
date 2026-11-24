import React from "react";
import {
    FaReact,
    FaNodeJs,
    FaGitAlt,
    FaGithub,
    FaJs,
    FaHtml5,
    FaCss3Alt,
    FaBootstrap,
    FaDocker,
    FaLaptopCode,
    FaSlack,
    FaCode,
    FaPython,
    FaJava,
    FaAws,
    FaDatabase,
    FaLightbulb,
    FaDraftingCompass,
    FaRocket,
    FaLinkedin,
    FaTwitter,
    FaEnvelope
} from "react-icons/fa";
import {
    SiMongodb,
    SiPostgresql,
    SiExpress,
    SiPostman,
    SiNetlify,
    SiHeroku,
    SiVercel,
    SiRender,
    SiRedux,
    SiNextdotjs,
    SiRedis,
    SiRabbitmq,
    SiBruno,
    SiPayloadcms,
    SiTypescript,
    SiTailwindcss,
    SiStrapi,
    SiFirebase,
    SiGraphql,
    SiMysql,
    SiKubernetes,
    SiFigma,
    SiLeetcode,
    SiYoutube,
    SiInstagram
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

// Icon dictionary supporting string keys from Strapi CMS
export const iconMap = {
    // React & Front-end
    FaReact,
    SiNextdotjs,
    SiRedux,
    FaJs,
    SiTypescript,
    FaHtml5,
    FaCss3Alt,
    SiTailwindcss,
    FaBootstrap,
    SiFigma,

    // Back-end & Runtimes
    FaNodeJs,
    SiExpress,
    FaPython,
    FaJava,
    SiGraphql,

    // Databases & Cache
    SiMongodb,
    SiPostgresql,
    SiMysql,
    SiRedis,
    SiRabbitmq,
    FaDatabase,

    // CMS
    SiPayloadcms,
    SiStrapi,
    FaLaptopCode,

    // DevOps & Cloud
    FaDocker,
    SiKubernetes,
    FaAws,
    SiVercel,
    SiNetlify,
    SiHeroku,
    SiRender,
    SiFirebase,

    // Tools & Version Control
    FaGitAlt,
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaEnvelope,
    SiLeetcode,
    SiYoutube,
    SiInstagram,
    VscVscode,
    SiPostman,
    SiBruno,
    FaSlack,
    FaCode,

    // Methodology Icons
    FaLightbulb,
    FaDraftingCompass,
    FaRocket
};

/**
 * Resolves an icon representation into a renderable React component.
 * Can be:
 * - A React Icon component (already a function)
 * - A string matching an icon key (e.g. "FaReact", "SiStrapi")
 * - A string URL to an SVG or image
 */
export const resolveSkillIcon = (iconInput) => {
    if (!iconInput) {
        return FaCode;
    }

    // If it's already a component/function
    if (typeof iconInput === "function") {
        return iconInput;
    }

    // If it's a string matching our iconMap
    if (typeof iconInput === "string") {
        if (iconMap[iconInput]) {
            return iconMap[iconInput];
        }

        // If it's an image/svg url
        if (iconInput.startsWith("http") || iconInput.startsWith("/") || iconInput.startsWith("data:")) {
            return function DynamicImageIcon(props) {
                return (
                    <img
                        src={iconInput}
                        alt="skill icon"
                        className={`skill-icon ${props.className || ""}`}
                        style={{ width: "1em", height: "1em", objectFit: "contain" }}
                    />
                );
            };
        }
    }

    return FaCode;
};
