import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { usePortfolioData } from "../context/PortfolioDataContext";
import { resolveSkillIcon } from "../utils/iconResolver";
import "../styles/Skills.css";

const Skills = () => {
    const { skills, profile } = usePortfolioData();
    const sections = profile?.sections || {};
    const [activeCategory, setActiveCategory] = useState("All");
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const categories = useMemo(() => {
        return ["All", ...(skills || []).map(s => s.category)];
    }, [skills]);

    const filteredSkills = useMemo(() => {
        if (!skills) return [];
        return activeCategory === "All"
            ? skills
            : skills.filter(s => s.category === activeCategory);
    }, [activeCategory, skills]);

    return (
        <section id="skills" className="section skills-section">
            <div className="container mx-auto">
                <div ref={ref} className="skills-header">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        className="section-title"
                    >
                        <span className="section-number">{sections.skillsSectionNumber || "03."}</span>
                        <span>{sections.skillsSectionTitle || "Tech Stack"}</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.2 }}
                        className="skills-desc"
                    >
                        {sections.skillsDescription ||
                            "The technologies and tools I use to bring ideas to life. I'm always learning and expanding my horizons."}
                    </motion.p>
                </div>

                {/* Filter Tabs */}
                <div className="skills-filters">
                    {categories.map((cat, idx) => (
                        <motion.button
                            key={cat}
                            initial={{ opacity: 0, y: 10 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3 + (idx * 0.05) }}
                            onClick={() => setActiveCategory(cat)}
                            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>

                <div className="skills-container">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="skills-wrapper"
                        >
                            {filteredSkills.map((category) => (
                                <div key={category.category} className="skills-category">
                                    <h3 className="skills-category-title">{category.category}</h3>
                                    <div className="skills-grid">
                                        {(category.items || []).map((skill, index) => {
                                            const IconComponent = resolveSkillIcon(skill.icon || skill.iconName);
                                            return (
                                                <motion.div
                                                    key={skill.name}
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{
                                                        delay: (index * 0.03),
                                                        type: "spring",
                                                        stiffness: 260,
                                                        damping: 20
                                                    }}
                                                    whileHover={{ y: -10 }}
                                                    className="skill-item group"
                                                >
                                                    <div className="skill-card">
                                                        <div
                                                            className="skill-icon-box"
                                                            style={{ color: skill.color }}
                                                        >
                                                            <IconComponent className="skill-icon" />
                                                            {/* Proficiency ring */}
                                                            <svg className="skill-level-svg" viewBox="0 0 100 100">
                                                                <circle
                                                                    className="skill-level-bg"
                                                                    cx="50"
                                                                    cy="50"
                                                                    r="45"
                                                                />
                                                                <circle
                                                                    className="skill-level-fill"
                                                                    cx="50"
                                                                    cy="50"
                                                                    r="45"
                                                                    style={{
                                                                        strokeDasharray: 283,
                                                                        strokeDashoffset: 283 - (283 * (skill.level || 75)) / 100,
                                                                        stroke: skill.color
                                                                    }}
                                                                />
                                                            </svg>
                                                        </div>
                                                        <span className="skill-name">{skill.name}</span>
                                                        <span className="skill-percentage">{skill.level || 75}%</span>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Skills;
