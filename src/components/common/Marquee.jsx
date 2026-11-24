import { useMemo } from "react";
import { usePortfolioData } from "../../context/PortfolioDataContext";
import { resolveSkillIcon } from "../../utils/iconResolver";
import {
    SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiMongodb,
    SiPostgresql, SiTypescript, SiJavascript,
    SiTailwindcss, SiDocker, SiGit
} from "react-icons/si";
import "../../styles/Marquee.css";

const defaultTechStack = [
    { icon: <SiReact />, name: "React" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <SiNodedotjs />, name: "Node.js" },
    { icon: <SiExpress />, name: "Express" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <SiPostgresql />, name: "PostgreSQL" },
    { icon: <SiTypescript />, name: "TypeScript" },
    { icon: <SiJavascript />, name: "JavaScript" },
    { icon: <SiTailwindcss />, name: "Tailwind" },
    { icon: <SiDocker />, name: "Docker" },
    { icon: <SiGit />, name: "Git" },
];

const Marquee = () => {
    const { skills } = usePortfolioData();

    const techStack = useMemo(() => {
        if (!skills || skills.length === 0) return defaultTechStack;
        const allItems = skills.flatMap(c => c.items || []);
        if (allItems.length === 0) return defaultTechStack;
        return allItems.map(item => {
            const IconComponent = resolveSkillIcon(item.icon || item.iconName);
            return {
                name: item.name,
                icon: <IconComponent />
            };
        });
    }, [skills]);

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
