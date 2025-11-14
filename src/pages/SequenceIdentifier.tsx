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
  options: { value: string; label: string }[];
}

const questions: Question[] = [
  {
    id: 'prior_swing',
    question: 'Did the PREVIOUS 4H candle leave a clean, usable LTF swing?',
    options: [
      { value: 'yes', label: 'Yes - Clean LTF swing exists from prior 4H' },
      { value: 'no', label: 'No - Prior 4H was noisy or no clear swing' },
    ],
  },
  {
    id: 'current_position',
    question: 'Where did the CURRENT 4H candle open relative to that prior swing?',
    options: [
      { value: 'inside', label: 'Inside/near the prior swing' },
      { value: 'away', label: 'Away from the prior swing' },
      { value: 'no_swing', label: 'No prior swing to reference' },
    ],
  },
  {
    id: 'expansion',
    question: 'Has the current 4H candle already expanded significantly?',
    options: [
      { value: 'yes', label: 'Yes - Already made a strong directional move' },
      { value: 'no', label: 'No - Still forming or early in candle' },
      { value: 'retrace', label: 'Yes, and now retracing' },
    ],
  },
  {
    id: 'ltf_swing',
    question: 'Has a new LTF swing formed during the current 4H?',
    options: [
      { value: 'yes_reversal', label: 'Yes - Created a reversal swing (new high/low)' },
      { value: 'yes_retrace', label: 'Yes - Formed after retrace, realigning with direction' },
      { value: 'no', label: 'No - Waiting for LTF confirmation' },
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
    // Continuation logic
    if (ans.prior_swing === 'yes' && ans.current_position === 'inside' && ans.expansion === 'no') {
      return 'continuation';
    }

    // Reversal logic
    if ((ans.prior_swing === 'no' || ans.current_position === 'no_swing') && 
        ans.ltf_swing === 'yes_reversal' && ans.expansion === 'no') {
      return 'reversal';
    }

    // Aligned logic
    if (ans.expansion === 'retrace' && ans.ltf_swing === 'yes_retrace') {
      return 'aligned';
    }

    // Default cases
    if (ans.expansion === 'yes' && ans.ltf_swing === 'no') {
      return 'wait';
    }

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
          title: 'Continuation Sequence',
          color: 'bullish',
          description: 'The new 4H opened inside a prior swing. You can trade the continuation immediately.',
          action: 'Enter at 4H open using the inherited swing as your stop.',
          icon: TrendingUp,
        };
      case 'reversal':
        return {
          title: 'Reversal Sequence',
          color: 'bearish',
          description: 'The 4H is creating its own swing. Wait for LTF to engineer the turn.',
          action: 'Be patient. Once the LTF swing is confirmed, trade the expansion from that new swing point.',
          icon: XCircle,
        };
      case 'aligned':
        return {
          title: 'Aligned Sequence',
          color: 'primary',
          description: 'The 4H already moved, retraced, and a new swing is realigning with the original direction.',
          action: 'Re-enter using the new LTF swing as your structure, targeting remaining draw.',
          icon: CheckCircle2,
        };
      case 'wait':
        return {
          title: 'Wait State',
          color: 'muted',
          description: 'The 4H has expanded but no LTF swing has formed yet.',
          action: 'Do not chase. Wait for a retrace and new swing formation.',
          icon: HelpCircle,
        };
      default:
        return {
          title: 'Unclear Setup',
          color: 'muted',
          description: 'The current setup doesn\'t fit a clean sequence pattern.',
          action: 'No trade. Wait for clearer structure before deploying risk.',
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
                      <div className="flex gap-2">
                        {questions.map((_, idx) => (
                          <div
                            key={idx}
                            className={`h-2 w-12 rounded-full transition-all ${
                              idx < currentQuestion
                                ? 'bg-primary'
                                : idx === currentQuestion
                                ? 'bg-primary/50'
                                : 'bg-muted'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <CardTitle className="text-2xl">
                      {questions[currentQuestion].question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {questions[currentQuestion].options.map((option) => (
                      <Button
                        key={option.value}
                        onClick={() => handleAnswer(questions[currentQuestion].id, option.value)}
                        variant="outline"
                        className="w-full justify-start text-left h-auto py-4 px-6 hover:bg-primary/10 hover:border-primary"
                      >
                        {option.label}
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
                    <Card className={`border-2 ${
                      content.color === 'bullish' ? 'border-bullish/30 bg-bullish/5' :
                      content.color === 'bearish' ? 'border-bearish/30 bg-bearish/5' :
                      content.color === 'primary' ? 'border-primary/30 bg-primary/5' :
                      'border-muted/30 bg-muted/5'
                    }`}>
                      <CardContent className="p-8 md:p-12 text-center space-y-6">
                        <div className={`inline-block p-4 rounded-full ${
                          content.color === 'bullish' ? 'bg-bullish/20' :
                          content.color === 'bearish' ? 'bg-bearish/20' :
                          content.color === 'primary' ? 'bg-primary/20' :
                          'bg-muted/20'
                        }`}>
                          <Icon className={`w-12 h-12 ${
                            content.color === 'bullish' ? 'text-bullish' :
                            content.color === 'bearish' ? 'text-bearish' :
                            content.color === 'primary' ? 'text-primary' :
                            'text-muted-foreground'
                          }`} />
                        </div>

                        <div>
                          <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {content.title}
                          </h2>
                          <p className="text-lg text-muted-foreground mb-6">
                            {content.description}
                          </p>
                          <div className="p-4 bg-background/50 rounded-lg border border-border">
                            <p className="font-medium text-foreground">
                              <strong>What to do:</strong> {content.action}
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
