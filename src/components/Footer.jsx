import { FaHeart } from "react-icons/fa";
import { usePortfolioData } from "../context/PortfolioDataContext";
import "../styles/Footer.css";

const Footer = () => {
    const { profile } = usePortfolioData();
    const brand = profile?.brand || {};

    return (
        <footer className="footer">
            <div className="footer-container">
                <p className="footer-text">
                    Designed & Built with <FaHeart className="heart-icon" /> by{" "}
                    <a href={brand.githubUrl || "https://github.com/HarigaranRamesh"} className="footer-link">
                        {brand.creatorName || "Harigaran R"}
                    </a>
                </p>
                <p className="footer-copyright">
                    © {new Date().getFullYear()} Portfolio. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
