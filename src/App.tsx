import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ExperienceSection from './components/ExperienceSection'
import SkillsSection from './components/SkillsSection'
import ProjectsSection from './components/ProjectsSection'
import TestimonialsSection from './components/TestimonialsSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-glow min-h-screen bg-ink">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  )
}
