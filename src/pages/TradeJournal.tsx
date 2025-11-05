import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Plus, Calendar, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface TradeEntry {
  id: string;
  date: string;
  pair: string;
  direction: "long" | "short";
  htfBias: string;
  sweepType: string;
  entry: string;
  stop: string;
  target: string;
  rr: string;
  outcome: "win" | "loss" | "breakeven" | "pending";
  notes: string;
}

const TradeJournal = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [trades, setTrades] = useState<TradeEntry[]>([
    {
      id: "1",
      date: "2024-01-15",
      pair: "ES",
      direction: "long",
      htfBias: "Daily bullish, 4H discount",
      sweepType: "SSL sweep at 4900",
      entry: "4905",
      stop: "4895",
      target: "4935",
      rr: "1:3",
      outcome: "win",
      notes: "Clean sweep during H2 window. C2 confirmed. Entered CISD zone at 50% FVG."
    }
  ]);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    pair: "",
    direction: "long" as "long" | "short",
    htfBias: "",
    sweepType: "",
    entry: "",
    stop: "",
    target: "",
    rr: "",
    outcome: "pending" as "win" | "loss" | "breakeven" | "pending",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTrade: TradeEntry = {
      id: Date.now().toString(),
      ...formData
    };
    setTrades([newTrade, ...trades]);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      pair: "",
      direction: "long",
      htfBias: "",
      sweepType: "",
      entry: "",
      stop: "",
      target: "",
      rr: "",
      outcome: "pending",
      notes: ""
    });
    setShowForm(false);
  };

  const stats = {
    totalTrades: trades.length,
    wins: trades.filter(t => t.outcome === "win").length,
    losses: trades.filter(t => t.outcome === "loss").length,
    winRate: trades.length > 0 
      ? ((trades.filter(t => t.outcome === "win").length / trades.filter(t => t.outcome !== "pending").length) * 100).toFixed(1)
      : "0"
  };

  return (
    <div className="min-h-screen bg-chart-dots">
      {/* Header */}
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
              onClick={() => navigate("/resources")}
              className="gap-2 font-mono"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm font-medium">Trade Journal</span>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-3 md:px-4 py-6 md:py-12 max-w-6xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-mono">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Trade Journal
            </span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-mono">
            Log every setup. Track HTF bias, sweeps, entries, and outcomes.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="p-4">
            <div className="text-2xl font-bold text-primary">{stats.totalTrades}</div>
            <div className="text-xs text-muted-foreground">Total Trades</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-green-500">{stats.wins}</div>
            <div className="text-xs text-muted-foreground">Wins</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-red-500">{stats.losses}</div>
            <div className="text-xs text-muted-foreground">Losses</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-accent">{stats.winRate}%</div>
            <div className="text-xs text-muted-foreground">Win Rate</div>
          </Card>
        </motion.div>

        {/* Add Trade Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Button onClick={() => setShowForm(!showForm)} className="w-full md:w-auto gap-2">
            <Plus className="w-4 h-4" />
            {showForm ? "Cancel" : "Log New Trade"}
          </Button>
        </motion.div>

        {/* Trade Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8"
          >
            <Card className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input 
                      type="date" 
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Pair/Asset</Label>
                    <Input 
                      placeholder="ES, NQ, EUR/USD..."
                      value={formData.pair}
                      onChange={(e) => setFormData({...formData, pair: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Direction</Label>
                    <Select value={formData.direction} onValueChange={(v: "long" | "short") => setFormData({...formData, direction: v})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="long">Long</SelectItem>
                        <SelectItem value="short">Short</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Outcome</Label>
                    <Select value={formData.outcome} onValueChange={(v: any) => setFormData({...formData, outcome: v})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="win">Win</SelectItem>
                        <SelectItem value="loss">Loss</SelectItem>
                        <SelectItem value="breakeven">Breakeven</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>HTF Bias</Label>
                  <Input 
                    placeholder="Daily bullish, 4H in discount..."
                    value={formData.htfBias}
                    onChange={(e) => setFormData({...formData, htfBias: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Sweep Type</Label>
                  <Input 
                    placeholder="SSL sweep at 4900, BSL at 15500..."
                    value={formData.sweepType}
                    onChange={(e) => setFormData({...formData, sweepType: e.target.value})}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Entry</Label>
                    <Input 
                      placeholder="4905"
                      value={formData.entry}
                      onChange={(e) => setFormData({...formData, entry: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Stop</Label>
                    <Input 
                      placeholder="4895"
                      value={formData.stop}
                      onChange={(e) => setFormData({...formData, stop: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Target</Label>
                    <Input 
                      placeholder="4935"
                      value={formData.target}
                      onChange={(e) => setFormData({...formData, target: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>R:R</Label>
                    <Input 
                      placeholder="1:3"
                      value={formData.rr}
                      onChange={(e) => setFormData({...formData, rr: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea 
                    placeholder="What worked? What didn't? Session timing? C2 quality?"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full">Save Trade</Button>
              </form>
            </Card>
          </motion.div>
        )}

        {/* Trade List */}
        <div className="space-y-4">
          {trades.map((trade, idx) => (
            <motion.div
              key={trade.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    trade.direction === "long" ? "bg-green-500/10" : "bg-red-500/10"
                  }`}>
                    {trade.direction === "long" ? (
                      <TrendingUp className="w-6 h-6 text-green-500" />
                    ) : (
                      <TrendingDown className="w-6 h-6 text-red-500" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold font-mono">{trade.pair}</h3>
                          <Badge variant={trade.direction === "long" ? "default" : "destructive"}>
                            {trade.direction.toUpperCase()}
                          </Badge>
                          <Badge variant={
                            trade.outcome === "win" ? "default" : 
                            trade.outcome === "loss" ? "destructive" : 
                            "secondary"
                          }>
                            {trade.outcome.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {trade.date}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold font-mono text-accent">{trade.rr}</div>
                        <div className="text-xs text-muted-foreground">Risk/Reward</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-muted-foreground text-xs mb-1">HTF Bias</div>
                        <div className="font-mono">{trade.htfBias}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs mb-1">Sweep</div>
                        <div className="font-mono">{trade.sweepType}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <div className="text-muted-foreground text-xs mb-1">Entry</div>
                        <div className="font-mono font-bold">{trade.entry}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs mb-1">Stop</div>
                        <div className="font-mono font-bold text-red-500">{trade.stop}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs mb-1">Target</div>
                        <div className="font-mono font-bold text-green-500">{trade.target}</div>
                      </div>
                    </div>

                    {trade.notes && (
                      <div className="p-3 rounded-lg bg-muted/30 border border-border">
                        <div className="text-muted-foreground text-xs mb-1">Notes</div>
                        <p className="text-sm leading-relaxed">{trade.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {trades.length === 0 && !showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground font-mono mb-4">
              No trades logged yet.
            </p>
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Log Your First Trade
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TradeJournal;