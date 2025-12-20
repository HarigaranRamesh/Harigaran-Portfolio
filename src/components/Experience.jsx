import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { experience } from "../data/experience";
import "../styles/Experience.css";

const Experience = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <section id="experience" className="section experience-section">
            <div className="container experience-container">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    <motion.h2 variants={itemVariants} className="section-title">
                        <span>Work Experience</span>
                    </motion.h2>

                    <div className="timeline">
                        <div className="timeline-line"></div>

                        {experience.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                variants={itemVariants}
                                className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
                            >
                                <div className="timeline-marker">
                                    <FaBriefcase />
                                </div>
                                <div className="timeline-content">
                                    <div className="exp-header">
                                        <h3 className="exp-role">{exp.role}</h3>
                                        <h4 className="exp-company">{exp.company}</h4>
                                    </div>
                                    <div className="exp-meta">
                                        <FaCalendarAlt className="meta-icon" />
                                        <span>{exp.duration}</span>
                                    </div>
                                    <p className="exp-desc">{exp.description}</p>
                                    <div className="exp-tech">
                                        {exp.tech.map((tech, i) => (
                                            <span key={i} className="tech-tag">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
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
