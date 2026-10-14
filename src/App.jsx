import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>{/* Other portfolio sections go here */}</main>
    </div>
  );
}
