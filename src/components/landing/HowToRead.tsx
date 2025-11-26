import { ShieldCheck, Eye, Activity, AlertTriangle, Target } from "lucide-react";

export const HowToRead = () => {
    return (
        <section className="py-24 px-6 md:px-12 bg-card/50 border-y border-white/5">
            <div className="max-w-6xl mx-auto space-y-16">
                <div className="text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">The Mechanical Checklist</h2>
                    <p className="text-muted-foreground">The framework's logic translated to what you see on the chart.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {[
                        {
                            step: "1",
                            title: "Identify C1",
                            desc: "Look for a BSL or SSL line. This is the swing point, the liquidity, Point A.",
                            icon: <Eye className="w-6 h-6 text-blue-400" />
                        },
                        {
                            step: "2",
                            title: "Wait for C2",
                            desc: "Watch for the ⚡ label. Confirm sweep, formation type, and session context.",
                            icon: <Activity className="w-6 h-6 text-yellow-400" />
                        },
                        {
                            step: "3",
                            title: "Check Confluence",
                            desc: "Is there SMT? Did C1 tap a POI? Is there a CISD zone forming?",
                            icon: <ShieldCheck className="w-6 h-6 text-green-400" />
                        },
                        {
                            step: "4",
                            title: "Know Invalidation",
                            desc: "The EQ line of the C2 candle. If price hits this, the idea is dead.",
                            icon: <AlertTriangle className="w-6 h-6 text-red-400" />
                        },
                        {
                            step: "5",
                            title: "Know Your Target",
                            desc: "CISD projection levels. The 2x-2.5x zone is primary.",
                            icon: <Target className="w-6 h-6 text-purple-400" />
                        }
                    ].map((item, i) => (
                        <div key={i} className="glass-card p-6 rounded-xl border border-white/10 relative overflow-hidden group hover:bg-white/5 transition-colors">
                            <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-6xl group-hover:opacity-20 transition-opacity">
                                {item.step}
                            </div>
                            <div className="relative z-10 space-y-4">
                                <div className="p-3 bg-white/5 rounded-lg w-fit">
                                    {item.icon}
                                </div>
                                <h3 className="font-bold text-lg">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};
