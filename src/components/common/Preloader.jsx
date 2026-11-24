import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePortfolioData } from "../../context/PortfolioDataContext";
import "./Preloader.css";

const Preloader = ({ onComplete }) => {
    const { profile } = usePortfolioData();
    const brand = profile?.brand || {};
    const [counter, setCounter] = useState(0);

    const tags = brand.preloaderTags && brand.preloaderTags.length > 0
        ? brand.preloaderTags
        : ["Design", "Code", "Experience"];

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 20);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            className="preloader-overlay"
            exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
            <div className="preloader-content">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="preloader-logo"
                >
                    {brand.logoText || "HARIGARAN"}<span>.</span>
                </motion.div>

                <div className="preloader-counter-wrapper">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${counter}%` }}
                        className="preloader-bar"
                    />
                    <span className="preloader-number">{counter}%</span>
                </div>

                <div className="preloader-tags">
                    {tags.map((tag, idx) => (
                        <motion.span
                            key={idx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            transition={{ delay: 0.2 + (idx * 0.1) }}
                        >
                            {tag}
                        </motion.span>
                    ))}
                </div>
            </div>

            <svg className="preloader-curve">
                <motion.path
                    initial={{ d: "M0 0 L100 0 L100 100 Q50 100 0 100 Z" }}
                    exit={{ d: "M0 0 L100 0 L100 100 Q50 50 0 100 Z", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
                />
            </svg>
        </motion.div>
    );
};

export default Preloader;
