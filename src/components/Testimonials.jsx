import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "../styles/Testimonials.css";

const testimonials = [
    {
        name: "Technical Lead",
        role: "Previous Project",
        text: "Harigaran is an exceptional developer who consistently delivers high-quality code. His ability to solve complex architectural challenges is impressive.",
        company: "Software Solutions"
    },
    {
        name: "Senior Developer",
        role: "Colleague",
        text: "A proactive problem solver with a deep understanding of modern tech stacks. His attention to performance and user experience is top-notch.",
        company: "Tech Innovations"
    },
    {
        name: "Product Manager",
        role: "Project Stakeholder",
        text: "Clean code, timely delivery, and a great communicator. He doesn't just build features; he builds products that users love.",
        company: "Digital Core"
    }
];

const Testimonials = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section className="section testimonials-section">
            <div className="container">
                <div ref={ref} className="testimonials-header">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        className="section-title"
                    >
                        <span className="section-number">06.</span>
                        <span>Voices of Trust</span>
                    </motion.h2>
                </div>

                <div className="testimonials-grid">
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                            className="testimonial-card"
                        >
                            <div className="quote-icon">“</div>
                            <p className="testimonial-text">{t.text}</p>
                            <div className="testimonial-author">
                                <div className="author-info">
                                    <h4 className="author-name">{t.name}</h4>
                                    <p className="author-role">{t.role} @ {t.company}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
