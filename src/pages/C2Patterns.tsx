import { motion } from "framer-motion";
import { ArrowLeft, Zap, TrendingUp, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CandlestickButton } from "@/components/CandlestickButton";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SequenceStepsExplainer } from "@/components/SequenceStepsExplainer";
import { AnimatedCandlestickBackground } from "@/components/AnimatedCandlestickBackground";
import reversalImg from '@/assets/reversal-sequence.jpg';
import continuationImg from '@/assets/continuation-sequence.jpg';

const C2Patterns = () => {
  const navigate = useNavigate();

  const patterns = [
    {
      type: "C2-REV",
      icon: Zap,
      title: "Reversal",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
      description: "Swept and closed back inside the range, but not near the opposite extreme.",
      mechanics: [
        "C2 sweeps C1's BSL or SSL with a wick",
        "Body closes back inside C1's body range",
        "Close is NOT near opposite extreme of C1",
        "Indicates controlled reversal in progress"
      ],
      usage: "Standard reversal setup. Price has reversed but hasn't shown explosive momentum yet. Wait for C3 confirmation before entering."
    },
    {
      type: "C2-SNAP",
      icon: TrendingUp,
      title: "Strong Reversal",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      description: "Swept and immediately rejected to the opposite extreme of the C1 range.",
      mechanics: [
        "C2 sweeps C1's BSL or SSL with a wick",
        "Body CLOSES at or near opposite extreme of C1",
        "Shows explosive momentum shift",
        "Strong rejection indicates high conviction"
      ],
      usage: "Strongest reversal signal. Immediate entry opportunity. Price has violently rejected the sweep level. Highest probability setup."
    },
    {
      type: "C2-EXP",
      icon: Layers,
      title: "Continuation/Expansion",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      description: "C2 body engulfs the entire C1 range and closes beyond, indicating expansion.",
      mechanics: [
        "C2 body completely engulfs C1 range",
        "Close extends beyond C1's range",
        "No retest of sweep level",
        "Indicates momentum continuation"
      ],
      usage: "Not a reversal—price is continuing in sweep direction. Skip this setup if looking for reversals. Signals deeper liquidity exists."
    }
  ];

  return (
    <div className="min-h-screen bg-market-depth relative">
      {/* Animated Background */}
      <AnimatedCandlestickBackground
        variant="mixed"
        opacity={0.65}
        speed="slow"
        imageUrl={reversalImg}
      />

      {/* Header */}
      <motion.header 
        className="sticky top-0 z-40 backdrop-blur-xl border-b border-border bg-background/95 shadow-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <CandlestickButton
              variant="bullish"
              onClick={() => navigate("/knowledge")}
              className="text-xs"
            >
              <ArrowLeft className="w-3 h-3 mr-1" />
              Back to Knowledge
            </CandlestickButton>
            <div className="text-sm font-mono text-muted-foreground">
              C2 Pattern Types
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-mono">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              C2 Pattern Types
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Three mechanical classifications for C2 (Change of Character) patterns. Each type signals different market behavior and requires specific entry strategies.
          </p>
        </motion.div>
      </section>

      {/* Pattern Cards */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {patterns.map((pattern, idx) => {
            const IconComponent = pattern.icon;
            return (
              <motion.div
                key={pattern.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className={`p-6 md:p-8 border-2 ${pattern.borderColor} ${pattern.bgColor}`}>
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${pattern.bgColor} border-2 ${pattern.borderColor}`}>
                      <IconComponent className={`w-8 h-8 ${pattern.color}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className={`${pattern.color} font-mono text-sm px-3 py-1`}>
                          {pattern.type}
                        </Badge>
                        <h2 className="text-2xl md:text-3xl font-bold font-mono">{pattern.title}</h2>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{pattern.description}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 font-mono flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Mechanical Definition
                      </h3>
                      <ul className="space-y-2">
                        {pattern.mechanics.map((point, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className="text-primary mt-1">•</span>
                            <span className="text-muted-foreground">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-3 font-mono flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Trading Application
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{pattern.usage}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Key Rules */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 md:p-8 border-2 border-primary/30 bg-card">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 font-mono">Golden Rules for C2 Patterns</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="text-xs font-mono mt-1">1</Badge>
                <p className="text-muted-foreground"><strong className="text-foreground">Wait for C2 close:</strong> Never enter mid-candle. Wait for the C2 candle to close and confirm the pattern type.</p>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="text-xs font-mono mt-1">2</Badge>
                <p className="text-muted-foreground"><strong className="text-foreground">C2-SNAP = best:</strong> When you see a C2-SNAP pattern, this is your highest probability setup. Enter immediately on next candle open.</p>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="text-xs font-mono mt-1">3</Badge>
                <p className="text-muted-foreground"><strong className="text-foreground">Skip C2-EXP:</strong> If C2 shows expansion (EXP), skip the reversal trade. This signals continuation, not reversal.</p>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="text-xs font-mono mt-1">4</Badge>
                <p className="text-muted-foreground"><strong className="text-foreground">C2-REV needs C3:</strong> For standard C2-REV patterns, wait for C3 confirmation before entering to ensure the reversal has momentum.</p>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="text-xs font-mono mt-1">5</Badge>
                <p className="text-muted-foreground"><strong className="text-foreground">Trade AWAY from swing:</strong> Once C2 confirms (REV or SNAP), your entry is in the opposite direction of the sweep—trade away from the swing point.</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Sequence Explainer - Bullish */}
      <section className="py-16 px-4 border-t border-border relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-mono">
              <span className="bg-gradient-to-r from-bullish via-primary to-bullish bg-clip-text text-transparent">
                C1→C2→C3→C4 Sequence
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Understanding the complete candle sequence from setup to execution.
              Below are visual examples showing bullish and bearish reversals.
            </p>
          </motion.div>

          <SequenceStepsExplainer
            variant="bullish"
            patternImage={reversalImg}
            className="mb-16"
          />

          <SequenceStepsExplainer
            variant="bearish"
            patternImage={continuationImg}
            className="mb-8"
          />
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 px-4 border-t border-border relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 font-mono">Apply These Patterns</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CandlestickButton
              variant="bullish"
              onClick={() => navigate("/chart-examples")}
              className="text-sm"
            >
              View Chart Examples
            </CandlestickButton>
            <CandlestickButton
              variant="bearish"
              onClick={() => navigate("/setup")}
              className="text-sm"
            >
              Configure Indicator
            </CandlestickButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default C2Patterns;
