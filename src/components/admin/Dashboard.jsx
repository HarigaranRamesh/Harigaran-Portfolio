import { motion } from "framer-motion";
import "../../styles/Admin.css";

const Dashboard = () => (
    <div className="admin-container" style={{ textAlign: "center", paddingTop: "5rem" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="login-card">
            <h1 className="admin-title">Admin Dashboard Disabled</h1>
            <p>This project no longer includes Firebase configuration for admin data or authentication.</p>
            <p>Restore Firebase setup to re-enable the dashboard and message management.</p>
        </motion.div>
    </div>
);

export default Dashboard;
