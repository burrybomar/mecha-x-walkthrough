import React from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
    text: string;
    className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = "" }) => {
    return (
        <div className={`relative inline-block group ${className}`}>
            <span className="relative z-10">{text}</span>
            <motion.span
                className="absolute top-0 left-0 -z-10 w-full h-full text-primary opacity-0 group-hover:opacity-70"
                initial={{ x: 0 }}
                whileHover={{
                    x: [-2, 2, -1, 1, 0],
                    transition: { repeat: Infinity, duration: 0.2 }
                }}
            >
                {text}
            </motion.span>
            <motion.span
                className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-0 group-hover:opacity-70"
                initial={{ x: 0 }}
                whileHover={{
                    x: [2, -2, 1, -1, 0],
                    transition: { repeat: Infinity, duration: 0.2, delay: 0.05 }
                }}
            >
                {text}
            </motion.span>
        </div>
    );
};
