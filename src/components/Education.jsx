import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaGraduationCap, FaCalendarAlt } from "react-icons/fa";
import { education } from "../data/education";
import "../styles/Education.css";

const Education = () => {
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
        <section id="education" className="section education-section">
            <div className="container education-container">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    <motion.h2 variants={itemVariants} className="section-title">
                        <span>Education</span>
                    </motion.h2>

                    <div className="timeline">
                        {/* Reusing timeline line from common CSS or scoping it here if we want independent styles. 
                            For consistency, we'll use similar class structure. */}
                        <div className="timeline-line"></div>

                        {education.map((edu, index) => (
                            <motion.div
                                key={edu.id}
                                variants={itemVariants}
                                className={`timeline-item ${index % 2 === 0 ? "right" : "left"}`}
                            >
                                <div className="timeline-marker">
                                    <FaGraduationCap />
                                </div>
                                <div className="timeline-content">
                                    <div className="edu-header">
                                        <h3 className="edu-degree">{edu.degree}</h3>
                                        <h4 className="edu-institution">{edu.institution}</h4>
                                    </div>
                                    <div className="edu-meta">
                                        <FaCalendarAlt className="meta-icon" />
                                        <span>{edu.year}</span>
                                    </div>
                                    <p className="edu-desc">{edu.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Education;
