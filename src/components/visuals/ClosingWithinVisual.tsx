import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

export const ClosingWithinVisual = () => {
    const levelPrice = 80;

    // Valid: Sweeps 80 (High 90), Closes 75 (Inside < 80)
    const validCandle = { high: 90, open: 70, close: 75, low: 65, type: "bearish" };
    // Actually if it's a sweep of a HIGH, we usually look for a bearish close or at least a close below the level.
    // Let's make it a bearish candle that swept: Open 75, High 90, Close 70, Low 60.
    const validBearish = { high: 90, open: 75, close: 70, low: 60 };

    // Invalid: Sweeps 80 (High 90), Closes 85 (Outside > 80)
    const invalidBullish = { high: 90, open: 75, close: 85, low: 70 };

    return (
        <div className="w-full aspect-video bg-black/40 rounded-lg overflow-hidden relative border border-white/10 grid grid-cols-2">
            {/* Valid Side */}
            <div className="relative border-r border-white/10 p-4">
                <div className="absolute top-4 left-4 text-bullish font-bold flex items-center gap-2 z-10">
                    <CheckCircle2 className="w-5 h-5" /> VALID
                </div>
                <div className="absolute top-10 left-4 text-xs text-muted-foreground z-10">
                    Closes BELOW Level
                </div>
                <svg viewBox="0 0 200 400" className="w-full h-full">
                    <defs>
                        <linearGradient id="bearishGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="hsl(var(--bearish))" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="hsl(var(--bearish))" stopOpacity="0.9" />
                        </linearGradient>
                    </defs>

                    {/* Level Line */}
                    <line x1="0" y1={400 - levelPrice * 3} x2="200" y2={400 - levelPrice * 3} stroke="white" strokeDasharray="4 4" strokeWidth="1" />
                    <text x="10" y={400 - levelPrice * 3 - 5} fill="white" fontSize="10">SWEEP LEVEL</text>

                    {/* Candle */}
                    <motion.g initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                        <line x1="100" y1={400 - validBearish.low * 3} x2="100" y2={400 - validBearish.high * 3} stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
                        <rect
                            x="80"
                            y={400 - validBearish.open * 3} // Open is higher (75)
                            width="40"
                            height={(validBearish.open - validBearish.close) * 3} // 75 - 70 = 5
                            fill="url(#bearishGradient)"
                            stroke="hsl(var(--bearish))"
                            strokeWidth="1"
                            rx="2"
                        />
                    </motion.g>
                </svg>
            </div>

            {/* Invalid Side */}
            <div className="relative p-4">
                <div className="absolute top-4 left-4 text-bearish font-bold flex items-center gap-2 z-10">
                    <XCircle className="w-5 h-5" /> INVALID
                </div>
                <div className="absolute top-10 left-4 text-xs text-muted-foreground z-10">
                    Closes ABOVE Level
                </div>
                <svg viewBox="0 0 200 400" className="w-full h-full">
                    <defs>
                        <linearGradient id="bullishGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="hsl(var(--bullish))" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="hsl(var(--bullish))" stopOpacity="0.4" />
                        </linearGradient>
                    </defs>

                    {/* Level Line */}
                    <line x1="0" y1={400 - levelPrice * 3} x2="200" y2={400 - levelPrice * 3} stroke="white" strokeDasharray="4 4" strokeWidth="1" />

                    {/* Candle */}
                    <motion.g initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
                        <line x1="100" y1={400 - invalidBullish.low * 3} x2="100" y2={400 - invalidBullish.high * 3} stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
                        <rect
                            x="80"
                            y={400 - invalidBullish.close * 3} // Close is higher (85)
                            width="40"
                            height={(invalidBullish.close - invalidBullish.open) * 3} // 85 - 75 = 10
                            fill="url(#bullishGradient)"
                            stroke="hsl(var(--bullish))"
                            strokeWidth="1"
                            rx="2"
                        />
                    </motion.g>
                </svg>
            </div>
        </div>
    );
};
