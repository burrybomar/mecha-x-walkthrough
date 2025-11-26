import { Button } from "@/components/ui/button";
import { ExternalLink, Check, X } from "lucide-react";

export const LearnAccess = () => {
    return (
        <>
            <section className="py-24 px-6 md:px-12 bg-card/30 border-t border-white/5">
                <div className="max-w-6xl mx-auto space-y-16">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl md:text-5xl font-bold">Credits & Origins</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Mecha-X is built on concepts learned from these educators.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "TTrades",
                                desc: "The fractal model, OSOK rules, mechanical confirmation steps, and the concept that market cannot reverse without a swing point. Why not require a swing in our framework.",
                                link: "#"
                            },
                            {
                                name: "MMXM Trader",
                                desc: "The Next Day Model framework.",
                                link: "#"
                            },
                            {
                                name: "Eleven_Trades",
                                desc: "4H Candle Profiling methodology.",
                                link: "#"
                            }
                        ].map((res, i) => (
                            <a
                                key={i}
                                href={res.link}
                                className="glass-card p-8 rounded-xl border border-white/10 hover:border-primary/50 transition-all group flex flex-col h-full"
                            >
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    {res.name}
                                    <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed flex-grow">{res.desc}</p>
                            </a>
                        ))}
                    </div>

                    <div className="text-center text-sm text-muted-foreground">
                        <p>Expanded and developed into indicator form by <strong className="text-primary">OmarxQQQ</strong></p>
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 md:px-12">
                <div className="max-w-4xl mx-auto">
                    <div className="glass-panel p-8 md:p-12 rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/5 to-transparent text-center space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-bold">Get Access</h2>
                            <p className="text-xl text-muted-foreground">
                                Visualize the mechanical sequence on your chart today.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto py-8">
                            <div className="space-y-4">
                                <h3 className="font-bold text-lg border-b border-white/10 pb-2">What you get</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-green-500 shrink-0" />
                                        <span>Mecha-X indicator for TradingView</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-green-500 shrink-0" />
                                        <span>Configuration guide</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-green-500 shrink-0" />
                                        <span>Updates as the tool evolves</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-bold text-lg border-b border-white/10 pb-2">What you don't get</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <X className="w-5 h-5 text-red-500 shrink-0" />
                                        <span>Trading signals</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <X className="w-5 h-5 text-red-500 shrink-0" />
                                        <span>Guarantees</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <X className="w-5 h-5 text-red-500 shrink-0" />
                                        <span>A replacement for learning</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <Button size="lg" className="w-full md:w-auto px-12 py-6 text-lg">
                            Get Started
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};
