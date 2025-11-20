import React from 'react';
import { motion } from 'framer-motion';

interface ConnectionLineProps {
    x1: number | string;
    y1: number | string;
    x2: number | string;
    y2: number | string;
    color?: string;
    className?: string;
}

export const ConnectionLine: React.FC<ConnectionLineProps> = ({
    x1,
    y1,
    x2,
    y2,
    color = 'hsl(var(--primary))',
    className
}) => {
    return (
        <svg
            className={`absolute inset-0 pointer-events-none overflow-visible ${className}`}
            style={{ zIndex: 0 }}
        >
            <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={color} stopOpacity="0" />
                    <stop offset="50%" stopColor={color} stopOpacity="0.5" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>

            {/* Base Line */}
            <motion.path
                d={`M${x1},${y1} C${x1},${y2} ${x2},${y1} ${x2},${y2}`}
                fill="none"
                stroke={color}
                strokeWidth="1"
                strokeOpacity="0.2"
                strokeDasharray="4 4"
            />

            {/* Animated Energy Pulse */}
            <motion.path
                d={`M${x1},${y1} C${x1},${y2} ${x2},${y1} ${x2},${y2}`}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                    pathLength: [0, 1, 0],
                    opacity: [0, 1, 0],
                    strokeDashoffset: [0, -100]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* End Points */}
            <circle cx={x1} cy={y1} r="2" fill={color} opacity="0.5" />
            <circle cx={x2} cy={y2} r="2" fill={color} opacity="0.5" />
        </svg>
    );
};
