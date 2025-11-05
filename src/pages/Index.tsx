import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import mechaxLogo from "@/assets/mecha-x-logo.gif";
import { TradingFrameworkFlow } from "@/components/TradingFrameworkFlow";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0, 0.98]);
  const heroY = useTransform(scrollY, [0, 500], [0, -150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen bg-retro-digital">
      {/* Sticky Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-border"
        style={{ backgroundColor: `hsla(var(--background) / ${headerOpacity})` }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={mechaxLogo} alt="MECHA-X" className="w-10 h-10 rounded-lg" />
              <div className="text-left">
                <div className="text-xl font-bold">MECHA-X</div>
                <div className="text-xs text-muted-foreground">Trading Intelligence</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigate('/resources')}>
                Resources
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/knowledge')}>
                <BookOpen className="w-4 h-4 mr-2" />
                Learn
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="pt-20">
        {/* Hero Section with Parallax */}
        <motion.section 
          className="relative min-h-[90vh] flex items-center justify-center text-center px-4 overflow-hidden"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{
                background: 'radial-gradient(circle at 50% 50%, hsl(var(--primary)) 0%, transparent 50%)'
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.15, 0.1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <div className="relative z-10 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-sm font-mono text-primary mb-4 tracking-wider uppercase">
                Institutional Trading Framework
              </div>
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-[1.1] tracking-tight">
                One System.
                <br />
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Six Steps.
                </span>
                <br />
                Complete Edge.
              </h1>
            </motion.div>

            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              A unified framework connecting HTF levels, session timing, liquidity sweeps, 
              and precision entries into one coherent trading system.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 rounded-full group"
                onClick={() => {
                  document.getElementById('framework')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                See How It Works
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-6 rounded-full"
                  onClick={() => navigate('/setup')}
                >
                  Configure Indicators
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-6 rounded-full"
                  onClick={() => navigate('/knowledge')}
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Full Documentation
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Framework Section */}
        <section id="framework" className="py-32 px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-7xl mx-auto"
          >
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-5xl md:text-7xl font-bold mb-6">
                  The Complete
                  <br />
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    Trading Sequence
                  </span>
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Every step flows into the next. From higher timeframe analysis down to 
                  precision entry and execution—nothing is disconnected.
                </p>
              </motion.div>
            </div>

            <TradingFrameworkFlow />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-20 text-center"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/5 border border-primary/20">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <p className="text-sm font-medium">
                  Want to understand each step deeply?
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="lg"
                  onClick={() => navigate('/setup')}
                  className="text-lg px-10 py-6 rounded-full"
                >
                  Setup Your Indicators
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/knowledge')}
                  className="text-lg px-10 py-6 rounded-full"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Read Framework Logic
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Why It Works Section */}
        <section className="py-32 px-4 bg-muted/30">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Why This Framework Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {[
                {
                  title: "Institutional Logic",
                  desc: "Follow where big money moves, not retail patterns"
                },
                {
                  title: "Multi-Timeframe Sync",
                  desc: "HTF context guides LTF execution—perfect harmony"
                },
                {
                  title: "Mechanical Process",
                  desc: "Clear if/then rules eliminate guesswork and emotion"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="p-8 rounded-2xl bg-card border border-border"
                >
                  <div className="text-5xl font-bold text-primary mb-4">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Index;
