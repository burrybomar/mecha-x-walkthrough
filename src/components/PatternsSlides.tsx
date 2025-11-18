import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Workflow, Target, TrendingUp, Zap } from 'lucide-react';
import { useScrollPlayPause } from '@/hooks/use-scroll-play-pause';

const patternsSteps = [
  { step: 1, icon: Workflow, title: 'C1-C2-C3 Flow', subtitle: 'Reversal Sequence', description: 'Three-candle sequence: sweep, reversal, expansion', details: ['C1: Sweeps BSL/SSL', 'C2: Reversal—entry signal', 'Trade AWAY from swing'] },
  { step: 2, icon: Zap, title: 'C2 Pattern Types', subtitle: 'REV / SNAP / EXP', description: 'Three classifications: REV, SNAP, EXP', details: ['C2-REV: Standard reversal', 'C2-SNAP: Strongest signal', 'C2-EXP: Continuation'] },
  { step: 3, icon: TrendingUp, title: 'C3 Zone Tracking', subtitle: 'Continuation', description: 'Tracks realignment after retracement', details: ['Zone hold = continuation', 'Failed hold = invalidation'] },
  { step: 4, icon: Target, title: 'Enhanced Tooltips', subtitle: 'Full Context', description: 'Displays SEQUENCE, SESSION, RULE', details: ['SEQUENCE: Reversal/Continuation/Aligned', 'RULE: Trade AWAY from swing'] }
];

export const PatternsSlides = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isPlaying, setIsPlaying, elementRef } = useScrollPlayPause();
  useEffect(() => { if (!isPlaying) return; const interval = setInterval(() => { setCurrentIndex((prev) => (prev + 1) % patternsSteps.length); }, 2500); return () => clearInterval(interval); }, [isPlaying]);
  const currentStep = patternsSteps[currentIndex]; const IconComponent = currentStep.icon;
  return (<div ref={elementRef} className="w-full max-w-5xl mx-auto px-4"><div className="relative rounded-xl overflow-hidden border bg-card shadow-lg"><div className="relative z-10 p-6 md:p-10 min-h-[500px] flex flex-col justify-center"><AnimatePresence mode="wait"><motion.div key={currentIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6"><div className="flex items-center gap-4"><div className="w-20 h-20 rounded-xl flex items-center justify-center bg-primary/10 border-2 border-primary/30"><IconComponent className="w-10 h-10 text-primary" /></div><div><div className="text-sm font-mono text-primary mb-1">{currentStep.subtitle}</div><h3 className="text-2xl md:text-3xl font-bold">{currentStep.title}</h3></div></div><p className="text-muted-foreground">{currentStep.description}</p><ul className="space-y-3">{currentStep.details.map((detail, idx) => (<li key={idx} className="flex items-start gap-3 text-muted-foreground"><span className="text-primary mt-1">→</span><span>{detail}</span></li>))}</ul></motion.div></AnimatePresence><div className="mt-8 pt-6 border-t flex items-center justify-between"><div className="flex gap-2">{patternsSteps.map((_, idx) => (<button key={idx} onClick={() => setCurrentIndex(idx)} className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? 'w-8 bg-primary' : 'w-1.5 bg-primary/30'}`} />))}</div><button onClick={() => setIsPlaying(!isPlaying)} className="text-xs font-mono text-muted-foreground">{isPlaying ? 'Pause' : 'Play'}</button></div></div></div></div>);
};
