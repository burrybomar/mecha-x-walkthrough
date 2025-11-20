import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface FloatingCandleProps {
    x: number | string;
    y: number | string;
    size?: number;
    color?: string;
    delay?: number;
    depth?: number; // Parallax depth (0-1)
    rotation?: number;
    variant?: 'bullish' | 'bearish' | 'neutral';
}

export const FloatingCandle: React.FC<FloatingCandleProps> = ({
    x,
    y,
    size = 100,
    color,
    delay = 0,
    depth = 0.1,
    rotation = 15,
    variant = 'bullish'
}) => {
    const { scrollY } = useScroll();
    const yPos = useTransform(scrollY, [0, 1000], [0, 1000 * depth]);
    const springY = useSpring(yPos, { stiffness: 50, damping: 20 });

    const finalColor = color || (variant === 'bullish' ? 'hsl(var(--bullish))' : variant === 'bearish' ? 'hsl(var(--bearish))' : 'hsl(var(--primary))');

    return (
        <motion.div
            style={{
                position: 'absolute',
                left: x,
                top: y,
                y: springY,
                rotate: rotation,
                zIndex: 0,
                pointerEvents: 'none',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [0.8, 0.9, 0.8],
                rotate: [rotation - 5, rotation + 5, rotation - 5]
            }}
            transition={{
                duration: 8,
                delay: delay,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            {/* 3D Glass Candlestick Effect */}
            <div
                style={{
                    width: size * 0.3,
                    height: size,
                    background: `linear-gradient(135deg, ${finalColor}20, ${finalColor}05)`,
                    border: `1px solid ${finalColor}40`,
                    boxShadow: `0 0 30px ${finalColor}20`,
                    backdropFilter: 'blur(4px)',
                    borderRadius: '4px',
                    position: 'relative'
                }}
            >
                {/* Wick */}
                <div
                    style={{
                        position: 'absolute',
                        top: -size * 0.3,
                        left: '50%',
                        width: '2px',
                        height: size * 1.6,
                        background: `linear-gradient(to bottom, transparent, ${finalColor}, transparent)`,
                        transform: 'translateX(-50%)',
                        opacity: 0.6
                    }}
                />

                {/* Inner Glow */}
                <div
                    style={{
                        position: 'absolute',
                        inset: '20%',
                        background: finalColor,
                        opacity: 0.1,
                        filter: 'blur(8px)'
                    }}
                />
            </div>
        </motion.div>
    );
};
