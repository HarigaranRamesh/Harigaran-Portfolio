import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { usePortfolioData } from "../context/PortfolioDataContext";
import { resolveSkillIcon } from "../utils/iconResolver";
import "../styles/Methodology.css";

const Methodology = () => {
    const { methodology, profile } = usePortfolioData();
    const sections = profile?.sections || {};
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const steps = methodology && methodology.length > 0 ? methodology : [];

    return (
        <section className="section methodology-section">
            <div className="container">
                <div ref={ref} className="methodology-header">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        className="section-title"
                    >
                        <span className="section-number">{sections.methodologySectionNumber || "05."}</span>
                        <span>{sections.methodologySectionTitle || "Development Blueprint"}</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.2 }}
                        className="methodology-desc"
                    >
                        {sections.methodologyDescription ||
                            "I don't just write code; I engineer solutions. My methodology ensures that every project is built with precision, scalability, and performance at its core."}
                    </motion.p>
                </div>

                <div className="methodology-grid">
                    {steps.map((step, idx) => {
                        const IconComponent = resolveSkillIcon(step.iconName || step.icon);
                        return (
                            <motion.div
                                key={step.id || idx}
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.3 + idx * 0.1 }}
                                className="methodology-card"
                            >
                                <div className="method-icon-box" style={{ color: step.color, background: `${step.color}15` }}>
                                    <IconComponent />
                                </div>
                                <h3 className="method-title">{step.title}</h3>
                                <p className="method-text">{step.desc}</p>
                                <div className="method-line" style={{ background: step.color }}></div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Methodology;
