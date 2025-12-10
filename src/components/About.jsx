import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "../styles/About.css";
import profileImg from "../assets/profile.jpg";

const About = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <section id="about" className="section about-section">
            <div className="container mx-auto">
                <div ref={ref} className="about-container">
                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="about-image-wrapper"
                    >
                        <div className="about-img-container">
                            {/* Placeholder for Profile Image */}
                            <img
                                src={profileImg}
                                alt="Profile"
                                className="about-img"
                            />
                        </div>
                        {/* Decorative Border */}
                        <div className="about-frame"></div>
                    </motion.div>

                    {/* Text Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="about-content"
                    >
                        <h2 className="section-title">
                            <span className="section-number">01.</span> About Me
                        </h2>
                        <div className="about-text">
                            <p>
                                Hello! I'm Harigaran R, a passionate Full Stack Developer with a knack for creating
                                seamless digital experiences. My journey in web development began 5 years ago
                                when I decided to build a website for my college club, and I've been hooked ever since.
                            </p>
                            <br />
                            <p>
                                Fast-forward to today, I've had the privilege of working at a <span className="text-accent-color">tech startup</span>,
                                a <span className="text-accent-color">creative agency</span>, and on various freelance projects.
                                My main focus these days is building accessible, inclusive products and digital experiences.
                            </p>
                            <br />
                            <p>
                                When I'm not at the computer, I'm usually hanging out with my friends, reading productivity books , or playing  outdoor games.
                            </p>
                        </div>

                        <div className="about-btn-wrapper">
                            <button className="btn-outline">
                                Download Resume
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
