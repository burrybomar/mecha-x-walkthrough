import { Settings } from "lucide-react";

export const Configuration = () => {
    return (
        <section className="py-24 px-6 md:px-12 bg-card/30 border-y border-white/5">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                        <Settings className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold">Configuration</h2>
                    <p className="text-muted-foreground">Fully customizable to fit your chart.</p>
                </div>

                <div className="glass-panel rounded-xl border border-white/10 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-white/5">
                            <tr>
                                <th className="p-4 font-semibold text-primary">Group</th>
                                <th className="p-4 font-semibold text-primary">What It Controls</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {[
                                { group: "HTF Setup", control: "Timeframes, candle counts, Auto/Manual mode" },
                                { group: "HTF Candles", control: "Colors, positioning, labels" },
                                { group: "Chart Mapping", control: "BSL/SSL lines, EQ lines, dividers" },
                                { group: "POI Validation", control: "NWOG, MWDR, FVG filtering" },
                                { group: "Liquidity Sweeps", control: "Valid/invalid styles, strike count" },
                                { group: "Pattern Detection", control: "C2 labels, SMT mode" },
                                { group: "CISD", control: "Lines, zones, projections, retests" },
                                { group: "FVG", control: "Post-C2 gap visualization" }
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-medium">{row.group}</td>
                                    <td className="p-4 text-muted-foreground">{row.control}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};
