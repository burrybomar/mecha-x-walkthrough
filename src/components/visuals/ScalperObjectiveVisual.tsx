import { motion } from "framer-motion";

export const ScalperObjectiveVisual = () => {
    return (
        <div className="relative h-64 bg-gradient-to-b from-black/80 to-black/60 rounded-lg p-4 font-mono">
            <svg className="w-full h-full" viewBox="0 0 400 200">
                {/* H4 Candle 1 (Setup) */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <rect x="80" y="60" width="40" height="100" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" />
                    <text x="100" y="180" fill="rgba(255,255,255,0.5)" fontSize="10" textAnchor="middle">Previous H4</text>
                </motion.g>

                {/* H4 Candle 2 (Target) */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                    <rect x="160" y="40" width="40" height="140" fill="rgba(0, 255, 100, 0.1)" stroke="#00ff66" strokeDasharray="4,4" />
                    <text x="180" y="195" fill="#00ff66" fontSize="10" textAnchor="middle">Target H4</text>
                </motion.g>

                {/* LTF Price Action */}
                <motion.path
                    d="M 120 110 L 130 100 L 140 120 L 150 110 L 160 130 L 170 90 L 180 140 L 190 50"
                    fill="none"
                    stroke="#00ff66"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1, duration: 1.5 }}
                />

                {/* Entry Point */}
                <motion.circle
                    cx="160" cy="130" r="4"
                    fill="#00ff66"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5 }}
                />
                <motion.text
                    x="160" y="120"
                    fill="#00ff66"
                    fontSize="10"
                    textAnchor="middle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.7 }}
                >
                    ENTRY
                </motion.text>

                {/* Objective Label */}
                <motion.text
                    x="280" y="100"
                    fill="#ffffff"
                    fontSize="14"
                    fontWeight="bold"
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 280 }}
                    transition={{ delay: 2 }}
                >
                    CATCH THE EXPANSION
                </motion.text>
            </svg>
        </div>
    );
};
