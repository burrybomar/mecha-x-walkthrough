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
import { SimpleChart } from "@/components/SimpleChart";
import { PatternChart } from "@/components/PatternChart";

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
            <SimpleChart 
              type="htf" 
              title="HTF Sweep Detection" 
              description="Overlay higher timeframe candles on any chart - Auto mode intelligently selects HTFs, Manual mode gives full control (up to 4 timeframes)"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Auto Mode", desc: "Smart HTF selection: 5min chart → shows 1H, 4H, Daily automatically", detail: "15min → 4H, Daily, Weekly" },
                { title: "Manual Mode", desc: "Configure up to 4 custom HTFs with candle count, mapping, and offset control", detail: "Full customization of display" },
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
                </Card>
              ))}
            </div>
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
                  <h4 className="font-semibold mb-2">What are BSL/SSL Lines?</h4>
                  <p className="text-sm text-muted-foreground">BSL (Buyside Liquidity) marks highs where stop losses sit above. SSL (Sellside Liquidity) marks lows where stops sit below. These are key levels that price targets to "sweep" liquidity.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Valid vs Invalid Sweeps</h4>
                  <p className="text-sm text-muted-foreground"><strong>Valid:</strong> Price sweeps the level and reverses (holds). <strong>Invalid:</strong> Price sweeps but continues through without reversing. Only valid sweeps are high-probability setups.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">LTF vs HTF Sweeps</h4>
                  <p className="text-sm text-muted-foreground"><strong>LTF:</strong> Lower timeframe sweeps (chart TF). <strong>HTF:</strong> Higher timeframe sweeps (4H, Daily, etc.). HTF sweeps are more significant and reliable.</p>
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
                  <h4 className="font-semibold mb-2">C2 (Reversal Candle)</h4>
                  <p className="text-sm text-muted-foreground">The C2 label marks the exact candle where price swept liquidity and reversed. This is your key entry candle - the reversal point after the sweep.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">C3 (Expansion Candle)</h4>
                  <p className="text-sm text-muted-foreground">C3 marks the expansion candle that confirms the reversal. Shows momentum building in the reversal direction. The C3 expectation box shows where price should expand to.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">SMT Divergence</h4>
                  <p className="text-sm text-muted-foreground">Smart Money Technique - detects divergence between correlated assets. Binary mode uses 2 assets, Triad uses 3. SMT at sweeps confirms smart money positioning.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "cisd":
        return (
          <div className="space-y-6">
            <SimpleChart 
              type="cisd" 
              title="CISD Detection" 
              description="Change in State of Delivery - marks when market shifts from one phase to another"
            />
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
            <Card className="border-2 border-pink-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 text-white">
                    <Clock className="w-5 h-5" />
                  </div>
                  Sessions & Time Windows
                </CardTitle>
                <CardDescription>Trading session tracking with Silver Bullet and Macro windows</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Session Models Table</h4>
                  <p className="text-sm text-muted-foreground">Shows current session (Asian, London, New York), time remaining in session, and which Silver Bullet or Macro window is active. Helps time your entries.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Silver Bullet Windows</h4>
                  <p className="text-sm text-muted-foreground">Specific time windows with highest probability setups: <strong>3:00-4:00 AM EST</strong> (London SB) and <strong>10:00-11:00 AM EST</strong> (NY AM SB). Look for sweeps during these times.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Macro Windows</h4>
                  <p className="text-sm text-muted-foreground">Short 15-minute windows of high volatility within each session. Macros are when smart money typically makes moves. Combine with HTF sweep setups.</p>
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
              <h3 className="text-xl font-bold mb-2 text-center">Script Settings</h3>
              <p className="text-sm text-muted-foreground text-center">Configure all MECHA-X components</p>
            </div>

            <div className="bg-card border border-border rounded-lg">
              <Accordion type="multiple" className="w-full">
                {/* Display Settings */}
                <AccordionItem value="display">
                  <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50">
                    <span className="font-semibold">Display Settings</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-2 pb-2">
                    <SelectSetting label="Font" options={["Default", "Monospace"]} defaultValue="Default" />
                    <SelectSetting label="Text Size" options={["Tiny", "Small", "Normal", "Large", "Huge", "Auto"]} defaultValue="Normal" />
                  </AccordionContent>
                </AccordionItem>

                {/* HTF Setup */}
                <AccordionItem value="htf-setup">
                  <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50">
                    <span className="font-semibold">HTF Setup</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-2 pb-2">
                    <SelectSetting label="Mode" options={["Auto", "Manual"]} defaultValue="Auto" />
                    <div className="space-y-3 mt-3">
                      {[1, 2, 3, 4].map((num) => (
                        <div key={num} className="border border-border rounded p-2">
                          <h4 className="font-medium mb-1 text-xs text-muted-foreground px-2">TF {num} (Manual Mode)</h4>
                          <ToggleSetting label="Show" />
                          <SelectSetting label="Timeframe" options={["15m", "1H", "4H", "1D", "1W"]} defaultValue="4H" />
                          <NumberSetting label="Bars" defaultValue={10} />
                          <ToggleSetting label="Map" />
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* HTF Candles Display */}
                <AccordionItem value="htf-candles">
                  <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50">
                    <span className="font-semibold">HTF Candles Display</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-2 pb-2">
                    <div className="mb-3">
                      <h4 className="font-medium mb-1 text-xs text-muted-foreground px-2">Colors</h4>
                      <ColorSetting label="Bull" defaultColor="#00ff00" />
                      <ColorSetting label="Bear" defaultColor="#000000" />
                      <ColorSetting label="Wick" defaultColor="#808080" />
                    </div>
                    <div className="mb-3">
                      <h4 className="font-medium mb-1 text-xs text-muted-foreground px-2">Position & Size</h4>
                      <NumberSetting label="Offset" defaultValue={25} />
                      <NumberSetting label="Gap" defaultValue={2} />
                      <SelectSetting label="Width" options={["Tiny", "Small", "Medium", "Large", "Huge"]} defaultValue="Medium" />
                    </div>
                    <div className="mb-3">
                      <h4 className="font-medium mb-1 text-xs text-muted-foreground px-2">Bias Arrow</h4>
                      <ToggleSetting label="Show Bias Arrow" />
                      <ColorSetting label="Bull Arrow" defaultColor="#00ff00" />
                      <ColorSetting label="Bear Arrow" defaultColor="#ff0000" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-xs text-muted-foreground px-2">Labels</h4>
                      <SelectSetting label="Position" options={["Above", "Below", "Inside"]} defaultValue="Above" />
                      <SelectSetting label="Size" options={["Tiny", "Small", "Normal", "Large"]} defaultValue="Normal" />
                      <ColorSetting label="Color" defaultColor="#ffffff" />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Chart Mapping */}
                <AccordionItem value="chart-mapping">
                  <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50">
                    <span className="font-semibold">Chart Mapping</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-2 pb-2">
                    <div className="mb-3">
                      <h4 className="font-medium mb-1 text-xs text-muted-foreground px-2">BSL/SSL Lines</h4>
                      <ToggleSetting label="Enable" />
                      <SelectSetting label="Style" options={["Solid", "Dashed", "Dotted"]} defaultValue="Solid" />
                      <NumberSetting label="Width" defaultValue={1} />
                      <ToggleSetting label="Labels" />
                      <NumberSetting label="Count" defaultValue={10} />
                    </div>
                    <div className="mb-3">
                      <h4 className="font-medium mb-1 text-xs text-muted-foreground px-2">Dividers (Open/Close)</h4>
                      <ToggleSetting label="Auto Hierarchy" />
                      <ToggleSetting label="≤1H (Dotted)" />
                      <ToggleSetting label="4-8H (Dashed)" />
                      <ToggleSetting label="1D (Solid)" />
                      <ToggleSetting label="1W+ (Bold)" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-xs text-muted-foreground px-2">EQ Lines</h4>
                      <ToggleSetting label="Enable" />
                      <SelectSetting label="Style" options={["Solid", "Dashed", "Dotted"]} defaultValue="Dashed" />
                      <NumberSetting label="Width" defaultValue={1} />
                      <ToggleSetting label="Labels" />
                      <NumberSetting label="Count" defaultValue={10} />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Liquidity Sweeps */}
                <AccordionItem value="sweeps">
                  <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50">
                    <span className="font-semibold">Liquidity Sweeps</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-2 pb-2">
                    <div className="mb-3">
                      <h4 className="font-medium mb-1 text-xs text-muted-foreground px-2">Enable</h4>
                      <ToggleSetting label="Enable" />
                      <ToggleSetting label="LTF" />
                      <ToggleSetting label="HTF" />
                      <ToggleSetting label="Live" />
                    </div>
                    <div className="mb-3">
                      <h4 className="font-medium mb-1 text-xs text-muted-foreground px-2">Valid Sweeps</h4>
                      <SelectSetting label="Style" options={["Solid", "Dashed", "Dotted"]} defaultValue="Solid" />
                      <NumberSetting label="Width" defaultValue={1} />
                      <ColorSetting label="Color" defaultColor="#000000" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-xs text-muted-foreground px-2">Invalid Sweeps</h4>
                      <ToggleSetting label="Show Invalid" />
                      <ToggleSetting label="Invalid LTF" />
                      <ToggleSetting label="Invalid HTF" />
                      <ColorSetting label="Color" defaultColor="#808080" />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Pattern Detection */}
                <AccordionItem value="patterns">
                  <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50">
                    <span className="font-semibold">Pattern Detection</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-2 pb-2">
                    <div className="mb-3">
                      <h4 className="font-medium mb-1 text-xs text-muted-foreground px-2">C2 Labels</h4>
                      <ToggleSetting label="Show" />
                      <SelectSetting label="Size" options={["Tiny", "Small", "Normal", "Large", "Huge"]} defaultValue="Normal" />
                      <ColorSetting label="Color" defaultColor="#000000" />
                    </div>
                    <div className="mb-3">
                      <h4 className="font-medium mb-1 text-xs text-muted-foreground px-2">C3 Labels</h4>
                      <ToggleSetting label="Show" />
                      <SelectSetting label="Size" options={["Tiny", "Small", "Normal", "Large", "Huge"]} defaultValue="Normal" />
                      <ColorSetting label="Color" defaultColor="#800080" />
                    </div>
                    <div className="mb-3">
                      <h4 className="font-medium mb-1 text-xs text-muted-foreground px-2">C3 Expectation Box</h4>
                      <ToggleSetting label="Show C3 Box" />
                      <ColorSetting label="Bull Box" defaultColor="#00ff00" />
                      <ColorSetting label="Bear Box" defaultColor="#ff0000" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-xs text-muted-foreground px-2">SMT</h4>
                      <ToggleSetting label="Enable" />
                      <SelectSetting label="Mode" options={["Binary", "Triad"]} defaultValue="Binary" />
                      <div className="flex items-center justify-between py-2 px-3 hover:bg-muted/30 rounded transition-colors">
                        <Label className="text-sm">Asset Override</Label>
                        <Input type="text" placeholder="ES,NQ" className="w-32 h-8 text-xs" />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* CISD Settings */}
                <AccordionItem value="cisd">
                  <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50">
                    <span className="font-semibold">CISD Settings</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-2 pb-2">
                    <div className="mb-3">
                      <h4 className="font-medium mb-1 text-xs text-muted-foreground px-2">CISD Line</h4>
                      <ToggleSetting label="Enable" />
                      <SelectSetting label="Style" options={["Solid", "Dashed", "Dotted"]} defaultValue="Solid" />
                      <NumberSetting label="Width" defaultValue={2} />
                      <ColorSetting label="Bull Color" defaultColor="#00ff00" />
                      <ColorSetting label="Bear Color" defaultColor="#ff0000" />
                    </div>
                    <div className="mb-3">
                      <h4 className="font-medium mb-1 text-xs text-muted-foreground px-2">CISD Label</h4>
                      <div className="flex items-center justify-between py-2 px-3 hover:bg-muted/30 rounded transition-colors">
                        <Label className="text-sm">Text</Label>
                        <Input type="text" defaultValue="CISD" className="w-24 h-8 text-xs" />
                      </div>
                      <SelectSetting label="Size" options={["Tiny", "Small", "Normal", "Large", "Huge"]} defaultValue="Normal" />
                      <ColorSetting label="Bull Label" defaultColor="#00ff00" />
                      <ColorSetting label="Bear Label" defaultColor="#ff0000" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-xs text-muted-foreground px-2">Projections</h4>
                      <ToggleSetting label="Enable" />
                      <div className="flex items-center justify-between py-2 px-3 hover:bg-muted/30 rounded transition-colors">
                        <Label className="text-sm">Bullish Targets</Label>
                        <Input type="text" defaultValue="1,2,2.5,3.5,4" className="w-32 h-8 text-xs" />
                      </div>
                      <div className="flex items-center justify-between py-2 px-3 hover:bg-muted/30 rounded transition-colors">
                        <Label className="text-sm">Bearish Targets</Label>
                        <Input type="text" defaultValue="1,2,2.5,3.5,4" className="w-32 h-8 text-xs" />
                      </div>
                      <SelectSetting label="Style" options={["Solid", "Dashed", "Dotted"]} defaultValue="Dashed" />
                      <ColorSetting label="Bull Projection" defaultColor="#00ff00" />
                      <ColorSetting label="Bear Projection" defaultColor="#ff0000" />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* iFVG Settings */}
                <AccordionItem value="ifvg">
                  <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50">
                    <span className="font-semibold">iFVG Settings</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-2 pb-2">
                    <ToggleSetting label="Show" />
                    <ColorSetting label="Bull Color" defaultColor="#00ff0033" />
                    <ColorSetting label="Bear Color" defaultColor="#ff000033" />
                  </AccordionContent>
                </AccordionItem>

                {/* Alerts & Sessions */}
                <AccordionItem value="alerts">
                  <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50">
                    <span className="font-semibold">Alerts & Sessions</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-2 pb-2">
                    <div className="mb-3">
                      <h4 className="font-medium mb-1 text-xs text-muted-foreground px-2">Alerts</h4>
                      <ToggleSetting label="Formation" />
                      <ToggleSetting label="Failure" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-xs text-muted-foreground px-2">Session Models Table</h4>
                      <ToggleSetting label="Show" />
                      <SelectSetting label="Position" options={["Top Left", "Top Right", "Bottom Left", "Bottom Right"]} defaultValue="Top Left" />
                      <SelectSetting label="Size" options={["Tiny", "Small", "Normal", "Large"]} defaultValue="Normal" />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
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
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
