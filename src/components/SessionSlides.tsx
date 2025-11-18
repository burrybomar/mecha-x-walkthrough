import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Sun, TrendingUp, Moon } from 'lucide-react';
import { useScrollPlayPause } from '@/hooks/use-scroll-play-pause';

const sessionSteps = [
  { step: 1, icon: Sun, title: 'Session Structure', subtitle: 'London, NYAM, NYPM', description: 'Three 4H sessions define market structure', details: ['London: First major move', 'NYAM: Highest volume'] },
  { step: 2, icon: Clock, title: 'H1-H4 Profiling', subtitle: 'Hour-Based Model', description: 'Four hourly models for timing', details: ['H1: Setup', 'H2: Reversal—C2 forms', 'H3: Continuation', 'H4: Delivery'] },
  { step: 3, icon: TrendingUp, title: 'Silver Bullet H2', subtitle: 'Entry Window', description: 'Hour 2—C2 patterns trigger', details: ['London H2: 3:00-4:00 UTC', 'NYAM H2: 14:00-15:00 UTC'] },
  { step: 4, icon: Moon, title: 'Macro Windows', subtitle: ':05-:10 and :50-:55', description: 'Micro-timing for CISD retests', details: ['H1: :05-:10', 'H2+: :50-:55'] }
];

export const SessionSlides = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isPlaying, setIsPlaying, elementRef } = useScrollPlayPause();
  useEffect(() => { if (!isPlaying) return; const interval = setInterval(() => { setCurrentIndex((prev) => (prev + 1) % sessionSteps.length); }, 2500); return () => clearInterval(interval); }, [isPlaying]);
  const currentStep = sessionSteps[currentIndex]; const IconComponent = currentStep.icon;
  return (<div ref={elementRef} className="w-full max-w-5xl mx-auto px-4"><div className="relative rounded-xl overflow-hidden border bg-card shadow-lg"><div className="relative z-10 p-6 md:p-10 min-h-[500px] flex flex-col justify-center"><AnimatePresence mode="wait"><motion.div key={currentIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6"><div className="flex items-center gap-4"><div className="w-20 h-20 rounded-xl flex items-center justify-center bg-primary/10 border-2 border-primary/30"><IconComponent className="w-10 h-10 text-primary" /></div><div><div className="text-sm font-mono text-primary mb-1">{currentStep.subtitle}</div><h3 className="text-2xl md:text-3xl font-bold">{currentStep.title}</h3></div></div><p className="text-muted-foreground">{currentStep.description}</p><ul className="space-y-3">{currentStep.details.map((detail, idx) => (<li key={idx} className="flex items-start gap-3 text-muted-foreground"><span className="text-primary mt-1">→</span><span>{detail}</span></li>))}</ul></motion.div></AnimatePresence><div className="mt-8 pt-6 border-t flex items-center justify-between"><div className="flex gap-2">{sessionSteps.map((_, idx) => (<button key={idx} onClick={() => setCurrentIndex(idx)} className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? 'w-8 bg-primary' : 'w-1.5 bg-primary/30'}`} />))}</div><button onClick={() => setIsPlaying(!isPlaying)} className="text-xs font-mono text-muted-foreground">{isPlaying ? 'Pause' : 'Play'}</button></div></div></div></div>);
};
