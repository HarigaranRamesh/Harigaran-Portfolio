import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import Magnetic from "./Magnetic";
import "../../styles/ContactCTA.css";

const ContactCTA = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 5, type: "spring" }}
            className="floating-cta-wrapper"
        >
            <Magnetic>
                <a href="#contact" className="floating-cta">
                    <span className="cta-icon"><FaPaperPlane /></span>
                    <span className="cta-text">Start a Project</span>
                </a>
            </Magnetic>
        </motion.div>
    );
};

export default ContactCTA;
