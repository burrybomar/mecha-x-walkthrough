import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CandlestickCard } from '@/components/CandlestickCard';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface FeatureItem {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    icon: LucideIcon;
    color: 'bullish' | 'bearish' | 'primary' | 'accent';
    visual: React.ReactNode;
}

interface FeatureShowcaseProps {
    features: FeatureItem[];
}

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({ features }) => {
    return (
        <div className="py-24 space-y-32">
            {features.map((feature, index) => (
                <FeatureSection key={feature.id} feature={feature} index={index} />
            ))}
        </div>
    );
};

const FeatureSection = ({ feature, index }: { feature: FeatureItem; index: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
    const x = useTransform(
        scrollYProgress,
        [0, 0.3, 0.7, 1],
        [index % 2 === 0 ? -50 : 50, 0, 0, index % 2 === 0 ? -50 : 50]
    );

    return (
        <motion.div
            ref={ref}
            style={{ opacity, scale, x }}
            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 max-w-7xl mx-auto px-6`}
        >
            {/* Text Content */}
            <div className="flex-1 space-y-6">
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-${feature.color}/10 text-${feature.color}`}>
                        <feature.icon className="w-8 h-8" />
                    </div>
                    <Badge variant="outline" className={`border-${feature.color}/20 text-${feature.color} uppercase tracking-widest`}>
                        {feature.subtitle}
                    </Badge>
                </div>

                <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
                    {feature.title}
                </h2>

                <p className="text-xl text-muted-foreground leading-relaxed">
                    {feature.description}
                </p>
            </div>

            {/* Visual Content */}
            <div className="flex-1 w-full">
                <div className="relative group">
                    <div className={`absolute -inset-4 bg-gradient-to-r from-${feature.color}/20 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <CandlestickCard
                        variant={feature.color === 'primary' ? 'bullish' : feature.color === 'accent' ? 'bearish' : feature.color}
                        className="relative z-10 overflow-hidden"
                    >
                        <CardHeader>
                            <CardTitle className="text-2xl font-mono">{feature.title} Module</CardTitle>
                        </CardHeader>
                        <CardContent className="min-h-[300px] flex items-center justify-center bg-black/20">
                            {feature.visual}
                        </CardContent>
                    </CandlestickCard>
                </div>
            </div>
        </motion.div>
    );
};
