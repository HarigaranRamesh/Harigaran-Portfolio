import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaEnvelope } from "react-icons/fa";
import { usePortfolioData } from "../context/PortfolioDataContext";
import "../styles/Contact.css";

const Contact = () => {
    const { profile } = usePortfolioData();
    const contact = profile?.contact || {};

    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const formRef = useRef();
    const [, setLoading] = useState(false);
    const [, setStatus] = useState(null);
    const [, setErrorMessage] = useState("");

    const sendEmail = async (e) => {
        e.preventDefault();
        setLoading(false);
        setStatus("error");
        setErrorMessage(
            "Contact form is currently configured for direct email inquiries."
        );
    };

    const contactEmail = contact.email || "harigaran925@gmail.com";

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
                    <span className="contact-subtitle">{contact.subtitle || "Get In Touch"}</span>
                    <h2 className="section-title">
                        <span>{contact.title || "Let's Work Together"}</span>
                    </h2>
                    <p className="contact-desc">
                        {contact.description ||
                            "I'm currently available for freelance projects and open to new opportunities. If you have a project in mind or just want to say hi, send me a message!"}
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
                                    <a href={`mailto:${contactEmail}`} className="contact-link">
                                        {contactEmail}
                                    </a>
                                </div>
                            </div>

                            <div className="contact-quote">
                                <p className="quote-text">
                                    "{contact.quoteText || "Great things are not done by impulse, but by a series of small things brought together."}"
                                </p>
                                <p className="quote-author">{contact.quoteAuthor || "- Vincent van Gogh"}</p>
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
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                required
                                className="form-textarea"
                                placeholder="Tell me about your project..."
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary submit-btn">
                            {contact.submitButtonText || "Send Message"}
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
