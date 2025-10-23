import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  const navigate = useNavigate();
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
      title: "System Overview",
      icon: <Sparkles className="w-8 h-8" />,
      gradient: "from-primary via-accent to-primary",
      description: "HTF sweep framework with multi-timeframe liquidity detection",
      stats: { label: "Components", value: "7 Core" },
    },
    htf: {
      title: "HTF Sweeps",
      icon: <BarChart3 className="w-8 h-8" />,
      gradient: "from-blue-500 via-cyan-500 to-blue-600",
      description: "Higher timeframe candles overlay any chart (Auto/Manual)",
      stats: { label: "Mode", value: "Auto/Manual" },
    },
    liquidity: {
      title: "BSL/SSL Lines",
      icon: <Target className="w-8 h-8" />,
      gradient: "from-emerald-500 via-teal-500 to-emerald-600",
      description: "Buyside/Sellside liquidity sweep detection (LTF + HTF)",
      stats: { label: "Types", value: "Valid/Invalid" },
    },
    patterns: {
      title: "C2 Labels",
      icon: <Workflow className="w-8 h-8" />,
      gradient: "from-cyan-500 via-blue-500 to-cyan-600",
      description: "C2 reversal → C3 expansion pattern detection",
      stats: { label: "Pattern", value: "C1→C2→C3" },
    },
    cisd: {
      title: "CISD Projections",
      icon: <Zap className="w-8 h-8" />,
      gradient: "from-orange-500 via-amber-500 to-orange-600",
      description: "Change in State of Delivery with multi-target projections",
      stats: { label: "Targets", value: "1x-4x" },
    },
    ifvg: {
      title: "iFVG Detection",
      icon: <Layers className="w-8 h-8" />,
      gradient: "from-indigo-500 via-purple-500 to-indigo-600",
      description: "Inverse Fair Value Gaps after valid sweeps",
      stats: { label: "Context", value: "Post-Sweep" },
    },
    smt: {
      title: "SMT Analysis",
      icon: <GitCompare className="w-8 h-8" />,
      gradient: "from-purple-500 via-pink-500 to-purple-600",
      description: "Smart Money Technique divergence (Binary/Triad)",
      stats: { label: "Modes", value: "2 or 3 Assets" },
    },
    sessions: {
      title: "Session Windows",
      icon: <Clock className="w-8 h-8" />,
      gradient: "from-pink-500 via-rose-500 to-pink-600",
      description: "Asia/London/NY + Silver Bullet & Macro timing",
      stats: { label: "Sessions", value: "4H Windows" },
    },
  };

  const renderSectionDetails = (key: SectionKey) => {
    switch (key) {
      case "overview":
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <BarChart3 />, title: "HTF Sweeps", desc: "Display 4H/Daily candles on any timeframe" },
                { icon: <Target />, title: "BSL/SSL Lines", desc: "Liquidity sweep detection" },
                { icon: <Workflow />, title: "C2 Labels", desc: "Reversal → Expansion patterns" },
                { icon: <Zap />, title: "CISD", desc: "State change with projections" },
                { icon: <Layers />, title: "iFVG", desc: "Inverse Fair Value Gaps" },
                { icon: <GitCompare />, title: "SMT", desc: "Binary/Triad divergence" },
                { icon: <Clock />, title: "Sessions", desc: "Asia/London/NY windows" },
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
              title="HTF Sweep Detection" 
              description="Overlay higher timeframe candles on any chart - Auto mode intelligently selects HTFs, Manual mode gives full control (up to 4 timeframes)"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Auto Mode", desc: "Smart HTF selection: 5min chart → shows 1H, 4H, Daily automatically", detail: "15min → 4H, Daily, Weekly" },
                { title: "Manual Mode", desc: "Configure up to 4 custom HTFs with candle count, mapping, and offset control", detail: "Full customization of display" },
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
              title="BSL/SSL Sweep Detection" 
              description="Buyside Liquidity (BSL) above highs, Sellside Liquidity (SSL) below lows - tracks both LTF and HTF sweeps with valid/invalid states"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "BSL (Buyside)", color: "from-emerald-500 to-teal-500", desc: "Liquidity above swing highs - bearish target", detail: "Price sweeps highs to grab buy stops" },
                { title: "SSL (Sellside)", color: "from-red-500 to-rose-500", desc: "Liquidity below swing lows - bullish target", detail: "Price sweeps lows to grab sell stops" },
                { title: "Valid Sweeps", color: "from-blue-500 to-cyan-500", desc: "Sweep holds → price reverses from liquidity zone", detail: "C2 formed, no invalidation" },
                { title: "Invalid Sweeps", color: "from-gray-500 to-gray-600", desc: "Sweep fails → price continues through zone", detail: "Invalidated by next candle" },
              ].map((type, i) => (
                <Card key={i} className="border-2 border-border hover:border-primary/50 transition-all">
                  <div className={`h-2 bg-gradient-to-r ${type.color}`} />
                  <CardHeader>
                    <CardTitle>{type.title}</CardTitle>
                    <CardDescription>{type.desc}</CardDescription>
                    <p className="text-xs text-muted-foreground mt-2">{type.detail}</p>
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
              <PatternChart type="c1c2c3-bullish" title="Bullish Sweep → C2 → C3" />
              <PatternChart type="c1c2c3-bearish" title="Bearish Sweep → C2 → C3" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { emoji: "🎯", title: "C1 (Sweep)", desc: "First candle creates liquidity sweep (BSL/SSL)", detail: "High/Low gets taken out" },
                { emoji: "⚡", title: "C2 (Reversal)", desc: "Second candle closes INSIDE C1 range = reversal", detail: "This is the swing point - gets labeled" },
                { emoji: "✅", title: "C3 (Expansion)", desc: "Third candle expands toward target (OLHC/OHLC)", detail: "If C3 doesn't reach target, C4 continues" },
              ].map((step, i) => (
                <Card key={i} className="border-2 border-border hover:border-primary/50 transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{step.emoji}</span>
                      {step.title}
                    </CardTitle>
                    <CardDescription>{step.desc}</CardDescription>
                    <p className="text-xs text-muted-foreground mt-2">{step.detail}</p>
                  </CardHeader>
                </Card>
              ))}
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
              <h3 className="font-bold text-lg mb-2">C2 Label Detection</h3>
              <p className="text-sm text-muted-foreground mb-3">Automatic labeling of C2 reversal candles after valid sweeps</p>
              <div className="space-y-2 text-sm">
                <p>• <strong>Valid Sweep Required:</strong> C2 only forms after confirmed liquidity sweep</p>
                <p>• <strong>Reversal Criteria:</strong> C2 must close back inside C1 range (not continue sweep)</p>
                <p>• <strong>C3 Expectation:</strong> After C2 forms, C3 should expand (optional C3 box visualization)</p>
                <p>• <strong>Draw on Liquidity:</strong> C1 becomes the DOL (target) for the reversal move</p>
              </div>
            </div>
          </div>
        );

      case "cisd":
        return (
          <div className="space-y-8">
            <SimpleChart 
              type="cisd" 
              title="CISD (Change in State of Delivery)" 
              description="Momentum shift confirmation after valid sweep - detects when market changes from lower lows to higher lows (or vice versa) with multi-target projections (1x, 2x, 2.5x, 3.5x, 4x)"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Detection", desc: "CISD forms after valid sweep when price structure changes", detail: "Lower lows → Higher lows (bullish) or Higher highs → Lower highs (bearish)" },
                { title: "Projections", desc: "Multi-target system: 1x, 2x, 2.5x, 3.5x, 4x extensions from CISD level", detail: "Configurable bull/bear targets" },
                { title: "Confirmation", desc: "CISD line + label marks the exact level where state changed", detail: "Use as entry confirmation zone" },
              ].map((item, i) => (
                <Card key={i} className="border-2 border-border hover:border-primary/50 transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-orange-500" />
                      {item.title}
                    </CardTitle>
                    <CardDescription>{item.desc}</CardDescription>
                    <p className="text-xs text-muted-foreground mt-2">{item.detail}</p>
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
              title="iFVG (Inverse Fair Value Gap)" 
              description="Special FVG that forms AFTER a valid sweep - price creates gap then aggressively fills it in opposite direction, signaling institutional positioning"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Post-Sweep Context", desc: "iFVG only detected after valid C2 sweep formation", detail: "Not just any FVG - must follow sweep" },
                { title: "Reversal Signal", desc: "Gap filled aggressively opposite to sweep direction", detail: "Bull sweep → Bearish iFVG (and vice versa)" },
                { title: "Entry Zone", desc: "iFVG box marks high-probability entry area", detail: "Combines with C3 expansion confirmation" },
              ].map((item, i) => (
                <Card key={i} className="border-2 border-border hover:border-primary/50 transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layers className="w-5 h-5 text-indigo-500" />
                      {item.title}
                    </CardTitle>
                    <CardDescription>{item.desc}</CardDescription>
                    <p className="text-xs text-muted-foreground mt-2">{item.detail}</p>
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
                { title: "Binary Mode (2 Assets)", desc: "Compare 1 primary asset vs 1 correlated asset", detail: "Example: ES (primary) vs NQ (correlated) - simple divergence detection" },
                { title: "Triad Mode (3 Assets)", desc: "Compare 1 primary vs 2 correlated assets", detail: "Example: ES vs NQ + YM - algorithm switches between assets for strength confirmation" },
              ].map((mode, i) => (
                <Card key={i} className="border-2 border-border hover:border-primary/50 transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GitCompare className="w-5 h-5 text-purple-500" />
                      {mode.title}
                    </CardTitle>
                    <CardDescription>{mode.desc}</CardDescription>
                    <p className="text-xs text-muted-foreground mt-2">{mode.detail}</p>
                  </CardHeader>
                </Card>
              ))}
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
              <h3 className="font-bold text-lg mb-2">Smart Money Divergence</h3>
              <p className="text-sm text-muted-foreground mb-4">When one asset makes new high/low but correlated asset doesn't = divergence = potential reversal</p>
              <div className="space-y-2 text-sm">
                <p>• <strong>Binary:</strong> Simple A vs B comparison</p>
                <p>• <strong>Triad:</strong> A vs (B or C) - algorithm picks strongest correlation</p>
                <p>• <strong>Auto-detection:</strong> System suggests correlated pairs</p>
                <p>• <strong>Manual override:</strong> Specify exact assets to compare</p>
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
                  title: "Asia Reversal", 
                  time: "18:00-22:00 (6pm-10pm)",
                  desc: "If Asia candles reverse, expect London expansion and NY continuation",
                  detail: "Indices: 18:00 or 22:00 reversal | Forex: 17:00 or 21:00",
                  color: "from-purple-500 to-purple-600" 
                },
                { 
                  title: "London Reversal", 
                  time: "2:00-6:00 AM",
                  desc: "Classic pattern: London reverses, NY expands the move",
                  detail: "Indices: Focus 2:00-6:00 window | Forex: Focus 1:00-5:00 window",
                  color: "from-blue-500 to-blue-600" 
                },
                { 
                  title: "NY Reversal", 
                  time: "6:00-10:00 AM",
                  desc: "When Asia/London fail, NY handles the reversal (common on news days)",
                  detail: "Indices: 6:00-10:00 window | Forex: 5:00-9:00 window",
                  color: "from-emerald-500 to-emerald-600" 
                },
              ].map((session, i) => (
                <Card key={i} className="border-2 border-border hover:border-primary/50 transition-all">
                  <div className={`h-2 bg-gradient-to-r ${session.color}`} />
                  <CardHeader>
                    <CardTitle className="text-base">{session.title}</CardTitle>
                    <Badge variant="secondary" className="w-fit mb-2 font-mono text-xs">{session.time}</Badge>
                    <CardDescription>{session.desc}</CardDescription>
                    <p className="text-xs text-muted-foreground mt-2">{session.detail}</p>
                  </CardHeader>
                </Card>
              ))}
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/20">
              <h3 className="font-bold text-lg mb-2">Silver Bullet & Macro Windows</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
                <div>
                  <p className="font-semibold mb-2">Silver Bullet Hours:</p>
                  <p>• 3-4am (London SB)</p>
                  <p>• 10-11am (NY AM SB) ⭐</p>
                  <p>• 2-3pm (NY PM SB)</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Key Macro Windows:</p>
                  <p>• 2:03-2:40am (Pre-London)</p>
                  <p>• 8:50-9:00am (Pre-Open)</p>
                  <p>• 9:50-10:15am (Post-Open)</p>
                  <p>• 12:25-1:35pm (Lunch)</p>
                </div>
              </div>
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
