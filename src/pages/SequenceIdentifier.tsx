import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, XCircle, HelpCircle, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CandlestickButton } from '@/components/CandlestickButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Question {
  id: string;
  question: string;
  options: { value: string; label: string; hint?: string }[];
  help?: string;
}

const questions: Question[] = [
  {
    id: 'htf_narrative',
    question: '1. What is your HTF (Daily/Weekly) narrative?',
    help: 'Understanding the bigger picture helps identify which sequence will likely play out.',
    options: [
      { value: 'continuation', label: 'Clear directional bias - expecting continuation', hint: 'e.g., strong trend, recent driver confirmed direction' },
      { value: 'reversal', label: 'Expecting reversal from key level', hint: 'e.g., at weekly high/low, major support/resistance' },
      { value: 'consolidation', label: 'Consolidation/range-bound', hint: 'e.g., trading between external highs/lows' },
    ],
  },
  {
    id: 'prior_4h',
    question: '2. Did the PREVIOUS 4H candle leave a clean, protected LTF swing?',
    help: 'A clean LTF swing from the prior 4H is key for Continuation setups.',
    options: [
      { value: 'yes_clean', label: 'Yes - Clean LTF reversal swing with SMT/confirmation', hint: 'Clear swing low/high with structural confirmation' },
      { value: 'yes_weak', label: 'Yes - But weak or questionable', hint: 'Swing exists but not ideal quality' },
      { value: 'no', label: 'No - Prior 4H was noisy or no clear swing', hint: 'No usable structure from previous candle' },
    ],
  },
  {
    id: 'current_4h_open',
    question: '3. Where did the CURRENT 4H candle open?',
    help: 'The 4H open position relative to prior structure determines if you inherited a swing.',
    options: [
      { value: 'inside_swing', label: 'Inside or very near the prior LTF swing', hint: 'Opened at/near the reversal point' },
      { value: 'away_swing', label: 'Away from the prior swing', hint: 'Gap or significant distance from prior swing' },
      { value: 'no_reference', label: 'No prior swing to reference', hint: 'Starting fresh' },
    ],
  },
  {
    id: 'current_4h_state',
    question: '4. What has the CURRENT 4H candle done so far?',
    help: 'Understanding where you are in the 4H candle lifecycle is critical.',
    options: [
      { value: 'just_opened', label: 'Just opened (first 30-60 mins)', hint: 'Early in the candle' },
      { value: 'forming_swing', label: 'Currently forming an LTF reversal swing', hint: 'Making a low/high right now' },
      { value: 'post_swing', label: 'Already formed swing and starting to expand', hint: 'Swing confirmed, moving away' },
      { value: 'expanded', label: 'Already had significant expansion', hint: 'Made a strong directional move' },
      { value: 'expanded_retracing', label: 'Expanded, now retracing', hint: 'Had move, now pulling back' },
    ],
  },
  {
    id: 'ltf_confirmation',
    question: '5. Do you have LTF swing confirmation for THIS 4H candle?',
    help: 'The LTF swing is your mechanical entry trigger. No swing = no trade.',
    options: [
      { value: 'yes_reversal', label: 'Yes - Fresh LTF reversal swing (created new high/low)', hint: 'This 4H made its own turning point' },
      { value: 'yes_inherited', label: 'Yes - Inherited from prior 4H', hint: 'Using the previous 4H swing' },
      { value: 'yes_realigned', label: 'Yes - New swing after retrace (realigning)', hint: 'Post-expansion retrace swing' },
      { value: 'forming', label: 'Currently forming / not yet confirmed', hint: 'Potential swing developing' },
      { value: 'no', label: 'No swing yet', hint: 'Waiting for structure' },
    ],
  },
];

