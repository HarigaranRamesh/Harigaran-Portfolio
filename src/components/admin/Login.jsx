import { motion } from "framer-motion";
import "../../styles/Admin.css";

const Login = () => (
    <div className="login-container">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="login-card"
        >
            <h2 className="admin-title" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                Admin Login Disabled
            </h2>
            <p>This app no longer includes Firebase configuration for admin login.</p>
            <p>Restore Firebase setup to re-enable this feature.</p>
        </motion.div>
    </div>
);

export default Login;
