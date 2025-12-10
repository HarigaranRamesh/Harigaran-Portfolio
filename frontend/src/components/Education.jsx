import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
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
                staggerChildren: 0.2,
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
                    <motion.h2 variants={itemVariants} className="education-title">
                        Education
                    </motion.h2>

                    <div className="education-grid">
                        {education.map((edu) => (
                            <motion.div
                                key={edu.id}
                                variants={itemVariants}
                                className="education-card"
                            >
                                <span className="edu-year">{edu.year}</span>
                                <h3 className="edu-degree">{edu.degree}</h3>
                                <h4 className="edu-institution">{edu.institution}</h4>
                                <p className="edu-desc">{edu.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Education;
