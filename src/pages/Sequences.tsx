import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CandlestickButton } from '@/components/CandlestickButton';
import { FloatingCandle } from '@/components/decorative/FloatingCandle';
import { ArrowLeft, CheckCircle2, AlertTriangle, XCircle, Info, Terminal, TrendingUp, Play, Target, ArrowRight } from 'lucide-react';
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
        {/* Header */}
        <header className="mb-12 text-center space-y-6">
          <div className="flex items-center justify-center gap-4 mb-8">
            <CandlestickButton
              variant="bullish"
              onClick={() => navigate('/fractal-model')}
              className="gap-2 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Logic
            </CandlestickButton>
          </div>

          <div className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-2">
            MODULE: EXECUTION
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50">
            THE <span className="text-primary text-glow-primary">SEQUENCE</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Logic is the map. The Sequence is the vehicle.
            <br />
            <span className="text-foreground font-medium">C1 (Setup) → C2 (Trigger) → C3 (Confirmation) → C4 (Delivery)</span>
          </p>
        </header>

        {/* Interactive Viewer */}
        <div className="mb-16">
          <InteractiveSequenceViewer />
        </div>

        {/* Step-by-Step Breakdown */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold shrink-0">1</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">The Setup (C1)</h3>
                <p className="text-muted-foreground mb-4">
                  We identify the <strong>Internal Range Liquidity (IRL)</strong>. This is the "Bait".
                  Price must tap into a POI (NWOG, MWDR, FVG) or simply sweep a 1H High/Low.
                </p>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-sm">
                  <span className="text-primary font-mono font-bold block mb-1">MECHA-X SHOWS:</span>
                  BSL/SSL Lines, POI Boxes (NWOG/MWDR).
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-bold shrink-0">2</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">The Trigger (C2)</h3>
                <p className="text-muted-foreground mb-4">
                  The <strong>Sweep & Rejection</strong>. Price grabs the IRL but <strong className="text-foreground">MUST close back INSIDE</strong> the range.
                  If it closes outside, it is a breakout, not a sweep.
                </p>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-sm">
                  <span className="text-accent font-mono font-bold block mb-1">MECHA-X SHOWS:</span>
                  ⚡ Label (REV/SNAP/EXP) + Timeframe Alignment.
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold shrink-0">3</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">The Confirmation (C3)</h3>
                <p className="text-muted-foreground mb-4">
                  The <strong>Expansion</strong>. We do not wait for the close.
                  <br />
                  <strong className="text-foreground">Enter on C3 Open</strong> for continuation. The C2 sweep was the confirmation.
                </p>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-sm">
                  <span className="text-purple-400 font-mono font-bold block mb-1">MECHA-X SHOWS:</span>
                  C3 Zone Box + CISD Projections.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 font-bold shrink-0">4</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">The Delivery (C4)</h3>
                <p className="text-muted-foreground mb-4">
                  The <strong>Target (ERL)</strong>. Price delivers to the opposing liquidity.
                  This is where we exit.
                </p>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-sm">
                  <span className="text-green-400 font-mono font-bold block mb-1">MECHA-X SHOWS:</span>
                  2.0x / 2.5x Projection Targets.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Ready to explore the features?</h2>
          <Link to="/features">
            <Button className="h-12 px-8 text-lg rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              Explore Features <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sequences;
