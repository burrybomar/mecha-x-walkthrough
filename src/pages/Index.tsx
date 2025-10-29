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
    <div className="space-y-16">
      {/* Settings Hype Clip */}
      <section className="space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-3xl font-bold text-foreground">Feature Showcase</h3>
          <p className="text-muted-foreground">See all MECHA-X indicators in action</p>
        </div>
        <SettingsHypeClip />
      </section>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        <TrendingUp className="w-5 h-5 text-primary" />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Trading Sequence Slides */}
      <section className="space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-3xl font-bold text-foreground">Trading Sequence</h3>
          <p className="text-muted-foreground">Step-by-step institutional framework</p>
        </div>
        <TradingSequenceSlides />
      </section>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        <Target className="w-5 h-5 text-primary" />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Feature Navigation Cards */}
      <section className="space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-3xl font-bold text-foreground">Explore Indicators</h3>
          <p className="text-muted-foreground">Deep dive into each component</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
          {[
            { icon: <BarChart3 />, title: "HTF Sweeps", desc: "4H/Daily overlay" },
            { icon: <Target />, title: "BSL/SSL", desc: "Liquidity sweeps" },
            { icon: <Workflow />, title: "C2 Labels", desc: "Reversal patterns" },
            { icon: <Zap />, title: "CISD", desc: "State changes" },
            { icon: <Layers />, title: "iFVG", desc: "Fair value gaps" },
            { icon: <GitCompare />, title: "SMT", desc: "Divergence" },
            { icon: <Clock />, title: "Sessions", desc: "Time windows" },
            { icon: <Settings />, title: "Settings", desc: "Configure all" },
          ].map((item, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all group cursor-pointer text-left"
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
              <div className="p-2 w-fit rounded-md bg-primary/10 text-primary mb-2 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="font-bold text-sm mb-0.5">{item.title}</h3>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );

  const renderSectionDetails = (key: string) => {
    switch (key) {
      case "overview":
        return renderOverview();

      case "htf":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-2">HTF Analysis</h3>
              <p className="text-muted-foreground">Higher timeframe context and key levels</p>
            </div>
            <HTFSlides />
          </div>
        );

      case "liquidity":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-2">Liquidity Detection</h3>
              <p className="text-muted-foreground">BSL/SSL sweeps and entry signals</p>
            </div>
            <LiquiditySlides />
          </div>
        );

      case "patterns":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-2">C2 Reversal Patterns</h3>
              <p className="text-muted-foreground">Three-candle reversal structure</p>
            </div>
            <PatternsSlides />
          </div>
        );

      case "cisd":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-2">CISD Zones</h3>
              <p className="text-muted-foreground">Change in state of delivery</p>
            </div>
            <CISDSlides />
          </div>
        );

      case "ifvg":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-2">iFVG Analysis</h3>
              <p className="text-muted-foreground">Inverse fair value gaps</p>
            </div>
            <IFVGSlides />
          </div>
        );

      case "smt":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-2">SMT Divergence</h3>
              <p className="text-muted-foreground">Smart money technique</p>
            </div>
            <SMTSlides />
          </div>
        );

      case "sessions":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-2">Session Models</h3>
              <p className="text-muted-foreground">Time-based trading windows</p>
            </div>
            <SessionSlides />
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Settings className="w-12 h-12 mx-auto text-primary" />
              <h3 className="text-3xl font-bold">Indicator Settings</h3>
              <p className="text-muted-foreground">Configure all MECHA-X components</p>
            </div>
            <TradingViewSettings />
          </div>
        );

      case "education":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <BookOpen className="w-12 h-12 mx-auto text-primary" />
              <h3 className="text-3xl font-bold">Quick Reference</h3>
              <p className="text-muted-foreground">Essential trading concepts</p>
            </div>
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

            <div className="p-8 rounded-xl bg-card border border-primary/20 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Complete Knowledge Base</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Access the full education including TTrades Model, 4H Profiling, Liquidity concepts, and advanced strategies.
              </p>
              <Button onClick={() => navigate('/knowledge')} size="lg" className="gap-2">
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
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 backdrop-blur-lg bg-background/98 border-b border-border">
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

      <div className="container mx-auto px-3 md:px-6 py-8 md:py-16">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-3"><TrendingUp className="w-3 h-3 mr-2" />HTF Framework</Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-3">Multi-Timeframe Trading Intelligence</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Institutional liquidity detection & pattern recognition</p>
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
