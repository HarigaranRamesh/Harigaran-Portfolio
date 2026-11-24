import defaultProfileImg from "../assets/profile.jpg";

export const defaultProfile = {
    hero: {
        greeting: "Engineering the Future",
        titlePrefix: "MODERN",
        titleHighlight: "ARCHITECT.",
        description:
            "Specializing in high-performance Full Stack applications and enterprise-scale architecture. Crafting seamless digital solutions where code meets creativity.",
        viewWorkButtonText: "View Work",
        contactButtonText: "Let's Talk"
    },
    about: {
        sectionNumber: "01.",
        sectionTitle: "Architecting the Web",
        leadText:
            "I transform complex problems into elegant digital solutions that live at the intersection of performance and design.",
        bioParagraph1:
            "As a Full Stack Developer based in the digital landscape, I specialize in crafting high-performance applications with modern tech stacks. My approach is rooted in clean architecture and user-centric design principles.",
        bioParagraph2:
            "Currently, I'm focused on building scalable enterprise solutions and exploring the frontiers of AI-driven web experiences.",
        profileImage: defaultProfileImg,
        resumeUrl:
            "https://drive.google.com/file/d/1KjIp8G4gvVFprX7KXir4tW6XF7xmdnZB/view?usp=share_link",
        stats: [
            { label: "Experience", value: "6 Months" },
            { label: "Projects Completed", value: "3+" },
            { label: "Technologies", value: "12+" },
        ]
    }
};
