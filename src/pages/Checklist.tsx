import { motion } from "framer-motion";
import { ArrowLeft, CheckSquare, Download, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Checklist = () => {
  const navigate = useNavigate();

  const preTradeChecklist = [
    { step: "HTF bias established?", detail: "Check Daily/4H - are we in premium (short) or discount (long)?" },
    { step: "Key levels marked?", detail: "BSL/SSL levels, previous high/low, order blocks identified" },
    { step: "Right session timing?", detail: "Silver Bullet hour active? 10:00 AM ET (primary), 03:00 AM or 14:00 PM (secondary)" },
    { step: "C1→C2→C3 pattern?", detail: "C1 establishes level, C2 sweeps + closes inside, C3 expands away?" },
    { step: "Momentum candles formed?", detail: "After C2 sweep, count minimum 2 momentum candles in reversal direction?" },
    { step: "CISD level identified?", detail: "Mark the CLOSE of last momentum candle - this is your entry level" },
    { step: "SMT divergence? (Optional)", detail: "Binary (ES vs NQ) or Triad (ES vs NQ vs RTY) divergence present?" },
    { step: "CISD projections calculated?", detail: "Momentum range identified? 1x, 2x, 2.5x, 3.5x, 4x targets marked?" }
  ];

  const entryRules = [
    { rule: "OSOK Principle", description: "One Shot One Kill - single entry per setup, no averaging down" },
    { rule: "Stop Placement", description: "Just beyond the C2 sweep extreme" },
    { rule: "Entry Trigger", description: "Price taps CISD level + shows rejection wick" },
    { rule: "Target Setting", description: "Take 50% at 2x CISD projection, let runner to 4x projection" },
    { rule: "Breakeven Move", description: "Move stop to entry at 1x CISD projection" },
    { rule: "Max Wait Time", description: "If no reaction at CISD within 2-3 candles → exit" }
  ];

  const sessionTiming = [
    { session: "ASIA", time: "20:00-23:59 ET", action: "Manipulation phase - mark levels, don't trade" },
    { session: "LONDON", time: "02:00-05:00 ET", action: "Expansion phase - Silver Bullet at 03:00 ET ⚡" },
    { session: "NYAM", time: "06:00-09:00 ET", action: "PRIMARY Silver Bullet at 10:00 AM ET ⚡ - MAIN TRADING WINDOW" },
    { session: "NYPM", time: "13:00-16:00 ET", action: "Afternoon Silver Bullet at 14:00 PM ET ⚡ - Final push to targets" }
  ];

  const commonMistakes = [
    { mistake: "Trading at equilibrium", fix: "Wait for premium or discount - avoid 40-60% range" },
    { mistake: "No C1→C2→C3 pattern", fix: "Never enter without complete 3-candle reversal structure" },
    { mistake: "Wrong session timing", fix: "Focus on Silver Bullet hours (10:00 AM ET primary), avoid dead hours" },
    { mistake: "Ignoring HTF bias", fix: "Always check HTF first - context is king" },
    { mistake: "No momentum candles", fix: "Wait for minimum 2 momentum candles after C2 before marking CISD" },
    { mistake: "Moving stop loss wider", fix: "Never widen stop - accept loss and move on" },
    { mistake: "Taking partials too early", fix: "Let it reach 2x CISD projection minimum before taking profits" },
    { mistake: "Overtrading setups", fix: "Quality over quantity - wait for A+ setups only" }
  ];

  const riskManagement = [
    { item: "Position Size", value: "1-2% risk per trade maximum" },
    { item: "Daily Loss Limit", value: "3% of account - stop trading if hit" },
    { item: "Win Rate Target", value: "45-55% win rate with CISD projections = profitable" },
    { item: "Max Open Trades", value: "1-2 concurrent positions only" },
    { item: "Streak Management", value: "After 3 losses, reduce size by 50%" },
    { item: "Profit Taking", value: "50% at 2x CISD projection, runner to 4x projection" }
  ];

  return (
    <div className="min-h-screen bg-market-depth">{/* Header */}
      <motion.header 
        className="sticky top-0 z-40 backdrop-blur-xl border-b border-border bg-background/95 shadow-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="container mx-auto px-3 md:px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="gap-2 font-mono"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm font-medium">Trading Checklist</span>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-3 md:px-4 py-6 md:py-12 max-w-5xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-mono">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Pre-Trade
            </span>
            <br />
            <span className="text-foreground text-3xl md:text-5xl">Cheatsheet</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-mono mb-6">
            Print this. Check every box. Trade with confidence.
          </p>
          <Button
            variant="outline"
            className="gap-2 font-mono"
            onClick={() => window.print()}
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </motion.div>

        <div className="space-y-8">
          {/* Pre-Trade Checklist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 font-mono flex items-center gap-3">
                <CheckSquare className="w-6 h-6 text-primary" />
                Pre-Trade Checklist
              </h2>
              <div className="space-y-3">
                {preTradeChecklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-5 h-5 rounded border-2 border-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-bold text-sm md:text-base mb-1">{item.step}</p>
                      <p className="text-xs md:text-sm text-muted-foreground">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Entry Rules */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 font-mono">Entry & Exit Rules</h2>
              <div className="space-y-4">
                {entryRules.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-start gap-3">
                      <Badge variant="secondary" className="font-mono text-xs mt-1">{idx + 1}</Badge>
                      <div>
                        <p className="font-bold text-sm md:text-base mb-1">{item.rule}</p>
                        <p className="text-xs md:text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    {idx < entryRules.length - 1 && <Separator className="my-3" />}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Session Timing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 font-mono">Session Timing Quick Ref</h2>
              <div className="space-y-3">
                {sessionTiming.map((session, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-muted/30 border border-border">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                      <h3 className="font-bold text-base md:text-lg font-mono">{session.session}</h3>
                      <Badge className="font-mono text-xs w-fit">{session.time}</Badge>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground">{session.action}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Common Mistakes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 border-destructive/50">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 font-mono flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-destructive" />
                Common Mistakes & Fixes
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {commonMistakes.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                    <p className="font-bold text-sm mb-2 text-destructive">❌ {item.mistake}</p>
                    <p className="text-xs text-muted-foreground">✓ {item.fix}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Risk Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 bg-primary/5 border-primary/30">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 font-mono">Risk Management Rules</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {riskManagement.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-background/80 border border-border">
                    <p className="font-bold text-sm mb-1">{item.item}</p>
                    <p className="text-lg text-primary font-mono">{item.value}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checklist;
