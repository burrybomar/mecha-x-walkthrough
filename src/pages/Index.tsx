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
import { HTFSlides } from "@/components/HTFSlides";
import { LiquiditySlides } from "@/components/LiquiditySlides";
import { CISDSlides } from "@/components/CISDSlides";
import { SessionSlides } from "@/components/SessionSlides";
import { PatternsSlides } from "@/components/PatternsSlides";
import { IFVGSlides } from "@/components/IFVGSlides";
import { SMTSlides } from "@/components/SMTSlides";

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
        return <HTFSlides />;

      case "liquidity":
        return <LiquiditySlides />;

      case "patterns":
        return <PatternsSlides />;

      case "cisd":
        return <CISDSlides />;

      case "ifvg":
        return <IFVGSlides />;

      case "smt":
        return <SMTSlides />;

      case "sessions":
        return <SessionSlides />;

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
