import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { usePortfolioData } from "../context/PortfolioDataContext";
import "../styles/Testimonials.css";

const Testimonials = () => {
    const { testimonials, profile } = usePortfolioData();
    const sections = profile?.sections || {};
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const testimonialsList = testimonials || [];

    return (
        <section className="section testimonials-section">
            <div className="container">
                <div ref={ref} className="testimonials-header">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        className="section-title"
                    >
                        <span className="section-number">{sections.testimonialsSectionNumber || "06."}</span>
                        <span>{sections.testimonialsSectionTitle || "Voices of Trust"}</span>
                    </motion.h2>
                </div>

                <div className="testimonials-grid">
                    {testimonialsList.map((t, idx) => (
                        <motion.div
                            key={t.id || idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="testimonial-card"
                        >
                            <p className="testimonial-text">"{t.text}"</p>
                            <div className="testimonial-author">
                                <h4 className="testimonial-name">{t.name}</h4>
                                <span className="testimonial-role">{t.role}</span>
                                {t.company && <span className="testimonial-company"> @ {t.company}</span>}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
