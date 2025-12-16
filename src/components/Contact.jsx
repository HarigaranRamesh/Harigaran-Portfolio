import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaPaperPlane, FaEnvelope, FaCheck, FaExclamationCircle } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
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
        setLoading(true);
        setStatus(null);

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        console.log("Debug: Firebase Project ID:", import.meta.env.VITE_FIREBASE_PROJECT_ID);
        console.log("Debug: Auth Domain:", import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);

        if (!serviceId || !templateId || !publicKey) {
            console.error("EmailJS keys are missing.");
            setErrorMessage("Configuration Error: EmailJS keys missing.");
            setStatus("error");
            setLoading(false);
            return;
        }

        // Save to Firestore (Fire & Forget, or await if critical)
        const formData = new FormData(formRef.current);
        const data = {
            user_name: formData.get("user_name"),
            user_email: formData.get("user_email"),
            user_phone: formData.get("user_phone"),
            message: formData.get("message"),
            timestamp: serverTimestamp(),
        };

        // Helper to timeout a promise
        const withTimeout = (promise, ms) => {
            return new Promise((resolve, reject) => {
                const timer = setTimeout(() => {
                    reject(new Error("Operation timed out"));
                }, ms);

                promise
                    .then((value) => {
                        clearTimeout(timer);
                        resolve(value);
                    })
                    .catch((reason) => {
                        clearTimeout(timer);
                        reject(reason);
                    });
            });
        };

        const emailPromise = withTimeout(
            emailjs.send(
                serviceId,
                templateId,
                {
                    from_name: data.user_name,
                    to_name: "Harigaran",
                    from_email: data.user_email,
                    reply_to: data.user_email,
                    user_name: data.user_name,
                    user_email: data.user_email,
                    user_phone: data.user_phone,
                    message: data.message,
                },
                publicKey
            ),
            10000 // 10 second timeout
        );

        const dbPromise = withTimeout(
            addDoc(collection(db, "messages"), data),
            10000 // 10 second timeout
        );

        try {
            const results = await Promise.allSettled([emailPromise, dbPromise]);
            const emailResult = results[0];
            const dbResult = results[1];

            if (emailResult.status === "fulfilled" && dbResult.status === "fulfilled") {
                setStatus("success");
                formRef.current.reset();
            } else {
                setStatus("error");
                let errorMsg = "";
                if (emailResult.status === "rejected") {
                    console.error("EmailJS Error:", emailResult.reason);
                    errorMsg += "Email failed. ";
                }
                if (dbResult.status === "rejected") {
                    console.error("Firestore Error:", dbResult.reason);
                    errorMsg += "Database save failed. ";
                }
                setErrorMessage(errorMsg || "Submission failed.");
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            setErrorMessage("Unexpected error occurred.");
            setStatus("error");
        } finally {
            setLoading(false);
            if (status === 'success') {
                setTimeout(() => setStatus(null), 5000);
            }
        }
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
                    <h2 className="contact-title">Let's Work Together</h2>
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
                        <button
                            className={`submit-btn ${status === 'success' ? 'bg-green-600 hover:bg-green-700' : ''} ${status === 'error' ? 'bg-red-600 hover:bg-red-700' : ''}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="animate-pulse">Sending...</span>
                            ) : status === 'success' ? (
                                <>Sent! <FaCheck /></>
                            ) : status === 'error' ? (
                                <>Error: {errorMessage || "Failed"} <FaExclamationCircle /></>
                            ) : (
                                <>Send Message <FaPaperPlane /></>
                            )}
                        </button>
                    </motion.form>
                </div>
            </div>
        </section >
    );
};

export default Contact;
