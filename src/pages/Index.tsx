import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BookOpen, Activity, Zap, Target, Cpu, CheckCircle2, Play, Twitter, ExternalLink, TrendingUp, BarChart3, Layers } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FloatingCandlestickAssistant } from '@/components/FloatingCandlestickAssistant';
import { FloatingCandle } from '@/components/decorative/FloatingCandle';
import { ConnectionLine } from '@/components/decorative/ConnectionLine';
import { ThreeSequencesFlow } from "@/components/ThreeSequencesFlow";
import { CandlestickButton } from "@/components/CandlestickButton";

const Index = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-foreground overflow-x-hidden relative" ref={containerRef}>
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <FloatingCandle x="10%" y="20%" size={120} variant="bullish" delay={0} depth={0.2} />
        <FloatingCandle x="85%" y="15%" size={180} variant="bearish" delay={2} depth={0.3} rotation={-15} />
        <FloatingCandle x="75%" y="60%" size={100} variant="neutral" delay={4} depth={0.1} rotation={45} />
        <FloatingCandle x="15%" y="70%" size={150} variant="bullish" delay={1} depth={0.25} rotation={-10} />

        {/* Connection Lines (Dynamic) */}
        <ConnectionLine x1="50%" y1="30%" x2={mousePos.x} y2={mousePos.y} color="hsl(var(--primary))" className="opacity-20" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 z-10">
        <motion.div
          style={{ opacity, scale }}
          className="text-center max-w-5xl mx-auto space-y-8 relative"
        >
          {/* HUD Badge - Educational Focus */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-md text-primary text-xs font-mono uppercase tracking-widest mb-6"
          >
            <BookOpen className="w-3 h-3 animate-pulse" />
            <span>Free Interactive Learning System</span>
          </motion.div>

          {/* Main Title with Clear Educational Positioning */}
          <div className="relative">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 filter drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              Master the
              <br />
              <span className="text-glow-primary text-primary">MECHA-X</span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl">Indicator</span>
            </h1>
            <div className="absolute -inset-1 bg-primary/20 blur-3xl -z-10 opacity-20 animate-pulse-glow" />
          </div>

          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto font-light tracking-wide leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Complete interactive walkthrough to understand and use the <span className="text-foreground font-semibold">MECHA-X TradingView indicator</span>.
            <br />
            Learn C1→C2→C3 sequences, automated HTF profiling, and high-probability setups.
            <br className="hidden md:block" />
            <span className="text-primary font-semibold">From setup to execution—everything explained.</span>
          </motion.p>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Created by OmarxQQQ</span>
              <a
                href="https://x.com/omarxqqq?s=21"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/30" />
            <span>Pinescript coder • Learned from Ttrades, GxT, ICT, elevntrades</span>
          </motion.div>

          {/* Clear Learning CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to="/sequences">
              <Button size="lg" className="h-14 px-8 text-lg bg-primary text-primary-foreground hover:bg-primary/90 border border-primary/50 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:scale-105 rounded-none">
                <Play className="mr-2 h-5 w-5" />
                Start Learning Now
              </Button>
            </Link>
            <Link to="/chart-examples">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white/20 hover:bg-white/5 backdrop-blur-sm transition-all hover:scale-105 rounded-none">
                <Activity className="mr-2 h-5 w-5" />
                See Live Examples
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Learning Outcome Cards - Replacing Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full max-w-6xl relative">
          {/* Connection Lines to Cards */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 w-full h-12 hidden md:block pointer-events-none">
            <svg className="w-full h-full overflow-visible">
              <path d="M 50% 0 L 50% 100 L 16% 100" fill="none" stroke="hsl(var(--primary))" strokeOpacity="0.3" strokeDasharray="4 4" />
              <path d="M 50% 0 L 50% 100 L 84% 100" fill="none" stroke="hsl(var(--primary))" strokeOpacity="0.3" strokeDasharray="4 4" />
              <circle cx="50%" cy="0" r="3" fill="hsl(var(--primary))" />
            </svg>
          </div>

          <LearningCard
            icon={<Target className="w-8 h-8 text-primary" />}
            title="Setup & Configuration"
            desc="Install MECHA-X on TradingView and configure settings for optimal detection."
            delay={0.2}
          />
          <LearningCard
            icon={<Layers className="w-8 h-8 text-secondary" />}
            title="Understand Sequences"
            desc="Master C1, C2, and C3 patterns with visual training and real chart examples."
            delay={0.4}
          />
          <LearningCard
            icon={<TrendingUp className="w-8 h-8 text-accent" />}
            title="Execute Trades"
            desc="Learn precise entry protocols with defined risk parameters and exit strategies."
            delay={0.6}
          />
        </div>
      </section>

      {/* Problem-Solution Hook Section - NEW */}
      <section className="py-16 md:py-24 px-4 bg-muted/20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 px-4">
              Tired of Manual Chart Analysis?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Most traders struggle with multi-timeframe alignment—you either:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {[
              { problem: "Miss setups by staying on one timeframe", icon: "❌" },
              { problem: "Get overwhelmed switching between charts", icon: "😵" },
              { problem: "Draw incorrect structure manually", icon: "📉" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-lg bg-card border border-border text-center"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <p className="text-muted-foreground">{item.problem}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center p-8 rounded-2xl bg-primary/5 border border-primary/20"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
              MECHA-X Automates the Hard Parts
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              This complete guide shows you how to leverage automated HTF sweep detection,
              C2 pattern identification, and CISD zone marking—so you can focus on execution, not chart markup.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* What You'll Master Section */}
      <section id="learning-path" className="py-16 md:py-32 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12 md:mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 px-4">
                What You'll Master
                <br />
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Step by Step
                </span>
              </h2>
              <p className="text-base md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                Every concept flows naturally into the next. From HTF analysis down to
                precision entry and execution—nothing is disconnected.
              </p>
            </motion.div>
          </div>

          <ThreeSequencesFlow />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 md:mt-20 text-center px-4"
          >
            <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full bg-primary/5 border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <p className="text-xs md:text-sm font-medium">
                Ready to understand the complete system?
              </p>
            </div>
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <CandlestickButton
                variant="bullish"
                onClick={() => navigate('/fractal-model')}
                className="w-full sm:w-auto text-base md:text-lg px-6 md:px-10 py-4 md:py-6"
              >
                Learn the Framework
              </CandlestickButton>
              <CandlestickButton
                variant="bearish"
                onClick={() => navigate('/sequence-identifier')}
                className="w-full sm:w-auto text-base md:text-lg px-6 md:px-10 py-4 md:py-6"
              >
                Identify Sequences
              </CandlestickButton>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* How This Guide Works Section - NEW */}
      <section className="py-16 md:py-32 px-4 bg-muted/30">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 md:mb-8 px-4">
            How This Guide Works
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            A structured learning experience designed to take you from setup to confident execution.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-8 md:mt-16">
            {[
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Interactive Lessons",
                desc: "Learn by doing with live chart examples and visual demonstrations"
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Practical Application",
                desc: "Set up your TradingView indicators and test on real-time charts"
              },
              {
                icon: <CheckCircle2 className="w-8 h-8" />,
                title: "Self-Assessment",
                desc: "Test your understanding with sequence identification exercises"
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: "Reference Library",
                desc: "Glossary, FAQ, and checklists for quick review anytime"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-6 md:p-8 rounded-2xl bg-card border border-border"
              >
                <div className="text-primary mb-3 md:mb-4 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{item.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Why This Guide (Differentiation) Section */}
      <section className="py-16 md:py-32 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 md:mb-8 px-4">
            Why This Guide vs. YouTube or Discord?
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-16">
            {[
              {
                title: "Complete System",
                desc: "Not scattered concepts—everything organized from A to Z in logical learning order"
              },
              {
                title: "Interactive Examples",
                desc: "See real chart examples with annotations. Visual learning with diagrams and flows"
              },
              {
                title: "Built-In References",
                desc: "Glossary for terminology, FAQ for common questions, checklists for execution"
              },
              {
                title: "Real Automation",
                desc: "Focus on using the actual indicator—not generic concepts or manual analysis"
              },
              {
                title: "Always Available",
                desc: "No watching hours of videos. Jump to any section instantly as a reference"
              },
              {
                title: "Self-Paced Learning",
                desc: "Go at your own speed. Review concepts as many times as you need"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-6 md:p-8 rounded-2xl bg-card border border-border"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-3 md:mb-4">
                  <CheckCircle2 className="w-8 h-8 mx-auto" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{item.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-transparent to-muted/30">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Master <span className="text-primary">MECHA-X</span>?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start the walkthrough now and learn to trade with automated precision.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/sequences">
              <Button size="lg" className="h-14 px-10 text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:scale-105 rounded-none">
                <Play className="mr-2 h-5 w-5" />
                Begin Learning Journey
              </Button>
            </Link>
            <Link to="/setup">
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-white/20 hover:bg-white/5 backdrop-blur-sm transition-all hover:scale-105 rounded-none">
                <Cpu className="mr-2 h-5 w-5" />
                Setup TradingView
              </Button>
            </Link>
          </div>

          {/* Shop Link Placeholder */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 pt-8 border-t border-border/50"
          >
            <p className="text-sm text-muted-foreground mb-3">
              Want access to the MECHA-X indicator?
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/30 border border-border">
              <span className="text-sm">Subscription available soon via Whop</span>
              <ExternalLink className="w-4 h-4 text-primary" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      <FloatingCandlestickAssistant />
    </div>
  );
};

const LearningCard = ({ icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-accent/50 opacity-0 group-hover:opacity-100 transition duration-500 blur-lg" />
      <div className="glass-premium p-8 h-full flex flex-col items-start gap-4 hover:translate-y-[-5px] transition-transform duration-300">
        <div className="p-3 rounded-lg bg-white/5 border border-white/10 mb-2 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-glow group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground leading-relaxed flex-grow">
          {desc}
        </p>
        <div className="mt-auto pt-4 flex items-center justify-end w-full">
          <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </motion.div>
  );
};

export default Index;
