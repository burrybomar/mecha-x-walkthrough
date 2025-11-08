import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Plus, Calendar, TrendingUp, TrendingDown, Download, Filter, Trash2, Edit, BarChart3, Award, Target } from "lucide-react";
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
  session?: string;
  screenshot?: string;
  actualPnL?: string;
}

const TradeJournal = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [filterOutcome, setFilterOutcome] = useState<string>("all");
  const [filterDirection, setFilterDirection] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Load trades from localStorage on mount
  const [trades, setTrades] = useState<TradeEntry[]>(() => {
    const saved = localStorage.getItem('mecha-x-trades');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      {
        id: "1",
        date: "2025-01-15",
        pair: "ES",
        direction: "long",
        htfBias: "Daily bullish, 4H discount",
        sweepType: "SSL sweep at 4900",
        entry: "4905",
        stop: "4895",
        target: "4935",
        rr: "1:3",
        outcome: "win",
        notes: "Clean sweep during H2 window. C2 confirmed. Entered CISD zone at 50% FVG.",
        session: "H2",
        actualPnL: "+150"
      }
    ];
  });

  // Save to localStorage whenever trades change
  useEffect(() => {
    localStorage.setItem('mecha-x-trades', JSON.stringify(trades));
  }, [trades]);

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
    notes: "",
    session: "",
    actualPnL: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      // Update existing trade
      setTrades(trades.map(t => t.id === editingId ? { ...formData, id: editingId } : t));
      setEditingId(null);
    } else {
      // Add new trade
      const newTrade: TradeEntry = {
        id: Date.now().toString(),
        ...formData
      };
      setTrades([newTrade, ...trades]);
    }
    resetForm();
    setShowForm(false);
  };

  const resetForm = () => {
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
      notes: "",
      session: "",
      actualPnL: ""
    });
  };

  const handleEdit = (trade: TradeEntry) => {
    setFormData({
      date: trade.date,
      pair: trade.pair,
      direction: trade.direction,
      htfBias: trade.htfBias,
      sweepType: trade.sweepType,
      entry: trade.entry,
      stop: trade.stop,
      target: trade.target,
      rr: trade.rr,
      outcome: trade.outcome,
      notes: trade.notes,
      session: trade.session || "",
      actualPnL: trade.actualPnL || ""
    });
    setEditingId(trade.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this trade?")) {
      setTrades(trades.filter(t => t.id !== id));
    }
  };

  const exportToCSV = () => {
    const headers = ["Date", "Pair", "Direction", "HTF Bias", "Sweep Type", "Entry", "Stop", "Target", "R:R", "Outcome", "Session", "P&L", "Notes"];
    const rows = trades.map(t => [
      t.date,
      t.pair,
      t.direction,
      t.htfBias,
      t.sweepType,
      t.entry,
      t.stop,
      t.target,
      t.rr,
      t.outcome,
      t.session || "",
      t.actualPnL || "",
      t.notes.replace(/,/g, ';') // Replace commas in notes
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mecha-x-journal-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Filter trades
  const filteredTrades = useMemo(() => {
    return trades.filter(trade => {
      const matchesOutcome = filterOutcome === "all" || trade.outcome === filterOutcome;
      const matchesDirection = filterDirection === "all" || trade.direction === filterDirection;
      const matchesSearch = searchQuery === "" ||
        trade.pair.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trade.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trade.htfBias.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesOutcome && matchesDirection && matchesSearch;
    });
  }, [trades, filterOutcome, filterDirection, searchQuery]);

  // Advanced statistics
  const stats = useMemo(() => {
    const completed = trades.filter(t => t.outcome !== "pending");
    const wins = trades.filter(t => t.outcome === "win");
    const losses = trades.filter(t => t.outcome === "loss");
    const breakevens = trades.filter(t => t.outcome === "breakeven");

    const winRate = completed.length > 0
      ? ((wins.length / completed.length) * 100).toFixed(1)
      : "0";

    // Calculate total P&L if available
    const totalPnL = trades.reduce((sum, t) => {
      if (t.actualPnL && t.outcome !== "pending") {
        const pnl = parseFloat(t.actualPnL.replace(/[^0-9.-]/g, ''));
        return sum + (isNaN(pnl) ? 0 : pnl);
      }
      return sum;
    }, 0);

    // Calculate average R:R achieved
    const avgRR = completed.length > 0
      ? completed.reduce((sum, t) => {
        const rr = parseFloat(t.rr.split(':')[1] || "0");
        return sum + (t.outcome === "win" ? rr : (t.outcome === "loss" ? -1 : 0));
      }, 0) / completed.length
      : 0;

    // Best and worst streaks
    let currentStreak = 0;
    let bestStreak = 0;
    let worstStreak = 0;
    let tempStreak = 0;

    trades.filter(t => t.outcome !== "pending").forEach(trade => {
      if (trade.outcome === "win") {
        tempStreak = tempStreak >= 0 ? tempStreak + 1 : 1;
        bestStreak = Math.max(bestStreak, tempStreak);
      } else if (trade.outcome === "loss") {
        tempStreak = tempStreak <= 0 ? tempStreak - 1 : -1;
        worstStreak = Math.min(worstStreak, tempStreak);
      }
    });

    return {
      totalTrades: trades.length,
      wins: wins.length,
      losses: losses.length,
      breakevens: breakevens.length,
      winRate,
      totalPnL: totalPnL.toFixed(2),
      avgRR: avgRR.toFixed(2),
      bestStreak,
      worstStreak: Math.abs(worstStreak),
      pendingTrades: trades.filter(t => t.outcome === "pending").length
    };
  }, [trades]);

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

        {/* Enhanced Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4 mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 hover:shadow-lg transition-shadow">
              <div className="text-2xl font-bold text-primary">{stats.totalTrades}</div>
              <div className="text-xs text-muted-foreground">Total Trades</div>
              {stats.pendingTrades > 0 && (
                <Badge variant="secondary" className="mt-2 text-xs">{stats.pendingTrades} Pending</Badge>
              )}
            </Card>
            <Card className="p-4 hover:shadow-lg transition-shadow">
              <div className="text-2xl font-bold text-green-500">{stats.wins}</div>
              <div className="text-xs text-muted-foreground">Wins</div>
            </Card>
            <Card className="p-4 hover:shadow-lg transition-shadow">
              <div className="text-2xl font-bold text-red-500">{stats.losses}</div>
              <div className="text-xs text-muted-foreground">Losses</div>
            </Card>
            <Card className="p-4 hover:shadow-lg transition-shadow">
              <div className="text-2xl font-bold text-accent">{stats.winRate}%</div>
              <div className="text-xs text-muted-foreground">Win Rate</div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 bg-primary/5 border-primary/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xl font-bold font-mono">{stats.avgRR}R</div>
                  <div className="text-xs text-muted-foreground">Avg R:R Achieved</div>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-green-500/5 border-green-500/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <div className="text-xl font-bold font-mono">{stats.bestStreak}</div>
                  <div className="text-xs text-muted-foreground">Best Win Streak</div>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-accent/5 border-accent/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-xl font-bold font-mono ${parseFloat(stats.totalPnL) >= 0 ? 'text-green-500' : 'text-red-500'}">${stats.totalPnL}</div>
                  <div className="text-xs text-muted-foreground">Total P&L</div>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Actions Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <Button onClick={() => { setShowForm(!showForm); setEditingId(null); resetForm(); }} className="gap-2">
            <Plus className="w-4 h-4" />
            {showForm ? "Cancel" : "Log New Trade"}
          </Button>
          <Button onClick={exportToCSV} variant="outline" className="gap-2" disabled={trades.length === 0}>
            <Download className="w-4 h-4" />
            Export to CSV
          </Button>
          <div className="flex-1" />
          <Input
            placeholder="Search trades..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="md:w-64"
          />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          <Badge variant="outline" className="gap-2 px-3 py-2">
            <Filter className="w-3 h-3" />
            Filters:
          </Badge>
          <Select value={filterOutcome} onValueChange={setFilterOutcome}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Outcomes</SelectItem>
              <SelectItem value="win">Wins</SelectItem>
              <SelectItem value="loss">Losses</SelectItem>
              <SelectItem value="breakeven">Breakeven</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterDirection} onValueChange={setFilterDirection}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Directions</SelectItem>
              <SelectItem value="long">Longs</SelectItem>
              <SelectItem value="short">Shorts</SelectItem>
            </SelectContent>
          </Select>
          {(filterOutcome !== "all" || filterDirection !== "all" || searchQuery) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setFilterOutcome("all"); setFilterDirection("all"); setSearchQuery(""); }}
            >
              Clear Filters
            </Button>
          )}
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

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Session (Optional)</Label>
                    <Select value={formData.session} onValueChange={(v) => setFormData({...formData, session: v})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select session..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="H1">H1 (2-6 AM)</SelectItem>
                        <SelectItem value="H2">H2 (9:30 AM-12 PM)</SelectItem>
                        <SelectItem value="H3">H3 (12-3 PM)</SelectItem>
                        <SelectItem value="H4">H4 (3-6 PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Actual P&L (Optional)</Label>
                    <Input
                      placeholder="+150 or -50"
                      value={formData.actualPnL}
                      onChange={(e) => setFormData({...formData, actualPnL: e.target.value})}
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

                <Button type="submit" className="w-full">
                  {editingId ? "Update Trade" : "Save Trade"}
                </Button>
              </form>
            </Card>
          </motion.div>
        )}

        {/* Trade List */}
        <div className="space-y-4">
          {filteredTrades.map((trade, idx) => (
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
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
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
                          {trade.session && (
                            <Badge variant="outline" className="font-mono text-xs">
                              {trade.session}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {trade.date}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-2xl font-bold font-mono text-accent">{trade.rr}</div>
                        <div className="text-xs text-muted-foreground">Risk/Reward</div>
                        {trade.actualPnL && (
                          <div className={`text-lg font-bold font-mono mt-1 ${
                            trade.actualPnL.startsWith('+') || !trade.actualPnL.startsWith('-')
                              ? 'text-green-500'
                              : 'text-red-500'
                          }`}>
                            {trade.actualPnL}
                          </div>
                        )}
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

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(trade)}
                        className="gap-2"
                      >
                        <Edit className="w-3 h-3" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(trade.id)}
                        className="gap-2 text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredTrades.length === 0 && !showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground font-mono mb-4">
              {trades.length === 0 ? "No trades logged yet." : "No trades match your filters."}
            </p>
            {trades.length === 0 ? (
              <Button onClick={() => setShowForm(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Log Your First Trade
              </Button>
            ) : (
              <Button onClick={() => { setFilterOutcome("all"); setFilterDirection("all"); setSearchQuery(""); }} variant="outline">
                Clear Filters
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TradeJournal;