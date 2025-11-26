import { motion } from "framer-motion";

export const C2LabelsVisual = () => {
    // C1-C2-C3-C4 Sequence Data (Bearish Reversal Example)
    const candles = [
        { id: "C1", label: "Liquidity", high: 80, open: 60, close: 75, low: 55, type: "bullish" },
        { id: "C2", label: "Sweep", high: 85, open: 75, close: 65, low: 60, type: "bearish", sweep: true }, // Sweeps 80, closes inside
        { id: "C3", label: "Expansion", high: 65, open: 65, close: 45, low: 40, type: "bearish" },
        { id: "C4", label: "Continuation", high: 48, open: 45, close: 30, low: 25, type: "bearish" },
    ];

    return (
        <div className="w-full aspect-video bg-black/40 rounded-lg overflow-hidden relative border border-white/10">
            <svg viewBox="0 0 800 400" className="w-full h-full p-8">
                <defs>
                    <linearGradient id="bullishGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--bullish))" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="hsl(var(--bullish))" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="bearishGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--bearish))" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="hsl(var(--bearish))" stopOpacity="0.9" />
                    </linearGradient>
                </defs>

                {/* Reference Line (C1 High) */}
                <motion.line
                    x1="100" y1={400 - 80 * 4} x2="800" y2={400 - 80 * 4}
                    stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="4 4"
                    opacity="0.5"
                />
                <text x="780" y={400 - 80 * 4 - 10} fill="hsl(var(--muted-foreground))" textAnchor="end" fontSize="12">C1 High (Liquidity)</text>

                {candles.map((candle, i) => {
                    const x = 150 + i * 150;
                    const yHigh = 400 - candle.high * 4;
                    const yLow = 400 - candle.low * 4;
                    const yOpen = 400 - candle.open * 4;
                    const yClose = 400 - candle.close * 4;
                    const isBullish = candle.type === "bullish";

                    return (
                        <motion.g
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.3 }}
                        >
                            {/* Wick */}
                            <line x1={x} y1={yLow} x2={x} y2={yHigh} stroke="hsl(var(--muted-foreground))" strokeWidth="2" />

                            {/* Body */}
                            <rect
                                x={x - 20}
                                y={Math.min(yOpen, yClose)}
                                width="40"
                                height={Math.abs(yClose - yOpen)}
                                fill={isBullish ? "url(#bullishGradient)" : "url(#bearishGradient)"}
                                stroke={isBullish ? "hsl(var(--bullish))" : "hsl(var(--bearish))"}
                                strokeWidth="1"
                                rx="2"
                            />

                            {/* Candle Label (C1, C2...) */}
                            <text x={x} y={380} textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">{candle.id}</text>

                            {/* Role Label */}
                            <text x={x} y={395} textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="12">{candle.label}</text>

                            {/* Sweep Marker for C2 */}
                            {candle.sweep && (
                                <motion.g
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.3 + 0.5 }}
                                >
                                    <circle cx={x} cy={yHigh - 15} r="4" fill="hsl(var(--bullish))" />
                                    <text x={x} y={yHigh - 25} textAnchor="middle" fill="hsl(var(--bullish))" fontSize="12" fontWeight="bold">SWEEP</text>
                                </motion.g>
                            )}
                        </motion.g>
                    );
                })}
            </svg>
        </div>
    );
};
