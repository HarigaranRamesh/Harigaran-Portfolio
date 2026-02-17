import { motion } from "framer-motion";
import {
    SiReact, SiAngular, SiNodedotjs, SiExpress, SiMongodb,
    SiPostgresql, SiTypescript, SiJavascript, SiFramer,
    SiTailwindcss, SiDocker, SiGit
} from "react-icons/si";
import "../../styles/Marquee.css";

const techStack = [
    { icon: <SiReact />, name: "React" },
    { icon: <SiAngular />, name: "Angular" },
    { icon: <SiNodedotjs />, name: "Node.js" },
    { icon: <SiExpress />, name: "Express" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <SiPostgresql />, name: "PostgreSQL" },
    { icon: <SiTypescript />, name: "TypeScript" },
    { icon: <SiJavascript />, name: "JavaScript" },
    { icon: <SiFramer />, name: "Framer" },
    { icon: <SiTailwindcss />, name: "Tailwind" },
    { icon: <SiDocker />, name: "Docker" },
    { icon: <SiGit />, name: "Git" },
];

const Marquee = () => {
    return (
        <div className="marquee-container">
            <div className="marquee-content">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="marquee-track">
                        {techStack.map((tech, idx) => (
                            <div key={idx} className="marquee-item">
                                <span className="marquee-icon">{tech.icon}</span>
                                <span className="marquee-text">{tech.name}</span>
                                <span className="marquee-dot"></span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="marquee-fade-left"></div>
            <div className="marquee-fade-right"></div>
        </div>
    );
};

export default Marquee;
