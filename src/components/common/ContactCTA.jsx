import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Magnetic from "./Magnetic";
import "../../styles/ContactCTA.css";

const ContactCTA = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3, duration: 0.8, ease: "easeOut" }}
            className="floating-cta-wrapper"
        >
            <Magnetic>
                <a href="#contact" className="floating-cta group">
                    <span className="cta-text">Start a Project</span>
                    <div className="cta-icon-wrapper">
                        <FaArrowRight className="cta-icon" />
                    </div>
                    <div className="cta-background"></div>
                </a>
            </Magnetic>
        </motion.div>
    );
};

export default ContactCTA;
