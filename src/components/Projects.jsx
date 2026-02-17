import { useState, useRef, memo, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaGithub, FaExternalLinkAlt, FaTimes, FaCheck } from "react-icons/fa";
import { projects } from "../data/projects";
import "../styles/Projects.css";

const ProjectCard = memo(({ project, index, inView, onOpenModal }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="project-card group"
            onClick={() => onOpenModal(project)}
        >
            <div className="project-image-container" style={{ transform: "translateZ(50px)" }}>
                <img src={project.image} alt={project.title} className="project-img" loading="lazy" />
                <div className="project-overlay">
                    <span className="view-details">View Details</span>
                </div>
            </div>

            <div className="project-content" style={{ transform: "translateZ(30px)" }}>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tags">
                    {project.tech.slice(0, 3).map((t, i) => (
                        <span key={i} className="project-tag">{t}</span>
                    ))}
                    {project.tech.length > 3 && <span className="project-tag">+{project.tech.length - 3}</span>}
                </div>
            </div>
        </motion.div>
    );
});

const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="modal-close" onClick={onClose}><FaTimes /></button>

                <div className="modal-grid">
                    <div className="modal-image">
                        <img src={project.image} alt={project.title} />
                        <div className="modal-links">
                            <a href={project.github} target="_blank" rel="noreferrer" className="modal-link-btn">
                                <FaGithub /> GitHub
                            </a>
                            <a href={project.demo} target="_blank" rel="noreferrer" className="modal-link-btn primary">
                                <FaExternalLinkAlt /> Live Demo
                            </a>
                        </div>
                    </div>

                    <div className="modal-info">
                        <h2 className="modal-title">{project.title}</h2>
                        <div className="modal-section">
                            <h4>The Challenge</h4>
                            <p>{project.challenge}</p>
                        </div>
                        <div className="modal-section">
                            <h4>The Solution</h4>
                            <p>{project.solution}</p>
                        </div>
                        <div className="modal-section impact">
                            <h4>Impact & Outcome</h4>
                            <p>{project.impact}</p>
                        </div>
                        <div className="modal-section">
                            <h4>Key Features</h4>
                            <ul className="modal-features">
                                {project.features.map((feature, i) => (
                                    <li key={i}><FaCheck className="check-icon" /> {feature}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="modal-tech-stack">
                            {project.tech.map((t, i) => (
                                <span key={i} className="tech-badge">{t}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section id="work" className="section">
            <div className="container mx-auto">
                <motion.h2
                    ref={ref}
                    initial={{ opacity: 0, y: -20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="section-title projects-header"
                >
                    <span className="section-number">02.</span>
                    <span>Recent Endeavors</span>
                </motion.h2>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            inView={inView}
                            onOpenModal={setSelectedProject}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
