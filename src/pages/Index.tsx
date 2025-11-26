import { motion } from 'framer-motion';
import { ArrowRight, BarChart2, Layers, Zap, Target, MousePointer2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AnimatedCandlestickBackground } from '@/components/AnimatedCandlestickBackground';
import { StarfieldBackground } from '@/components/visuals/StarfieldBackground';
import { FeatureShowcase } from '@/components/landing/FeatureShowcase';
import { Badge } from '@/components/ui/badge';

// Visual Placeholders (Replace with actual visual components later)
const HTFVisual = () => (
    <div className="text-center space-y-2">
        <div className="text-6xl font-black text-primary/20">1D</div>
        <div className="text-4xl font-bold text-primary">HTF STRUCTURE</div>
        <div className="text-sm text-muted-foreground">Auto-mapped Highs & Lows</div>
    </div>
);

const LiquidityVisual = () => (
    <div className="space-y-4 w-full max-w-xs">
        <div className="flex justify-between text-sm font-mono text-bullish">
            <span>BSL (Buyside)</span>
            <span>PENDING</span>
        </div>
        <div className="h-px w-full bg-bullish/50 dashed" />
        <div className="h-32 w-full bg-gradient-to-b from-bullish/5 to-bearish/5 border-x border-white/5 rounded relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                PRICE ACTION
            </div>
        </div>
        <div className="h-px w-full bg-bearish/50 dashed" />
        <div className="flex justify-between text-sm font-mono text-bearish">
            <span>SSL (Sellside)</span>
            <span>SWEPT</span>
        </div>
    </div>
);

const ContextVisual = () => (
    <div className="grid grid-cols-2 gap-4 w-full">
        <div className="p-4 rounded bg-bullish/10 border border-bullish/20 text-center">
            <div className="text-2xl font-bold text-bullish">BULLISH</div>
            <div className="text-xs text-bullish/70">FLOW</div>
        </div>
        <div className="p-4 rounded bg-bearish/10 border border-bearish/20 text-center opacity-50">
            <div className="text-2xl font-bold text-bearish">BEARISH</div>
            <div className="text-xs text-bearish/70">FLOW</div>
        </div>
        <div className="col-span-2 p-4 rounded bg-primary/10 border border-primary/20 text-center">
            <div className="text-xl font-bold text-primary">NWOG OPEN</div>
            <div className="text-xs text-primary/70">ABOVE = BULLISH BIAS</div>
        </div>
    </div>
);

const CISDVisual = () => (
    <div className="relative w-full h-48 border border-accent/30 rounded bg-accent/5 flex items-center justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-gradient" />
        <div className="text-center z-10">
            <div className="text-3xl font-black text-accent mb-2">CISD</div>
            <div className="text-sm text-muted-foreground">Change in State of Delivery</div>
            <Badge variant="outline" className="mt-2 border-accent/50 text-accent">CONFIRMED</Badge>
        </div>
    </div>
);

const features = [
    {
        id: 'htf',
        title: 'HTF Structure',
        subtitle: 'The Roadmap',
        description: 'Stop guessing the bias. Mecha-X auto-maps the Higher Timeframe structure (Daily/4H), giving you a clear directional bias before you even look at the lower timeframes.',
        icon: Layers,
        color: 'primary' as const,
        visual: <HTFVisual />
    },
    {
        id: 'liquidity',
        title: 'Smart Liquidity',
        subtitle: 'The Fuel',
        description: 'Price moves from liquidity to liquidity. We visualize the BSL (Buyside) and SSL (Sellside) pools that price is hunting, so you know exactly where the "magnet" is.',
        icon: Target,
        color: 'bullish' as const,
        visual: <LiquidityVisual />
    },
    {
        id: 'context',
        title: 'Context & Alignment',
        subtitle: 'The Filter',
        description: 'Is the 1H aligned with the 4H? Are we above the NWOG (New Week Opening Gap)? Mecha-X filters out low-probability conditions so you only strike when the stars align.',
        icon: BarChart2,
        color: 'bearish' as const,
        visual: <ContextVisual />
    },
    {
        id: 'cisd',
        title: 'MTF CISD',
        subtitle: 'The Trigger',
        description: 'Change in State of Delivery. The moment the algorithm switches from buy to sell (or vice versa). We detect this shift across multiple timeframes instantly.',
        icon: Zap,
        color: 'accent' as const,
        visual: <CISDVisual />
    }
];

