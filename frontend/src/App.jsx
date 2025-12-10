import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/admin/Login";
import Dashboard from "./components/admin/Dashboard";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="bg-bg-color min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <About />
              <Projects />
              <Skills />
              <Experience />
              <Education />
              <Contact />
              <Footer />
              <ScrollToTop />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
