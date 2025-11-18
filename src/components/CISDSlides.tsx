import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Target, TrendingUp, Crosshair } from 'lucide-react';
import { useScrollPlayPause } from '@/hooks/use-scroll-play-pause';

const cisdSteps = [
  { step: 1, icon: Zap, title: 'CISD Definition', subtitle: 'Change in State', description: 'Detects momentum following reversal swing—your entry level', details: ['Identifies 2+ momentum candles', 'Defines CISD level for retest'] },
  { step: 2, icon: Target, title: 'Target Projection', subtitle: 'Mechanical Multipliers', description: 'Projects targets: 1x, 2x, 2.5x, 3.5x, 4x', details: ['2-2.5x: Main target (take 50%)', '3.5-4x: Runner targets'] },
  { step: 3, icon: Crosshair, title: 'Entry Strategy', subtitle: 'Retest Execution', description: 'Enter on CISD retest with confirmation', details: ['Wait for pullback confirmation', 'Stop beyond sweep point'] },
  { step: 4, icon: TrendingUp, title: 'Retest Tracking', subtitle: 'Zone Validity', description: 'Tracks retests and zone breaks', details: ['Valid retest = best entry', 'Combine with iFVG for confluence'] }
];

export const CISDSlides = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isPlaying, setIsPlaying, elementRef } = useScrollPlayPause();
  useEffect(() => { if (!isPlaying) return; const interval = setInterval(() => { setCurrentIndex((prev) => (prev + 1) % cisdSteps.length); }, 2500); return () => clearInterval(interval); }, [isPlaying]);
  const currentStep = cisdSteps[currentIndex]; const IconComponent = currentStep.icon;
  return (<div ref={elementRef} className="w-full max-w-5xl mx-auto px-4"><div className="relative rounded-xl overflow-hidden border bg-card shadow-lg"><div className="relative z-10 p-6 md:p-10 min-h-[500px] flex flex-col justify-center"><AnimatePresence mode="wait"><motion.div key={currentIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6"><div className="flex items-center gap-4"><div className="w-20 h-20 rounded-xl flex items-center justify-center bg-primary/10 border-2 border-primary/30"><IconComponent className="w-10 h-10 text-primary" /></div><div><div className="text-sm font-mono text-primary mb-1">{currentStep.subtitle}</div><h3 className="text-2xl md:text-3xl font-bold">{currentStep.title}</h3></div></div><p className="text-muted-foreground">{currentStep.description}</p><ul className="space-y-3">{currentStep.details.map((detail, idx) => (<li key={idx} className="flex items-start gap-3 text-muted-foreground"><span className="text-primary mt-1">→</span><span>{detail}</span></li>))}</ul></motion.div></AnimatePresence><div className="mt-8 pt-6 border-t flex items-center justify-between"><div className="flex gap-2">{cisdSteps.map((_, idx) => (<button key={idx} onClick={() => setCurrentIndex(idx)} className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? 'w-8 bg-primary' : 'w-1.5 bg-primary/30'}`} />))}</div><button onClick={() => setIsPlaying(!isPlaying)} className="text-xs font-mono text-muted-foreground">{isPlaying ? 'Pause' : 'Play'}</button></div></div></div></div>);
};
