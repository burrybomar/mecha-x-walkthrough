import { Settings, Sliders, Monitor, Layers, Filter, Activity, BarChart2, Target, Eye } from "lucide-react";
import { motion } from "framer-motion";

export const Configuration = () => {
    const settingsGroups = [
        {
            icon: Monitor,
            title: "Display",
            inputs: ["Font", "Size (Tiny to Huge)"]
        },
        {
            icon: Layers,
            title: "HTF Setup",
            inputs: ["Mode (Auto/Manual)", "TF 1-4 Selection", "Bars Count", "Map Toggle"]
        },
        {
            icon: BarChart2,
            title: "HTF Candles",
            inputs: ["Bull/Bear Colors", "Wick Color", "Offset/Gap", "Candle Width", "Bias Indicators"]
        },
        {
            icon: Filter,
            title: "POI Validation",
            inputs: ["POI Filter (Enable/Disable)", "Type (Neutral, NWOG, MWDR, FVG)", "NWOG Count & Tolerance", "MWDR Count & Tolerance", "FVG Count & Tolerance"]
        },
        {
            icon: Activity,
            title: "Chart Mapping",
            inputs: ["BSL/SSL Lines & Labels", "Dividers (1H, 4H, Daily, Weekly)", "EQ Lines & Labels", "HTF Interval Labels"]
        },
        {
            icon: Target,
            title: "Liquidity Sweeps",
            inputs: ["Valid/Invalid Sweep Styles", "Max Breaks (Strike System)", "Real-Time Sweep Toggle"]
        },
        {
            icon: Eye,
            title: "Pattern Detection",
            inputs: ["C2 Labels (Size/Color)", "C3 Labels", "C3 Expectation Box", "SMT (Binary/Triad Mode)"]
        },
        {
            icon: Sliders,
            title: "CISD",
            inputs: ["Line Style/Width", "Bull/Bear Colors", "Projections (1x, 2x, 4x)", "Projection Labels"]
        }
    ];

    return (
        <section className="py-24 px-6 md:px-12 bg-card/30 border-y border-white/5">
            <div className="max-w-6xl mx-auto space-y-16">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                        <Settings className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold">Configuration</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Full control over the mechanical inputs. Customize every aspect of the framework.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {settingsGroups.map((group, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-white/5 hover:border-primary/30 transition-colors group"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <group.icon className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-lg">{group.title}</h3>
                            </div>
                            <ul className="space-y-2">
                                {group.inputs.map((input, j) => (
                                    <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                                        <span className="w-1 h-1 rounded-full bg-primary/50 mt-2 flex-shrink-0" />
                                        {input}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                <div className="p-6 rounded-xl bg-primary/5 border border-primary/10 text-center">
                    <p className="text-sm text-muted-foreground">
                        <span className="font-bold text-primary">Note:</span> The "POI Filter" under POI Validation is a critical input. It filters setups based on whether they originate from a valid Point of Interest (NWOG, MWDR, or FVG).
                    </p>
                </div>
            </div>
        </section>
    );
};
