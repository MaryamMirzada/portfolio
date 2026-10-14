import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import ExperienceEducation from "./components/ExperienceEducation";
import Certificates from "./components/Certificates";
import Footer from "./components/Footer";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Navbar />
      <Hero />

      <main>
        <About />
        <Projects />
        <ExperienceEducation />
        <Certificates />
        <Contact />
      </main>

     <Footer/>
    </div>
  );
}
