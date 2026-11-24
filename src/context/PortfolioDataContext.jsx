/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import {
    fetchProfile,
    fetchProjects,
    fetchSkills,
    fetchExperience,
    fetchEducation,
    fetchTestimonials,
    fetchMethodology
} from "../services/strapi";
import { defaultProfile } from "../data/profile";
import { projects as defaultProjects } from "../data/projects";
import { skills as defaultSkills } from "../data/skills";
import { experience as defaultExperience } from "../data/experience";
import { education as defaultEducation } from "../data/education";
import { testimonials as defaultTestimonials } from "../data/testimonials";
import { methodology as defaultMethodology } from "../data/methodology";

const PortfolioDataContext = createContext(null);

export const PortfolioDataProvider = ({ children }) => {
    const [profile, setProfile] = useState(defaultProfile);
    const [projects, setProjects] = useState(defaultProjects);
    const [skills, setSkills] = useState(defaultSkills);
    const [experience, setExperience] = useState(defaultExperience);
    const [education, setEducation] = useState(defaultEducation);
    const [testimonials, setTestimonials] = useState(defaultTestimonials);
    const [methodology, setMethodology] = useState(defaultMethodology);
    const [isLoading, setIsLoading] = useState(false);
    const [isDynamic, setIsDynamic] = useState(false);

    const loadAllData = async () => {
        setIsLoading(true);
        try {
            const [
                profileData,
                projectsData,
                skillsData,
                experienceData,
                educationData,
                testimonialsData,
                methodologyData
            ] = await Promise.all([
                fetchProfile(),
                fetchProjects(),
                fetchSkills(),
                fetchExperience(),
                fetchEducation(),
                fetchTestimonials(),
                fetchMethodology()
            ]);

            setProfile(profileData);
            setProjects(projectsData);
            setSkills(skillsData);
            setExperience(experienceData);
            setEducation(educationData);
            setTestimonials(testimonialsData);
            setMethodology(methodologyData);
            setIsDynamic(true);
        } catch (err) {
            console.warn("Strapi CMS data fetch failed, using fallback static data:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadAllData();
    }, []);

    const value = {
        profile,
        projects,
        skills,
        experience,
        education,
        testimonials,
        methodology,
        isLoading,
        isDynamic,
        refreshData: loadAllData
    };

    return (
        <PortfolioDataContext.Provider value={value}>
            {children}
        </PortfolioDataContext.Provider>
    );
};

export const usePortfolioData = () => {
    const context = useContext(PortfolioDataContext);
    if (!context) {
        return {
            profile: defaultProfile,
            projects: defaultProjects,
            skills: defaultSkills,
            experience: defaultExperience,
            education: defaultEducation,
            testimonials: defaultTestimonials,
            methodology: defaultMethodology,
            isLoading: false,
            isDynamic: false,
            refreshData: () => {}
        };
    }
    return context;
};
