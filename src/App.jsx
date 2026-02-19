import { Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhySection from './components/WhySection';
import ArchetypesSection from './components/ArchetypesSection';
import SquadSection from './components/SquadSection';
import RoadmapSection from './components/RoadmapSection';
import OutcomesSection from './components/OutcomesSection';
import Footer from './components/Footer';
import ProgramPage from './pages/ProgramPage';

function HomePage() {
  return (
    <>
      <Hero />
      <WhySection />
      <ArchetypesSection />
      <SquadSection />
      <RoadmapSection />
      <OutcomesSection />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/program" element={<ProgramPage />} />
        </Routes>
      </main>
    </>
  );
}
