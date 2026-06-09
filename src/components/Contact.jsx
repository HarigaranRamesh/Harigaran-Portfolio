import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaPaperPlane, FaEnvelope, FaCheck, FaExclamationCircle } from "react-icons/fa";
import Magnetic from "./common/Magnetic";
import "../styles/Contact.css";

const Contact = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const formRef = useRef();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null
    const [errorMessage, setErrorMessage] = useState("");

    const sendEmail = async (e) => {
        e.preventDefault();
        setLoading(false);
        setStatus("error");
        setErrorMessage(
            "Contact form is disabled because Firebase and EmailJS integration has been removed."
        );
    };
    return (
        <section id="contact" className="section contact-section">
            <div className="contact-bg-glow"></div>

            <div className="container contact-container">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="contact-header"
                >
                    <span className="contact-subtitle">Get In Touch</span>
                    <h2 className="section-title">
                        <span>Let's Work Together</span>
                    </h2>
                    <p className="contact-desc">
                        I'm currently available for freelance projects and open to new opportunities.
                        If you have a project in mind or just want to say hi, send me a message!
                    </p>
                </motion.div>

                <div className="contact-content">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="contact-info-card">
                            <div className="contact-method">
                                <div className="contact-icon">
                                    <FaEnvelope />
                                </div>
                                <div className="contact-details">
                                    <h3>Email Me</h3>
                                    <a href="mailto:harigaran925@gmail.com" className="contact-link">
                                        harigaran925@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="contact-quote">
                                <p className="quote-text">
                                    "Great things are not done by impulse, but by a series of small things brought together."
                                </p>
                                <p className="quote-author">- Vincent van Gogh</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.form
                        ref={formRef}
                        initial={{ opacity: 0, x: 30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 }}
                        className="contact-form"
                        onSubmit={sendEmail}
                    >
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="user_name"
                                    required
                                    className="form-input"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="user_email"
                                    required
                                    className="form-input"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone" className="form-label">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="user_phone"
                                className="form-input"
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows="4"
                                className="form-input"
                                placeholder="Your message here..."
                            ></textarea>
                        </div>

                        <div className="form-footer">
                            <Magnetic>
                                <button
                                    className={`submit-btn ${status === 'success' ? 'success' : ''} ${status === 'error' ? 'error' : ''}`}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="loading-text">Sending...</span>
                                    ) : status === 'success' ? (
                                        <>Message Sent <FaCheck /></>
                                    ) : status === 'error' ? (
                                        <>Error Occurred <FaExclamationCircle /></>
                                    ) : (
                                        <>Send Message <FaPaperPlane /></>
                                    )}
                                </button>
                            </Magnetic>
                        </div>
                    </motion.form>
                </div>
            </div>
        </section >
    );
};

export default Contact;
