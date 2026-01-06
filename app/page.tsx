import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Specialties from './components/Specialties';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="bg-primary text-cream">
      <Header />
      <Hero />
      <Projects />
      <Specialties />
      <Contact />
      <Footer />
    </div>
  );
}
