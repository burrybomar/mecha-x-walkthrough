import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CandlestickButton } from '@/components/CandlestickButton';
import { FloatingCandle } from '@/components/decorative/FloatingCandle';
import { ArrowRight, CheckCircle2, AlertTriangle, XCircle, Info, Terminal, TrendingUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { InteractiveSequenceViewer } from '@/components/InteractiveSequenceViewer';



const Sequences = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-transparent text-foreground p-4 md:p-8 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <FloatingCandle x="5%" y="10%" size={80} variant="neutral" delay={0} depth={0.1} />
        <FloatingCandle x="90%" y="80%" size={150} variant="bullish" delay={2} depth={0.2} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-12 text-center space-y-4">
          <div className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-2">
            MODULE: SEQUENCE_ID
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50">
            TRADING <span className="text-primary text-glow-primary">SEQUENCES</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master the mechanical flow: <span className="text-primary font-medium">Sweep IRL (1H) → Target ERL (4H/Daily)</span>.
          </p>
        </header>

        <InteractiveSequenceViewer />

        <div className="mt-12 flex justify-between items-center">
          <Link to="/">
            <Button variant="ghost" className="font-mono hover:text-primary hover:bg-primary/10">
              &lt; RETURN_HOME
            </Button>
          </Link>
          <Link to="/sequence-identifier">
            <Button className="font-mono bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
              IDENTIFY_SEQUENCE &gt;
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sequences;
