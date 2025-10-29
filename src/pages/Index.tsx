import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Zap,
  Target,
  Clock,
  BarChart3,
  Layers,
  GitCompare,
  Workflow,
  Sparkles,
  TrendingUp,
  Settings,
  Info,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";
import { AITooltip } from "@/components/AITooltip";
import mechaxLogo from "@/assets/mecha-x-logo.gif";
import cisdLtfChart from "@/assets/cisd-ltf-chart.jpg";
import smtLtfChart from "@/assets/smt-ltf-chart.png";
import { SimpleChart } from "@/components/SimpleChart";
import { PatternChart } from "@/components/PatternChart";
import HTFSweepDiagram from "@/components/HTFSweepDiagram";
import { TradingSequenceDiagram } from "@/components/TradingSequenceDiagram";
import { SessionModelsTable } from "@/components/SessionModelsTable";
import { TradingSequenceSlides } from "@/components/TradingSequenceSlides";
import { TradingViewSettings } from "@/components/TradingViewSettings";
import { SettingsHypeClip } from "@/components/SettingsHypeClip";

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const ToggleSetting = ({ label }: { label: string }) => (
    <div className="flex items-center justify-between py-2 px-3 hover:bg-muted/30 rounded transition-colors">
      <Label className="text-sm cursor-pointer">{label}</Label>
      <Switch className="ml-4" />
    </div>
  );

  const NumberSetting = ({ label, defaultValue }: { label: string; defaultValue: number }) => (
    <div className="flex items-center justify-between py-2 px-3 hover:bg-muted/30 rounded transition-colors">
      <Label className="text-sm">{label}</Label>
      <Input type="number" defaultValue={defaultValue} className="w-20 h-8 text-xs" />
    </div>
  );

  const ColorSetting = ({ label, defaultColor }: { label: string; defaultColor: string }) => (
    <div className="flex items-center justify-between py-2 px-3 hover:bg-muted/30 rounded transition-colors">
      <Label className="text-sm">{label}</Label>
      <Input type="color" defaultValue={defaultColor} className="w-20 h-8 cursor-pointer" />
    </div>
  );

  const SelectSetting = ({ label, options, defaultValue }: { label: string; options: string[]; defaultValue: string }) => (
    <div className="flex items-center justify-between py-2 px-3 hover:bg-muted/30 rounded transition-colors">
      <Label className="text-sm">{label}</Label>
      <Select defaultValue={defaultValue}>
        <SelectTrigger className="w-32 h-8 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-card border-border z-50">
          {options.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Settings Hype Clip */}
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Feature Showcase
        </h3>
        <SettingsHypeClip />
      </div>

      {/* Trading Sequence Slides */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Step-by-Step Trading Sequence
        </h3>
        <TradingSequenceSlides />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: <BarChart3 />, title: "HTF Sweeps", desc: "4H/Daily overlay", color: "from-blue-500 to-cyan-500" },
          { icon: <Target />, title: "BSL/SSL", desc: "Liquidity sweeps", color: "from-emerald-500 to-teal-500" },
          { icon: <Workflow />, title: "C2 Labels", desc: "Reversal patterns", color: "from-cyan-500 to-blue-500" },
          { icon: <Zap />, title: "CISD", desc: "State changes", color: "from-orange-500 to-amber-500" },
          { icon: <Layers />, title: "iFVG", desc: "Fair value gaps", color: "from-indigo-500 to-purple-500" },
          { icon: <GitCompare />, title: "SMT", desc: "Divergence", color: "from-purple-500 to-pink-500" },
          { icon: <Clock />, title: "Sessions", desc: "Time windows", color: "from-pink-500 to-rose-500" },
          { icon: <Settings />, title: "Settings", desc: "Configure all", color: "from-gray-600 to-gray-500" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-4 rounded-xl bg-gradient-to-br from-card to-secondary/30 border border-border hover:border-primary/50 transition-all group cursor-pointer"
            onClick={() => {
              const tabMap: Record<string, string> = {
                "HTF Sweeps": "htf",
                "BSL/SSL": "liquidity", 
                "C2 Labels": "patterns",
                "CISD": "cisd",
                "iFVG": "ifvg",
                "SMT": "smt",
                "Sessions": "sessions",
                "Settings": "settings"
              };
              setActiveTab(tabMap[item.title] || "overview");
            }}
          >
            <div className={`p-2 w-fit rounded-lg bg-gradient-to-br ${item.color} text-white mb-3 group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            <h3 className="font-bold text-sm mb-1">{item.title}</h3>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </motion.div>
        ))}
      </div>
      <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20">
        <Sparkles className="w-10 h-10 mx-auto mb-3 text-primary" />
        <h3 className="text-xl font-bold mb-2 text-center">Interactive Trading Intelligence</h3>
        <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto">
          MECHA-X combines HTF sweeps, liquidity detection, and pattern recognition into one powerful framework. 
          Hover over <AITooltip term="underlined terms"><span className="text-primary font-medium cursor-help">underlined terms</span></AITooltip> for instant explanations.
        </p>
      </div>
    </div>
  );

  const renderSectionDetails = (key: string) => {
    switch (key) {
      case "overview":
        return renderOverview();

      case "htf":
        return (
          <div className="space-y-6">
            <div className="rounded-xl overflow-hidden border-2 border-blue-500/20 bg-card">
              <HTFSweepDiagram />
            </div>
            
            <Card className="border-2 border-blue-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  HTF (Higher Time Frame) Sweeps
                </CardTitle>
                <CardDescription>Multi-timeframe analysis for institutional liquidity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Why HTF Sweeps Matter</h4>
                  <p className="text-sm text-muted-foreground">HTF sweeps (4H, Daily, Weekly) represent <strong>institutional-level liquidity</strong>. When price sweeps a Daily or 4H high/low and reverses, it signals major players taking positions. These are the most significant reversals - much more reliable than LTF sweeps.</p>
                  <p className="text-sm text-muted-foreground mt-2"><strong>Key Principle:</strong> HTF provides direction, LTF provides timing. Use HTF sweeps to identify the reversal zone, then drop to LTF (5m, 15m) for precise entries.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Chart Mapping (HTF to LTF)</h4>
                  <p className="text-sm text-muted-foreground">The indicator <strong>maps HTF candles onto your LTF chart</strong>. You see 4H/Daily candles overlaid on your 5min chart. This lets you see both timeframes simultaneously without switching charts. The BSL/SSL lines show where HTF liquidity sits.</p>
                  <p className="text-sm text-muted-foreground mt-2"><strong>Visual Hierarchy:</strong> Divider lines mark HTF candle opens/closes with different styles (dotted for 1H, dashed for 4-8H, solid for Daily, bold for Weekly+). This shows timeframe importance at a glance.</p>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Auto Mode", desc: "Smart HTF selection based on your chart timeframe", detail: "5m chart → shows 1H, 4H, Daily automatically. 15m → 4H, Daily, Weekly. No manual config needed." },
                { title: "Manual Mode", desc: "Full control over HTF display", detail: "Configure up to 4 custom timeframes. Set candle count (how many HTF bars to show), enable/disable mapping, adjust offset from price." },
              ].map((mode, i) => (
                <Card key={i} className="border-2 border-border hover:border-primary/50 transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                        <BarChart3 className="w-5 h-5" />
                      </div>
                      {mode.title}
                    </CardTitle>
                    <CardDescription>{mode.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">{mode.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card className="border-2 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-sm">HTF Sweep Trading Flow</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-primary">1.</span>
                  <p><strong>Identify HTF Level:</strong> Mark key 4H/Daily highs (BSL) or lows (SSL) on chart</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-primary">2.</span>
                  <p><strong>Wait for Session:</strong> Best during H2 Silver Bullet of London/NYAM</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-primary">3.</span>
                  <p><strong>Watch for Sweep:</strong> Price taps HTF level and reverses (valid sweep)</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-primary">4.</span>
                  <p><strong>Confirm with C2:</strong> C2 label appears on reversal candle</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-primary">5.</span>
                  <p><strong>Enter on CISD Retest:</strong> CISD forms, wait for pullback, enter on retest</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "liquidity":
        return (
          <div className="space-y-6">
            <Card className="border-2 border-emerald-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                    <Target className="w-5 h-5" />
                  </div>
                  BSL/SSL Liquidity Sweeps
                </CardTitle>
                <CardDescription>Buyside and Sellside Liquidity detection with sweep validation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Understanding Liquidity</h4>
                  <p className="text-sm text-muted-foreground mb-2">Liquidity pools are clusters of stop-loss orders that accumulate at key levels:</p>
                  <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                    <li><strong className="text-foreground">BSL (Buy-Side Liquidity):</strong> Stop-loss orders sitting <strong>above</strong> swing highs. When price taps this level, it triggers buy orders (breakout traders' stops + sell stops converting to buys)</li>
                    <li><strong className="text-foreground">SSL (Sell-Side Liquidity):</strong> Stop-loss orders sitting <strong>below</strong> swing lows. Price tapping this level triggers sell orders</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2">Smart money <strong>deliberately sweeps</strong> these levels to fill large orders before reversing. This is manipulation - they hunt stops.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Valid vs Invalid Sweeps (Critical!)</h4>
                  <p className="text-sm text-muted-foreground"><strong>Valid Sweep:</strong> Price taps BSL/SSL, sweeps the liquidity, and <strong>immediately reverses</strong> - holds the level. Forms a wick/rejection. <strong>This is your entry signal.</strong></p>
                  <p className="text-sm text-muted-foreground mt-2"><strong>Invalid Sweep:</strong> Price sweeps the level but <strong>continues through</strong> without reversing. No rejection, no entry. Often means deeper liquidity exists beyond.</p>
                  <p className="text-sm text-muted-foreground mt-2 text-orange-400"><strong>Key Rule:</strong> Only trade valid sweeps. If sweep fails to reverse, avoid the trade.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">LTF vs HTF Sweeps</h4>
                  <p className="text-sm text-muted-foreground"><strong>LTF (Lower Timeframe):</strong> Sweeps on your chart timeframe (e.g., 5m, 15m). Good for entries but less reliable solo.</p>
                  <p className="text-sm text-muted-foreground mt-2"><strong>HTF (Higher Timeframe):</strong> Sweeps of 4H, Daily, Weekly highs/lows mapped onto your chart. <strong>Much more significant.</strong> HTF sweep → higher probability reversal.</p>
                  <p className="text-sm text-muted-foreground mt-2"><strong>Best Setup:</strong> HTF sweep occurs during H2 Silver Bullet window + shows C2 reversal pattern + has SMT divergence = highest-probability trade.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Count Settings</h4>
                  <p className="text-sm text-muted-foreground">BSL/SSL Count determines how many swing highs/lows are marked. Default is 1 (most recent swing). Increase to 10-20 to see historical liquidity levels and understand where price might target next.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "patterns":
        return (
          <div className="space-y-6">
            <PatternChart type="c1c2c3-bullish" title="C2 Pattern - Bullish Reversal" />
            <Card className="border-2 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 text-white">
                    <Workflow className="w-5 h-5" />
                  </div>
                  C2 Pattern Detection
                </CardTitle>
                <CardDescription>Reversal candle identification at liquidity sweeps</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">C1-C2-C3 Pattern Structure</h4>
                  <p className="text-sm text-muted-foreground mb-2">The pattern detection system identifies the complete reversal sequence:</p>
                  <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                    <li><strong className="text-foreground">C1:</strong> The candle that sweeps the liquidity (BSL or SSL)</li>
                    <li><strong className="text-foreground">C2:</strong> The reversal candle - where price rejects and reverses direction. This is your <strong>entry signal candle</strong></li>
                    <li><strong className="text-foreground">C3:</strong> The expansion candle - confirms reversal with momentum in new direction</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">C2 Entry Strategy</h4>
                  <p className="text-sm text-muted-foreground">C2 marks your exact entry candle. Wait for <strong>C2 to close</strong>, confirming the reversal. Enter at open of next candle or on retest of C2 low/high. Stop loss goes beyond the sweep (beyond C1).</p>
                  <p className="text-sm text-muted-foreground mt-2"><strong>Tip:</strong> Best C2 entries occur during <strong>H2 Silver Bullet windows</strong> of London/NYAM/NYPM sessions.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">C3 Expectation Box</h4>
                  <p className="text-sm text-muted-foreground">The indicator draws a box showing where C3 expansion should reach. If price fails to reach the C3 box, the setup may be invalid. Use this for confirmation and invalidation.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">SMT Confluence</h4>
                  <p className="text-sm text-muted-foreground">When C2 pattern forms AND shows SMT divergence with correlated pairs (ES, NQ, YM), it significantly increases probability. Look for the SMT label to appear alongside C2.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "cisd":
        return (
          <div className="space-y-6">
            <div className="rounded-xl overflow-hidden border-2 border-orange-500/20 bg-card">
              <img 
                src={cisdLtfChart} 
                alt="Lower Time Frame CISD Detection" 
                className="w-full h-auto"
                style={{ clipPath: "inset(0 0 12% 0)" }}
              />
            </div>
            <Card className="border-2 border-orange-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 text-white">
                    <Zap className="w-5 h-5" />
                  </div>
                  CISD (Change in State of Delivery)
                </CardTitle>
                <CardDescription>Market phase transitions with target projections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">What is CISD?</h4>
                  <p className="text-sm text-muted-foreground">CISD marks the level where market shifts from one delivery phase to another. After a sweep, CISD forms at the reversal point and becomes your entry level for retests.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Target Projections</h4>
                  <p className="text-sm text-muted-foreground">From CISD level, projections show expected target levels: <strong>1x</strong> (first TP), <strong>2-2.5x</strong> (main target), <strong>3.5-4x</strong> (extension). These are based on the range size.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Entry Strategy</h4>
                  <p className="text-sm text-muted-foreground">Enter on <strong>retest of CISD level</strong> after it forms. Wait for price to pull back to CISD, then enter on confirmation (engulfing, wick rejection, etc.).</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "ifvg":
        return (
          <div className="space-y-6">
            <Card className="border-2 border-indigo-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                    <Layers className="w-5 h-5" />
                  </div>
                  iFVG (Inverse Fair Value Gap)
                </CardTitle>
                <CardDescription>Fair value gaps that form after valid sweeps</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">What is an iFVG?</h4>
                  <p className="text-sm text-muted-foreground">An iFVG is a fair value gap (price inefficiency) that forms during the reversal phase after a valid liquidity sweep. It's the "gap" left behind as price quickly reverses.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">How to Use iFVGs</h4>
                  <p className="text-sm text-muted-foreground">iFVGs act as support/resistance zones. <strong>Bullish iFVGs</strong> (green boxes) provide support on pullbacks. <strong>Bearish iFVGs</strong> (red boxes) provide resistance on rallies. Enter when price retests the iFVG.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">iFVG + CISD Combo</h4>
                  <p className="text-sm text-muted-foreground">Best entries occur when CISD level aligns with an iFVG. This gives you both a state change level AND a fair value gap for confluence.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "smt":
        return (
          <div className="space-y-6">
            <div className="rounded-xl overflow-hidden border-2 border-purple-500/20 bg-card">
              <img 
                src={smtLtfChart} 
                alt="Lower Time Frame SMT Divergence" 
                className="w-full h-auto"
                style={{ clipPath: "inset(0 0 12% 0)" }}
              />
            </div>
            <Card className="border-2 border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                    <GitCompare className="w-5 h-5" />
                  </div>
                  SMT (Smart Money Technique)
                </CardTitle>
                <CardDescription>Divergence detection between correlated assets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">What is SMT?</h4>
                  <p className="text-sm text-muted-foreground">SMT detects when correlated assets (like ES, NQ, YM) diverge at highs or lows. When one makes a new high/low but the others don't, it shows smart money positioning for reversal.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Binary vs Triad Mode</h4>
                  <p className="text-sm text-muted-foreground"><strong>Binary:</strong> Compares 2 assets. <strong>Triad:</strong> Compares 3 assets (algorithm picks the strongest divergence). Triad provides more confirmation but is stricter.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">How to Use SMT</h4>
                  <p className="text-sm text-muted-foreground">Look for SMT divergence at BSL/SSL sweeps. If price sweeps liquidity AND shows SMT divergence with correlated assets, it's a high-confidence reversal setup.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "sessions":
        return (
          <div className="space-y-6">
            {/* Live Session Models Table */}
            <SessionModelsTable />
            
            <Card className="border-2 border-pink-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 text-white">
                    <Clock className="w-5 h-5" />
                  </div>
                  Session Models & Hour-Based Trading
                </CardTitle>
                <CardDescription>Understanding H1-H4 models for session-based entries</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Three Primary Sessions</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <p className="font-medium text-blue-400">London (2:00-6:00 UTC)</p>
                      <p className="text-xs text-muted-foreground mt-1">First major liquidity event of the day. Sets up Asia sweeps and defines early bias.</p>
                    </div>
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <p className="font-medium text-emerald-400">NY AM (13:00-17:00 UTC)</p>
                      <p className="text-xs text-muted-foreground mt-1">Highest volume session. Often reverses London bias or extends it. Most reliable patterns.</p>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <p className="font-medium text-purple-400">NY PM (17:00-21:00 UTC)</p>
                      <p className="text-xs text-muted-foreground mt-1">Afternoon session. Extends NYAM move or consolidates into next day setup.</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">H1-H4 Session Model</h4>
                  <p className="text-sm text-muted-foreground mb-3">Each 4-hour session is divided into 4 hourly models that guide trade timing:</p>
                  <div className="space-y-2 text-sm">
                    <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                      <p className="font-medium text-orange-400">H1 (Setup Hour)</p>
                      <p className="text-xs text-muted-foreground mt-1">First hour of session. Market builds range, identifies liquidity above/below. No entries yet - observe.</p>
                      <p className="text-xs text-muted-foreground mt-1"><strong>Macro:</strong> :05-:10 (first 5-10 minutes of hour)</p>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <p className="font-medium text-purple-400">H2 (Quiet/Silver Bullet Hour)</p>
                      <p className="text-xs text-muted-foreground mt-1">Optimal entry window. Price sweeps liquidity and reverses. <strong>Silver Bullet Window</strong> typically occurs here.</p>
                      <p className="text-xs text-muted-foreground mt-1"><strong>Silver Bullet:</strong> Hour 2 of each session (3:00-4:00 UTC for London, 14:00-15:00 for NYAM, 18:00-19:00 for NYPM)</p>
                      <p className="text-xs text-muted-foreground mt-1"><strong>Macro:</strong> :50-:55 (last 5-10 minutes of hour)</p>
                    </div>
                    <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                      <p className="font-medium text-cyan-400">H3 (Catalyst Hour)</p>
                      <p className="text-xs text-muted-foreground mt-1">News/momentum drives directional move. Entry follow-through from H2 sweep. Manage existing positions.</p>
                    </div>
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <p className="font-medium text-emerald-400">H4 (Delivery Hour)</p>
                      <p className="text-xs text-muted-foreground mt-1">Final push to targets. Delivery phase completes. Take profits, let runners extend.</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Silver Bullet Strategy</h4>
                  <p className="text-sm text-muted-foreground">The Silver Bullet hour (H2 of each session) is your optimal entry window. Price typically sweeps H1 liquidity and reverses during this hour. Enter on the reversal with stops beyond the sweep.</p>
                  <p className="text-sm text-muted-foreground mt-2"><strong>Best Practice:</strong> Combine Silver Bullet timing with CISD retest + iFVG for highest-probability entries.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Macro Windows (:05-:10 and :50-:55)</h4>
                  <p className="text-sm text-muted-foreground">Within each hour, Macro windows represent micro-timing for entries. During H1, use :05-:10. During H2+, use :50-:55. These are 5-10 minute windows where algorithmic orders cluster.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Practical Application</h4>
                  <p className="text-sm text-muted-foreground"><strong>Step 1:</strong> Identify active session (London/NYAM/NYPM)</p>
                  <p className="text-sm text-muted-foreground mt-1"><strong>Step 2:</strong> Wait for H2 (Silver Bullet hour)</p>
                  <p className="text-sm text-muted-foreground mt-1"><strong>Step 3:</strong> Look for sweep + reversal during this hour</p>
                  <p className="text-sm text-muted-foreground mt-1"><strong>Step 4:</strong> Enter on CISD retest, target delivery in H3-H4</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-4">
            <div className="p-6 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-6">
              <Settings className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="text-xl font-bold mb-2 text-center">Indicator Settings</h3>
              <p className="text-sm text-muted-foreground text-center">Configure all MECHA-X components</p>
            </div>

            <TradingViewSettings />
          </div>
        );

      case "education":
        return (
          <div className="space-y-6">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Target className="w-5 h-5 md:w-6 md:h-6" />
                  1H/4H Profiling Models - Quick Reference
                </CardTitle>
                <CardDescription>CISD retest entries with target-based market phases</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="strategy">
                    <AccordionTrigger>Entry Strategy</AccordionTrigger>
                    <AccordionContent className="space-y-4 text-sm">
                      <div>
                        <h4 className="font-semibold mb-2">CISD Retest Entry</h4>
                        <p className="text-muted-foreground">Enter on retest of the CISD level after it forms. Wait for price to pull back to the CISD, then enter on confirmation.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Primary Targets</h4>
                        <p className="text-muted-foreground">Target 1x (first take profit) and 2-2.5x (main target). These are your high-probability zones.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="phases">
                    <AccordionTrigger>Market Phases by Target</AccordionTrigger>
                    <AccordionContent className="space-y-4 text-sm">
                      <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <h4 className="font-semibold mb-1 text-blue-400">1x - 1.5x: Accumulation/Re-Accumulation</h4>
                        <p className="text-muted-foreground text-xs">Price is building position, consolidating, preparing for next move. This is where smart money accumulates.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <h4 className="font-semibold mb-1 text-orange-400">2x - 2.5x: Manipulation Zone</h4>
                        <p className="text-muted-foreground text-xs">Main target area. Price often reverses here as liquidity is taken and positions are flipped. High-probability reversal zone.</p>
                      </div>
                      <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <h4 className="font-semibold mb-1 text-purple-400">3.5x - 4x: Expansion/Distribution</h4>
                        <p className="text-muted-foreground text-xs">Extended move, distribution phase. Smart money exits, retail chases. Use for runner targets only.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="execution">
                    <AccordionTrigger>Trade Execution</AccordionTrigger>
                    <AccordionContent className="space-y-4 text-sm">
                      <div>
                        <h4 className="font-semibold mb-2">Step 1: Wait for CISD</h4>
                        <p className="text-muted-foreground">CISD forms when structure changes (lower lows → higher lows or vice versa). Mark the level.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Step 2: Wait for Retest</h4>
                        <p className="text-muted-foreground">Price must pull back to CISD level. This is your entry zone. Don't chase.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Step 3: Enter on Confirmation</h4>
                        <p className="text-muted-foreground">Enter when price shows confirmation at CISD (opposing candle, FVG fill, etc.).</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Step 4: Target Management</h4>
                        <p className="text-muted-foreground">Take partial profit at 1x, main exit at 2-2.5x. Let runner target 3.5-4x only with trailing stop.</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <div className="p-6 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-center">
              <BookOpen className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="text-lg font-bold mb-2">Want More?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                This tab shows the 1H/4H profiling quick reference. For the complete education including TTrades Model, 4H Profiling, Liquidity concepts, and more...
              </p>
              <Button onClick={() => navigate('/knowledge')} className="gap-2">
                <BookOpen className="w-4 h-4" />
                Open Full Knowledge Base
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      <div className="sticky top-0 z-50 backdrop-blur-lg bg-background/95 border-b border-border/50">
        <div className="container mx-auto px-3 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              <img src={mechaxLogo} alt="MECHA-X" className="w-10 h-10 md:w-12 md:h-12 rounded-lg" />
              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">MECHA-X</h1>
                <p className="text-[10px] md:text-xs text-muted-foreground">Trading Intelligence</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/knowledge')}>
              <BookOpen className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Full Education</span>
              <span className="sm:hidden">Education</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 md:px-6 py-6 md:py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Badge variant="outline" className="mb-2"><TrendingUp className="w-3 h-3 mr-2" />HTF Framework</Badge>
          <h2 className="text-2xl md:text-4xl font-bold">Multi-Timeframe Trading Intelligence</h2>
          <p className="text-sm md:text-base text-muted-foreground mt-2">Institutional liquidity detection & pattern recognition</p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="overview"><Sparkles className="w-4 h-4 mr-1" />Overview</TabsTrigger>
            <TabsTrigger value="settings"><Settings className="w-4 h-4 mr-1" />Settings</TabsTrigger>
            <TabsTrigger value="education"><BookOpen className="w-4 h-4 mr-1" />Education</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">{renderSectionDetails("overview")}</TabsContent>
          <TabsContent value="settings">{renderSectionDetails("settings")}</TabsContent>
          <TabsContent value="education">{renderSectionDetails("education")}</TabsContent>
          {/* Overview deep-dive sections (no triggers, opened via Overview cards) */}
          <TabsContent value="htf">{renderSectionDetails("htf")}</TabsContent>
          <TabsContent value="liquidity">{renderSectionDetails("liquidity")}</TabsContent>
          <TabsContent value="patterns">{renderSectionDetails("patterns")}</TabsContent>
          <TabsContent value="cisd">{renderSectionDetails("cisd")}</TabsContent>
          <TabsContent value="ifvg">{renderSectionDetails("ifvg")}</TabsContent>
          <TabsContent value="smt">{renderSectionDetails("smt")}</TabsContent>
          <TabsContent value="sessions">{renderSectionDetails("sessions")}</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
