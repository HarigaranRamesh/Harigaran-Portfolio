import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../../styles/Admin.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/admin");
        } catch (err) {
            setError("Failed to login. Please check your credentials.");
            console.error(err);
        }
    };

    return (
        <div className="login-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="login-card"
            >
                <h2 className="admin-title" style={{ textAlign: "center", marginBottom: "1.5rem" }}>Admin Login</h2>
                {error && <p className="error-msg">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="login-btn"
                    >
                        Login
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
