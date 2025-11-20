import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CandlestickButton } from '@/components/CandlestickButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SequenceDiagram } from '@/components/diagrams/SequenceDiagram';
import { FloatingCandle } from '@/components/decorative/FloatingCandle';
import { ArrowRight, CheckCircle2, AlertTriangle, XCircle, Info, Terminal, TrendingUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const sequences = [
  {
    id: 'continuation',
    title: 'Continuation',
    description: 'Trend following setup identifying pullbacks in established trends.',
    steps: [
      'Identify strong impulse move (break of structure)',
      'Wait for corrective pullback (complex correction)',
      'Look for rejection at key level (fib/order block)',
      'Enter on lower timeframe confirmation'
    ],
    rules: [
      'Trend must be clearly defined',
      'Pullback must not break major structure',
      'Volume should decrease on pullback'
    ]
  },
  {
    id: 'reversal',
    title: 'Reversal',
    description: 'Counter-trend setup catching market turning points.',
    steps: [
      'Identify liquidity sweep (stop hunt)',
      'Wait for market structure shift (MSS)',
      'Wait for return to origin (RTO)',
      'Enter on confirmation candle'
    ],
    rules: [
      'Must sweep a major high/low',
      'Displacement is required for validity',
      'Risk is higher, reduce position size'
    ]
  },
  {
    id: 'aligned',
    title: 'Aligned',
    description: 'High probability setup where HTF and LTF align.',
    steps: [
      'HTF bias is clearly bullish/bearish',
      'LTF structure aligns with HTF bias',
      'Price approaches key HTF POI',
      'LTF entry trigger forms'
    ],
    rules: [
      'Do not trade against HTF bias',
      'Wait for clear alignment',
      'Highest probability setup type'
    ]
  }
];

const Sequences = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('continuation');

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
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
            TRADING <span className="text-primary text-glow-primary">SEQUENCES</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master the three core patterns of the Mecha-X system.
          </p>
        </header>

        <Tabs defaultValue="continuation" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList className="glass-premium p-1 h-auto rounded-none border-primary/20">
              {sequences.map((seq) => (
                <TabsTrigger
                  key={seq.id}
                  value={seq.id}
                  className="px-6 py-3 rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono uppercase tracking-wider transition-all"
                >
                  {seq.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <AnimatePresence mode="wait">
            {sequences.map((seq) => (
              <TabsContent key={seq.id} value={seq.id} className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="glass-premium p-6 md:p-8 rounded-xl border-primary/10 relative overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                      {/* Content */}
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                            {seq.title} Sequence
                            <div className="h-px flex-grow bg-gradient-to-r from-primary/50 to-transparent" />
                          </h2>
                          <p className="text-lg text-muted-foreground">{seq.description}</p>
                        </div>

                        <div className="space-y-4">
                          <div className="bg-card/30 p-4 rounded-lg border border-white/5">
                            <h3 className="text-sm font-mono text-primary mb-3 flex items-center gap-2">
                              <Terminal className="w-4 h-4" /> EXECUTION PROTOCOL
                            </h3>
                            <ul className="space-y-2">
                              {seq.steps.map((step, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm">
                                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold mt-0.5">
                                    {idx + 1}
                                  </span>
                                  <span className="text-foreground/90">{step}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-card/30 p-4 rounded-lg border border-white/5">
                            <h3 className="text-sm font-mono text-secondary mb-3 flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4" /> CRITICAL RULES
                            </h3>
                            <ul className="space-y-2">
                              {seq.rules.map((rule, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm">
                                  <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                                  <span className="text-foreground/80">{rule}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Visual */}
                      <div className="space-y-4 h-full flex flex-col">
                        <div className="overflow-hidden border border-primary/30 rounded-lg bg-black/40 flex-grow relative min-h-[400px] shadow-2xl">
                          <SequenceDiagram
                            variant={seq.id as any}
                            className="w-full h-full absolute inset-0"
                          />

                          {/* Overlay UI */}
                          <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/80 backdrop-blur border border-primary/30 rounded text-xs font-mono text-primary">
                            LIVE_FEED :: ACTIVE
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground text-center font-mono uppercase tracking-wider opacity-50">
                          // MECHA-X SEQUENCE VISUALIZATION
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </AnimatePresence>
        </Tabs>

        <div className="mt-12 flex justify-between items-center">
          <Link to="/">
            <Button variant="ghost" className="font-mono hover:text-primary hover:bg-primary/10">
              &lt; RETURN_HOME
            </Button>
          </Link>
          <Link to="/chart-comparison">
            <Button className="font-mono bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
              ANALYZE_DATA &gt;
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sequences;
