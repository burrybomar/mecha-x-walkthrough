import { HTFSweepDiagram } from "@/components/visuals/HTFSweepDiagram";
import { motion } from "framer-motion";

export const Framework = () => {
    return (
        <section className="py-24 px-6 md:px-12 bg-card/30 backdrop-blur-sm border-y border-white/5">
            <div className="max-w-6xl mx-auto space-y-16">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        Point A to Point B
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        The entire mechanical sequence reduces to a simple flow:
                        <span className="text-primary font-medium"> price moving from a Key Level (KL) to a Draw on Liquidity (DL)</span>.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-semibold">Three Universal Models</h3>
                            <ul className="space-y-6">
                                <li className="space-y-2">
                                    <div className="font-bold text-lg text-primary">1. IRL → ERL</div>
                                    <p className="text-muted-foreground">
                                        Internal Range Liquidity to External Range Liquidity. Price trades deep into the internal range (a gap, an old level), then targets the opposing boundary. The breakout model.
                                    </p>
                                </li>
                                <li className="space-y-2">
                                    <div className="font-bold text-lg text-primary">2. ERL → IRL</div>
                                    <p className="text-muted-foreground">
                                        External Range Liquidity to Internal Range Liquidity. Price sweeps the external boundary, fails to continue, and gets pulled back into the range. The mean reversion model.
                                    </p>
                                </li>
                                <li className="space-y-2">
                                    <div className="font-bold text-lg text-primary">3. Manipulation Range</div>
                                    <p className="text-muted-foreground">
                                        Price dips below a clear swing low, takes out stops, then snaps back sharply and closes above. The trap. Often followed by aggressive expansion to the opposing high.
                                    </p>
                                </li>
                            </ul>
                        </div>

                        <div className="p-6 rounded-xl bg-primary/5 border border-primary/10">
                            <h4 className="font-semibold mb-2">What Mecha-X does:</h4>
                            <p className="text-sm text-muted-foreground">
                                It identifies when these models are forming on your Higher Timeframe candles, marks the sweep (the C2), and tracks the expected expansion (the C3).
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent blur-[100px] rounded-full opacity-30" />
                        <div className="relative glass-panel p-6 rounded-xl border border-white/10">
                            <HTFSweepDiagram />
                        </div>
                    </div>
                </div>

                <div className="space-y-8 pt-12 border-t border-white/5">
                    <div className="text-center space-y-4">
                        <h3 className="text-2xl md:text-3xl font-bold">The C1 → C2 → C3 Sequence</h3>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            This is the mechanical confirmation that the framework requires. No interpretation. No guesswork.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                step: "C1",
                                role: "Creates the swing point. The liquidity.",
                                shows: "BSL/SSL lines mark C1's high or low"
                            },
                            {
                                step: "C2",
                                role: "Sweeps C1. Must fail to close inside C1's range.",
                                shows: "⚡ label with formation type, time, direction"
                            },
                            {
                                step: "C3",
                                role: "The expansion. Follows the confirmed reversal.",
                                shows: "C3 zone box, CISD projections"
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-6 rounded-xl border border-white/10 hover:border-primary/30 transition-colors"
                            >
                                <div className="text-4xl font-bold text-primary/20 mb-4">{item.step}</div>
                                <h4 className="text-lg font-semibold mb-2">{item.role}</h4>
                                <div className="text-sm text-muted-foreground bg-white/5 p-3 rounded-lg">
                                    <span className="text-primary text-xs uppercase tracking-wider font-bold block mb-1">Mecha-X Shows:</span>
                                    {item.shows}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center">
                        <p className="text-lg font-medium text-primary/80">
                            The rule: You cannot trade a reversal until C2 has confirmed. A Key Level hit is just anticipation. C2 is the evidence.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
