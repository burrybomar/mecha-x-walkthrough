import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Settings as SettingsIcon, BarChart3, Clock, Target, Zap, Layers, TrendingUp, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Setup = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);

  const setupSteps = [
    {
      id: 1,
      icon: BarChart3,
      title: "HTF Context Automation",
      subtitle: "Step 1: Higher Timeframe Overlay",
      color: "from-blue-500 to-cyan-500",
      frameworkStep: "Automates HTF Analysis",
      settings: [
        {
          name: "HTF Timeframe Selection",
          options: ["Auto Mode", "Manual: 1H, 4H, Daily, Weekly"],
          recommendation: "Auto Mode - intelligently picks HTF based on your chart",
          why: "Automatically overlays 4H/Daily levels on your 5min/15min charts"
        },
        {
          name: "HTF Levels Display",
          options: ["Show BSL/SSL", "Show Order Blocks", "Show FVGs"],
          recommendation: "Enable all for complete HTF context",
          why: "See where institutional liquidity pools and key levels are"
        },
        {
          name: "Premium/Discount Zones",
          options: ["Color-code by zone", "Show equilibrium line"],
          recommendation: "Enable both",
          why: "Instantly know if you're in buy zone (discount) or sell zone (premium)"
        }
      ],
      result: "Your chart now shows exactly where price is relative to institutional levels—no manual marking needed."
    },
    {
      id: 2,
      icon: Clock,
      title: "Session Timing Automation",
      subtitle: "Step 2: H1-H4 Windows",
      color: "from-purple-500 to-pink-500",
      frameworkStep: "Automates Session Profiling",
      settings: [
        {
          name: "Session Boxes",
          options: ["Show H1, H2, H3, H4 windows", "Highlight Silver Bullet hours"],
          recommendation: "Enable H2 highlight (2-6 AM, 9:30-12 PM EST)",
          why: "Visual boxes show you exactly when reversals typically happen"
        },
        {
          name: "Current Hour Model",
          options: ["Show live hour progression", "Color-code by phase"],
          recommendation: "Enable with color coding",
          why: "Know in real-time: Are we in setup, reversal, continuation, or delivery?"
        },
        {
          name: "Time Alerts",
          options: ["Alert at H2 window open", "Alert 15min before key sessions"],
          recommendation: "Enable H2 window alerts",
          why: "Get notified when high-probability trading windows open"
        }
      ],
      result: "No more guessing when to watch charts—the system tells you exactly when institutional moves happen."
    },
    {
      id: 3,
      icon: Target,
      title: "Sweep Detection Automation",
      subtitle: "Step 3: BSL/SSL + C2 Alerts",
      color: "from-orange-500 to-red-500",
      frameworkStep: "Automates Liquidity Sweep Detection",
      settings: [
        {
          name: "Auto Sweep Detection",
          options: ["Detect BSL/SSL sweeps", "Mark sweep candles", "Volume confirmation"],
          recommendation: "Enable all + volume filter",
          why: "System automatically identifies when stops are hunted above/below key levels"
        },
        {
          name: "C2 Pattern Recognition",
          options: ["Auto-detect 3-candle reversals", "Confirm with structure break"],
          recommendation: "Enable both filters",
          why: "Get alerted only when clean sweep + confirmed reversal occurs"
        },
        {
          name: "Sweep Alerts",
          options: ["Real-time alerts", "Only HTF sweeps", "Require C2 confirmation"],
          recommendation: "HTF sweeps + C2 confirmation required",
          why: "Filter out noise—only get alerts on high-probability setups"
        }
      ],
      result: "The indicator watches for sweeps 24/7—you only get notified when THE trigger happens."
    },
    {
      id: 4,
      icon: Zap,
      title: "CISD Zone Automation",
      subtitle: "Step 4: Entry Level Marking",
      color: "from-emerald-500 to-teal-500",
      frameworkStep: "Automates Entry Zone Identification",
      settings: [
        {
          name: "Auto CISD Detection",
          options: ["Mark structure change candles", "Draw entry zones", "Show iFVGs"],
          recommendation: "Enable all",
          why: "System automatically highlights the exact candle/zone where structure changed"
        },
        {
          name: "Entry Zone Visualization",
          options: ["Box around CISD level", "Show order block within", "Display risk/reward"],
          recommendation: "Enable all for clear entries",
          why: "No guessing—the system draws your entry box and shows R:R"
        },
        {
          name: "Target Projection",
          options: ["Auto-draw to opposite liquidity", "Show H3/H4 targets", "Calculate RR"],
          recommendation: "Enable automatic target projection",
          why: "System calculates and displays your 1:3 and 1:4 targets automatically"
        }
      ],
      result: "Your entry levels, stop loss, and targets are automatically calculated and displayed—just execute."
    },
    {
      id: 5,
      icon: Layers,
      title: "SMT Confluence Automation",
      subtitle: "Step 5: Divergence Detection",
      color: "from-violet-500 to-purple-500",
      frameworkStep: "Automates Smart Money Technique",
      settings: [
        {
          name: "Asset Comparison",
          options: ["ES vs NQ (indices)", "EUR vs GBP (forex)", "Custom pairs"],
          recommendation: "ES vs NQ for indices, EUR vs GBP for forex",
          why: "System compares correlated assets in real-time"
        },
        {
          name: "SMT Divergence Alerts",
          options: ["Alert on divergence", "Show on chart", "Require confirmation"],
          recommendation: "Enable alerts + chart display",
          why: "Get notified when one asset sweeps but the other doesn't (manipulation signal)"
        },
        {
          name: "Confluence Indicator",
          options: ["Show SMT score", "Highlight high-probability setups"],
          recommendation: "Enable both",
          why: "Visual indicator shows when SMT adds extra confluence to your setup"
        }
      ],
      result: "System monitors divergence for you—adds 10-20% confidence when present, optional but powerful."
    },
    {
      id: 6,
      icon: TrendingUp,
      title: "Execution Automation",
      subtitle: "Step 6: OSOK Trade Management",
      color: "from-green-500 to-emerald-500",
      frameworkStep: "Automates Trade Execution Alerts",
      settings: [
        {
          name: "Entry Alerts",
          options: ["Alert when price taps CISD", "Require rejection candle", "Volume confirmation"],
          recommendation: "Enable all filters",
          why: "Get alerted at the exact moment to enter—no chart watching needed"
        },
        {
          name: "Risk Management Display",
          options: ["Show 1:1 breakeven level", "Show 50% profit zone (H3)", "Show full target (H4)"],
          recommendation: "Enable all levels on chart",
          why: "Your trade management levels are pre-calculated and displayed"
        },
        {
          name: "Trade Tracking",
          options: ["Mark entry/exit on chart", "Track win rate", "Log trades"],
          recommendation: "Enable tracking",
          why: "System logs all trades for performance review and improvement"
        }
      ],
      result: "From entry alert to exit levels—everything is automated. You just need to click the button."
    }
  ];

  const currentSetup = setupSteps[activeStep - 1];
  const IconComponent = currentSetup.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header 
        className="sticky top-0 z-40 backdrop-blur-xl border-b border-border bg-background/95"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Overview
            </Button>
            <Badge variant="outline" className="gap-2">
              <SettingsIcon className="w-3 h-3" />
              Framework Setup
            </Badge>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Automate Your
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Trading Framework
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Each framework step has corresponding indicator settings. Configure once, 
            and the system automates the entire 6-step process on your charts.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-12 overflow-x-auto pb-4">
          {setupSteps.map((step, idx) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => setActiveStep(step.id)}
                className={`flex flex-col items-center gap-2 min-w-[80px] transition-all ${
                  activeStep === step.id ? 'scale-110' : 'scale-90 opacity-50'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                    activeStep === step.id
                      ? `bg-gradient-to-br ${step.color} shadow-lg`
                      : 'bg-card border border-border'
                  }`}
                >
                  <step.icon
                    className={`w-7 h-7 ${
                      activeStep === step.id ? 'text-white' : 'text-muted-foreground'
                    }`}
                  />
                </div>
                <div className="text-xs font-medium">Step {step.id}</div>
              </button>
              {idx < setupSteps.length - 1 && (
                <ChevronRight className="w-5 h-5 text-muted-foreground/40 mx-2" />
              )}
            </div>
          ))}
        </div>

        {/* Current Step Content */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-8 md:p-12 border-2">
            {/* Header */}
            <div className="flex items-start gap-6 mb-8">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${currentSetup.color} flex items-center justify-center flex-shrink-0 shadow-xl`}>
                <IconComponent className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <Badge className="mb-3">{currentSetup.frameworkStep}</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{currentSetup.title}</h2>
                <p className="text-xl text-muted-foreground">{currentSetup.subtitle}</p>
              </div>
            </div>

            {/* Settings List */}
            <div className="space-y-6 mb-8">
              {currentSetup.settings.map((setting, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 rounded-xl bg-muted/50 border border-border"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <h3 className="text-lg font-bold">{setting.name}</h3>
                      
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Options:</div>
                        <div className="flex flex-wrap gap-2">
                          {setting.options.map((option, i) => (
                            <Badge key={i} variant="secondary" className="font-normal">
                              {option}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <div className="text-sm font-semibold text-primary mb-1">✓ Recommended:</div>
                        <div className="text-sm">{setting.recommendation}</div>
                      </div>

                      <div className="text-sm text-muted-foreground italic">
                        <strong>Why:</strong> {setting.why}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Result */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-accent/10 to-primary/10 border-2 border-accent/30">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-bold mb-1">Result After Configuration:</div>
                  <p className="text-sm leading-relaxed">{currentSetup.result}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t">
              <Button
                variant="outline"
                onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                disabled={activeStep === 1}
              >
                Previous Step
              </Button>
              <div className="text-sm text-muted-foreground">
                Step {activeStep} of {setupSteps.length}
              </div>
              <Button
                onClick={() => {
                  if (activeStep < setupSteps.length) {
                    setActiveStep(activeStep + 1);
                  } else {
                    navigate('/');
                  }
                }}
              >
                {activeStep < setupSteps.length ? 'Next Step' : 'Complete Setup'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Bottom Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-8 rounded-2xl bg-card border-2 border-primary/20 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Complete System Automation</h3>
          <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-6">
            Once configured, the entire 6-step framework runs automatically on your TradingView charts. 
            You'll see HTF levels, session windows, sweep alerts, entry zones, SMT divergence, and trade management—all working together as one unified system.
          </p>
          <Button size="lg" onClick={() => navigate('/knowledge')} variant="outline">
            Review Framework Logic
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Setup;
