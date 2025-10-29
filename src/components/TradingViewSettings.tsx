import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

interface SettingRowProps {
  label: string;
  children: React.ReactNode;
  tooltip?: string;
}

const SettingRow = ({ label, children, tooltip }: SettingRowProps) => (
  <div className="grid grid-cols-[140px_1fr] items-center gap-4 py-1.5 hover:bg-muted/30 px-3 rounded transition-colors group">
    <Label className="text-xs text-muted-foreground group-hover:text-foreground transition-colors" title={tooltip}>
      {label}
    </Label>
    <div className="flex items-center gap-2">
      {children}
    </div>
  </div>
);

interface SettingsGroupProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const SettingsGroup = ({ title, children, defaultOpen = true }: SettingsGroupProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border-b border-border/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 py-2.5 px-3 hover:bg-muted/50 transition-colors text-left"
      >
        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        <span className="font-medium text-sm">{title}</span>
      </button>
      {isOpen && (
        <div className="pb-3 space-y-0.5">
          {children}
        </div>
      )}
    </div>
  );
};

export const TradingViewSettings = () => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden max-w-4xl mx-auto">
      <div className="bg-muted/30 px-4 py-2 border-b border-border">
        <h3 className="font-semibold text-sm">Settings</h3>
      </div>
      
      <div className="max-h-[600px] overflow-y-auto">
        <SettingsGroup title="Display">
          <div className="px-3 pb-2 pt-1">
            <p className="text-xs text-muted-foreground italic">
              <strong>Font:</strong> Choose "Monospace" for cleaner, more technical appearance. 
              <strong className="ml-2">Text Size:</strong> Global sizing for all labels. Use "Auto" for responsive sizing based on chart zoom.
            </p>
          </div>
          <SettingRow label="Font">
            <Select defaultValue="monospace">
              <SelectTrigger className="h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="monospace">Monospace</SelectItem>
              </SelectContent>
            </Select>
          </SettingRow>
          <SettingRow label="Text Size">
            <Select defaultValue="normal">
              <SelectTrigger className="h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tiny">Tiny</SelectItem>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="large">Large</SelectItem>
                <SelectItem value="huge">Huge</SelectItem>
              </SelectContent>
            </Select>
          </SettingRow>
        </SettingsGroup>

        <SettingsGroup title="HTF Setup">
          <div className="px-3 pb-2 pt-1">
            <p className="text-xs text-muted-foreground italic">
              <strong>Auto Mode:</strong> Intelligently selects HTFs based on your chart timeframe (e.g., 5min → 1H, 4H, Daily).
              <strong className="ml-2">Manual Mode:</strong> Configure up to 4 custom HTF layers with full control over timeframe, bars displayed, and mapping.
            </p>
          </div>
          <SettingRow label="Mode">
            <Select defaultValue="auto">
              <SelectTrigger className="h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </SettingRow>
          
          <div className="mt-2 mb-1 px-3">
            <p className="text-xs font-medium text-muted-foreground">Manual Configuration</p>
          </div>
          
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="space-y-0.5 bg-muted/20 my-1 py-1 rounded">
              <SettingRow label={`TF ${num}`}>
                <Switch defaultChecked />
              </SettingRow>
              <SettingRow label="Timeframe">
                <Select defaultValue="4H">
                  <SelectTrigger className="h-7 text-xs">
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
                <Input type="number" defaultValue={10} className="h-7 text-xs w-20" />
              </SettingRow>
              <SettingRow label="Map">
                <Switch defaultChecked />
              </SettingRow>
            </div>
          ))}
        </SettingsGroup>

        <SettingsGroup title="HTF Candles">
          <div className="px-3 pb-2 pt-1">
            <p className="text-xs text-muted-foreground italic">
              Customize bull/bear candle colors and wicks. <strong>Offset</strong> = distance from price, <strong>Gap</strong> = space between candles. 
              <strong className="ml-1">Bias Arrow:</strong> Optional directional trend arrow above HTF candles.
            </p>
          </div>
          <SettingRow label="Bull">
            <Input type="color" defaultValue="#00ff00" className="h-7 w-16 cursor-pointer" />
          </SettingRow>
          <SettingRow label="Bear">
            <Input type="color" defaultValue="#000000" className="h-7 w-16 cursor-pointer" />
          </SettingRow>
          <SettingRow label="Wick">
            <Input type="color" defaultValue="#808080" className="h-7 w-16 cursor-pointer" />
          </SettingRow>
          <SettingRow label="Offset">
            <Input type="number" defaultValue={25} className="h-7 text-xs w-20" />
          </SettingRow>
          <SettingRow label="Gap">
            <Input type="number" defaultValue={2} className="h-7 text-xs w-20" />
          </SettingRow>
          <SettingRow label="Width">
            <Select defaultValue="medium">
              <SelectTrigger className="h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tiny">Tiny</SelectItem>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </SettingRow>
          <SettingRow label="Show Bias">
            <Switch />
          </SettingRow>
          <SettingRow label="Label Position">
            <Select defaultValue="inside">
              <SelectTrigger className="h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="above">Above</SelectItem>
                <SelectItem value="below">Below</SelectItem>
                <SelectItem value="inside">Inside</SelectItem>
              </SelectContent>
            </Select>
          </SettingRow>
        </SettingsGroup>

        <SettingsGroup title="Chart Mapping">
          <div className="px-3 pb-2 pt-1">
            <p className="text-xs text-muted-foreground italic">
              <strong>BSL/SSL Lines:</strong> Mark Buyside/Sellside Liquidity levels (highs/lows where stops sit). Configure count (1-20 each).
              <strong className="ml-2">Dividers:</strong> Vertical lines marking HTF candle opens/closes with auto hierarchy by timeframe importance.
              <strong className="ml-2">EQ Lines:</strong> Show 50% equilibrium levels between highs/lows for discount/premium zones.
            </p>
          </div>
          <SettingRow label="BSL/SSL">
            <Switch defaultChecked />
          </SettingRow>
          <SettingRow label="Style">
            <Select defaultValue="solid">
              <SelectTrigger className="h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solid">━━━</SelectItem>
                <SelectItem value="dashed">----</SelectItem>
                <SelectItem value="dotted">····</SelectItem>
              </SelectContent>
            </Select>
          </SettingRow>
          <SettingRow label="Width">
            <Input type="number" defaultValue={1} min={0} max={4} className="h-7 text-xs w-20" />
          </SettingRow>
          <SettingRow label="Color">
            <Input type="color" defaultValue="#545454" className="h-7 w-16 cursor-pointer" />
          </SettingRow>
          <SettingRow label="Labels">
            <Switch defaultChecked />
          </SettingRow>
          <SettingRow label="↑ Count">
            <Input type="number" defaultValue={1} min={1} max={20} className="h-7 text-xs w-20" />
          </SettingRow>
          <SettingRow label="↓ Count">
            <Input type="number" defaultValue={1} min={1} max={20} className="h-7 text-xs w-20" />
          </SettingRow>
          
          <div className="mt-2 mb-1 px-3">
            <p className="text-xs font-medium text-muted-foreground">Dividers</p>
          </div>
          <SettingRow label="Show">
            <Switch defaultChecked />
          </SettingRow>
          <SettingRow label="Auto Hierarchy">
            <Switch />
          </SettingRow>
          
          <div className="mt-2 mb-1 px-3">
            <p className="text-xs font-medium text-muted-foreground">EQ Lines</p>
          </div>
          <SettingRow label="Show">
            <Switch defaultChecked />
          </SettingRow>
          <SettingRow label="Count">
            <Input type="number" defaultValue={1} min={1} max={20} className="h-7 text-xs w-20" />
          </SettingRow>
        </SettingsGroup>

        <SettingsGroup title="Liquidity Sweeps">
          <div className="px-3 pb-2 pt-1">
            <p className="text-xs text-muted-foreground italic">
              <strong>Valid Sweeps:</strong> Sweeps that hold and form reversals (confirmed patterns).
              <strong className="ml-2">Invalid Sweeps:</strong> Sweeps that fail - price continues through. Optional display for learning.
              <strong className="ml-2">LTF vs HTF:</strong> Lower timeframe vs Higher timeframe sweeps. HTF sweeps are more significant.
            </p>
          </div>
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
            <p className="text-xs font-medium text-muted-foreground">Valid Sweeps</p>
          </div>
          <SettingRow label="Style">
            <Select defaultValue="solid">
              <SelectTrigger className="h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solid">━━━</SelectItem>
                <SelectItem value="dashed">----</SelectItem>
              </SelectContent>
            </Select>
          </SettingRow>
          <SettingRow label="Width">
            <Input type="number" defaultValue={2} className="h-7 text-xs w-20" />
          </SettingRow>
          <SettingRow label="Color">
            <Input type="color" defaultValue="#000000" className="h-7 w-16 cursor-pointer" />
          </SettingRow>
          
          <div className="mt-2 mb-1 px-3">
            <p className="text-xs font-medium text-muted-foreground">Invalid Sweeps</p>
          </div>
          <SettingRow label="Show">
            <Switch />
          </SettingRow>
          <SettingRow label="Color">
            <Input type="color" defaultValue="#808080" className="h-7 w-16 cursor-pointer" />
          </SettingRow>
        </SettingsGroup>

        <SettingsGroup title="Pattern Detection">
          <div className="px-3 pb-2 pt-1">
            <p className="text-xs text-muted-foreground italic">
              <strong>C2 Labels:</strong> Mark the exact reversal candle where sweep reversed.
              <strong className="ml-2">C3 Labels:</strong> Mark the expansion candle after reversal. C3 expectation box shows expected expansion range.
              <strong className="ml-2">SMT:</strong> Smart Money Technique - detects divergence between correlated assets. Binary (2 assets) or Triad (3 assets).
            </p>
          </div>
          <SettingRow label="C2">
            <Switch defaultChecked />
          </SettingRow>
          <SettingRow label="C2 Size">
            <Select defaultValue="tiny">
              <SelectTrigger className="h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tiny">Tiny</SelectItem>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
              </SelectContent>
            </Select>
          </SettingRow>
          <SettingRow label="C2 Color">
            <Input type="color" defaultValue="#000000" className="h-7 w-16 cursor-pointer" />
          </SettingRow>
          
          <SettingRow label="C3">
            <Switch defaultChecked />
          </SettingRow>
          <SettingRow label="C3 Color">
            <Input type="color" defaultValue="#800080" className="h-7 w-16 cursor-pointer" />
          </SettingRow>
          <SettingRow label="C3 Box">
            <Switch />
          </SettingRow>
          
          <div className="mt-2 mb-1 px-3">
            <p className="text-xs font-medium text-muted-foreground">SMT</p>
          </div>
          <SettingRow label="Enable">
            <Switch />
          </SettingRow>
          <SettingRow label="Mode">
            <Select defaultValue="binary">
              <SelectTrigger className="h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="binary">Binary</SelectItem>
                <SelectItem value="triad">Triad</SelectItem>
              </SelectContent>
            </Select>
          </SettingRow>
          <SettingRow label="Asset Override">
            <Input placeholder="ES,NQ" className="h-7 text-xs" />
          </SettingRow>
        </SettingsGroup>

        <SettingsGroup title="CISD">
          <div className="px-3 pb-2 pt-1">
            <p className="text-xs text-muted-foreground italic">
              <strong>CISD:</strong> Change in State of Delivery - marks when market shifts from one phase to another. Your entry level for retests.
              <strong className="ml-2">Projections:</strong> Target levels from CISD (1x, 2-2.5x, 3.5-4x) based on range size. Comma-separated multipliers.
            </p>
          </div>
          <SettingRow label="Enable">
            <Switch defaultChecked />
          </SettingRow>
          <SettingRow label="Style">
            <Select defaultValue="solid">
              <SelectTrigger className="h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solid">━━━</SelectItem>
                <SelectItem value="dashed">----</SelectItem>
              </SelectContent>
            </Select>
          </SettingRow>
          <SettingRow label="Width">
            <Input type="number" defaultValue={2} className="h-7 text-xs w-20" />
          </SettingRow>
          <SettingRow label="Bull">
            <Input type="color" defaultValue="#2d7ec0" className="h-7 w-16 cursor-pointer" />
          </SettingRow>
          <SettingRow label="Bear">
            <Input type="color" defaultValue="#d75e5e" className="h-7 w-16 cursor-pointer" />
          </SettingRow>
          <SettingRow label="Label">
            <Input defaultValue="CISD" className="h-7 text-xs w-24" />
          </SettingRow>
          <SettingRow label="Targets">
            <Switch defaultChecked />
          </SettingRow>
          <SettingRow label="↑ Targets">
            <Input defaultValue="1,2,2.5,3.5,4" className="h-7 text-xs" />
          </SettingRow>
          <SettingRow label="↓ Targets">
            <Input defaultValue="1,2,2.5,3.5,4" className="h-7 text-xs" />
          </SettingRow>
        </SettingsGroup>

        <SettingsGroup title="iFVG">
          <div className="px-3 pb-2 pt-1">
            <p className="text-xs text-muted-foreground italic">
              <strong>iFVG:</strong> Inverse Fair Value Gap - price inefficiency that forms during reversal after a valid sweep. Acts as support/resistance zone. Only appears after valid sweeps.
            </p>
          </div>
          <SettingRow label="Show">
            <Switch defaultChecked />
          </SettingRow>
          <SettingRow label="Bull">
            <Input type="color" defaultValue="#08998188" className="h-7 w-16 cursor-pointer" />
          </SettingRow>
          <SettingRow label="Bear">
            <Input type="color" defaultValue="#f2364614" className="h-7 w-16 cursor-pointer" />
          </SettingRow>
        </SettingsGroup>

        <SettingsGroup title="Alerts & Sessions" defaultOpen={false}>
          <div className="px-3 pb-2 pt-1">
            <p className="text-xs text-muted-foreground italic">
              <strong>Alerts:</strong> Set up TradingView alerts for sweep formation and failure events.
              <strong className="ml-2">Session Models Table:</strong> Shows current session, time remaining, and active Silver Bullet/Macro windows. Helps time your entries.
            </p>
          </div>
          <SettingRow label="Formation">
            <Switch defaultChecked />
          </SettingRow>
          <SettingRow label="Failure">
            <Switch defaultChecked />
          </SettingRow>
          <SettingRow label="Session Table">
            <Switch />
          </SettingRow>
          <SettingRow label="Table Position">
            <Select defaultValue="top-right">
              <SelectTrigger className="h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="top-left">Top Left</SelectItem>
                <SelectItem value="top-right">Top Right</SelectItem>
                <SelectItem value="bottom-left">Bottom Left</SelectItem>
                <SelectItem value="bottom-right">Bottom Right</SelectItem>
              </SelectContent>
            </Select>
          </SettingRow>
        </SettingsGroup>
      </div>
    </div>
  );
};
