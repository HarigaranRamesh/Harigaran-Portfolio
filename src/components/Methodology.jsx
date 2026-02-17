import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaLightbulb, FaDraftingCompass, FaCode, FaRocket } from "react-icons/fa";
import "../styles/Methodology.css";

const steps = [
    {
        icon: <FaLightbulb />,
        title: "01. Analysis",
        desc: "Understanding business goals, user needs, and defining the technical requirements for scalability.",
        color: "#64ffda"
    },
    {
        icon: <FaDraftingCompass />,
        title: "02. Architecture",
        desc: "Designing the blueprint, database schema, and selecting the optimal tech stack for the project.",
        color: "#9333ea"
    },
    {
        icon: <FaCode />,
        title: "03. Development",
        desc: "Engineering clean, maintainable, and well-documented code following SOLID and DRY principles.",
        color: "#2563eb"
    },
    {
        icon: <FaRocket />,
        title: "04. Deployment",
        desc: "Rigorous testing, optimization, and seamless deployment using modern CI/CD pipelines.",
        color: "#10b981"
    }
];

const Methodology = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section className="section methodology-section">
            <div className="container">
                <div ref={ref} className="methodology-header">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        className="section-title"
                    >
                        <span className="section-number">05.</span>
                        <span>Development Blueprint</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.2 }}
                        className="methodology-desc"
                    >
                        I don't just write code; I engineer solutions. My methodology ensures that every
                        project is built with precision, scalability, and performance at its core.
                    </motion.p>
                </div>

                <div className="methodology-grid">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                            className="methodology-card"
                        >
                            <div className="method-icon-box" style={{ color: step.color, background: `${step.color}15` }}>
                                {step.icon}
                            </div>
                            <h3 className="method-title">{step.title}</h3>
                            <p className="method-text">{step.desc}</p>
                            <div className="method-line" style={{ background: step.color }}></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Methodology;
