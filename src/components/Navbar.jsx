import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaGithub, FaLinkedin, FaEnvelope, FaSun, FaMoon } from "react-icons/fa";
import Magnetic from "./common/Magnetic";
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
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`navbar ${isScrolled ? "scrolled" : ""}`}
        >
            <div className="nav-container">
                <div className="nav-left">
                    <Magnetic>
                        <a href="#" className="nav-logo">
                            HARIGARAN<span>.</span>
                        </a>
                    </Magnetic>
                    <div className="status-indicator">
                        <span className="status-dot"></span>
                        <span className="status-text">Available for hire</span>
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="nav-menu">
                    <ul className="nav-links">
                        {navLinks.map((link) => (
                            <li key={link.title}>
                                <a href={link.href} className="nav-link">
                                    {link.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="nav-socials">
                        <Magnetic>
                            <button
                                onClick={toggleTheme}
                                className="social-link"
                                style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem', padding: '0.5rem' }}
                                aria-label="Toggle Theme"
                            >
                                {theme === "dark" ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-600" />}
                            </button>
                        </Magnetic>
                        <div className="nav-divider"></div>
                        <SocialLink href="https://github.com/HarigaranRamesh" icon={<FaGithub />} />
                        <SocialLink href="https://www.linkedin.com/in/harigaran-ramesh-554887224" icon={<FaLinkedin />} />
                        <SocialLink href="mailto:harigaran925@gmail.com" icon={<FaEnvelope />} />
                    </div>
                </div>

                {/* Mobile Toggle */}
                <div className="mobile-toggle-wrapper">
                    <Magnetic>
                        <button onClick={toggleTheme} className="nav-toggle">
                            {theme === "dark" ? <FaSun /> : <FaMoon />}
                        </button>
                    </Magnetic>
                    <button
                        className="nav-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="mobile-menu-overlay"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="mobile-menu"
                        >
                            <div className="mobile-menu-content">
                                <div className="mobile-menu-header">
                                    <div className="status-indicator mobile">
                                        <span className="status-dot"></span>
                                        <span className="status-text">Living the Dream</span>
                                    </div>
                                    <button
                                        className="mobile-close-btn"
                                        onClick={() => setMobileMenuOpen(false)}
                                        aria-label="Close Menu"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>

                                <ul className="mobile-nav-links">
                                    {navLinks.map((link, i) => (
                                        <motion.li
                                            key={link.title}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + i * 0.1 }}
                                        >
                                            <a
                                                href={link.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="mobile-nav-link"
                                            >
                                                <span className="mobile-link-num">0{i + 1}.</span>
                                                {link.title}
                                            </a>
                                        </motion.li>
                                    ))}
                                </ul>

                                <div className="mobile-menu-footer">
                                    <p className="mobile-menu-label">Connect with me</p>
                                    <div className="mobile-socials">
                                        <SocialLink href="https://github.com/HarigaranRamesh" icon={<FaGithub />} />
                                        <SocialLink href="https://www.linkedin.com/in/harigaran-ramesh-554887224" icon={<FaLinkedin />} />
                                        <SocialLink href="mailto:harigaran925@gmail.com" icon={<FaEnvelope />} />
                                    </div>
                                    <div className="mobile-theme-toggle">
                                        <button onClick={toggleTheme} className="theme-pill">
                                            {theme === "dark" ? <><FaSun /> Light Mode</> : <><FaMoon /> Dark Mode</>}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

const SocialLink = ({ href, icon }) => (
    <Magnetic>
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="social-link"
            style={{ padding: '0.5rem', display: 'flex' }}
        >
            {icon}
        </a>
    </Magnetic>
);

export default Navbar;
