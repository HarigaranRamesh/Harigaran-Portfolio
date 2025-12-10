import { motion } from "framer-motion";
import "../styles/Hero.css";

const Hero = () => {
  return (
    <section className="hero-section">
      {/* Background Elements */}
      <div className="hero-background">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
      </div>

      <div className="hero-container">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="hero-greeting"
        >
          Welcome to my universe
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="hero-title"
        >
          CREATIVE <br />
          <span>DEVELOPER.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="hero-description"
        >
          I build immersive digital experiences that blend design and technology.
          Passionate about performance, accessibility, and aesthetics.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="hero-buttons"
        >
          <a href="#work" className="btn btn-primary">
            See My Work
          </a>
          <a href="#contact" className="btn btn-secondary">
            Contact Me
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="scroll-indicator"
      >
        <span className="scroll-text">Scroll</span>
        <div className="scroll-line"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
