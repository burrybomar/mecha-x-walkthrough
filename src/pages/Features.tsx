import { motion } from "framer-motion";
import { Target, Activity, Table, Layers, AlertCircle, CheckCircle2, XCircle, ArrowUpRight, Clock, Map, Divide } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/landing/Footer";

const FeatureSection = ({ id, title, icon: Icon, children, color }: any) => (
    <section id={id} className="py-16 md:py-24 border-b border-white/5 last:border-0 scroll-mt-20">
        <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-4 mb-8">
                <div className={`p-3 rounded-xl bg-${color}/10 border border-${color}/20`}>
                    <Icon className={`w-8 h-8 text-${color}`} />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-glow">{title}</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
                {children}
            </div>
        </div>
    </section>
);

const Features = () => {
    return (
        <div className="min-h-screen bg-transparent text-foreground">
            {/* Header */}
            <header className="py-12 md:py-20 text-center px-4">
                <div className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-4">
                    THE TOOLBELT
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
                    COMPLETE <span className="text-primary text-glow-primary">ARSENAL</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Every automated feature explained. No black boxes.
                </p>
            </header>

            {/* HTF Structure */}
            <FeatureSection id="htf" title="HTF Structure" icon={Map} color="primary">
                <div className="space-y-6">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Mecha-X brings the Higher Timeframe (HTF) to your Lower Timeframe (LTF) chart. No more tab switching.
                    </p>
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-primary">Key Capabilities:</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                                <span className="font-mono font-bold text-primary">HTF Dividers</span>
                                <span className="text-sm text-muted-foreground">Visual separators showing where new HTF candles begin and end.</span>
                            </li>
                            <li className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                                <span className="font-mono font-bold text-primary">Auto Mapping</span>
                                <span className="text-sm text-muted-foreground">Automatically projects the 4H/Daily structure onto your 1m/5m/15m chart.</span>
                            </li>
                            <li className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                                <span className="font-mono font-bold text-primary">HTF Sweeps</span>
                                <span className="text-sm text-muted-foreground">See exactly when a 4H candle sweeps a previous 4H high/low, directly on the LTF.</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="glass-panel p-6 rounded-xl border border-primary/20 flex items-center justify-center bg-black/40">
                    <div className="text-center space-y-4">
                        <div className="inline-block px-4 py-2 rounded bg-primary/20 text-primary font-mono font-bold">
                            4H SWEEP DETECTED
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Mapped on 15m Chart
                        </p>
                    </div>
                </div>
            </FeatureSection>

            {/* Smart Liquidity */}
            <FeatureSection id="liquidity" title="Smart Liquidity" icon={Target} color="accent">
                <div className="space-y-6">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Not all lines are equal. Mecha-X distinguishes between internal and external range liquidity with context awareness.
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="p-4 rounded-lg bg-accent/5 border border-accent/10">
                            <h4 className="font-bold text-accent mb-2">BSL/SSL Awareness</h4>
                            <p className="text-sm text-muted-foreground">
                                Intelligently identifies Buy Side and Sell Side Liquidity based on the Current Timeframe and HTF Mode (Auto/Manual).
                            </p>
                        </div>
                        <div className="p-4 rounded-lg bg-accent/5 border border-accent/10">
                            <h4 className="font-bold text-accent mb-2">Detailed EQ Lines</h4>
                            <p className="text-sm text-muted-foreground">
                                Automated Equilibrium (EQ) lines to help you identify premium vs. discount pricing within the current range.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="glass-panel p-6 rounded-xl border border-accent/20 flex items-center justify-center bg-black/40">
                    <div className="space-y-2 font-mono text-sm w-full max-w-xs mx-auto">
                        <div className="flex justify-between border-b border-white/10 pb-2">
                            <span className="text-red-400">BSL (External)</span>
                            <span>4150.00</span>
                        </div>
                        <div className="flex justify-between border-b border-white/10 pb-2">
                            <span className="text-accent">EQ (Midpoint)</span>
                            <span>4125.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-green-400">SSL (Internal)</span>
                            <span>4100.00</span>
                        </div>
                    </div>
                </div>
            </FeatureSection>

            {/* Context & Alignment */}
            <FeatureSection id="context" title="Context & Alignment" icon={Clock} color="purple-400">
                <div className="space-y-6">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Context is king. Mecha-X ensures you are always aligned with the higher timeframe flow.
                    </p>
                    <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/10">
                            <h4 className="font-bold text-purple-400 mb-2">Auto Timeframe Alignment</h4>
                            <p className="text-sm text-muted-foreground">
                                Instantly visualizes if the 1H, 4H, and Daily structures are aligned. Green = All Bullish, Red = All Bearish.
                            </p>
                        </div>
                        <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/10">
                            <h4 className="font-bold text-purple-400 mb-2">Detailed C2 Labels</h4>
                            <p className="text-sm text-muted-foreground">
                                Labels don't just say "Buy". They give you the <strong>Time</strong> of the sweep and the <strong>Direction</strong> (e.g., "10:00 AM - BULLISH SWEEP"), providing critical session context.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="glass-panel p-6 rounded-xl border border-purple-500/20 flex items-center justify-center bg-black/40">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-green-500/20 text-green-400 font-mono font-bold mb-2">
                            <CheckCircle2 className="w-4 h-4" /> ALIGNED
                        </div>
                        <p className="text-xs text-muted-foreground">1H • 4H • Daily</p>
                    </div>
                </div>
            </FeatureSection>

            {/* MTF CISD */}
            <FeatureSection id="cisd" title="MTF CISD" icon={Layers} color="green-400">
                <div className="space-y-6">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Multi-Timeframe Change in State of Delivery (MTF CISD). The most advanced entry logic in the script.
                    </p>

                    <div className="p-4 rounded-lg bg-white/5 border border-white/10 mb-6">
                        <h4 className="font-bold text-green-400 mb-2">Fractal Logic</h4>
                        <p className="text-sm text-muted-foreground">
                            Example: If a <strong>4H Sweep</strong> occurs, Mecha-X automatically looks for a <strong>15m CISD</strong> to confirm the reversal. It maps the entry trigger from the appropriate fractal timeframe.
                        </p>
                    </div>

                    <h3 className="text-xl font-bold text-primary">Retest Types:</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                            <ArrowUpRight className="w-5 h-5 text-green-400" />
                            <span><strong>Reclaimed:</strong> Price closes back above the CISD level.</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <ArrowUpRight className="w-5 h-5 text-green-400" />
                            <span><strong>Rebalanced:</strong> Price wicks into the FVG created by the move.</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <ArrowUpRight className="w-5 h-5 text-green-400" />
                            <span><strong>Redelivered:</strong> Price returns to the origin of the move.</span>
                        </li>
                    </ul>

                    <p className="text-sm text-muted-foreground mt-4">
                        <strong>Projections:</strong> Automated targets generated from the CISD leg to guide your exit.
                    </p>
                </div>
                <div className="glass-panel p-6 rounded-xl border border-green-500/20 flex items-center justify-center bg-black/40">
                    <div className="space-y-4 w-full max-w-xs">
                        <div className="flex items-center justify-between text-green-400 border-b border-green-500/30 pb-2">
                            <span className="font-mono font-bold">TYPE:</span>
                            <span className="font-mono">RECLAIMED</span>
                        </div>
                        <div className="flex items-center justify-between text-muted-foreground">
                            <span className="font-mono text-xs">TRIGGER:</span>
                            <span className="font-mono text-xs">15m CISD (from 4H Sweep)</span>
                        </div>
                    </div>
                </div>
            </FeatureSection>

            {/* Footer CTA */}
            <section className="py-24 px-4 text-center">
                <h2 className="text-3xl font-bold mb-8">Ready to configure?</h2>
                <Link to="/setup">
                    <Button className="h-12 px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
                        Go to Setup Guide
                    </Button>
                </Link>
            </section>

            <div className="relative z-10">
                <Footer />
            </div>
        </div>
    );
};

export default Features;
