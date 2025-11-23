import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, RefreshCw, ArrowUpRight, Clock, Target, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CandlestickButton } from '@/components/CandlestickButton';
import { CandlestickCard } from '@/components/CandlestickCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

const CaseStudies = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('continuation');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <CandlestickButton
            variant="bullish"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </CandlestickButton>
          <h1 className="text-xl font-bold">Live Case Studies</h1>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-4 text-center bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              How Mecha-X Plays Out<br />
              <span className="text-gradient bg-gradient-to-r from-bullish via-primary to-bearish bg-clip-text text-transparent">
                In Real Markets
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Real setups from equity indices, gold, and FX. See how each sequence
              unfolds with mechanical precision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Study Tabs */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
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
                  <CandlestickCard variant={study.color} wickHeight="md">
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
        </div>
      </section>

      {/* Workflow Reminder */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            The Mecha-X Workflow in Action
          </h2>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { num: '1', title: 'HTF Narrative', desc: 'Read weekly/daily draw' },
              { num: '2', title: '4H Profiling', desc: 'Track each 4H as a unit' },
              { num: '3', title: 'Label Sequence', desc: 'Cont./Rev./Aligned' },
              { num: '4', title: 'LTF Confirmation', desc: 'Wait for swing' },
              { num: '5', title: 'Execute & Log', desc: 'Define risk, enter' },
            ].map((step) => (
              <Card key={step.num} className="text-center border-primary/30">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-3">
                    {step.num}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Apply This Framework?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CandlestickButton
              variant="bullish"
              onClick={() => navigate('/sequence-identifier')}
            >
              Identify Your Sequence
            </CandlestickButton>
            <CandlestickButton
              variant="bearish"
              onClick={() => navigate('/checklist')}
            >
              View Trading Checklist
            </CandlestickButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
