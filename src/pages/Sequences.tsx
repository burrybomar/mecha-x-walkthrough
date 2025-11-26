import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CandlestickButton } from '@/components/CandlestickButton';
import { FloatingCandle } from '@/components/decorative/FloatingCandle';
import { ArrowLeft, CheckCircle2, AlertTriangle, XCircle, Info, Terminal, TrendingUp, Play, Target, ArrowRight, RefreshCw, ArrowUpRight, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { InteractiveSequenceViewer } from '@/components/InteractiveSequenceViewer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CandlestickCard } from '@/components/CandlestickCard';

const caseStudies = [
  {
    id: 'continuation',
    sequence: 'Continuation',
    market: 'Equity Index',
    color: 'bullish' as const,
    icon: TrendingUp,
    narrative: [
      'Daily points to equal highs as main draw',
      'Prior day was expansionary → expectation: another push',
    ],
    setup: {
      time: '9:00 AM',
      ltfSwing: '1H prints a reversal with SMT → protected low',
      fourH: '10:00 AM 4H opens inside that LTF swing → Continuation',
      entry: 'Failure swing above the SMT low',
      target: 'Equal highs from daily timeframe',
    },
    keyPoints: [
      'Prior 4H did the reversal work during overnight session',
      'Current 4H inherited that clean swing',
      'SMT confirmation added conviction to the low',
      'Proactive entry at 4H open with clear invalidation',
    ],
  },
  {
    id: 'reversal',
    sequence: 'Reversal',
    market: 'Gold (XAU/USD)',
    color: 'bearish' as const,
    icon: RefreshCw,
    narrative: [
      'Weekly/daily both support bullish expansion from Tuesday LOD profile',
      'London failed to reverse; New York must create the low',
    ],
    setup: {
      time: '6:00 AM',
      ltfSwing: '4H creates a two-stage PSP SMT low',
      fourH: 'That LTF low becomes the 4H low of day',
      entry: '8:30/9:30 driver expands away from that low',
      target: 'Daily swing high',
    },
    keyPoints: [
      'Prior 4H left no usable swing structure',
      'Current 4H had to engineer its own turning point',
      'Two-stage SMT provided high-probability confirmation',
      'Waited for expansion confirmation before entry',
    ],
  },
  {
    id: 'aligned',
    sequence: 'Aligned',
    market: 'Equity Index in Consolidation',
    color: 'primary' as const,
    icon: ArrowUpRight,
    narrative: [
      'Market in range; external high likely to be tagged before external low',
      '4H already reversed and expanded up, then began a retrace',
    ],
    setup: {
      time: '11:30 AM',
      ltfSwing: '"Strength switch" SMT between indices caps the retrace',
      fourH: 'New LTF swing sets the low of the retrace',
      entry: 'Trade from internal SMT low toward external high',
      target: 'Range high / external liquidity',
    },
    keyPoints: [
      'Missed the initial expansion leg - no chase',
      'Waited for retrace to complete',
      'SMT strength switch confirmed realignment',
      'Lower risk re-entry with clear structure',
    ],
  },
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

        {/* Case Studies Section */}
        <section className="py-16 border-t border-white/5">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Real World Examples</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how the sequence plays out in live market conditions.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12">
              {caseStudies.map((study) => (
                <TabsTrigger
                  key={study.id}
                  value={study.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <study.icon className="w-4 h-4 mr-2" />
                  {study.sequence}
                </TabsTrigger>
              ))}
            </TabsList>

            {caseStudies.map((study) => (
              <TabsContent key={study.id} value={study.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  {/* Header Card */}
                  <CandlestickCard variant={study.color === 'primary' ? 'bullish' : study.color} wickHeight="md">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge className={`mb-3 ${study.color === 'bullish' ? 'bg-bullish text-bullish-foreground' :
                            study.color === 'bearish' ? 'bg-bearish text-bearish-foreground' :
                              'bg-primary text-primary-foreground'
                            }`}>
                            {study.sequence} Sequence
                          </Badge>
                          <CardTitle className="text-3xl">{study.market}</CardTitle>
                        </div>
                        <study.icon className={`w-12 h-12 ${study.color === 'bullish' ? 'text-bullish' :
                          study.color === 'bearish' ? 'text-bearish' :
                            'text-primary'
                          }`} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-lg mb-3">HTF Narrative</h4>
                          <ul className="space-y-2">
                            {study.narrative.map((point, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-primary mt-1">→</span>
                                <span className="text-muted-foreground">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </CandlestickCard>

                  {/* Setup Details */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-primary/30">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-primary" />
                          Setup Timeline
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Time</p>
                          <p className="font-medium">{study.setup.time}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">LTF Swing Formation</p>
                          <p className="font-medium">{study.setup.ltfSwing}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">4H Structure</p>
                          <p className="font-medium">{study.setup.fourH}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-primary/30">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="w-5 h-5 text-primary" />
                          Execution Plan
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Entry Trigger</p>
                          <p className="font-medium">{study.setup.entry}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Target</p>
                          <p className="font-medium">{study.setup.target}</p>
                        </div>
                        <div className={`p-3 rounded-lg border-2 ${study.color === 'bullish' ? 'bg-bullish/10 border-bullish/30' :
                          study.color === 'bearish' ? 'bg-bearish/10 border-bearish/30' :
                            'bg-primary/10 border-primary/30'
                          }`}>
                          <p className="text-sm font-medium">
                            Stop: Protected by LTF swing
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Key Takeaways */}
                  <Card className="border-2 border-primary/30 bg-primary/5">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-primary" />
                        Key Mecha-X Logic
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {study.keyPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex-shrink-0">
                              {idx + 1}
                            </span>
                            <span className="text-muted-foreground">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Call to Action */}
        <div className="text-center py-12">
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
