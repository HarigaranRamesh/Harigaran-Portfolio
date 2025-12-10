import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { projects } from "../data/projects";
import "../styles/Projects.css";

const Projects = () => {
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
        <section id="work" className="section">
            <div className="container mx-auto">
                <motion.h2
                    ref={ref}
                    initial={{ opacity: 0, y: -20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="section-title projects-header"
                >
                    <span className="section-number">02.</span> Some Things I've Built
                </motion.h2>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="projects-grid"
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={itemVariants}
                            className="project-card group"
                        >
                            <div className="project-image-container">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="project-img"
                                />
                                <div className="project-links-overlay">
                                    <a href={project.github} className="project-link-icon">
                                        <FaGithub size={20} />
                                    </a>
                                    <a href={project.demo} className="project-link-icon">
                                        <FaExternalLinkAlt size={20} />
                                    </a>
                                </div>
                            </div>

                            <div className="project-content">
                                <h3 className="project-title">
                                    {project.title}
                                </h3>
                                <p className="project-desc">
                                    {project.description}
                                </p>
                                <div className="project-tags">
                                    {project.tech.map((t, i) => (
                                        <span
                                            key={i}
                                            className="project-tag"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
