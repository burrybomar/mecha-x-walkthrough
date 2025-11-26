import { motion } from "framer-motion";

export const BSLSSLVisual = () => {
    // Candle data for a range followed by a BSL sweep then SSL sweep
    const candles = [
        { high: 80, open: 40, close: 70, low: 30, type: "bullish" }, // 1. Range High
        { high: 75, open: 70, close: 50, low: 45, type: "bearish" }, // 2. Pullback
        { high: 55, open: 50, close: 35, low: 25, type: "bearish" }, // 3. Range Low
        { high: 60, open: 35, close: 55, low: 30, type: "bullish" }, // 4. Bounce
        { high: 85, open: 55, close: 65, low: 50, type: "bullish", sweep: "BSL" }, // 5. BSL Sweep (Wick 85 > 80)
        { high: 70, open: 65, close: 40, low: 35, type: "bearish" }, // 6. Reversal
        { high: 45, open: 40, close: 20, low: 15, type: "bearish", sweep: "SSL" }, // 7. SSL Sweep (Wick 15 < 25)
    ];

    const bslLevel = 80;
    const sslLevel = 25;

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

                {/* BSL Line */}
                <motion.line
                    x1="0" y1={400 - bslLevel * 4} x2="800" y2={400 - bslLevel * 4}
                    stroke="hsl(var(--bullish))" strokeWidth="2" strokeDasharray="6 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 1 }}
                />
                <text x="780" y={400 - bslLevel * 4 - 10} fill="hsl(var(--bullish))" textAnchor="end" fontSize="14" fontWeight="bold">BSL (IRL)</text>

                {/* SSL Line */}
                <motion.line
                    x1="0" y1={400 - sslLevel * 4} x2="800" y2={400 - sslLevel * 4}
                    stroke="hsl(var(--bearish))" strokeWidth="2" strokeDasharray="6 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
                <text x="780" y={400 - sslLevel * 4 + 20} fill="hsl(var(--bearish))" textAnchor="end" fontSize="14" fontWeight="bold">SSL (IRL)</text>

                {/* Candles */}
                {candles.map((candle, i) => {
                    const x = 100 + i * 100;
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
                            transition={{ delay: i * 0.2 + 1 }}
                        >
                            {/* Wick */}
                            <line x1={x} y1={yLow} x2={x} y2={yHigh} stroke="hsl(var(--muted-foreground))" strokeWidth="2" />

                            {/* Body */}
                            <rect
                                x={x - 15}
                                y={Math.min(yOpen, yClose)}
                                width="30"
                                height={Math.abs(yClose - yOpen)}
                                fill={isBullish ? "url(#bullishGradient)" : "url(#bearishGradient)"}
                                stroke={isBullish ? "hsl(var(--bullish))" : "hsl(var(--bearish))"}
                                strokeWidth="1"
                                rx="2"
                            />

                            {/* Sweep Markers */}
                            {candle.sweep === "BSL" && (
                                <motion.g
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.2 + 1.5, type: "spring" }}
                                >
                                    <circle cx={x} cy={yHigh - 15} r="12" fill="hsl(var(--bullish))" fillOpacity="0.2" stroke="hsl(var(--bullish))" />
                                    <text x={x} y={yHigh - 11} textAnchor="middle" fill="hsl(var(--bullish))" fontSize="10" fontWeight="bold">X</text>
                                </motion.g>
                            )}
                            {candle.sweep === "SSL" && (
                                <motion.g
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.2 + 1.5, type: "spring" }}
                                >
                                    <circle cx={x} cy={yLow + 15} r="12" fill="hsl(var(--bearish))" fillOpacity="0.2" stroke="hsl(var(--bearish))" />
                                    <text x={x} y={yLow + 19} textAnchor="middle" fill="hsl(var(--bearish))" fontSize="10" fontWeight="bold">X</text>
                                </motion.g>
                            )}
                        </motion.g>
                    );
                })}
            </svg>
        </div>
    );
};
