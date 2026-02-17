import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skills } from "../data/skills";
import "../styles/Skills.css";

const Skills = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const categories = useMemo(() => ["All", ...skills.map(s => s.category)], []);

    const filteredSkills = useMemo(() => {
        return activeCategory === "All"
            ? skills
            : skills.filter(s => s.category === activeCategory);
    }, [activeCategory]);

    return (
        <section id="skills" className="section skills-section">
            <div className="container mx-auto">
                <div ref={ref} className="skills-header">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        className="section-title"
                    >
                        <span className="section-number">03.</span>
                        <span>Tech Stack</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.2 }}
                        className="skills-desc"
                    >
                        The technologies and tools I use to bring ideas to life.
                        I'm always learning and expanding my horizons.
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
                            {filteredSkills.map((category, catIndex) => (
                                <div key={category.category} className="skills-category">
                                    <h3 className="skills-category-title">{category.category}</h3>
                                    <div className="skills-grid">
                                        {category.items.map((skill, index) => {
                                            const Icon = skill.icon;
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
                                                            <Icon className="skill-icon" />
                                                            {/* Proficiency ring */}
                                                            <svg className="skill-level-svg" viewBox="0 0 100 100">
                                                                <circle
                                                                    className="skill-level-bg"
                                                                    cx="50" cy="50" r="45"
                                                                />
                                                                <motion.circle
                                                                    className="skill-level-progress"
                                                                    cx="50" cy="50" r="45"
                                                                    initial={{ pathLength: 0 }}
                                                                    animate={{ pathLength: skill.level / 100 }}
                                                                    transition={{ duration: 1.5, delay: 0.5 }}
                                                                    style={{ stroke: skill.color }}
                                                                />
                                                            </svg>
                                                        </div>
                                                        <div className="skill-info">
                                                            <span className="skill-name">{skill.name}</span>
                                                            <span className="skill-percentage">{skill.level}%</span>
                                                        </div>
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
