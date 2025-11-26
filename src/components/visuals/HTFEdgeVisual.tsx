import { motion } from "framer-motion";

export const HTFEdgeVisual = () => {
    // Visualizing a 4H Candle (Background) with 1H Candles (Foreground) inside it
    const htfCandle = { high: 90, open: 40, close: 80, low: 30, type: "bullish" };

    const ltfCandles = [
        { high: 50, open: 40, close: 45, low: 30, type: "bullish" }, // 1H-1
        { high: 60, open: 45, close: 55, low: 40, type: "bullish" }, // 1H-2
        { high: 75, open: 55, close: 65, low: 50, type: "bullish" }, // 1H-3
        { high: 90, open: 65, close: 80, low: 70, type: "bullish" }, // 1H-4 (Expands to high)
    ];

    return (
        <div className="w-full aspect-video bg-black/40 rounded-lg overflow-hidden relative border border-white/10">
            <svg viewBox="0 0 800 400" className="w-full h-full p-8">
                <defs>
                    <linearGradient id="htfGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                    </linearGradient>
                    <linearGradient id="ltfGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--bullish))" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="hsl(var(--bullish))" stopOpacity="0.4" />
                    </linearGradient>
                </defs>

                {/* HTF Candle (Ghost/Background) */}
                <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <rect
                        x="200"
                        y={400 - htfCandle.high * 4}
                        width="400"
                        height={(htfCandle.high - htfCandle.low) * 4}
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        opacity="0.3"
                    />
                    <rect
                        x="200"
                        y={400 - htfCandle.close * 4}
                        width="400"
                        height={(htfCandle.close - htfCandle.open) * 4}
                        fill="url(#htfGradient)"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        rx="8"
                    />
                    <text x="610" y={400 - htfCandle.high * 4 + 20} fill="hsl(var(--primary))" fontSize="16" fontWeight="bold">4H Context</text>
                </motion.g>

                {/* LTF Candles (Foreground) */}
                {ltfCandles.map((candle, i) => {
                    const x = 240 + i * 100;
                    const yHigh = 400 - candle.high * 4;
                    const yLow = 400 - candle.low * 4;
                    const yOpen = 400 - candle.open * 4;
                    const yClose = 400 - candle.close * 4;

                    return (
                        <motion.g
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 + 0.5 }}
                        >
                            <line x1={x} y1={yLow} x2={x} y2={yHigh} stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
                            <rect
                                x={x - 15}
                                y={Math.min(yOpen, yClose)}
                                width="30"
                                height={Math.abs(yClose - yOpen)}
                                fill="url(#ltfGradient)"
                                stroke="hsl(var(--bullish))"
                                strokeWidth="1"
                                rx="2"
                            />
                            <text x={x} y={380} textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="10">1H</text>
                        </motion.g>
                    );
                })}
            </svg>
        </div>
    );
};
