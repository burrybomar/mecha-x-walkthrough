import { motion } from "framer-motion";

export const CandleClosureVisual = () => {
    return (
        <div className="relative h-64 bg-gradient-to-b from-black/80 to-black/60 rounded-lg p-4 font-mono">
            <svg className="w-full h-full" viewBox="0 0 400 200">
                {/* Key Level */}
                <line x1="50" y1="100" x2="350" y2="100" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1" strokeDasharray="4,4" />
                <text x="360" y="104" fill="rgba(255, 255, 255, 0.5)" fontSize="10">KEY LEVEL</text>

                {/* Valid Sweep (Close Inside) */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <text x="120" y="40" fill="#00ff66" fontSize="12" fontWeight="bold" textAnchor="middle">VALID</text>
                    <line x1="120" y1="60" x2="120" y2="140" stroke="#00ff66" strokeWidth="1" />
                    <rect x="112" y="105" width="16" height="30" fill="rgba(0, 255, 100, 0.2)" stroke="#00ff66" />
                    <text x="120" y="160" fill="#00ff66" fontSize="10" textAnchor="middle">Closes Inside</text>
                </motion.g>

                {/* Invalid Break (Close Outside) */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                    <text x="280" y="40" fill="#ef4444" fontSize="12" fontWeight="bold" textAnchor="middle">INVALID</text>
                    <line x1="280" y1="60" x2="280" y2="140" stroke="#ef4444" strokeWidth="1" />
                    <rect x="272" y="80" width="16" height="30" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" />
                    <text x="280" y="160" fill="#ef4444" fontSize="10" textAnchor="middle">Closes Outside</text>
                </motion.g>

                {/* Comparison Arrows */}
                <motion.path
                    d="M 140 100 L 180 100"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1"
                    markerEnd="url(#arrow-right)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                />
                <motion.path
                    d="M 260 100 L 220 100"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1"
                    markerEnd="url(#arrow-right)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                />

                <defs>
                    <marker id="arrow-right" markerWidth="10" markerHeight="7" refX="5" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="rgba(255,255,255,0.3)" />
                    </marker>
                </defs>
            </svg>
        </div>
    );
};
