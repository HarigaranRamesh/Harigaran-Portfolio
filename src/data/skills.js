import { FaReact, FaNodeJs, FaGitAlt, FaGithub, FaJs, FaHtml5, FaCss3Alt, FaBootstrap, FaDocker, FaLaptopCode } from "react-icons/fa";
import { SiMongodb, SiPostgresql, SiExpress, SiPostman, SiNetlify, SiHeroku, SiVercel, SiRender, SiRedux, SiNextdotjs } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

export const skills = [
    {
        category: "Programming Languages",
        items: [
            { name: "JavaScript", icon: FaJs, color: "#F7DF1E", level: 70 },
            { name: "TypeScript", icon: FaJs, color: "#3178C6", level: 70 },
        ]
    },
    {
        category: "Web Development",
        items: [
            { name: "HTML5", icon: FaHtml5, color: "#E34F26", level: 95 },
            { name: "CSS3", icon: FaCss3Alt, color: "#1572B6", level: 90 },
            { name: "React", icon: FaReact, color: "#61DAFB", level: 70 },
            { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", level: 70 },
            { name: "Redux", icon: SiRedux, color: "#764ABC", level: 50 },
            { name: "Node.js", icon: FaNodeJs, color: "#339933", level: 60 },
            { name: "Express.js", icon: SiExpress, color: "#ffffff", level: 60 },
            { name: "Bootstrap", icon: FaBootstrap, color: "#7952B3", level: 80 },
            { name: "CMS", icon: FaLaptopCode, color: "#4A90E2", level: 60 },
        ]
    },
    {
        category: "Databases",
        items: [
            { name: "MongoDB", icon: SiMongodb, color: "#47A248", level: 70 },
            { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", level: 70 },

        ]
    },
    {
        category: "Version Control",
        items: [
            { name: "Git", icon: FaGitAlt, color: "#F05032", level: 80 },
            { name: "GitHub", icon: FaGithub, color: "#ffffff", level: 85 },
        ]
    },
    {
        category: "Deployment",
        items: [
            { name: "Netlify", icon: SiNetlify, color: "#00C7B7", level: 90 },
            { name: "Heroku", icon: SiHeroku, color: "#430098", level: 80 },
            { name: "Vercel", icon: SiVercel, color: "#ffffff", level: 90 },
            { name: "Render", icon: SiRender, color: "#46E3B7", level: 85 },
        ]
    },
    {
        category: "Tools",
        items: [
            { name: "VS Code", icon: VscVscode, color: "#007ACC", level: 95 },
            { name: "Postman", icon: SiPostman, color: "#FF6C37", level: 85 },
            { name: "Docker", icon: FaDocker, color: "#2496ED", level: 70 },
        ]
    },
];
