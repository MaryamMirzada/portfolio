import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Navbar />
      <Hero />

      <main>
        <About/>
        <Projects/>
      </main>
    </div>
  );
}
