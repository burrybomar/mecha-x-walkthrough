import { Clock, TrendingUp, BarChart2 } from "lucide-react";

export const UseCases = () => {
    return (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Use Cases</h2>
                <p className="text-muted-foreground">Adaptable to your execution style.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass-card p-8 rounded-xl border border-white/10 space-y-6">
                    <div className="p-4 bg-blue-500/10 rounded-full w-fit">
                        <Clock className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-2xl font-bold">Scalping (1-5m)</h3>
                    <ul className="space-y-3 text-muted-foreground">
                        <li className="flex gap-2">
                            <span className="text-primary">•</span>
                            HTF candles show 15m, 1H, 4H structure
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary">•</span>
                            C2 labels tell you which 4H candle swept
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary">•</span>
                            Session context helps identify Asia/London/NY models
                        </li>
                    </ul>
                </div>

                <div className="glass-card p-8 rounded-xl border border-white/10 space-y-6 bg-white/5">
                    <div className="p-4 bg-purple-500/10 rounded-full w-fit">
                        <TrendingUp className="w-8 h-8 text-purple-500" />
                    </div>
                    <h3 className="text-2xl font-bold">Intraday (15m-1H)</h3>
                    <ul className="space-y-3 text-muted-foreground">
                        <li className="flex gap-2">
                            <span className="text-primary">•</span>
                            HTF candles show 4H, Daily structure
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary">•</span>
                            CISD zones provide entry levels
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary">•</span>
                            SMT divergence confirms or denies
                        </li>
                    </ul>
                </div>

                <div className="glass-card p-8 rounded-xl border border-white/10 space-y-6">
                    <div className="p-4 bg-green-500/10 rounded-full w-fit">
                        <BarChart2 className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold">Swing (4H-Daily)</h3>
                    <ul className="space-y-3 text-muted-foreground">
                        <li className="flex gap-2">
                            <span className="text-primary">•</span>
                            HTF candles show Daily, Weekly structure
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary">•</span>
                            NWOG and MWDR POI validation for weekly setups
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary">•</span>
                            Projection targets for multi-day holds
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};
