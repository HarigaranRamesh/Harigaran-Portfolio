import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "../styles/Navbar.css";

const navLinks = [
    { title: "About", href: "#about" },
    { title: "Work", href: "#work" },
    { title: "Skills", href: "#skills" },
    { title: "Experience", href: "#experience" },
    { title: "Education", href: "#education" },
    { title: "Contact", href: "#contact" },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`navbar ${isScrolled ? "scrolled" : ""}`}
        >
            <div className="nav-container">
                <a href="#" className="nav-logo">
                    PORTFOLIO<span>.</span>
                </a>

                {/* Desktop Menu */}
                <div className="nav-menu">
                    <ul className="nav-links">
                        {navLinks.map((link) => (
                            <li key={link.title}>
                                <a
                                    href={link.href}
                                    className="nav-link"
                                >
                                    {link.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="nav-socials">
                        <SocialLink href="https://github.com/HarigaranRamesh" icon={<FaGithub />} />
                        <SocialLink href="https://www.linkedin.com/in/harigaran-ramesh-554887224" icon={<FaLinkedin />} />
                        <SocialLink href="mailto:harigaran925@gmail.com" icon={<FaEnvelope />} />
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="nav-toggle"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}
                    >
                        <ul>
                            {navLinks.map((link) => (
                                <li key={link.title}>
                                    <a
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="mobile-nav-link"
                                    >
                                        {link.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="mobile-socials">
                            <SocialLink href="https://github.com/HarigaranRamesh" icon={<FaGithub />} />
                            <SocialLink href="https://www.linkedin.com/in/harigaran-ramesh-554887224" icon={<FaLinkedin />} />
                            <SocialLink href="mailto:harigaran925@gmail.com" icon={<FaEnvelope />} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

const SocialLink = ({ href, icon }) => (
    <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="social-link"
    >
        {icon}
    </a>
);

export default Navbar;
