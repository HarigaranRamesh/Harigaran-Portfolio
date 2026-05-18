export const projects = [
    {
        id: 1,
        title: "E-Commerce Application",
        description: "A high-performance full-stack platform optimized for scale and speed.",
        challenge: "Handling complex state management for thousands of products while maintaining a < 2s load time.",
        solution: "Implemented Redux Toolkit for state and custom middleware for real-time inventory synchronization.",
        impact: "Achieved a 95+ Lighthouse performance score and handled 500+ concurrent user simulations.",
        tech: ["React", "Redux", "Node.js", "Express", "MongoDB"],
        features: [
            "Real-time Analytics Dashboard",
            "Secure JWT Authentication",
            "Advanced Multi-level Filtering",
            "Automated Email Notifications"
        ],
        image: "https://placehold.co/600x400/1a1a1a/ffffff?text=E-Commerce+App",
        demo: "https://ecommerce-frontend-dqfz.onrender.com",
        github: "https://github.com/HarigaranRamesh/E-commerce-Application"
    },
    {
        id: 2,
        title: "Automated HRMS Portal",
        description: "An internal lifecycle management system focused on workflow automation and security.",
        challenge: "Managing complex multi-level approval hierarchies for thousands of employees.",
        solution: "Designed a state-machine based workflow engine to handle dynamic approval layers transparently.",
        impact: "Reduced manual HR administrative tasks by 40% through end-to-end automation.",
        tech: ["React", "Node.js", "Express.js", "MongoDB"],
        features: [
            "Smart Leave Management",
            "Performance Review Engine",
            "Encrypted Document Storage",
            "Real-time Notification System"
        ],
        image: "https://placehold.co/600x400/1a1a1a/ffffff?text=HRMS+Portal",
        demo: "#",
        github: "#"
    }
];
