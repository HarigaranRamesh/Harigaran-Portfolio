import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import Magnetic from "./common/Magnetic";
import Marquee from "./common/Marquee";
import "../styles/Hero.css";

const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const orb1X = useTransform(springX, (value) => value * 0.05);
  const orb1Y = useTransform(springY, (value) => value * 0.05);
  const orb2X = useTransform(springX, (value) => value * -0.05);
  const orb2Y = useTransform(springY, (value) => value * -0.05);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="hero-section">
      <div className="hero-background">
        <motion.div
          style={{ x: orb1X, y: orb1Y }}
          className="glow-orb orb-1"
        ></motion.div>
        <motion.div
          style={{ x: orb2X, y: orb2Y }}
          className="glow-orb orb-2"
        ></motion.div>
      </div>

      <div className="hero-container">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="hero-greeting"
        >
          Engineering the Future
        </motion.p>

        <motion.h1 className="hero-title">
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            style={{ display: "block" }}
          >
            MODERN
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="highlight-text"
          >
            ARCHITECT.
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="hero-description"
        >
          Specializing in high-performance Full Stack applications and
          enterprise-scale architecture. Crafting seamless digital solutions
          where code meets creativity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="hero-buttons"
        >
          <Magnetic>
            <a href="#work" className="btn btn-primary">
              View Work
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#contact" className="btn btn-secondary">
              Let's Talk
            </a>
          </Magnetic>
        </motion.div>
      </div>

      <div className="hero-marquee-wrapper">
        <Marquee />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="scroll-indicator"
      >
        <span className="scroll-text">Explore</span>
        <div className="scroll-line"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
