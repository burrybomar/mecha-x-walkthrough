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

  const SettingRow = ({ title, description }: { title: string; description: string }) => (
    <div className="flex items-center justify-between py-3 px-4 hover:bg-muted/50 rounded-md transition-colors">
      <div className="flex-1">
        <Label className="text-sm font-medium cursor-pointer">{title}</Label>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <Switch className="ml-4" />
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
                <AccordionItem value="display">
                  <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50">
                    <span className="font-semibold">Display Settings</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-1">
                      <SettingRow title="Show HTF Candles" description="Toggle higher timeframe candle overlay" />
                      <SettingRow title="Show Chart Mapping" description="BSL/SSL lines, EQ, and dividers" />
                      <SettingRow title="Show Liquidity Sweeps" description="LTF + HTF sweep detection" />
                      <SettingRow title="Show C2 Labels" description="Pattern reversal markers" />
                      <SettingRow title="Show CISD" description="Change in State of Delivery projections" />
                      <SettingRow title="Show iFVG" description="Inverse Fair Value Gap zones" />
                      <SettingRow title="Show SMT" description="Smart Money Technique divergence" />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="htf-setup">
                  <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50">
                    <span className="font-semibold">HTF Setup</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-1">
                      <SettingRow title="HTF Mode" description="Auto or Manual timeframe selection" />
                      <SettingRow title="Auto HTF Count" description="Number of HTFs in Auto mode (1-4)" />
                      <SettingRow title="HTF Shift Type" description="Live or Historical offset" />
                      <SettingRow title="Historical Shift" description="Number of candles to offset" />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="htf-candles">
                  <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50">
                    <span className="font-semibold">HTF Candles (Manual Mode)</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-4">
                      {[1, 2, 3, 4].map((num) => (
                        <div key={num} className="border border-border rounded-lg p-3">
                          <h4 className="font-medium mb-2 text-sm">HTF {num}</h4>
                          <div className="space-y-1">
                            <SettingRow title="Enable" description={`Turn HTF ${num} on/off`} />
                            <SettingRow title="Timeframe" description="Select timeframe (60=1H, 240=4H)" />
                            <SettingRow title="Candle Count" description="Number of candles to display" />
                            <SettingRow title="Offset" description="Historical shift amount" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="chart">
                  <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50">
                    <span className="font-semibold">Chart Mapping</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-1">
                      <SettingRow title="BSL Color" description="Buyside liquidity line color" />
                      <SettingRow title="SSL Color" description="Sellside liquidity line color" />
                      <SettingRow title="Show EQ" description="Equilibrium (50%) line" />
                      <SettingRow title="Show Dividers" description="Session/day separators" />
                      <SettingRow title="Draw on Liquidity (DOL)" description="Show C1 target levels" />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="sweeps">
                  <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50">
                    <span className="font-semibold">Liquidity Sweeps</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-1">
                      <SettingRow title="LTF Sweeps" description="Lower timeframe sweep detection" />
                      <SettingRow title="HTF Sweeps" description="Higher timeframe sweep detection" />
                      <SettingRow title="Valid Sweep Color" description="Color for confirmed sweeps" />
                      <SettingRow title="Invalid Sweep Color" description="Color for failed sweeps" />
                      <SettingRow title="Sweep Lookback" description="Candles to scan for sweeps" />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="patterns">
                  <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50">
                    <span className="font-semibold">C2 Pattern Detection</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-1">
                      <SettingRow title="Show C2 Labels" description="Display C2 reversal markers" />
                      <SettingRow title="C2 Label Size" description="Text size for labels" />
                      <SettingRow title="Show C3 Box" description="C3 expansion zone visualization" />
                      <SettingRow title="C2 Bull Color" description="Bullish C2 label color" />
                      <SettingRow title="C2 Bear Color" description="Bearish C2 label color" />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cisd">
                  <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50">
                    <span className="font-semibold">CISD Configuration</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-1">
                      <SettingRow title="CISD Detection" description="Enable state change detection" />
                      <SettingRow title="Show Projections" description="Multi-target projection lines" />
                      <SettingRow title="Bull CISD 1x" description="Bullish 1x target" />
                      <SettingRow title="Bull CISD 2x" description="Bullish 2x target" />
                      <SettingRow title="Bull CISD 2.5x" description="Bullish 2.5x target" />
                      <SettingRow title="Bull CISD 3.5x" description="Bullish 3.5x target" />
                      <SettingRow title="Bull CISD 4x" description="Bullish 4x target" />
                      <SettingRow title="Bear CISD Targets" description="Bearish projections (1x-4x)" />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="ifvg">
                  <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50">
                    <span className="font-semibold">iFVG Settings</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-1">
                      <SettingRow title="iFVG Detection" description="Enable iFVG marking" />
                      <SettingRow title="iFVG Box Style" description="Visualization style" />
                      <SettingRow title="Bull iFVG Color" description="Bullish iFVG color" />
                      <SettingRow title="Bear iFVG Color" description="Bearish iFVG color" />
                      <SettingRow title="iFVG Transparency" description="Box fill opacity (0-100)" />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="alerts">
                  <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted/50">
                    <span className="font-semibold">Alerts & Sessions</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-1">
                      <SettingRow title="Alert on Valid Sweep" description="Notify when sweep confirms" />
                      <SettingRow title="Alert on CISD" description="Notify on state change" />
                      <SettingRow title="Alert on iFVG" description="Notify on iFVG formation" />
                      <SettingRow title="Show Sessions" description="Display Asia/London/NY windows" />
                      <SettingRow title="Show Silver Bullet" description="1H SB windows (10-11 AM, 2-3 PM)" />
                      <SettingRow title="Show Macro Windows" description="20min macro entry windows" />
                      <SettingRow title="SMT Mode" description="Binary or Triad comparison" />
                      <SettingRow title="SMT Assets" description="Assets for SMT analysis" />
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
                  1H/4H Profiling Models
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
