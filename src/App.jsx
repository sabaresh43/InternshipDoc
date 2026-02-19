import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhySection from './components/WhySection';
import ArchetypesSection from './components/ArchetypesSection';
import SquadSection from './components/SquadSection';
import RoadmapSection from './components/RoadmapSection';
import OutcomesSection from './components/OutcomesSection';
import ApplySection from './components/ApplySection';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhySection />
        <ArchetypesSection />
        <SquadSection />
        <RoadmapSection />
        <OutcomesSection />
        <ApplySection />
        <Footer />
      </main>
    </>
  );
}
