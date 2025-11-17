import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import mechaxLogo from "@/assets/mecha-x-logo.gif";
import { ThreeSequencesFlow } from "@/components/ThreeSequencesFlow";
import { CandlestickPattern } from "@/components/CandlestickPattern";
import { CandlestickButton } from "@/components/CandlestickButton";
import { ResponsiveNav } from "@/components/ResponsiveNav";

const Index = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0, 0.98]);
  const heroY = useTransform(scrollY, [0, 500], [0, -150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen bg-trading-grid overflow-x-hidden">
      {/* Sticky Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-border"
        style={{ backgroundColor: `hsla(var(--background) / ${headerOpacity})` }}
        role="banner"
      >
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              aria-label="MECHA-X Home"
            >
              <img src={mechaxLogo} alt="MECHA-X Logo" className="w-10 h-10 rounded-lg" />
              <div className="text-left">
                <div className="text-xl font-bold">MECHA-X</div>
                <div className="text-xs text-muted-foreground">Trading Intelligence</div>
              </div>
            </button>
            <ResponsiveNav />
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="pt-20">
        {/* Hero Section with Parallax */}
        <motion.section 
          className="relative min-h-[90vh] flex items-center justify-center text-center px-4 overflow-hidden"
          style={{ y: heroY, opacity: heroOpacity }}
          role="region"
          aria-label="Hero section"
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
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl opacity-20">
              <CandlestickPattern variant="hero" />
            </div>
          </div>

          <div className="relative z-10 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-sm font-mono text-primary mb-4 tracking-wider uppercase">
                OHLC Price Action Framework
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 md:mb-8 leading-[1.1] tracking-tight px-4">
                One System.
                <br />
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Every Setup.
                </span>
                <br />
                Complete Edge.
              </h1>
            </motion.div>

            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              A unified framework connecting HTF levels, session timing, liquidity sweeps, and precision entries—all based on pure candlestick analysis and OHLC principles.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4"
            >
              <CandlestickButton
                variant="bullish"
                onClick={() => navigate('/fractal-model')}
                className="w-full sm:w-auto text-base md:text-lg px-2"
              >
                Learn Fractal Model
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </CandlestickButton>
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full sm:w-auto">
                <CandlestickButton
                  variant="bearish"
                  onClick={() => navigate('/setup')}
                  className="w-full sm:w-auto text-sm md:text-base px-2"
                >
                  Configure Indicators
                </CandlestickButton>
                <CandlestickButton
                  variant="bullish"
                  onClick={() => navigate('/knowledge')}
                  className="w-full sm:w-auto text-sm md:text-base px-2"
                >
                  Full Documentation
                </CandlestickButton>
              </div>
            </motion.div>
          </div>
        </motion.section>

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
              Why This Framework Works
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-16">
              {[
                {
                  title: "Price Action Logic",
                  desc: "Follow OHLC structure and candle closures, not lagging indicators"
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
      </div>
    </div>
  );
};

export default Index;