const SequenceIdentifier = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Determine sequence
      const sequence = determineSequence(newAnswers);
      setResult(sequence);
    }
  };

  const determineSequence = (ans: Record<string, string>): string => {
    // Continuation: Clean prior swing + opened inside + early/inherited confirmation
    if (
      ans.prior_4h === 'yes_clean' &&
      ans.current_4h_open === 'inside_swing' &&
      (ans.ltf_confirmation === 'yes_inherited' || ans.current_4h_state === 'just_opened')
    ) {
      return 'continuation';
    }

    // Reversal: No prior swing OR current 4H creating its own swing
    if (
      (ans.prior_4h === 'no' || ans.current_4h_open === 'no_reference') &&
      (ans.current_4h_state === 'forming_swing' || ans.current_4h_state === 'post_swing') &&
      ans.ltf_confirmation === 'yes_reversal'
    ) {
      return 'reversal';
    }

    // Aligned: Already expanded + retracing + new realignment swing
    if (
      ans.current_4h_state === 'expanded_retracing' &&
      ans.ltf_confirmation === 'yes_realigned'
    ) {
      return 'aligned';
    }

    // Wait states - specific feedback
    if (ans.ltf_confirmation === 'no' || ans.ltf_confirmation === 'forming') {
      return 'wait_no_swing';
    }

    if (ans.current_4h_state === 'expanded' && ans.ltf_confirmation !== 'yes_realigned') {
      return 'wait_chase';
    }

    if (ans.prior_4h === 'yes_weak') {
      return 'wait_weak_structure';
    }

    // Unclear - doesn't fit clean patterns
    return 'unclear';
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
  };

  const getResultContent = (sequence: string) => {
    switch (sequence) {
      case 'continuation':
        return {
          title: 'Continuation Sequence ✅',
          color: 'bullish',
          description: 'Perfect setup! The prior 4H did the reversal work. The current 4H opened inside that swing. You can trade the continuation immediately.',
          action: 'Enter at 4H open (or early LTF failure swing) using the inherited swing as your stop. Target HTF draw on liquidity.',
          confidence: 'High Confidence Setup',
          icon: TrendingUp,
        };
      case 'reversal':
        return {
          title: 'Reversal Sequence ⏳',
          color: 'bearish',
          description: 'The 4H is creating its own structural turn right now. This is the classic "wait for the low/high to form" scenario.',
          action: 'Be patient. Let the LTF complete the reversal swing with confirmation (SMT preferred). Once confirmed with expansion, enter against that swing.',
          confidence: 'High Confidence - Requires Patience',
          icon: XCircle,
        };
      case 'aligned':
        return {
          title: 'Aligned Sequence 🎯',
          color: 'primary',
          description: 'The 4H already proved direction. After the retrace, a new LTF swing is realigning with the original expansion direction.',
          action: 'Re-enter using the realignment swing as structure. This is often a "strength switch" SMT between correlated assets. Lower risk than the initial leg.',
          confidence: 'Medium-High Confidence',
          icon: CheckCircle2,
        };
      case 'wait_no_swing':
        return {
          title: 'No Trade - Waiting for LTF Swing',
          color: 'muted',
          description: 'You don\'t have mechanical confirmation yet. The LTF swing is the non-negotiable trigger.',
          action: 'Do NOT enter without LTF confirmation. Wait for structure: SMT, clean reversal pattern, or strength switch. No swing = no trade.',
          confidence: 'Not Ready',
          icon: HelpCircle,
        };
      case 'wait_chase':
        return {
          title: 'No Trade - Don\'t Chase',
          color: 'muted',
          description: 'The 4H already expanded without you. Entering now means chasing without structure.',
          action: 'Wait for a retrace. Look for the 4H to pull back and form a new LTF swing that realigns (Aligned sequence). Don\'t FOMO into momentum.',
          confidence: 'Wait for Retrace',
          icon: HelpCircle,
        };
      case 'wait_weak_structure':
        return {
          title: 'No Trade - Weak Structure',
          color: 'muted',
          description: 'The prior swing exists but isn\'t high quality. Weak structure = lower probability.',
          action: 'Either wait for the current 4H to create a better swing (Reversal), or skip this setup entirely. Only trade A+ setups.',
          confidence: 'Low Probability',
          icon: HelpCircle,
        };
      default:
        return {
          title: 'Unclear Setup',
          color: 'muted',
          description: 'The current setup doesn\'t fit a clean Mecha-X sequence pattern. This could mean choppy conditions or mixed signals.',
          action: 'No trade. Wait for clearer structure. Not every 4H candle produces a tradeable sequence. Sometimes the best trade is no trade.',
          confidence: 'No Clear Edge',
          icon: HelpCircle,
        };
    }
  };

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
          <h1 className="text-xl font-bold">Sequence Identifier</h1>
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 px-4 text-center bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Which Sequence Are You In?
          </h1>
          <p className="text-lg text-muted-foreground">
            Answer a few questions about your current setup and we'll identify the sequence.
          </p>
        </div>
      </section>

      {/* Quiz */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-2 border-primary/30">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted-foreground">
                        Question {currentQuestion + 1} of {questions.length}
                      </span>
                      <div className="flex gap-1 md:gap-2 flex-1 justify-end ml-4">
                        {questions.map((_, idx) => (
                          <div
                            key={idx}
                            className={`h-2 flex-1 max-w-[3rem] rounded-full transition-all ${idx < currentQuestion
                              ? 'bg-primary'
                              : idx === currentQuestion
                                ? 'bg-primary/50'
                                : 'bg-muted'
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                    <CardTitle className="text-xl md:text-2xl mb-2">
                      {questions[currentQuestion].question}
                    </CardTitle>
                    {questions[currentQuestion].help && (
                      <p className="text-sm text-muted-foreground">
                        {questions[currentQuestion].help}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {questions[currentQuestion].options.map((option) => (
                      <Button
                        key={option.value}
                        onClick={() => handleAnswer(questions[currentQuestion].id, option.value)}
                        variant="outline"
                        className="w-full justify-start text-left h-auto py-4 px-6 hover:bg-primary/10 hover:border-primary flex flex-col items-start gap-1"
                      >
                        <span className="font-medium">{option.label}</span>
                        {option.hint && (
                          <span className="text-xs text-muted-foreground">
                            {option.hint}
                          </span>
                        )}
                      </Button>
                    ))}
                  </CardContent>
                </Card>

                {currentQuestion > 0 && (
                  <div className="mt-4 text-center">
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentQuestion(currentQuestion - 1)}
                    >
                      ← Previous Question
                    </Button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                {(() => {
                  const content = getResultContent(result);
                  const Icon = content.icon;
                  return (
                    <Card className={`border-2 ${content.color === 'bullish' ? 'border-bullish/30 bg-bullish/5' :
                      content.color === 'bearish' ? 'border-bearish/30 bg-bearish/5' :
                        content.color === 'primary' ? 'border-primary/30 bg-primary/5' :
                          'border-muted/30 bg-muted/5'
                      }`}>
                      <CardContent className="p-6 md:p-12 text-center space-y-6">
                        <div className={`inline-block p-4 rounded-full ${content.color === 'bullish' ? 'bg-bullish/20' :
                          content.color === 'bearish' ? 'bg-bearish/20' :
                            content.color === 'primary' ? 'bg-primary/20' :
                              'bg-muted/20'
                          }`}>
                          <Icon className={`w-12 h-12 ${content.color === 'bullish' ? 'text-bullish' :
                            content.color === 'bearish' ? 'text-bearish' :
                              content.color === 'primary' ? 'text-primary' :
                                'text-muted-foreground'
                            }`} />
                        </div>

                        <div>
                          <h2 className="text-3xl md:text-4xl font-bold mb-2">
                            {content.title}
                          </h2>
                          {content.confidence && (
                            <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${content.confidence.includes('High') ? 'bg-bullish/20 text-bullish' :
                              content.confidence.includes('Medium') ? 'bg-primary/20 text-primary' :
                                'bg-muted/40 text-muted-foreground'
                              }`}>
                              {content.confidence}
                            </div>
                          )}
                          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            {content.description}
                          </p>
                          <div className="p-5 bg-background/50 rounded-lg border-2 border-border">
                            <p className="font-medium text-foreground leading-relaxed">
                              <strong className="text-primary">Action Plan:</strong><br />
                              {content.action}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                          <Button onClick={resetQuiz} variant="outline" size="lg">
                            Try Again
                          </Button>
                          <CandlestickButton
                            variant="bullish"
                            onClick={() => navigate('/sequences')}
                          >
                            Learn More About Sequences
                          </CandlestickButton>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default SequenceIdentifier;
