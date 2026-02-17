import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaGraduationCap, FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { experience } from "../data/experience";
import { education } from "../data/education";
import "../styles/Experience.css";

const BentoItem = ({ type, data, index, inView }) => {
    const isExp = type === "experience";
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    const spotlightX = useSpring(mouseX, { damping: 20, stiffness: 200 });
    const spotlightY = useSpring(mouseY, { damping: 20, stiffness: 200 });

    const spotlightBackground = useTransform(
        [spotlightX, spotlightY],
        ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(100, 255, 218, 0.06), transparent 80%)`
    );

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            className={`bento-card ${isExp ? "exp-wide" : "edu-compact"}`}
            style={{ position: "relative" }}
        >
            <motion.div
                className="bento-spotlight"
                style={{ background: spotlightBackground }}
            />

            <div className="bento-card-header">
                <div className={`bento-icon-box ${type}`}>
                    {isExp ? <FaBriefcase /> : <FaGraduationCap />}
                </div>
                <div className="bento-meta">
                    <span className="bento-duration">
                        <FaCalendarAlt /> {isExp ? data.duration : data.year}
                    </span>
                    {isExp && data.location && (
                        <span className="bento-location">
                            <FaMapMarkerAlt /> {data.location}
                        </span>
                    )}
                </div>
            </div>

            <div className="bento-card-content">
                <h3 className="bento-title">{isExp ? data.role : data.degree}</h3>
                <h4 className="bento-subtitle">{isExp ? data.company : data.institution}</h4>
                <p className="bento-desc">{data.description}</p>

                {isExp && data.tech && (
                    <div className="bento-tech">
                        {data.tech.map((t, i) => (
                            <span key={i} className="bento-tag">{t}</span>
                        ))}
                    </div>
                )}
            </div>

            <div className="bento-glass-shine"></div>
        </motion.div>
    );
};

const ExperienceEducation = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section id="education" className="section journey-section">
            <div className="container">
                <motion.h2
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="section-title"
                >
                    <span className="section-number">04.</span>
                    <span>Professional Journey</span>
                </motion.h2>

                <div className="bento-grid">
                    <div className="bento-column">
                        <BentoItem type="experience" data={experience[0]} index={0} inView={inView} />
                        <BentoItem type="education" data={education[1]} index={2} inView={inView} />
                    </div>
                    <div className="bento-column">
                        <BentoItem type="education" data={education[0]} index={1} inView={inView} />
                        <BentoItem type="experience" data={experience[1]} index={3} inView={inView} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceEducation;
