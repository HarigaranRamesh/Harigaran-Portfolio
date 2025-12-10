import { FaHeart } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <p className="footer-text">
                    Designed & Built with <FaHeart className="heart-icon" /> by
                    <a href="https://github.com/HarigaranRamesh" className="footer-link">Harigaran R</a>
                </p>
                <p className="footer-copyright">
                    © {new Date().getFullYear()} Portfolio. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
