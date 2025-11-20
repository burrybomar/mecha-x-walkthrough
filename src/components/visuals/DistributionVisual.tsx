import { motion } from "framer-motion";

export const DistributionVisual = () => {
    return (
        <div className="relative h-64 bg-gradient-to-b from-black/80 to-black/60 rounded-lg p-4 font-mono">
            <svg className="w-full h-full" viewBox="0 0 400 200">
                {/* Range Box */}
                <motion.rect
                    x="50" y="50" width="200" height="60"
                    fill="rgba(255, 255, 255, 0.05)"
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeDasharray="4,4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                />
                <text x="150" y="40" fill="rgba(255, 255, 255, 0.5)" fontSize="10" textAnchor="middle">PREMIUM ZONE (DISTRIBUTION)</text>

                {/* Candles in Range */}
                {[0, 1, 2, 3, 4].map((i) => (
                    <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.1 }}>
                        <line x1={70 + i * 30} y1={60} x2={70 + i * 30} y2={100} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                        <rect
                            x={66 + i * 30}
                            y={70 + (i % 2) * 10}
                            width="8"
                            height="20"
                            fill={i % 2 === 0 ? "rgba(0, 255, 100, 0.2)" : "rgba(255, 50, 50, 0.2)"}
                            stroke={i % 2 === 0 ? "rgba(0, 255, 100, 0.6)" : "rgba(255, 50, 50, 0.6)"}
                        />
                    </motion.g>
                ))}

                {/* Manipulation Sweep */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                    <line x1="220" y1="40" x2="220" y2="100" stroke="#ef4444" strokeWidth="1" />
                    <rect x="216" y="80" width="8" height="20" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" />
                    <text x="220" y="30" fill="#ef4444" fontSize="10" textAnchor="middle">MANIPULATION</text>
                </motion.g>

                {/* Expansion Down */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
                    <line x1="250" y1="80" x2="250" y2="160" stroke="#ef4444" strokeWidth="1" />
                    <rect x="246" y="80" width="8" height="70" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" />
                    <path d="M 250 165 L 250 180" stroke="#ef4444" strokeWidth="1" markerEnd="url(#arrow-down)" />
                </motion.g>

                {/* Target */}
                <motion.line
                    x1="50" y1="180" x2="350" y2="180"
                    stroke="rgba(0, 255, 100, 0.5)"
                    strokeWidth="1"
                    strokeDasharray="4,4"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 2 }}
                />
                <text x="360" y="184" fill="rgba(0, 255, 100, 0.5)" fontSize="10">DISCOUNT TARGET</text>

                <defs>
                    <marker id="arrow-down" markerWidth="10" markerHeight="7" refX="5" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
                    </marker>
                </defs>
            </svg>
        </div>
    );
};
