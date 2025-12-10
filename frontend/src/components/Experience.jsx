import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { experience } from "../data/experience";
import "../styles/Experience.css";

const Experience = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section id="experience" className="section experience-section">
            <div className="container experience-container">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="section-title" style={{ textAlign: "center", marginBottom: "3rem" }}>
                        Experience
                    </h2>

                    <div className="experience-list">
                        {experience.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: -30 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="experience-card"
                            >
                                <div className="exp-header">
                                    <h3 className="exp-role">{exp.role}</h3>
                                    <span className="exp-company">@ {exp.company}</span>
                                </div>
                                <span className="exp-duration">{exp.duration}</span>
                                <p className="exp-desc">{exp.description}</p>
                                <div className="exp-tech">
                                    {exp.tech.map((tech, i) => (
                                        <span key={i} className="tech-tag">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Experience;
