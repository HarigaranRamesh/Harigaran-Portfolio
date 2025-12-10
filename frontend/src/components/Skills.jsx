import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skills } from "../data/skills";
import "../styles/Skills.css";

const Skills = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section id="skills" className="section skills-section">
            <div className="container mx-auto">
                <div ref={ref} className="skills-header">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        className="section-title"
                    >
                        <span className="section-number">03.</span> Tech Stack
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.2 }}
                        className="skills-desc"
                    >
                        The technologies and tools I use to bring ideas to life.
                    </motion.p>
                </div>

                <div className="skills-container">
                    {skills.map((category, catIndex) => (
                        <div key={category.category} className="skills-category">
                            <h3 className="skills-category-title">{category.category}</h3>
                            <div className="skills-grid">
                                {category.items.map((skill, index) => {
                                    const Icon = skill.icon;
                                    return (
                                        <motion.div
                                            key={skill.name}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                                            transition={{ delay: (catIndex * 0.2) + (index * 0.05), type: "spring", stiffness: 200 }}
                                            whileHover={{ y: -10 }}
                                            className="skill-item group"
                                        >
                                            <div
                                                className="skill-icon-box"
                                                style={{ color: skill.color }}
                                            >
                                                <Icon className="skill-icon" />
                                            </div>
                                            <span className="skill-name">{skill.name}</span>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
