import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Magnetic from "./common/Magnetic";
import "../styles/About.css";
import profileImg from "../assets/profile.jpg";

const About = () => {
    const containerRef = useRef(null);
    const [inViewRef, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax transformations
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

    const stats = [
        { label: "Years Experience", value: "1+" },
        { label: "Projects Completed", value: "3+" },
        { label: "Technologies", value: "12+" },
    ];

    return (
        <section id="about" className="section about-section" ref={containerRef}>
            <div className="container">
                <div ref={inViewRef} className="about-container">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="about-image-wrapper"
                    >
                        <div className="about-img-container">
                            <img
                                src={profileImg}
                                alt="Profile"
                                className="about-img"
                            />
                            <div className="img-overlay-glow"></div>
                        </div>
                        <motion.div style={{ y: y1 }} className="about-frame"></motion.div>
                        <div className="decorative-shapes">
                            <motion.div style={{ y: y2, rotate }} className="shape shape-1"></motion.div>
                            <motion.div style={{ y: y1, rotate: -rotate }} className="shape shape-2"></motion.div>
                        </div>
                    </motion.div>

                    {/* Text Side */}
                    <div className="about-content">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="section-title">
                                <span className="section-number">01.</span>
                                <span>Architecting the Web</span>
                            </h2>

                            <div className="about-text">
                                <p className="lead-text">
                                    I transform complex problems into elegant digital solutions
                                    that live at the intersection of <span className="highlight">performance</span> and <span className="highlight">design</span>.
                                </p>
                                <p>
                                    As a Full Stack Developer based in the digital landscape,
                                    I specialize in crafting high-performance applications with
                                    modern tech stacks. My approach is rooted in clean architecture
                                    and user-centric design principles.
                                </p>
                                <p>
                                    Currently, I'm focused on building scalable enterprise solutions
                                    and exploring the frontiers of AI-driven web experiences.
                                </p>
                            </div>

                            <div className="about-stats">
                                {stats.map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        className="stat-item"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={inView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.5 + (i * 0.1) }}
                                    >
                                        <span className="stat-value">{stat.value}</span>
                                        <span className="stat-label">{stat.label}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="about-btn-wrapper">
                                <Magnetic>
                                    <a
                                        href="https://docs.google.com/document/d/1ey9q6mefOEgTr5BXzwukyigsFVrX5mKkDZC710_g-Tg/edit?usp=drive_link"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn-outline modern-btn"
                                    >
                                        Download Resume
                                        <span className="btn-shine"></span>
                                    </a>
                                </Magnetic>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
