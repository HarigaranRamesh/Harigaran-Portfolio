import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, orderBy, query, deleteDoc, doc } from "firebase/firestore";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../../styles/Admin.css";

const Dashboard = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/login");
            } else {
                fetchMessages();
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const fetchMessages = async () => {
        try {
            const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
            const querySnapshot = await getDocs(q);
            const msgs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMessages(msgs);
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/login");
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this message?")) {
            try {
                await deleteDoc(doc(db, "messages", id));
                setMessages(messages.filter((msg) => msg.id !== id));
            } catch (error) {
                console.error("Error deleting message:", error);
                alert("Failed to delete message.");
            }
        }
    };

    if (loading) return <div className="admin-container" style={{ textAlign: "center", paddingTop: "5rem" }}>Loading...</div>;

    return (
        <div className="admin-container">
            <header className="admin-header">
                <h1 className="admin-title">Admin Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="logout-btn"
                >
                    Logout
                </button>
            </header>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="dashboard-card"
            >
                <h2 style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>Messages ({messages.length})</h2>

                {messages.length === 0 ? (
                    <p style={{ color: "var(--text-secondary)" }}>No messages found.</p>
                ) : (
                    <div style={{ overflowX: "auto" }}>
                        <table className="messages-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Message</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map((msg) => (
                                    <tr key={msg.id}>
                                        <td>
                                            {msg.timestamp?.toDate().toLocaleString() || "N/A"}
                                        </td>
                                        <td style={{ fontWeight: "500", color: "var(--text-primary)" }}>{msg.user_name}</td>
                                        <td>
                                            <a href={`mailto:${msg.user_email}`} style={{ color: "#60a5fa" }}>{msg.user_email}</a>
                                        </td>
                                        <td>{msg.user_phone || "-"}</td>
                                        <td style={{ maxWidth: "300px", wordBreak: "break-word" }}>{msg.message}</td>
                                        <td style={{ textAlign: "center" }}>
                                            <button
                                                onClick={() => handleDelete(msg.id)}
                                                style={{
                                                    background: "transparent",
                                                    border: "none",
                                                    color: "#ef4444",
                                                    cursor: "pointer",
                                                    fontSize: "1.1rem",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    width: "100%"
                                                }}
                                                title="Delete Message"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Dashboard;
