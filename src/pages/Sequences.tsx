import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, TrendingUp, RefreshCw, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CandlestickButton } from '@/components/CandlestickButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import continuationImg from '@/assets/continuation-sequence.jpg';
import reversalImg from '@/assets/reversal-sequence.jpg';
import alignedImg from '@/assets/aligned-sequence.jpg';

const sequences = [
  {
    id: 'continuation',
    title: 'Continuation',
    subtitle: 'Inherited Turn',
    color: 'bullish',
    icon: TrendingUp,
    description: 'The new 4H candle opens inside an LTF reversal swing created by the previous 4H.',
    image: continuationImg,
    implications: [
      'The reversal work is already done',
      'The new 4H can immediately expand away from that swing',
      'Ideal for proactive entries at the 4H open when HTF narrative agrees',
    ],
    useWhen: [
      'HTF narrative is already clear',
      'The prior 4H printed a clean LTF swing during a meaningful time window (e.g., a driver)',
    ],
    rule: 'IF new 4H open is inside a clean LTF reversal swing from the previous 4H, AND that swing is intact and lines up with HTF narrative, THEN treat the 4H open as a chance to join existing momentum.',
  },
  {
    id: 'reversal',
    title: 'Reversal',
    subtitle: 'Fresh Turn',
    color: 'bearish',
    icon: RefreshCw,
    description: 'The prior 4H did not leave a usable swing. The current 4H must create its own high/low via an LTF reversal.',
    image: reversalImg,
    implications: [
      'You wait for the LTF to engineer the turning point',
      'Once confirmed, trade the expansion inside that same 4H candle',
      'Requires patience - let the market create the swing first',
    ],
    useWhen: [
      'The prior 4H was noisy / no usable swing',
      'Today\'s 4H is expected to form the low/high of the day itself',
    ],
    rule: 'IF the prior 4H left no usable swing, AND the current 4H engineers an LTF reversal at a logical HTF location, AND price begins to expand away with intent, THEN lock in that swing as the 4H turning point.',
  },
  {
    id: 'aligned',
    title: 'Aligned',
    subtitle: 'Re-Entry After Retrace',
    color: 'primary',
    icon: ArrowUpRight,
    description: 'The 4H candle has already reversed and expanded. Price then retraces, and a new LTF swing forms that realigns with the original direction.',
    image: alignedImg,
    implications: [
      'You are not hunting the first leg; you are rejoining proof',
      'The new LTF swing marks the end of the retrace and is your re-entry structure',
      'Lower risk than catching the initial move',
    ],
    useWhen: [
      'You missed the first leg or don\'t want to chase',
      'The 4H is mid-candle with clear remaining draw on liquidity',
    ],
    rule: 'IF a 4H candle has already produced a strong expansion leg, AND price retraces but HTF narrative still supports that direction, AND a new LTF swing forms that points back in the direction of the original expansion, THEN use that new swing as your re-entry structure.',
  },
];

const Sequences = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('continuation');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <CandlestickButton
            variant="bullish"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </CandlestickButton>
          <h1 className="text-xl font-bold">Three Core Sequences</h1>
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
              The Three Mecha-X<br />
              <span className="text-gradient bg-gradient-to-r from-bullish via-primary to-bearish bg-clip-text text-transparent">
                Sequence States
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-4">
              Every trade falls into one of these three categories. Understanding which sequence
              you're in determines your entry timing and risk management.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-sm">
              <span className="text-primary font-semibold">Quick Reference Guide</span>
              <span className="text-muted-foreground">•</span>
              <button
                onClick={() => navigate('/knowledge')}
                className="text-primary hover:underline font-medium"
              >
                See Full Methodology →
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sequence Tabs */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12">
              {sequences.map((seq) => (
                <TabsTrigger
                  key={seq.id}
                  value={seq.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <seq.icon className="w-4 h-4 mr-2" />
                  {seq.title}
                </TabsTrigger>
              ))}
            </TabsList>

            <AnimatePresence mode="wait">
              {sequences.map((seq) => (
                <TabsContent key={seq.id} value={seq.id} className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Content */}
                      <div className="space-y-6">
                        <div>
                          <div className={`inline-block px-4 py-2 rounded-full mb-4 ${
                            seq.color === 'bullish' ? 'bg-bullish/20 text-bullish' :
                            seq.color === 'bearish' ? 'bg-bearish/20 text-bearish' :
                            'bg-primary/20 text-primary'
                          }`}>
                            <span className="font-mono font-semibold">{seq.subtitle}</span>
                          </div>
                          <h2 className="text-3xl md:text-4xl font-bold mb-4">{seq.title}</h2>
                          <p className="text-lg text-muted-foreground leading-relaxed">
                            {seq.description}
                          </p>
                        </div>

                        <Card className="border-primary/30">
                          <CardHeader>
                            <CardTitle className="text-lg">Key Implications</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-3">
                              {seq.implications.map((point, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className={`mt-1 ${
                                    seq.color === 'bullish' ? 'text-bullish' :
                                    seq.color === 'bearish' ? 'text-bearish' :
                                    'text-primary'
                                  }`}>•</span>
                                  <span className="text-muted-foreground">{point}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>

                        <Card className="border-primary/30">
                          <CardHeader>
                            <CardTitle className="text-lg">Use This When</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-3">
                              {seq.useWhen.map((point, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-primary mt-1">→</span>
                                  <span className="text-muted-foreground">{point}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>

                        <Card className={`border-2 ${
                          seq.color === 'bullish' ? 'border-bullish/30 bg-bullish/5' :
                          seq.color === 'bearish' ? 'border-bearish/30 bg-bearish/5' :
                          'border-primary/30 bg-primary/5'
                        }`}>
                          <CardHeader>
                            <CardTitle className="text-lg">If-Then Rule</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {seq.rule}
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Visual */}
                      <div className="space-y-4">
                        <Card className="overflow-hidden border-2 border-primary/30">
                          <img 
                            src={seq.image} 
                            alt={`${seq.title} Sequence Diagram`}
                            className="w-full h-auto"
                          />
                        </Card>
                        <p className="text-sm text-muted-foreground text-center">
                          Visual representation from the Mecha-X manual
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </Tabs>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8">Master the Sequences</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CandlestickButton
              variant="bullish"
              onClick={() => navigate('/sequence-identifier')}
              className="gap-2"
            >
              Try Sequence Identifier
              <TrendingUp className="w-4 h-4" />
            </CandlestickButton>
            <CandlestickButton
              variant="bearish"
              onClick={() => navigate('/case-studies')}
            >
              View Case Studies
            </CandlestickButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sequences;
