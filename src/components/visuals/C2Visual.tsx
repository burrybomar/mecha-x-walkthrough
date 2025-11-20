import { motion } from "framer-motion";

export const C2Visual = () => {
    return (
        <div className="relative h-64 bg-gradient-to-b from-black/80 to-black/60 rounded-lg p-4 font-mono">
            <svg className="w-full h-full" viewBox="0 0 400 200">
                {/* Grid */}
                <defs>
                    <pattern id="grid-c2" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-c2)" />

                {/* C1 Candle (Liquidity) */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <line x1="100" y1="80" x2="100" y2="140" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                    <rect x="92" y="90" width="16" height="40" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.5)" />
                    <text x="100" y="160" fill="rgba(255,255,255,0.5)" fontSize="10" textAnchor="middle">C1</text>
                </motion.g>

                {/* Liquidity Line */}
                <motion.line
                    x1="80" y1="80" x2="320" y2="80"
                    stroke="rgba(255, 50, 50, 0.8)"
                    strokeWidth="1"
                    strokeDasharray="4,4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                />
                <motion.text
                    x="330" y="84"
                    fill="rgba(255, 50, 50, 0.8)"
                    fontSize="10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    BSL
                </motion.text>

                {/* C2 Candle (Sweep) */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                    {/* Wick sweeping high */}
                    <line x1="160" y1="60" x2="160" y2="130" stroke="#ef4444" strokeWidth="1" />
                    {/* Body closing inside */}
                    <rect x="152" y="95" width="16" height="30" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" />
                    <text x="160" y="160" fill="#ef4444" fontSize="10" textAnchor="middle">C2</text>
                </motion.g>

                {/* C3 Candle (Expansion) */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
                    <line x1="220" y1="95" x2="220" y2="170" stroke="#ef4444" strokeWidth="1" />
                    <rect x="212" y="95" width="16" height="60" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" />
                    <text x="220" y="185" fill="#ef4444" fontSize="10" textAnchor="middle">C3</text>
                </motion.g>

                {/* Labels */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
                    <text x="160" y="50" fill="#ef4444" fontSize="10" textAnchor="middle">SWEEP</text>
                    <text x="220" y="195" fill="#ef4444" fontSize="10" textAnchor="middle">EXPANSION</text>
                </motion.g>

                {/* Checkmark */}
                <motion.circle
                    cx="280" cy="100" r="15"
                    fill="rgba(0, 255, 100, 0.1)"
                    stroke="rgba(0, 255, 100, 0.8)"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2.5 }}
                />
                <motion.path
                    d="M 273 100 L 278 105 L 287 95"
                    stroke="rgba(0, 255, 100, 0.8)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 2.7 }}
                />
            </svg>
        </div>
    );
};