const Index = () => {
    return (
        <div className="min-h-screen bg-transparent text-foreground relative overflow-hidden">
            <StarfieldBackground />
            <AnimatedCandlestickBackground variant="mixed" speed="slow" />

            {/* Hero Section - Out of this World */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-5xl mx-auto space-y-8"
                >
                    <Badge variant="outline" className="px-4 py-2 text-sm border-primary/50 text-primary bg-primary/10 backdrop-blur-md mb-4 animate-pulse">
                        SYSTEM STATUS: ONLINE
                    </Badge>

                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 filter drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] cursor-default">
                        <GlitchText text="MECHA-X" />
                    </h1>

                    <p className="text-xl md:text-3xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
                        Bring <span className="text-primary font-semibold">Order</span> to the Chaos of Price Action.
                        <br />
                        <span className="text-sm md:text-lg opacity-70 mt-4 block">
                            The ultimate mechanical trading framework for TradingView.
                        </span>
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                        <Link to="/sequences">
                            <Button size="lg" className="h-16 px-10 text-xl rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(var(--primary),0.3)]">
                                Start the Sequence <ArrowRight className="ml-2 w-6 h-6" />
                            </Button>
                        </Link>
                        <Link to="/features">
                            <Button variant="outline" size="lg" className="h-16 px-10 text-xl rounded-full border-white/20 hover:bg-white/10 backdrop-blur-sm">
                                Explore Features
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ delay: 1, duration: 2, repeat: Infinity }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 text-muted-foreground flex flex-col items-center gap-2"
                >
                    <span className="text-xs uppercase tracking-widest">Scroll to Initialize</span>
                    <MousePointer2 className="w-5 h-5" />
                </motion.div>
            </section>

            {/* Intent Section - Problem/Solution */}
            <section className="py-32 px-4 relative z-10 bg-gradient-to-b from-transparent via-background/80 to-background">
                <div className="max-w-4xl mx-auto text-center space-y-16">
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-5xl font-bold">The Market is Noise.</h2>
                        <p className="text-xl text-muted-foreground">
                            Without a framework, every candle looks like a signal. You chase liquidity, you get swept, you tilt.
                            It's not your fault. It's a lack of <span className="text-foreground font-bold">structure</span>.
                        </p>
                    </div>

                    <div className="h-24 w-px bg-gradient-to-b from-transparent via-primary to-transparent mx-auto" />

                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-5xl font-bold text-primary">Mecha-X is the Signal.</h2>
                        <p className="text-xl text-muted-foreground">
                            We stripped away the noise. No lagging indicators. No magic bands.
                            Just pure <span className="text-foreground font-bold">Price Action Logic</span> codified into a mechanical system.
                        </p>
                    </div>

                    {/* Scenario Visualization - The "Wow" Factor */}
                    <div className="pt-16">
                        <ScenarioVisualizer />
                    </div>
                </div>
            </section>

            {/* Scrollytelling Feature Showcase */}
            <section className="relative z-10 bg-background/50 backdrop-blur-sm">
                <FeatureShowcase features={features} />
            </section>

            {/* Final CTA */}
            <section className="py-32 px-4 text-center relative z-10">
                <div className="max-w-3xl mx-auto space-y-8">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
                        Ready to <span className="text-primary">Execute</span>?
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        Master the setup. Wait for the trigger. Trust the sequence.
                    </p>
                    <Link to="/sequences">
                        <Button size="lg" className="h-14 px-12 text-lg rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                            Master the Sequence
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Index;
