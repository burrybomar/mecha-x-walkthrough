import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BarChart2, Activity, Zap, Terminal, Cpu, ChevronRight } from 'lucide-react';
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
          {/* HUD Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-md text-primary text-xs font-mono uppercase tracking-widest mb-6"
          >
            <Terminal className="w-3 h-3 animate-pulse" />
            <span>TradingView Indicator // v2.0.5</span>
          </motion.div>

          {/* Main Title with Glitch Effect */}
          <div className="relative">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 filter drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              MECHA-X
              <br />
              <span className="text-glow-primary text-primary">INDICATOR</span>
            </h1>
            <div className="absolute -inset-1 bg-primary/20 blur-3xl -z-10 opacity-20 animate-pulse-glow" />
          </div>

          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto font-light tracking-wide leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Automate <span className="text-foreground font-semibold">4H profiling</span> on TradingView with unmatched precision.
            <br />
            Auto-detect sweeps, C2 patterns, CISD zones, and targets.
            <br className="hidden md:block" />
            <span className="text-primary font-semibold">No manual work. Just trade.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to="/sequences">
              <Button size="lg" className="h-14 px-8 text-lg bg-primary text-primary-foreground hover:bg-primary/90 border border-primary/50 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:scale-105 rounded-none">
                <Cpu className="mr-2 h-5 w-5" />
                INITIATE SEQUENCE
              </Button>
            </Link>
            <Link to="/chart-comparison">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white/20 hover:bg-white/5 backdrop-blur-sm transition-all hover:scale-105 rounded-none">
                <Activity className="mr-2 h-5 w-5" />
                VIEW DATA
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* 3D Tilt Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full max-w-6xl relative">
          {/* Connection Lines to Cards */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 w-full h-12 hidden md:block pointer-events-none">
            <svg className="w-full h-full overflow-visible">
              <path d="M 50% 0 L 50% 100 L 16% 100" fill="none" stroke="hsl(var(--primary))" strokeOpacity="0.3" strokeDasharray="4 4" />
              <path d="M 50% 0 L 50% 100 L 84% 100" fill="none" stroke="hsl(var(--primary))" strokeOpacity="0.3" strokeDasharray="4 4" />
              <circle cx="50%" cy="0" r="3" fill="hsl(var(--primary))" />
            </svg>
          </div>

          <TiltCard
            icon={<BarChart2 className="w-8 h-8 text-primary" />}
            title="Fractal Model"
            desc="Multi-timeframe alignment logic for high-probability setups."
            delay={0.2}
          />
          <TiltCard
            icon={<Zap className="w-8 h-8 text-secondary" />}
            title="Sequence ID"
            desc="Identify Continuation, Reversal, and Aligned sequences instantly."
            delay={0.4}
          />
          <TiltCard
            icon={<Terminal className="w-8 h-8 text-accent" />}
            title="Execution"
            desc=" precise entry protocols with defined risk parameters."
            delay={0.6}
          />
        </div>
      </section>

      {/* Framework Section */}
      <section id="framework" className="py-16 md:py-32 px-4">
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
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 px-4">
                The Complete
                <br />
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Trading Sequence
                </span>
              </h2>
              <p className="text-base md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                Every step flows into the next. From higher timeframe analysis down to
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
                Ready to master the sequences?
              </p>
            </div>
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <CandlestickButton
                variant="bullish"
                onClick={() => navigate('/fractal-model')}
                className="w-full sm:w-auto text-base md:text-lg px-6 md:px-10 py-4 md:py-6"
              >
                Learn the Fractal Model
              </CandlestickButton>
              <CandlestickButton
                variant="bearish"
                onClick={() => navigate('/sequence-identifier')}
                className="w-full sm:w-auto text-base md:text-lg px-6 md:px-10 py-4 md:py-6"
              >
                Identify Your Sequence
              </CandlestickButton>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Why It Works Section */}
      <section className="py-16 md:py-32 px-4 bg-muted/30">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 md:mb-8 px-4">
            Why Mecha-X Works
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-16">
            {[
              {
                title: "Full Automation",
                desc: "Indicator detects sweeps, C2 patterns, CISD zones, and targets automatically—zero manual drawing"
              },
              {
                title: "Real-Time Detection",
                desc: "Live sweep monitoring, formation type classification (REV/SNAP/EXP), and instant alerts as setups develop"
              },
              {
                title: "Multi-Timeframe Intelligence",
                desc: "Auto mode selects optimal HTFs based on your chart. See Daily/4H context without switching timeframes"
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
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{item.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <FloatingCandlestickAssistant />
    </div>
  );
};

const TiltCard = ({ icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) => {
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
        <p className="text-muted-foreground leading-relaxed">
          {desc}
        </p>
        <div className="mt-auto pt-4 flex items-center text-xs font-mono text-primary/70 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>ACCESS_MODULE</span>
          <ChevronRight className="w-3 h-3 ml-1" />
        </div>
      </div>
    </motion.div>
  );
};

export default Index;
