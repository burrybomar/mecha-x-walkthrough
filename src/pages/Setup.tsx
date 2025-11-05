import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Settings as SettingsIcon, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SettingRowProps {
  label: string;
  children: React.ReactNode;
  tooltip?: string;
}

const SettingRow = ({ label, children, tooltip }: SettingRowProps) => (
  <motion.div 
    className="grid grid-cols-[140px_1fr] md:grid-cols-[160px_1fr] items-center gap-3 md:gap-4 py-2 md:py-1.5 hover:bg-muted/30 px-3 rounded transition-all duration-200 group font-mono text-xs"
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.2 }}
  >
    <Label className="text-[11px] md:text-xs text-muted-foreground group-hover:text-foreground transition-colors" title={tooltip}>
      {label}
    </Label>
    <div className="flex items-center gap-2 w-full">
      {children}
    </div>
  </motion.div>
);

interface SettingsGroupProps {
  title: string;
  description: string;
  frameworkLink: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const SettingsGroup = ({ title, description, frameworkLink, children, defaultOpen = false }: SettingsGroupProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 py-3 md:py-3 px-4 hover:bg-muted/40 transition-all duration-200 text-left touch-manipulation"
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center gap-2 md:gap-3">
          <motion.div
            animate={{ rotate: isOpen ? 0 : -90 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 md:w-4 md:h-4 text-primary" />
          </motion.div>
          <span className="font-semibold text-sm md:text-sm">{title}</span>
        </div>
        <Badge variant="outline" className="text-[9px] md:text-[10px] font-mono px-2 py-0.5">{frameworkLink}</Badge>
      </motion.button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="pb-4">
          <div className="px-4 pb-3 pt-1">
            <p className="text-[11px] md:text-xs text-muted-foreground italic leading-relaxed">{description}</p>
          </div>
          <div className="space-y-0.5">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Setup = () => {
  const navigate = useNavigate();

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
              className="gap-2 font-mono text-xs md:text-sm h-9 md:h-10"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <div className="flex items-center gap-2">
              <SettingsIcon className="w-4 h-4 text-primary" />
              <span className="font-mono text-xs md:text-sm font-medium">MECHA-X Settings</span>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-3 md:px-4 py-6 md:py-8 max-w-5xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 md:mb-8"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 font-mono leading-tight px-2">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              TradingView Indicator
            </span>
            <br />
            <span className="text-foreground text-2xl md:text-3xl lg:text-4xl">Configuration Guide</span>
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed font-mono px-4">
            Each setting automates a specific part of the 6-step framework. Configure once in TradingView, trade forever.
          </p>
        </motion.div>

        {/* Settings Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="overflow-hidden border-2 shadow-2xl">
            {/* Panel Header */}
            <div className="bg-muted/50 px-3 md:px-4 py-2.5 md:py-3 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-sm font-mono">Settings</h3>
              <Badge className="font-mono text-[9px] md:text-[10px]">PineScript v6</Badge>
            </div>

            {/* Settings Content */}
            <div className="max-h-[70vh] overflow-y-auto overscroll-contain smooth-scroll">
              
              {/* Display */}
              <SettingsGroup 
                title="Display" 
                frameworkLink="Global"
                description="Font: Use Monospace for cleaner technical appearance. Text Size: Global sizing for all labels (Auto = responsive based on chart zoom)."
              >
                <SettingRow label="Font">
                  <Select defaultValue="monospace">
                    <SelectTrigger className="h-7 text-xs font-mono">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="monospace">Monospace ✓</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingRow>
                <SettingRow label="Text Size">
                  <Select defaultValue="normal">
                    <SelectTrigger className="h-7 text-xs font-mono">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tiny">Tiny</SelectItem>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                      <SelectItem value="huge">Huge</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingRow>
              </SettingsGroup>

              {/* HTF Setup */}
              <SettingsGroup 
                title="HTF Setup" 
                frameworkLink="Step 1: HTF Context"
                description="Auto Mode: Intelligently selects HTFs based on chart TF (5m → 1H/4H/Daily). Manual: Configure 4 custom HTF layers with full control."
                defaultOpen
              >
                <SettingRow label="Mode">
                  <Select defaultValue="auto">
                    <SelectTrigger className="h-7 text-xs font-mono">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto ✓</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingRow>

                <div className="mt-2 mb-1 px-3">
                  <p className="text-xs font-medium text-muted-foreground font-mono">Manual TF Layers</p>
                </div>

                {[
                  { num: 1, tfDisplay: "15m", bars: 10, enabled: true, map: true },
                  { num: 2, tfDisplay: "1H", bars: 8, enabled: true, map: true },
                  { num: 3, tfDisplay: "4H", bars: 6, enabled: true, map: true },
                  { num: 4, tfDisplay: "1D", bars: 4, enabled: true, map: false }
                ].map((config) => (
                  <div key={config.num} className="space-y-0.5 bg-muted/20 my-1 py-1.5 rounded">
                    <SettingRow label={`TF ${config.num}`}>
                      <Switch defaultChecked={config.enabled} />
                    </SettingRow>
                    <SettingRow label="Timeframe">
                      <Select defaultValue={config.tfDisplay}>
                        <SelectTrigger className="h-7 text-xs font-mono">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15m">15m</SelectItem>
                          <SelectItem value="1H">1H</SelectItem>
                          <SelectItem value="4H">4H</SelectItem>
                          <SelectItem value="1D">1D</SelectItem>
                          <SelectItem value="1W">1W</SelectItem>
                        </SelectContent>
                      </Select>
                    </SettingRow>
                    <SettingRow label="Bars">
                      <Input type="number" defaultValue={config.bars} className="h-7 text-xs w-20 font-mono" />
                    </SettingRow>
                    <SettingRow label="Map">
                      <Switch defaultChecked={config.map} />
                    </SettingRow>
                  </div>
                ))}
              </SettingsGroup>

              {/* HTF Candles */}
              <SettingsGroup 
                title="HTF Candles" 
                frameworkLink="Step 1: HTF Context"
                description="Customize bull/bear candle colors and wicks. Offset = distance from price. Gap = space between candles. Bias Arrow = optional trend arrow."
              >
                <SettingRow label="Bull">
                  <Input type="color" defaultValue="#00ff00" className="h-7 w-16 cursor-pointer" />
                </SettingRow>
                <SettingRow label="Bear">
                  <Input type="color" defaultValue="#ff0000" className="h-7 w-16 cursor-pointer" />
                </SettingRow>
                <SettingRow label="Wick">
                  <Input type="color" defaultValue="#808080" className="h-7 w-16 cursor-pointer" />
                </SettingRow>
                <SettingRow label="Offset">
                  <Input type="number" defaultValue={25} className="h-7 text-xs w-20 font-mono" />
                </SettingRow>
                <SettingRow label="Gap">
                  <Input type="number" defaultValue={2} className="h-7 text-xs w-20 font-mono" />
                </SettingRow>
                <SettingRow label="Show Bias">
                  <Switch />
                </SettingRow>
              </SettingsGroup>

              {/* Chart Mapping */}
              <SettingsGroup 
                title="Chart Mapping" 
                frameworkLink="Step 1: HTF Context"
                description="BSL/SSL: Mark Buyside/Sellside liquidity (highs/lows where stops sit). Dividers: Mark HTF candle opens/closes. EQ: 50% equilibrium levels for discount/premium zones."
              >
                <SettingRow label="BSL/SSL">
                  <Switch defaultChecked />
                </SettingRow>
                <SettingRow label="Style">
                  <Select defaultValue="solid">
                    <SelectTrigger className="h-7 text-xs font-mono">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solid">━━━</SelectItem>
                      <SelectItem value="dashed">----</SelectItem>
                      <SelectItem value="dotted">····</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingRow>
                <SettingRow label="↑ Count">
                  <Input type="number" defaultValue={1} min={1} max={20} className="h-7 text-xs w-20 font-mono" />
                </SettingRow>
                <SettingRow label="↓ Count">
                  <Input type="number" defaultValue={1} min={1} max={20} className="h-7 text-xs w-20 font-mono" />
                </SettingRow>

                <div className="mt-2 mb-1 px-3">
                  <p className="text-xs font-medium text-muted-foreground font-mono">Dividers</p>
                </div>
                <SettingRow label="Show">
                  <Switch defaultChecked />
                </SettingRow>

                <div className="mt-2 mb-1 px-3">
                  <p className="text-xs font-medium text-muted-foreground font-mono">EQ Lines</p>
                </div>
                <SettingRow label="Show">
                  <Switch defaultChecked />
                </SettingRow>
              </SettingsGroup>

              {/* Liquidity Sweeps */}
              <SettingsGroup
                title="Liquidity Sweeps"
                frameworkLink="Step 3: Sweep Detection"
                description="Valid Sweeps: Confirmed sweeps that held (reversal patterns). Invalid: Failed sweeps (price continued). HTF sweeps are more significant than LTF. Live: Real-time sweep detection as price moves."
                defaultOpen
              >
                <SettingRow label="Enable">
                  <Switch defaultChecked />
                </SettingRow>
                <SettingRow label="LTF">
                  <Switch defaultChecked />
                </SettingRow>
                <SettingRow label="HTF">
                  <Switch defaultChecked />
                </SettingRow>
                <SettingRow label="Live">
                  <Switch defaultChecked />
                </SettingRow>

                <div className="mt-2 mb-1 px-3">
                  <p className="text-xs font-medium text-muted-foreground font-mono">Valid Sweeps</p>
                </div>
                <SettingRow label="Style">
                  <Select defaultValue="solid">
                    <SelectTrigger className="h-7 text-xs font-mono">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solid">━━━</SelectItem>
                      <SelectItem value="dashed">----</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingRow>
                <SettingRow label="Width">
                  <Input type="number" defaultValue={2} className="h-7 text-xs w-20 font-mono" />
                </SettingRow>
                <SettingRow label="Color">
                  <Input type="color" defaultValue="#000000" className="h-7 w-16 cursor-pointer" />
                </SettingRow>

                <div className="mt-2 mb-1 px-3">
                  <p className="text-xs font-medium text-muted-foreground font-mono">Invalid Sweeps</p>
                </div>
                <SettingRow label="Show">
                  <Switch />
                </SettingRow>
              </SettingsGroup>

              {/* Pattern Detection */}
              <SettingsGroup 
                title="Pattern Detection" 
                frameworkLink="Step 3: Sweep + C2"
                description="C2: Mark exact reversal candle where sweep reversed. C3: Expansion candle after reversal. SMT: Divergence between correlated assets (Binary = 2 assets, Triad = 3)."
              >
                <SettingRow label="C2">
                  <Switch defaultChecked />
                </SettingRow>
                <SettingRow label="C2 Size">
                  <Select defaultValue="tiny">
                    <SelectTrigger className="h-7 text-xs font-mono">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tiny">Tiny</SelectItem>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingRow>
                <SettingRow label="C3">
                  <Switch defaultChecked />
                </SettingRow>
                <SettingRow label="C3 Box">
                  <Switch />
                </SettingRow>

                <div className="mt-2 mb-1 px-3">
                  <p className="text-xs font-medium text-muted-foreground font-mono">SMT</p>
                </div>
                <SettingRow label="Enable">
                  <Switch />
                </SettingRow>
                <SettingRow label="Mode">
                  <Select defaultValue="binary">
                    <SelectTrigger className="h-7 text-xs font-mono">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="binary">Binary</SelectItem>
                      <SelectItem value="triad">Triad</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingRow>
                <SettingRow label="Asset Override">
                  <Input placeholder="ES,NQ" className="h-7 text-xs font-mono" />
                </SettingRow>
              </SettingsGroup>

              {/* Session Models */}
              <SettingsGroup
                title="Session Models"
                frameworkLink="Step 2: Session Timing"
                description="Display real-time session model tracking table. Shows active sweep sequences, double purge counts (⟐), and SMR entry confirmations (✓). Tracks H1-H4 session progression."
              >
                <SettingRow label="Enable">
                  <Switch defaultChecked />
                </SettingRow>
                <SettingRow label="Position">
                  <Select defaultValue="bottom-right">
                    <SelectTrigger className="h-7 text-xs font-mono">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top-left">Top Left</SelectItem>
                      <SelectItem value="top-center">Top Center</SelectItem>
                      <SelectItem value="top-right">Top Right</SelectItem>
                      <SelectItem value="middle-left">Middle Left</SelectItem>
                      <SelectItem value="middle-center">Middle Center</SelectItem>
                      <SelectItem value="middle-right">Middle Right</SelectItem>
                      <SelectItem value="bottom-left">Bottom Left</SelectItem>
                      <SelectItem value="bottom-center">Bottom Center</SelectItem>
                      <SelectItem value="bottom-right">Bottom Right</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingRow>
                <SettingRow label="Size">
                  <Select defaultValue="small">
                    <SelectTrigger className="h-7 text-xs font-mono">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tiny">Tiny</SelectItem>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingRow>
                <SettingRow label="Display Mode">
                  <Select defaultValue="full">
                    <SelectTrigger className="h-7 text-xs font-mono">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full</SelectItem>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingRow>
              </SettingsGroup>

              {/* CISD */}
              <SettingsGroup
                title="CISD"
                frameworkLink="Step 4: Entry Zones"
                description="Change in State of Delivery - marks when market shifts from one phase to another. Your entry level. Targets = comma-separated multipliers (1x, 2-2.5x, 3.5-4x)."
                defaultOpen
              >
                <SettingRow label="Enable">
                  <Switch defaultChecked />
                </SettingRow>
                <SettingRow label="Style">
                  <Select defaultValue="solid">
                    <SelectTrigger className="h-7 text-xs font-mono">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solid">━━━</SelectItem>
                      <SelectItem value="dashed">----</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingRow>
                <SettingRow label="Width">
                  <Input type="number" defaultValue={2} className="h-7 text-xs w-20 font-mono" />
                </SettingRow>
                <SettingRow label="Bull">
                  <Input type="color" defaultValue="#2d7ec0" className="h-7 w-16 cursor-pointer" />
                </SettingRow>
                <SettingRow label="Bear">
                  <Input type="color" defaultValue="#d75e5e" className="h-7 w-16 cursor-pointer" />
                </SettingRow>
                <SettingRow label="Targets">
                  <Switch defaultChecked />
                </SettingRow>
                <SettingRow label="↑ Targets">
                  <Input defaultValue="1,2,2.5,3.5,4" className="h-7 text-xs font-mono" />
                </SettingRow>
                <SettingRow label="↓ Targets">
                  <Input defaultValue="1,2,2.5,3.5,4" className="h-7 text-xs font-mono" />
                </SettingRow>
              </SettingsGroup>

              {/* iFVG */}
              <SettingsGroup 
                title="iFVG" 
                frameworkLink="Step 4: Entry Zones"
                description="Inverse Fair Value Gaps - price inefficiencies left during quick reversals. Acts as support/resistance. Often aligns with CISD for best entries."
              >
                <SettingRow label="Enable">
                  <Switch defaultChecked />
                </SettingRow>
                <SettingRow label="Style">
                  <Select defaultValue="solid">
                    <SelectTrigger className="h-7 text-xs font-mono">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solid">━━━</SelectItem>
                      <SelectItem value="dashed">----</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingRow>
              </SettingsGroup>

              {/* Sessions */}
              <SettingsGroup 
                title="Sessions" 
                frameworkLink="Step 2: Session Timing"
                description="Session markers for timing key moves. Macro Times highlight specific high-probability windows where sweeps and reversals typically occur."
              >
                <SettingRow label="Enable">
                  <Switch defaultChecked />
                </SettingRow>
                <SettingRow label="Macro Times">
                  <Switch defaultChecked />
                </SettingRow>
              </SettingsGroup>

            </div>

            {/* Panel Footer */}
            <div className="bg-muted/30 px-4 py-3 border-t border-border">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-mono">Framework Automation Complete</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => navigate('/knowledge')} className="font-mono text-xs">
                    Read Logic
                  </Button>
                  <Button size="sm" onClick={() => navigate('/')} className="font-mono text-xs">
                    Back to Overview
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-6 rounded-xl bg-card border text-center"
        >
          <p className="text-sm text-muted-foreground leading-relaxed font-mono">
            These settings mirror exactly what's in your TradingView indicator. Configure once, and the entire 6-step framework automates on your charts.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Setup;
