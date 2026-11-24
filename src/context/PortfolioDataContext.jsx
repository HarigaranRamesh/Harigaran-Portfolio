/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import { isSanityConfigured, fetchSanityProfile, fetchSanitySkills, fetchSanityProjects, fetchSanityExperience, fetchSanityEducation, fetchSanityMethodology, fetchSanityTestimonials } from "../services/sanity";
import { isStrapiActive, fetchProfile as fetchStrapiProfile, fetchSkills as fetchStrapiSkills, fetchProjects as fetchStrapiProjects, fetchExperience as fetchStrapiExperience, fetchEducation as fetchStrapiEducation, fetchMethodology as fetchStrapiMethodology, fetchTestimonials as fetchStrapiTestimonials } from "../services/strapi";
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
    const [cmsProvider, setCmsProvider] = useState("static");

    const loadAllData = async () => {
        // Priority 1: Sanity Cloud CMS (24/7 cloud without servers)
        if (isSanityConfigured()) {
            setIsLoading(true);
            try {
                const [p, sk, pr, ex, ed, m, t] = await Promise.all([
                    fetchSanityProfile(),
                    fetchSanitySkills(),
                    fetchSanityProjects(),
                    fetchSanityExperience(),
                    fetchSanityEducation(),
                    fetchSanityMethodology(),
                    fetchSanityTestimonials()
                ]);
                setProfile(p);
                setSkills(sk);
                setProjects(pr);
                setExperience(ex);
                setEducation(ed);
                setMethodology(m);
                setTestimonials(t);
                setCmsProvider("sanity");
            } catch (err) {
                console.warn("Sanity fetch error:", err);
            } finally {
                setIsLoading(false);
            }
            return;
        }

        // Priority 2: Strapi CMS (if active)
        if (isStrapiActive()) {
            setIsLoading(true);
            try {
                const [p, sk, pr, ex, ed, m, t] = await Promise.all([
                    fetchStrapiProfile(),
                    fetchStrapiSkills(),
                    fetchStrapiProjects(),
                    fetchStrapiExperience(),
                    fetchStrapiEducation(),
                    fetchStrapiMethodology(),
                    fetchStrapiTestimonials()
                ]);
                setProfile(p);
                setSkills(sk);
                setProjects(pr);
                setExperience(ex);
                setEducation(ed);
                setMethodology(m);
                setTestimonials(t);
                setCmsProvider("strapi");
            } catch (err) {
                console.warn("Strapi fetch error:", err);
            } finally {
                setIsLoading(false);
            }
            return;
        }

        // Priority 3: Instant static local data (zero latency)
        setCmsProvider("static");
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
        cmsProvider,
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
            cmsProvider: "static",
            refreshData: () => {}
        };
    }
    return context;
};
