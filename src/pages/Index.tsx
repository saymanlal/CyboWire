import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import AISection from "@/components/AISection";
import MeshBlockchainSection from "@/components/MeshBlockchainSection";
import DashboardSection from "@/components/DashboardSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <ScrollProgress />
    <Navbar />
    <HeroSection />
    <ProblemSection />
    <ArchitectureSection />
    <AISection />
    <MeshBlockchainSection />
    <DashboardSection />
    <AdvantagesSection />
    <AboutSection />
    <Footer />
  </div>
);

export default Index;
