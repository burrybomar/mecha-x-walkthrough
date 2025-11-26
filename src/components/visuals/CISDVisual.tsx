import { motion } from "framer-motion";

export const CISDVisual = () => {
    // CISD Logic: C2 sweeps, then momentum candles down. CISD is the close of the last momentum candle.
    const candles = [
        { id: "C2", high: 90, open: 80, close: 70, low: 65, type: "bearish" }, // Sweep candle
        { id: "M1", high: 70, open: 70, close: 50, low: 45, type: "bearish" }, // Momentum 1
        { id: "M2", high: 52, open: 50, close: 30, low: 25, type: "bearish" }, // Momentum 2 (Last one)
        { id: "R1", high: 45, open: 30, close: 40, low: 28, type: "bullish" }, // Retrace
    ];

    const cisdLevel = 30; // Close of M2
    const rangeHigh = 90; // C2 High
    const range = rangeHigh - cisdLevel; // 60

    const target2x = cisdLevel - range; // 30 - 60 = -30 (Need to scale this to fit SVG)
    // Let's adjust scale: 0-100 scale mapping to 0-400 height
    // C2 High: 90 -> y=40
    // CISD: 30 -> y=280
    // Range: 60 units = 240 pixels
    // 2.0x Target = CISD - Range = 30 - 60 = -30 (Off chart? Let's rescale data)

    // Rescaled Data for better visualization
    // C2 High: 90
    // CISD: 60
    // Range: 30
    // 2.0x Target: 60 - 30 = 30
    // 2.5x Target: 60 - (30 * 1.5) = 15

    const rescaledCandles = [
        { id: "C2", high: 95, open: 85, close: 75, low: 70, type: "bearish" },
        { id: "M1", high: 75, open: 75, close: 65, low: 60, type: "bearish" },
        { id: "M2", high: 65, open: 65, close: 55, low: 50, type: "bearish" }, // CISD Level = 55
        { id: "R1", high: 60, open: 55, close: 58, low: 53, type: "bullish" },
    ];

    const cisdPrice = 55;
    const c2High = 95;
    const momentumRange = c2High - cisdPrice; // 40
    const target2 = cisdPrice - momentumRange; // 15

    return (
        <div className="w-full aspect-video bg-black/40 rounded-lg overflow-hidden relative border border-white/10">
            <svg viewBox="0 0 800 400" className="w-full h-full p-8">
                <defs>
                    <linearGradient id="bearishGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--bearish))" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="hsl(var(--bearish))" stopOpacity="0.9" />
                    </linearGradient>
                    <linearGradient id="bullishGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--bullish))" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="hsl(var(--bullish))" stopOpacity="0.4" />
                    </linearGradient>
                    <pattern id="shadeZone" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
                        <line x1="0" y1="0" x2="0" y2="10" stroke="hsl(var(--bullish))" strokeWidth="1" opacity="0.3" />
                    </pattern>
                </defs>

                {/* CISD Line */}
                <motion.line
                    x1="0" y1={400 - cisdPrice * 3.5} x2="800" y2={400 - cisdPrice * 3.5}
                    stroke="hsl(var(--primary))" strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                />
                <text x="780" y={400 - cisdPrice * 3.5 - 10} fill="hsl(var(--primary))" textAnchor="end" fontSize="14" fontWeight="bold">CISD (Entry)</text>

                {/* 2.0x Target Zone */}
                <motion.rect
                    x="0" y={400 - cisdPrice * 3.5}
                    width="800" height={momentumRange * 3.5}
                    fill="url(#shadeZone)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                />
                <motion.line
                    x1="0" y1={400 - target2 * 3.5} x2="800" y2={400 - target2 * 3.5}
                    stroke="hsl(var(--bullish))" strokeWidth="2" strokeDasharray="4 4"
                />
                <text x="780" y={400 - target2 * 3.5 + 20} fill="hsl(var(--bullish))" textAnchor="end" fontSize="14" fontWeight="bold">2.0x Projection (TP)</text>

                {rescaledCandles.map((candle, i) => {
                    const x = 150 + i * 120;
                    const yHigh = 400 - candle.high * 3.5;
                    const yLow = 400 - candle.low * 3.5;
                    const yOpen = 400 - candle.open * 3.5;
                    const yClose = 400 - candle.close * 3.5;
                    const isBullish = candle.type === "bullish";

                    return (
                        <motion.g
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.3 }}
                        >
                            <line x1={x} y1={yLow} x2={x} y2={yHigh} stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
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
                            <text x={x} y={yHigh - 10} textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="12">{candle.id}</text>
                        </motion.g>
                    );
                })}
            </svg>
        </div>
    );
};
