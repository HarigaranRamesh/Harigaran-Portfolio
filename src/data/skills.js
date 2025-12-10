import { FaReact, FaNodeJs, FaJava, FaGitAlt, FaGithub, FaJs, FaAngular, FaHtml5, FaCss3Alt, FaBootstrap, FaDocker } from "react-icons/fa";
import { SiMongodb, SiPostgresql, SiSpringboot, SiExpress, SiMysql, SiPostman, SiNetlify, SiHeroku, SiVercel, SiRender, SiRedux } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

export const skills = [
    {
        category: "Programming Languages",
        items: [
            { name: "Java", icon: FaJava, color: "#007396" },
            { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
            { name: "TypeScript", icon: FaJs, color: "#3178C6" },
        ]
    },
    {
        category: "Web Development",
        items: [
            { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
            { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
            { name: "React", icon: FaReact, color: "#61DAFB" },
            { name: "Redux", icon: SiRedux, color: "#764ABC" },
            { name: "Angular", icon: FaAngular, color: "#DD0031" },
            { name: "Node.js", icon: FaNodeJs, color: "#339933" },
            { name: "Express.js", icon: SiExpress, color: "#ffffff" },
            { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
            { name: "Bootstrap", icon: FaBootstrap, color: "#7952B3" },
        ]
    },
    {
        category: "Databases",
        items: [
            { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
            { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
            { name: "MySQL", icon: SiMysql, color: "#4479A1" },
        ]
    },
    {
        category: "Version Control",
        items: [
            { name: "Git", icon: FaGitAlt, color: "#F05032" },
            { name: "GitHub", icon: FaGithub, color: "#ffffff" },
        ]
    },
    {
        category: "Deployment",
        items: [
            { name: "Netlify", icon: SiNetlify, color: "#00C7B7" },
            { name: "Heroku", icon: SiHeroku, color: "#430098" },
            { name: "Vercel", icon: SiVercel, color: "#ffffff" },
            { name: "Render", icon: SiRender, color: "#46E3B7" },
        ]
    },
    {
        category: "Tools",
        items: [
            { name: "VS Code", icon: VscVscode, color: "#007ACC" },
            { name: "Postman", icon: SiPostman, color: "#FF6C37" },
            // { name: "Docker", icon: FaDocker, color: "#2496ED" }, // Optional
        ]
    },
];
