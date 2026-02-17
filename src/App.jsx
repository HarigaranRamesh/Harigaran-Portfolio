import { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

// Immediate imports for Critical Path
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Preloader from "./components/common/Preloader";
import ContactCTA from "./components/common/ContactCTA";

// Lazy components
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const ExperienceEducation = lazy(() => import('./components/ExperienceEducation'));
const Methodology = lazy(() => import('./components/Methodology'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));

const Login = lazy(() => import("./components/admin/Login"));
const Dashboard = lazy(() => import("./components/admin/Dashboard"));

const SectionLoading = () => (
  <div className="flex items-center justify-center min-h-[200px]" aria-hidden="true">
    <div className="w-8 h-8 border-2 border-accent-color/20 border-t-accent-color rounded-full animate-spin"></div>
  </div>
);

function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Lock scroll during loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [loading]);

  return (
    <div className="bg-bg-color min-h-screen selection:bg-accent-color selection:text-white">
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <Router>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div className="scroll-progress" style={{ scaleX, transformOrigin: "0%" }}>
              <div className="scroll-progress-bar"></div>
            </motion.div>

            <Routes>
              <Route path="/" element={
                <>
                  <Navbar />
                  <Hero />
                  <Suspense fallback={<SectionLoading />}>
                    <About />
                    <Projects />
                    <Skills />
                    <ExperienceEducation />
                    <Methodology />
                    <Testimonials />
                    <Contact />
                    <Footer />
                    <ScrollToTop />
                    <ContactCTA />
                  </Suspense>
                </>
              } />

              <Route path="/login" element={
                <Suspense fallback={<SectionLoading />}>
                  <Login />
                </Suspense>
              } />

              <Route path="/admin" element={
                <Suspense fallback={<SectionLoading />}>
                  <Dashboard />
                </Suspense>
              } />
            </Routes>
          </motion.div>
        )}
      </Router>
    </div>
  )
}

export default App;
