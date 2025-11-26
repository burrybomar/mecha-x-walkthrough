import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const ScenarioVisualizer = () => {
    return (
        <Card className="w-full max-w-4xl mx-auto bg-black/40 border-white/10 backdrop-blur-md overflow-hidden">
            <CardHeader className="border-b border-white/5 flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-xl font-mono text-primary">SCENARIO: LONDON REVERSAL</CardTitle>
                    <p className="text-sm text-muted-foreground">4H Model • 2AM Reversal • 5AM Continuation</p>
                </div>
                <Badge variant="outline" className="border-primary/50 text-primary animate-pulse">
                    LIVE SIMULATION
                </Badge>
            </CardHeader>
            <CardContent className="p-0 relative h-[400px] bg-gradient-to-b from-background/50 to-background/80">
                {/* Grid Lines */}
                <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 opacity-10 pointer-events-none">
                    {Array.from({ length: 72 }).map((_, i) => (
                        <div key={i} className="border-r border-b border-white" />
                    ))}
                </div>

                {/* Time Markers */}
                <div className="absolute bottom-0 left-0 right-0 h-6 flex justify-between px-8 text-[10px] text-muted-foreground font-mono border-t border-white/5">
                    <span>00:00</span>
                    <span>02:00 (LDN)</span>
                    <span>05:00 (NY)</span>
                    <span>08:00</span>
                </div>

                {/* Price Action Animation */}
                <svg className="absolute inset-0 w-full h-full p-8 overflow-visible">
                    {/* 1. Initial Drop (Pre-London) */}
                    <motion.path
                        d="M 0,100 L 100,200 L 150,180 L 200,250"
                        fill="none"
                        stroke="rgba(239, 68, 68, 0.5)" // Red/Bearish
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "linear" }}
                    />

                    {/* 2. The Reversal (2AM - Sweep & Reclaim) */}
                    <motion.path
                        d="M 200,250 L 220,280 L 250,220 L 280,150"
                        fill="none"
                        stroke="rgba(34, 197, 94, 0.8)" // Green/Bullish
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 2, duration: 1.5, ease: "easeOut" }}
                    />

                    {/* Label: 2AM Reversal */}
                    <motion.g
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 3 }}
                    >
                        <text x="220" y="300" fill="white" fontSize="10" fontFamily="monospace">▼ SWEEP (SSL)</text>
                        <circle cx="220" cy="280" r="3" fill="#ef4444" />
                    </motion.g>

                    {/* 3. Retracement & Continuation (5AM) */}
                    <motion.path
                        d="M 280,150 L 320,180 L 350,170"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.3)" // Neutral/Retrace
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 3.5, duration: 1 }}
                    />

                    {/* 4. The Expansion (Continuation) */}
                    <motion.path
                        d="M 350,170 L 400,100 L 450,80 L 600,50"
                        fill="none"
                        stroke="rgba(34, 197, 94, 1)" // Bright Green
                        strokeWidth="4"
                        filter="url(#glow)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 4.5, duration: 2, ease: "easeInOut" }}
                    />

                    {/* Label: 5AM Continuation */}
                    <motion.g
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 4.5 }}
                    >
                        <rect x="340" y="190" width="80" height="24" rx="4" fill="rgba(34, 197, 94, 0.2)" stroke="rgba(34, 197, 94, 0.5)" />
                        <text x="380" y="206" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold" fontFamily="monospace">CISD CONFIRMED</text>
                    </motion.g>

                    {/* Glow Filter */}
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                </svg>

                {/* Context Overlay */}
                <motion.div
                    className="absolute top-8 right-8 text-right space-y-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 5 }}
                >
                    <div className="text-xs text-muted-foreground uppercase tracking-widest">Bias</div>
                    <div className="text-2xl font-black text-bullish">BULLISH</div>
                    <div className="text-xs text-primary">4H TARGET: 25,250</div>
                </motion.div>

            </CardContent>
        </Card>
    );
};
