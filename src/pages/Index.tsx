import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, BarChart3, Target, Zap, Clock, Settings } from "lucide-react";
import mechaxLogo from "@/assets/mecha-x-logo.gif";
import { HTFSlides } from "@/components/HTFSlides";
import { LiquiditySlides } from "@/components/LiquiditySlides";
import { CISDSlides } from "@/components/CISDSlides";
import { SessionSlides } from "@/components/SessionSlides";
import { TradingViewSettings } from "@/components/TradingViewSettings";
import { TradingFrameworkFlow } from "@/components/TradingFrameworkFlow";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0, 0.98]);

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.95 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as any }
  };

  const features = [
    { icon: BarChart3, title: "HTF Analysis", desc: "Daily/4H levels", tab: "htf" },
    { icon: Target, title: "Liquidity", desc: "BSL/SSL sweeps", tab: "liquidity" },
    { icon: Zap, title: "CISD", desc: "Entry zones", tab: "cisd" },
    { icon: Clock, title: "Sessions", desc: "H1-H4 timing", tab: "sessions" },
    { icon: Settings, title: "Settings", desc: "Configure", tab: "settings" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-32 py-20">
            {/* Hero Section */}
            <motion.section className="min-h-[80vh] flex items-center justify-center text-center px-4" {...fadeInUp}>
              <div className="max-w-4xl">
                <motion.h1 
                  className="text-6xl md:text-8xl font-bold mb-8 leading-[1.1] tracking-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as any }}
                >
                  Trade with
                  <br />
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    Institutional Edge
                  </span>
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] as any }}
                >
                  Multi-timeframe liquidity detection, smart money tracking, and precision entry timing—all in one system.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] as any }}
                >
                  <Button onClick={() => navigate('/knowledge')} size="lg" className="text-lg px-8 py-6 rounded-full">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Start Learning
                  </Button>
                </motion.div>
              </div>
            </motion.section>

            {/* Framework Flow */}
            <motion.section {...scaleIn} className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-5xl md:text-6xl font-bold mb-4">Complete Trading<br />Framework</h2>
                <p className="text-xl text-muted-foreground">6-step system from HTF analysis to trade execution</p>
              </div>
              <TradingFrameworkFlow />
            </motion.section>

            {/* Quick Access Cards */}
            <motion.section {...scaleIn} className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Indicator Details</h2>
                <p className="text-lg text-muted-foreground">Dive deep into each component</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {features.map((feature, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] as any }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    onClick={() => setActiveTab(feature.tab)}
                    className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-xl transition-all text-left group"
                  >
                    <feature.icon className="w-7 h-7 mb-3 text-primary group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-base mb-1">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground">{feature.desc}</p>
                  </motion.button>
                ))}
              </div>
            </motion.section>

            {/* CTA */}
            <motion.section {...fadeInUp} className="text-center max-w-3xl mx-auto px-4 py-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to trade smarter?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Explore the complete knowledge base with detailed examples and real chart analysis.
              </p>
              <Button onClick={() => navigate('/knowledge')} size="lg" className="text-lg px-8 py-6 rounded-full">
                <BookOpen className="w-5 h-5 mr-2" />
                Full Knowledge Base
              </Button>
            </motion.section>
          </div>
        );
      case "htf":
        return (
          <motion.div {...fadeInUp} className="py-20 space-y-8">
            <div className="text-center max-w-3xl mx-auto px-4">
              <h2 className="text-5xl font-bold mb-4">HTF Analysis</h2>
              <p className="text-xl text-muted-foreground">Higher timeframe context and key levels</p>
            </div>
            <HTFSlides />
          </motion.div>
        );
      case "liquidity":
        return (
          <motion.div {...fadeInUp} className="py-20 space-y-8">
            <div className="text-center max-w-3xl mx-auto px-4">
              <h2 className="text-5xl font-bold mb-4">Liquidity Detection</h2>
              <p className="text-xl text-muted-foreground">BSL/SSL sweeps and entry signals</p>
            </div>
            <LiquiditySlides />
          </motion.div>
        );
      case "cisd":
        return (
          <motion.div {...fadeInUp} className="py-20 space-y-8">
            <div className="text-center max-w-3xl mx-auto px-4">
              <h2 className="text-5xl font-bold mb-4">CISD Zones</h2>
              <p className="text-xl text-muted-foreground">Change in state of delivery</p>
            </div>
            <CISDSlides />
          </motion.div>
        );
      case "sessions":
        return (
          <motion.div {...fadeInUp} className="py-20 space-y-8">
            <div className="text-center max-w-3xl mx-auto px-4">
              <h2 className="text-5xl font-bold mb-4">Session Models</h2>
              <p className="text-xl text-muted-foreground">Time-based trading windows</p>
            </div>
            <SessionSlides />
          </motion.div>
        );
      case "settings":
        return (
          <motion.div {...fadeInUp} className="py-20 space-y-8">
            <div className="text-center max-w-3xl mx-auto px-4">
              <Settings className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h2 className="text-5xl font-bold mb-4">TradingView Settings</h2>
              <p className="text-xl text-muted-foreground">Configure all MECHA-X indicators</p>
            </div>
            <TradingViewSettings />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-border"
        style={{ backgroundColor: `hsla(var(--background) / ${headerOpacity})` }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setActiveTab("overview")} className="flex items-center gap-3 hover:opacity-80 transition">
              <img src={mechaxLogo} alt="MECHA-X" className="w-10 h-10 rounded-lg" />
              <div className="text-left">
                <div className="text-xl font-bold">MECHA-X</div>
                <div className="text-xs text-muted-foreground">Trading Intelligence</div>
              </div>
            </button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/knowledge')}>
              <BookOpen className="w-4 h-4 mr-2" />
              Education
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="pt-20">
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
