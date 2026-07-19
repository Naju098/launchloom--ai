import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Footer from "./components/Footer";
import GenerationResults from "./components/GenerationResults";
import VentureHeader from "./components/VentureHeader";
import ParallaxHero from "./components/hero/ParallaxHero";
import TrustStrip from "./components/TrustStrip";
import LivePreviewSection from "./components/LivePreviewSection";
import MissionPath from "./components/MissionPath";
import BrandShowcase from "./components/BrandShowcase";
import PinterestAssetBoard from "./components/PinterestAssetBoard";
import SalesAutomationPreview from "./components/SalesAutomationPreview";
import DashboardPreview from "./components/DashboardPreview";
import MetricsSection from "./components/MetricsSection";
import WhoIsThisFor from "./components/WhoIsThisFor";
import FinalCTA from "./components/FinalCTA";
import IdeaForm from "./components/IdeaForm";
import LeadDashboard from "./components/LeadDashboard";
import GuidedDemo from "./components/demo/GuidedDemo";
import ScrollProgress from "./components/ScrollProgress";
import { VentureModeProvider } from "./context/VentureModeContext";
import { ToastProvider, useToast } from "./components/venture/AchievementToast";
import { generateBrandPackage } from "./services/aiService";
import {
  getStoredLeads,
  saveLead,
  seedDemoLeads,
  updateLeadStatus,
} from "./utils/storage";

function AppContent() {
  const [currentView, setCurrentView] = useState("studio");
  const [generatedBrand, setGeneratedBrand] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [leads, setLeads] = useState([]);
  const [showDemo, setShowDemo] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    const stored = getStoredLeads();
    setLeads(stored.length ? stored : seedDemoLeads());
  }, []);

  const handleGenerate = async (formData) => {
    setIsGenerating(true);
    try {
      const result = await generateBrandPackage(formData);
      setGeneratedBrand(result);
      addToast("Launch asset unlocked — Complete brand system", "success");
      window.setTimeout(() => {
        document.getElementById("generated-results")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLeadSubmit = (lead) => {
    setLeads(saveLead(lead));
    addToast("New lead captured — ready for follow-up", "success");
  };

  const handleStatusChange = (id, status) => {
    setLeads(updateLeadStatus(id, status));
    addToast(`Lead status updated to ${status}`, "success");
  };

  const handleDemoBuild = () => {
    setShowDemo(false);
    addToast("Guided demo complete — ready to build", "success");
    window.setTimeout(() => {
      document.getElementById("brand-builder")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  const handleDemoExplore = () => {
    setShowDemo(false);
    addToast("Guided demo complete — exploring results", "success");
    if (!generatedBrand) {
      handleGenerate({
        businessType: "Used laptop store",
        location: "Kochi, Kerala",
        targetAudience: "College students, professionals, startups, and small offices",
        productCategory: "Refurbished business laptops",
        priceRange: "₹18,000 – ₹45,000",
        mainPromise: "Reliable laptops at smarter prices",
      });
    } else {
      window.setTimeout(() => {
        document.getElementById("generated-results")?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--va-base)] text-[var(--va-text)]">
      <ScrollProgress />
      <VentureHeader
        currentView={currentView}
        onChangeView={setCurrentView}
        leadCount={leads.length}
        onOpenDemo={() => setShowDemo(true)}
      />

      <AnimatePresence mode="wait">
        {currentView === "studio" ? (
          <motion.main
            key="studio"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <ParallaxHero onOpenDemo={() => setShowDemo(true)} />
            <TrustStrip />
            <LivePreviewSection />
            <section id="features">
              <PinterestAssetBoard />
            </section>
            <section id="how-it-works">
              <MissionPath />
            </section>
            <section id="showcase">
              <BrandShowcase />
            </section>
            <section id="automation">
              <SalesAutomationPreview />
            </section>
            <section id="leads-preview">
              <DashboardPreview />
            </section>
            <section id="metrics">
              <MetricsSection />
            </section>
            <WhoIsThisFor />
            <FinalCTA onOpenDemo={() => setShowDemo(true)} />
            <IdeaForm onGenerate={handleGenerate} loading={isGenerating} />
            <AnimatePresence>
              {generatedBrand && (
                <motion.div
                  key={generatedBrand.generatedAt}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <GenerationResults
                    data={generatedBrand}
                    onLeadSubmit={handleLeadSubmit}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.main>
        ) : (
          <motion.div
            key="leads"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <LeadDashboard
              leads={leads}
              onStatusChange={handleStatusChange}
              onBackToStudio={() => setCurrentView("studio")}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />

      <GuidedDemo
        isOpen={showDemo}
        onClose={() => setShowDemo(false)}
        onBuild={handleDemoBuild}
        onExplore={handleDemoExplore}
      />
    </div>
  );
}

export default function App() {
  return (
    <VentureModeProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </VentureModeProvider>
  );
}
