import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Target,
  Clock,
  BarChart3,
  Layers,
  GitCompare,
  Workflow,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";
import { AITooltip } from "@/components/AITooltip";
import mechaxLogo from "@/assets/mecha-x-logo.gif";
import { SimpleChart } from "@/components/SimpleChart";
import { PatternChart } from "@/components/PatternChart";

type SectionKey =
  | "overview"
  | "htf"
  | "liquidity"
  | "patterns"
  | "cisd"
  | "ifvg"
  | "smt"
  | "sessions";

interface SectionConfig {
  title: string;
  icon: JSX.Element;
  gradient: string;
  description: string;
  stats?: { label: string; value: string };
}

const Index = () => {
  const [selectedSection, setSelectedSection] = useState<SectionKey | null>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (key: SectionKey) => {
    setSelectedSection(selectedSection === key ? null : key);
    
    // Scroll to details section after a brief delay to allow rendering
    setTimeout(() => {
      if (selectedSection !== key && detailsRef.current) {
        detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const sections: Record<SectionKey, SectionConfig> = {
    overview: {
      title: "Getting Started",
      icon: <Sparkles className="w-8 h-8" />,
      gradient: "from-primary via-accent to-primary",
      description: "Time-based HTF sweep framework overview",
      stats: { label: "Components", value: "6 Core" },
    },
    htf: {
      title: "HTF Analysis",
      icon: <BarChart3 className="w-8 h-8" />,
      gradient: "from-blue-500 via-cyan-500 to-blue-600",
      description: "Higher timeframe structure on any chart",
      stats: { label: "Timeframes", value: "Up to 3" },
    },
    liquidity: {
      title: "Liquidity Zones",
      icon: <Target className="w-8 h-8" />,
      gradient: "from-emerald-500 via-teal-500 to-emerald-600",
      description: "BSL/SSL sweep detection system",
      stats: { label: "Detection", value: "Auto" },
    },
    patterns: {
      title: "C1→C2→C3",
      icon: <Workflow className="w-8 h-8" />,
      gradient: "from-cyan-500 via-blue-500 to-cyan-600",
      description: "Core 3-candle reversal patterns",
      stats: { label: "Signals", value: "Real-time" },
    },
    cisd: {
      title: "CISD Momentum",
      icon: <Zap className="w-8 h-8" />,
      gradient: "from-orange-500 via-amber-500 to-orange-600",
      description: "Change in State of Delivery zones",
      stats: { label: "Projections", value: "1x-2.5x" },
    },
    ifvg: {
      title: "iFVG Gaps",
      icon: <Layers className="w-8 h-8" />,
      gradient: "from-indigo-500 via-purple-500 to-indigo-600",
      description: "Inverted Fair Value Gap patterns",
      stats: { label: "Type", value: "Reversal" },
    },
    smt: {
      title: "SMT Divergence",
      icon: <GitCompare className="w-8 h-8" />,
      gradient: "from-purple-500 via-pink-500 to-purple-600",
      description: "Smart Money Technique analysis",
      stats: { label: "Modes", value: "Binary/Triad" },
    },
    sessions: {
      title: "Session Models",
      icon: <Clock className="w-8 h-8" />,
      gradient: "from-pink-500 via-rose-500 to-pink-600",
      description: "4H time-based session pattern recognition",
      stats: { label: "Models", value: "Asia/Lon/NY" },
    },
  };

  const renderSectionDetails = (key: SectionKey) => {
    switch (key) {
      case "overview":
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <BarChart3 />, title: "HTF Candles", desc: "See 4H/Daily on 5min chart" },
                { icon: <Target />, title: "Liquidity Zones", desc: "BSL/SSL detection" },
                { icon: <Workflow />, title: "C1→C2→C3", desc: "Automated pattern detection" },
                { icon: <Zap />, title: "CISD Zones", desc: "Momentum shift signals" },
                { icon: <GitCompare />, title: "SMT Logic", desc: "Divergence analysis" },
                { icon: <Clock />, title: "Session Models", desc: "4H pattern recognition" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-xl bg-gradient-to-br from-card to-secondary/30 border border-border hover:border-primary/50 transition-all group"
                >
                  <div className="p-3 w-fit rounded-lg bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <AITooltip term={item.title}>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  </AITooltip>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 text-center">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-2">Interactive Guide</h3>
              <p className="text-muted-foreground">
                Hover over any <AITooltip term="underlined term"><span className="text-primary font-medium cursor-help">underlined term</span></AITooltip> for instant explanations
              </p>
            </div>
          </div>
        );

      case "htf":
        return (
          <div className="space-y-8">
            <SimpleChart 
              type="htf" 
              title="Higher Timeframe Analysis" 
              description="Multi-timeframe structure without switching charts - see 4H/Daily levels on your 5min timeframe"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Auto Mode", desc: "Intelligent HTF selection based on chart timeframe" },
                { title: "Manual Mode", desc: "Up to 3 custom HTF configurations with full control" },
              ].map((mode, i) => (
                <Card key={i} className="border-2 border-border hover:border-primary/50 transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                        <BarChart3 className="w-5 h-5" />
                      </div>
                      {mode.title}
                    </CardTitle>
                    <CardDescription>{mode.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        );

      case "liquidity":
        return (
          <div className="space-y-8">
            <SimpleChart 
              type="liquidity" 
              title="Buy Side & Sell Side Liquidity" 
              description="BSL above highs & SSL below lows - where smart money hunts retail stops"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "BSL", color: "from-blue-500 to-cyan-500", desc: "Buy Side Liquidity above swing highs" },
                { title: "SSL", color: "from-red-500 to-rose-500", desc: "Sell Side Liquidity below swing lows" },
                { title: "Sweep", color: "from-purple-500 to-pink-500", desc: "Liquidity hunt then reversal" },
              ].map((type, i) => (
                <Card key={i} className="border-2 border-border hover:border-primary/50 transition-all">
                  <div className={`h-2 bg-gradient-to-r ${type.color}`} />
                  <CardHeader>
                    <CardTitle>{type.title}</CardTitle>
                    <CardDescription>{type.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        );

      case "patterns":
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PatternChart type="c1c2c3-bullish" title="Bullish C1→C2→C3" />
              <PatternChart type="c1c2c3-bearish" title="Bearish C1→C2→C3" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { emoji: "🎯", title: "C1 Setup", desc: "First candle touching POI zone" },
                { emoji: "⚡", title: "C2 Swing", desc: "Middle candle = THE SWING POINT" },
                { emoji: "✅", title: "C3 Confirm", desc: "Right candle confirms reversal" },
              ].map((step, i) => (
                <Card key={i} className="border-2 border-border hover:border-primary/50 transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{step.emoji}</span>
                      {step.title}
                    </CardTitle>
                    <CardDescription>{step.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        );

      case "cisd":
        return (
          <div className="space-y-8">
            <SimpleChart 
              type="cisd" 
              title="CISD Momentum Zones" 
              description="Change in State of Delivery - momentum shift confirmation zones"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Formation", desc: "CISD forms after liquidity sweep and structure shift" },
                { title: "Projections", desc: "Target levels at 1.0x, 2.0x, and 2.5x extensions" },
                { title: "Retest", desc: "Valid zones often get retested before major move" },
              ].map((item, i) => (
                <Card key={i} className="border-2 border-border hover:border-primary/50 transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-orange-500" />
                      {item.title}
                    </CardTitle>
                    <CardDescription>{item.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        );

      case "ifvg":
        return (
          <div className="space-y-8">
            <SimpleChart 
              type="ifvg" 
              title="iFVG Patterns" 
              description="Inverted Fair Value Gap - gap filled aggressively in opposite direction"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Formation", desc: "FVG inverted by aggressive opposite move" },
                { title: "Signal", desc: "Institutions positioning for real direction" },
                { title: "Entry", desc: "iFVG zones = high-probability entry areas" },
              ].map((item, i) => (
                <Card key={i} className="border-2 border-border hover:border-primary/50 transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layers className="w-5 h-5 text-indigo-500" />
                      {item.title}
                    </CardTitle>
                    <CardDescription>{item.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        );

      case "smt":
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Binary Mode", desc: "1 Primary + 1 Correlated (ES vs NQ)" },
                { title: "Triad Mode", desc: "1 Primary + 2 Correlated (ES vs NQ + YM)" },
              ].map((mode, i) => (
                <Card key={i} className="border-2 border-border hover:border-primary/50 transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GitCompare className="w-5 h-5 text-purple-500" />
                      {mode.title}
                    </CardTitle>
                    <CardDescription>{mode.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
              <h3 className="font-bold text-lg mb-2">Key Signals</h3>
              <div className="space-y-2 text-sm">
                <p><Badge variant="destructive">PSP-REV</Badge> Primary swept + closed inside, correlated failed</p>
                <p><Badge className="bg-amber-500">PSP-CONT</Badge> Divergence present but bias conflicts</p>
                <p><Badge variant="destructive">CIC-REV</Badge> 2 assets diverged + bias confirms</p>
              </div>
            </div>
          </div>
        );

      case "sessions":
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  title: "ASIA REVERSAL", 
                  time: "6p→2a sweep",
                  desc: "22:00 ASIA sweeps 18:00 Pre-ASIA, target London expansion",
                  color: "from-purple-500 to-purple-600" 
                },
                { 
                  title: "LONDON REVERSAL", 
                  time: "2a→10p sweep",
                  desc: "02:00 LON sweeps 22:00 ASIA = TRAP, NY reverses",
                  color: "from-blue-500 to-blue-600" 
                },
                { 
                  title: "NYAM-SB", 
                  time: "10-11am window",
                  desc: "Optimal NY entry during 10am hour, most reliable 1H setup",
                  color: "from-emerald-500 to-emerald-600" 
                },
              ].map((session, i) => (
                <Card key={i} className="border-2 border-border hover:border-primary/50 transition-all">
                  <div className={`h-2 bg-gradient-to-r ${session.color}`} />
                  <CardHeader>
                    <CardTitle className="text-base">{session.title}</CardTitle>
                    <Badge variant="secondary" className="w-fit mb-2">{session.time}</Badge>
                    <CardDescription>{session.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Logo with Gradient Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.35]">
          <img 
            src={mechaxLogo} 
            alt="" 
            className="w-full h-full object-cover object-center"
            style={{ imageRendering: 'crisp-edges' }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-background/65 via-background/70 to-background/65"></div>
      </div>

      <div className="relative z-10">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-xl opacity-40 animate-pulse" />
                <img src={mechaxLogo} alt="MECHA-X" className="w-12 h-12 relative z-10 rounded-xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-mono">
                  MECHA-X
                </h1>
                <p className="text-xs text-muted-foreground font-mono">Trading Intelligence</p>
              </div>
            </div>
            <Badge variant="secondary" className="gap-2 font-mono">
              <Activity className="w-3 h-3 text-primary animate-pulse" />
              <span className="font-mono">Live</span>
            </Badge>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-12 sm:py-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
            <TrendingUp className="w-4 h-4" />
            Multi-Timeframe Intelligence Platform
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              MECHA-X
            </span>
            <br />
            <span className="text-foreground text-3xl sm:text-5xl">Trading System</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Time-based HTF sweep framework with multi-timeframe analysis and liquidity detection
          </p>
        </motion.div>

        {/* Section Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {(Object.entries(sections) as [SectionKey, SectionConfig][]).map(([key, config], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => handleSectionClick(key)}
              className="cursor-pointer group"
            >
              <Card className="h-full border-2 border-border hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${config.gradient}`} />
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${config.gradient} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      {config.icon}
                    </div>
                    {config.stats && (
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{config.stats.label}</p>
                        <p className="text-sm font-bold text-primary">{config.stats.value}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                      {config.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {config.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-primary font-medium group-hover:gap-2 transition-all">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Expanded Section Details */}
        {selectedSection && (
          <motion.div
            ref={detailsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-16 scroll-mt-24"
          >
            <Card className="border-2 border-primary/30 bg-card/80 backdrop-blur-sm overflow-hidden">
              <div className={`h-1 bg-gradient-to-r ${sections[selectedSection].gradient}`} />
              <CardHeader className="bg-gradient-to-r from-secondary/50 to-accent/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${sections[selectedSection].gradient} text-white shadow-lg`}>
                      {sections[selectedSection].icon}
                    </div>
                    <div>
                      <CardTitle className="text-3xl">{sections[selectedSection].title}</CardTitle>
                      <CardDescription className="text-base">{sections[selectedSection].description}</CardDescription>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedSection(null)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="sr-only">Close</span>
                    <span className="text-2xl">×</span>
                  </button>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                {renderSectionDetails(selectedSection)}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center py-12 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Master MECHA-X?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Click any section above to dive deep into time-based HTF sweep patterns
          </p>
          <div className="flex flex-col items-center gap-4">
            <Button 
              size="lg"
              onClick={() => navigate("/knowledge")}
              className="font-mono"
            >
              Browse Full Knowledge Base
            </Button>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Badge className="bg-primary/10 text-primary border border-primary/30 px-4 py-2">Multi-Timeframe</Badge>
              <Badge className="bg-primary/10 text-primary border border-primary/30 px-4 py-2">Time-Based</Badge>
              <Badge className="bg-primary/10 text-primary border border-primary/30 px-4 py-2">HTF Sweep Framework</Badge>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-secondary/20 py-8 px-4 mt-16">
        <div className="container mx-auto text-center space-y-4">
          <p className="text-2xl font-bold font-mono">MECHA-X</p>
          <div className="h-0.5 w-16 bg-primary rounded-full mx-auto" />
          <p className="text-sm text-muted-foreground font-mono">
            Created by <span className="text-primary font-bold">OxQQQ</span>
          </p>
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto font-mono">
            Multi-timeframe analysis with HTF candles, liquidity detection, C1→C2→C3 patterns, CISD zones, iFVG patterns, and SMT divergence logic for systematic trading.
          </p>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Index;
