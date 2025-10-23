import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
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

  const SettingItem = ({ title, description, tooltip }: { title: string; description: string; tooltip: string }) => (
    <TooltipProvider>
      <div className="flex items-start gap-3 p-4 rounded-lg bg-card/50 border border-border hover:border-primary/50 transition-all group">
        <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <h4 className="font-semibold text-sm cursor-help hover:text-primary transition-colors">{title}</h4>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </TooltipProvider>
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
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
              <Settings className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="text-xl font-bold mb-2 text-center">MECHA-X Settings Guide</h3>
              <p className="text-sm text-muted-foreground text-center">
                Complete configuration reference for all MECHA-X components
              </p>
            </div>
            <Tabs defaultValue="display" className="w-full">
              <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 h-auto gap-1 bg-muted/50 p-1">
                <TabsTrigger value="display" className="text-xs">Display</TabsTrigger>
                <TabsTrigger value="htf-setup" className="text-xs">HTF Setup</TabsTrigger>
                <TabsTrigger value="htf-candles" className="text-xs">HTF Candles</TabsTrigger>
                <TabsTrigger value="chart" className="text-xs">Chart</TabsTrigger>
                <TabsTrigger value="sweeps" className="text-xs">Sweeps</TabsTrigger>
                <TabsTrigger value="patterns" className="text-xs">Patterns</TabsTrigger>
                <TabsTrigger value="cisd" className="text-xs">CISD</TabsTrigger>
                <TabsTrigger value="ifvg" className="text-xs">iFVG</TabsTrigger>
                <TabsTrigger value="alerts" className="text-xs">Alerts</TabsTrigger>
              </TabsList>

              <TabsContent value="display" className="space-y-4 mt-4">
                <h3 className="font-bold text-lg">Display Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <SettingItem 
                    title="Show HTF Candles" 
                    description="Toggle higher timeframe candle overlay"
                    tooltip="Enable/disable the display of HTF candles on your current chart timeframe"
                  />
                  <SettingItem 
                    title="Show Chart Mapping" 
                    description="BSL/SSL lines, EQ, and dividers"
                    tooltip="Shows buyside/sellside liquidity levels, equilibrium lines, and session dividers"
                  />
                  <SettingItem 
                    title="Show Liquidity Sweeps" 
                    description="LTF + HTF sweep detection"
                    tooltip="Displays both lower and higher timeframe liquidity sweep markers"
                  />
                  <SettingItem 
                    title="Show C2 Labels" 
                    description="Pattern reversal markers"
                    tooltip="Shows C2 reversal candle labels after valid sweeps"
                  />
                  <SettingItem 
                    title="Show CISD" 
                    description="Change in State of Delivery"
                    tooltip="Displays CISD levels with multi-target projections when market structure changes"
                  />
                  <SettingItem 
                    title="Show iFVG" 
                    description="Inverse Fair Value Gaps"
                    tooltip="Shows iFVG boxes that form after valid sweeps"
                  />
                  <SettingItem 
                    title="Show SMT" 
                    description="Smart Money Technique divergence"
                    tooltip="Displays SMT divergence signals between correlated assets"
                  />
                </div>
              </TabsContent>

              <TabsContent value="htf-setup" className="space-y-4 mt-4">
                <h3 className="font-bold text-lg">HTF Setup</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <SettingItem 
                    title="HTF Mode" 
                    description="Auto or Manual timeframe selection"
                    tooltip="Auto: Intelligently selects HTFs based on current chart TF. Manual: You configure each HTF"
                  />
                  <SettingItem 
                    title="Auto HTF Count" 
                    description="Number of HTFs in Auto mode"
                    tooltip="How many higher timeframes to display when using Auto mode (1-4)"
                  />
                  <SettingItem 
                    title="HTF Shift Type" 
                    description="Live or Historical offset"
                    tooltip="Live: HTF updates in real-time. Historical: Shifts HTF back by specified candles"
                  />
                  <SettingItem 
                    title="Historical Shift" 
                    description="Number of candles to offset"
                    tooltip="When using Historical mode, how many candles back to shift the HTF display"
                  />
                </div>
              </TabsContent>

              <TabsContent value="htf-candles" className="space-y-4 mt-4">
                <h3 className="font-bold text-lg">HTF Candles (Manual Mode)</h3>
                <div className="space-y-6">
                  {[1, 2, 3, 4].map((num) => (
                    <Card key={num} className="border-2">
                      <CardHeader>
                        <CardTitle className="text-base">HTF {num} Configuration</CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <SettingItem 
                          title={`HTF ${num} Enable`}
                          description="Turn this HTF slot on/off"
                          tooltip={`Enable or disable HTF slot ${num}`}
                        />
                        <SettingItem 
                          title={`HTF ${num} Timeframe`}
                          description="Select timeframe (e.g., 240 = 4H)"
                          tooltip={`The timeframe in minutes for HTF ${num}. 60=1H, 240=4H, D=Daily`}
                        />
                        <SettingItem 
                          title={`HTF ${num} Candle Count`}
                          description="Number of HTF candles to show"
                          tooltip={`How many HTF candles to display on chart for HTF ${num}`}
                        />
                        <SettingItem 
                          title={`HTF ${num} Offset`}
                          description="Historical shift amount"
                          tooltip={`Shift HTF ${num} back by this many candles (0 = live)`}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="chart" className="space-y-4 mt-4">
                <h3 className="font-bold text-lg">Chart Mapping</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <SettingItem 
                    title="BSL Color" 
                    description="Buyside liquidity line color"
                    tooltip="Customize the color of BSL (buyside liquidity) lines above highs"
                  />
                  <SettingItem 
                    title="SSL Color" 
                    description="Sellside liquidity line color"
                    tooltip="Customize the color of SSL (sellside liquidity) lines below lows"
                  />
                  <SettingItem 
                    title="Show EQ" 
                    description="Equilibrium (50%) line"
                    tooltip="Display the midpoint line between BSL and SSL"
                  />
                  <SettingItem 
                    title="Show Dividers" 
                    description="Session/day separators"
                    tooltip="Vertical lines marking session boundaries and day changes"
                  />
                  <SettingItem 
                    title="Draw on Liquidity (DOL)" 
                    description="Show C1 target levels"
                    tooltip="Display the liquidity level (C1) as the target for C2→C3 moves"
                  />
                </div>
              </TabsContent>

              <TabsContent value="sweeps" className="space-y-4 mt-4">
                <h3 className="font-bold text-lg">Liquidity Sweeps</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <SettingItem 
                    title="LTF Sweeps" 
                    description="Lower timeframe sweep detection"
                    tooltip="Detect sweeps on the current chart timeframe"
                  />
                  <SettingItem 
                    title="HTF Sweeps" 
                    description="Higher timeframe sweep detection"
                    tooltip="Detect sweeps from higher timeframes on your chart"
                  />
                  <SettingItem 
                    title="Valid Sweep Color" 
                    description="Color for confirmed sweeps"
                    tooltip="The color used when a sweep is valid (C2 formed, not invalidated)"
                  />
                  <SettingItem 
                    title="Invalid Sweep Color" 
                    description="Color for failed sweeps"
                    tooltip="The color used when a sweep gets invalidated by price continuing through"
                  />
                  <SettingItem 
                    title="Sweep Lookback" 
                    description="Candles to scan for sweeps"
                    tooltip="How many candles back to check for potential liquidity sweep formations"
                  />
                </div>
              </TabsContent>

              <TabsContent value="patterns" className="space-y-4 mt-4">
                <h3 className="font-bold text-lg">C2 Pattern Detection</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <SettingItem 
                    title="Show C2 Labels" 
                    description="Display C2 reversal markers"
                    tooltip="Show labels on C2 candles (reversal candles that close inside C1 range)"
                  />
                  <SettingItem 
                    title="C2 Label Size" 
                    description="Text size for labels"
                    tooltip="Adjust the font size of C2 labels on the chart"
                  />
                  <SettingItem 
                    title="Show C3 Box" 
                    description="C3 expansion zone visualization"
                    tooltip="Draw a box around the expected C3 expansion area after C2 forms"
                  />
                  <SettingItem 
                    title="C2 Bull Color" 
                    description="Bullish C2 label color"
                    tooltip="Color for C2 labels when detecting bullish reversals (SSL sweeps)"
                  />
                  <SettingItem 
                    title="C2 Bear Color" 
                    description="Bearish C2 label color"
                    tooltip="Color for C2 labels when detecting bearish reversals (BSL sweeps)"
                  />
                </div>
              </TabsContent>

              <TabsContent value="cisd" className="space-y-4 mt-4">
                <h3 className="font-bold text-lg">CISD Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <SettingItem 
                    title="CISD Detection" 
                    description="Enable state change detection"
                    tooltip="Detect when market changes from lower lows to higher lows (or vice versa)"
                  />
                  <SettingItem 
                    title="Show Projections" 
                    description="Multi-target projection lines"
                    tooltip="Display 1x, 2x, 2.5x, 3.5x, 4x target projections from CISD level"
                  />
                  <SettingItem 
                    title="Bull CISD 1x" 
                    description="Bullish 1x target"
                    tooltip="Enable/disable 1x projection for bullish CISD"
                  />
                  <SettingItem 
                    title="Bull CISD 2x" 
                    description="Bullish 2x target"
                    tooltip="Enable/disable 2x projection for bullish CISD"
                  />
                  <SettingItem 
                    title="Bull CISD 2.5x" 
                    description="Bullish 2.5x target"
                    tooltip="Enable/disable 2.5x projection for bullish CISD"
                  />
                  <SettingItem 
                    title="Bull CISD 3.5x" 
                    description="Bullish 3.5x target"
                    tooltip="Enable/disable 3.5x projection for bullish CISD"
                  />
                  <SettingItem 
                    title="Bull CISD 4x" 
                    description="Bullish 4x target"
                    tooltip="Enable/disable 4x projection for bullish CISD"
                  />
                  <SettingItem 
                    title="Bear CISD Targets" 
                    description="Bearish projections (1x-4x)"
                    tooltip="Same target system for bearish CISD (lower highs to higher highs)"
                  />
                </div>
              </TabsContent>

              <TabsContent value="ifvg" className="space-y-4 mt-4">
                <h3 className="font-bold text-lg">iFVG Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <SettingItem 
                    title="iFVG Detection" 
                    description="Enable iFVG marking"
                    tooltip="Detect inverse fair value gaps that form after valid sweeps"
                  />
                  <SettingItem 
                    title="iFVG Box Style" 
                    description="Visualization style"
                    tooltip="Choose how iFVG zones are displayed (box, line, or both)"
                  />
                  <SettingItem 
                    title="Bull iFVG Color" 
                    description="Bullish iFVG color"
                    tooltip="Color for iFVG boxes after SSL sweeps (bullish context)"
                  />
                  <SettingItem 
                    title="Bear iFVG Color" 
                    description="Bearish iFVG color"
                    tooltip="Color for iFVG boxes after BSL sweeps (bearish context)"
                  />
                  <SettingItem 
                    title="iFVG Transparency" 
                    description="Box fill opacity"
                    tooltip="Adjust the transparency level of iFVG box fills (0-100)"
                  />
                </div>
              </TabsContent>

              <TabsContent value="alerts" className="space-y-4 mt-4">
                <h3 className="font-bold text-lg">Alerts & Sessions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <SettingItem 
                    title="Alert on Valid Sweep" 
                    description="Notify when sweep confirms"
                    tooltip="Get alert when a liquidity sweep becomes valid (C2 forms)"
                  />
                  <SettingItem 
                    title="Alert on CISD" 
                    description="Notify on state change"
                    tooltip="Get alert when CISD is detected (market structure changes)"
                  />
                  <SettingItem 
                    title="Alert on iFVG" 
                    description="Notify on iFVG formation"
                    tooltip="Get alert when iFVG forms after valid sweep"
                  />
                  <SettingItem 
                    title="Show Sessions" 
                    description="Display session windows"
                    tooltip="Show Asia/London/NY session boxes on chart"
                  />
                  <SettingItem 
                    title="Show Silver Bullet" 
                    description="1H SB windows"
                    tooltip="Highlight Silver Bullet windows (10-11 AM, 2-3 PM)"
                  />
                  <SettingItem 
                    title="Show Macro Windows" 
                    description="20min macro windows"
                    tooltip="Highlight precise 20-minute macro entry windows"
                  />
                  <SettingItem 
                    title="SMT Mode" 
                    description="Binary or Triad"
                    tooltip="Binary: Compare 2 assets. Triad: Compare primary vs 2 correlated assets"
                  />
                  <SettingItem 
                    title="SMT Assets" 
                    description="Assets for SMT analysis"
                    tooltip="Specify tickers for SMT divergence detection (e.g., ES, NQ, YM)"
                  />
                </div>
              </TabsContent>
            </Tabs>
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
              <span className="hidden sm:inline">Education</span>
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
          <TabsList className="w-full overflow-x-auto flex-nowrap justify-start md:justify-center">
            <TabsTrigger value="overview"><Sparkles className="w-4 h-4 mr-1" />Overview</TabsTrigger>
            <TabsTrigger value="settings"><Settings className="w-4 h-4 mr-1" />Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">{renderSectionDetails("overview")}</TabsContent>
          <TabsContent value="settings">{renderSectionDetails("settings")}</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
