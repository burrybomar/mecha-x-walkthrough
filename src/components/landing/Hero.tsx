import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { HTFCanvasVisual } from "@/components/visuals/HTFCanvasVisual";
import { motion } from "framer-motion";

export const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
                <div className="absolute top-0 left-0 right-0 h-[500px] bg-primary/5 blur-[120px] rounded-full opacity-50 pointer-events-none" />
            </div>

            <div className="relative z-10 max-w-5xl w-full space-y-12 text-center">
                {/* Text Content */}
                <div className="space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground/70"
                    >
                        The Mechanical Sequence.
                        <br />
                        On Your Chart.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                    >
                        Mecha-X visualizes the C1 → C2 → C3 fractal pattern, HTF candle structure,
                        and session-based models directly on your TradingView chart.
                        Built on the teachings of TTrades, MMXM Trader, and Eleven_Trades.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <blockquote className="text-lg font-medium italic text-primary/80 border-l-2 border-primary/50 pl-4 py-1">
                            "The market cannot reverse without a swing point."
                        </blockquote>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
                    >
                        <Button size="lg" className="h-12 px-8 text-lg gap-2 group">
                            <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                            See It In Action
                        </Button>
                        <Button size="lg" variant="outline" className="h-12 px-8 text-lg border-primary/20 hover:bg-primary/10">
                            Get Access
                        </Button>
                    </motion.div>
                </div>

                {/* Hero Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="relative mx-auto max-w-4xl glass-panel p-2 rounded-xl border border-white/10 shadow-2xl shadow-primary/10"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 pointer-events-none" />
                    <HTFCanvasVisual />
                    <div className="absolute bottom-4 left-0 right-0 text-center z-20">
                        <span className="text-xs text-muted-foreground bg-background/50 backdrop-blur px-3 py-1 rounded-full border border-white/5">
                            Visualizing HTF Structure on LTF Chart
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
