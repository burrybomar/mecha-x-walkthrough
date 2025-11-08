import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Plus, Calendar, TrendingUp, TrendingDown, Brain, Target, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface TradeEntry {
  id: string;
  date: string;
  pair: string;
  direction: "long" | "short";
  // HTF Context
  htfTimeframe: "15m" | "1H" | "4H" | "1D" | "1W";
  htfBias: "bullish" | "bearish" | "neutral";
  htfZone: "premium" | "discount" | "equilibrium";
  // Sweep & Patterns
  sweepType: "SSL" | "BSL" | "Double Purge" | "None";
  sweepLevel: "LTF" | "HTF";
  patternConfirmed: "C2" | "C3" | "SMT" | "None";
  // Entry
  entryZoneType: "CISD" | "iFVG" | "Order Block" | "FVG";
  session: "H1 Setup" | "H2 Reversal" | "H3 Continuation" | "H4 Delivery" | "Outside Session";
  timeframeTraded: "5m" | "15m" | "1H" | "4H";
  // Levels
  entry: string;
  stop: string;
  target: string;
  rr: string;
  actualRR: string;
  // Outcome
  outcome: "win" | "loss" | "breakeven" | "pending";
  // Psychology
  emotionalState: "calm" | "focused" | "neutral" | "anxious" | "fomo" | "revenge";
  disciplineScore: number; // 1-5
  followedPlan: "yes" | "partial" | "no";
  preTradeChecklist: "completed" | "partial" | "skipped";
  // Notes
  notes: string;
  lessonsLearned: string;
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
      htfTimeframe: "4H",
      htfBias: "bullish",
      htfZone: "discount",
      sweepType: "SSL",
      sweepLevel: "HTF",
      patternConfirmed: "C2",
      entryZoneType: "CISD",
      session: "H2 Reversal",
      timeframeTraded: "15m",
      entry: "4905",
      stop: "4895",
      target: "4935",
      rr: "1:3",
      actualRR: "1:3",
      outcome: "win",
      emotionalState: "focused",
      disciplineScore: 5,
      followedPlan: "yes",
      preTradeChecklist: "completed",
      notes: "Clean sweep during H2 window. C2 confirmed. Entered CISD zone at 50% FVG.",
      lessonsLearned: "Patient wait for H2 window paid off. Entry was textbook."
    }
  ]);

  const [formData, setFormData] = useState<Partial<TradeEntry>>({
    date: new Date().toISOString().split('T')[0],
    pair: "",
    direction: "long",
    htfTimeframe: "4H",
    htfBias: "bullish",
    htfZone: "discount",
    sweepType: "SSL",
    sweepLevel: "HTF",
    patternConfirmed: "C2",
    entryZoneType: "CISD",
    session: "H2 Reversal",
    timeframeTraded: "15m",
    entry: "",
    stop: "",
    target: "",
    rr: "",
    actualRR: "",
    outcome: "pending",
    emotionalState: "calm",
    disciplineScore: 3,
    followedPlan: "yes",
    preTradeChecklist: "completed",
    notes: "",
    lessonsLearned: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTrade: TradeEntry = {
      id: Date.now().toString(),
      ...(formData as TradeEntry)
    };
    setTrades([newTrade, ...trades]);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      pair: "",
      direction: "long",
      htfTimeframe: "4H",
      htfBias: "bullish",
      htfZone: "discount",
      sweepType: "SSL",
      sweepLevel: "HTF",
      patternConfirmed: "C2",
      entryZoneType: "CISD",
      session: "H2 Reversal",
      timeframeTraded: "15m",
      entry: "",
      stop: "",
      target: "",
      rr: "",
      actualRR: "",
      outcome: "pending",
      emotionalState: "calm",
      disciplineScore: 3,
      followedPlan: "yes",
      preTradeChecklist: "completed",
      notes: "",
      lessonsLearned: ""
    });
    setShowForm(false);
  };

  // REAL CALCULATED STATS from actual trade data
  const stats = useMemo(() => {
    const completedTrades = trades.filter(t => t.outcome !== "pending");
    const wins = trades.filter(t => t.outcome === "win");
    const losses = trades.filter(t => t.outcome === "loss");

    // Basic stats
    const totalTrades = trades.length;
    const winCount = wins.length;
    const lossCount = losses.length;
    const winRate = completedTrades.length > 0
      ? ((winCount / completedTrades.length) * 100).toFixed(1)
      : "0";

    // Win rate by session
    const sessionStats = {
      "H1 Setup": { wins: 0, total: 0 },
      "H2 Reversal": { wins: 0, total: 0 },
      "H3 Continuation": { wins: 0, total: 0 },
      "H4 Delivery": { wins: 0, total: 0 },
      "Outside Session": { wins: 0, total: 0 }
    };

    completedTrades.forEach(t => {
      sessionStats[t.session].total++;
      if (t.outcome === "win") sessionStats[t.session].wins++;
    });

    // Win rate by HTF zone
    const zoneStats = {
      "premium": { wins: 0, total: 0 },
      "discount": { wins: 0, total: 0 },
      "equilibrium": { wins: 0, total: 0 }
    };

    completedTrades.forEach(t => {
      zoneStats[t.htfZone].total++;
      if (t.outcome === "win") zoneStats[t.htfZone].wins++;
    });

    // Win rate by emotional state
    const emotionStats: Record<string, { wins: number, total: number }> = {};
    completedTrades.forEach(t => {
      if (!emotionStats[t.emotionalState]) {
        emotionStats[t.emotionalState] = { wins: 0, total: 0 };
      }
      emotionStats[t.emotionalState].total++;
      if (t.outcome === "win") emotionStats[t.emotionalState].wins++;
    });

    // Win rate by pattern
    const patternStats: Record<string, { wins: number, total: number }> = {};
    completedTrades.forEach(t => {
      if (!patternStats[t.patternConfirmed]) {
        patternStats[t.patternConfirmed] = { wins: 0, total: 0 };
      }
      patternStats[t.patternConfirmed].total++;
      if (t.outcome === "win") patternStats[t.patternConfirmed].wins++;
    });

    // Average discipline score
    const avgDiscipline = trades.length > 0
      ? (trades.reduce((sum, t) => sum + t.disciplineScore, 0) / trades.length).toFixed(1)
      : "0";

    // Win rate when followed plan
    const planFollowedWins = completedTrades.filter(t => t.followedPlan === "yes" && t.outcome === "win").length;
    const planFollowedTotal = completedTrades.filter(t => t.followedPlan === "yes").length;
    const planFollowedWinRate = planFollowedTotal > 0
      ? ((planFollowedWins / planFollowedTotal) * 100).toFixed(1)
      : "0";

    return {
      totalTrades,
      winCount,
      lossCount,
      winRate,
      sessionStats,
      zoneStats,
      emotionStats,
      patternStats,
      avgDiscipline,
      planFollowedWinRate
    };
  }, [trades]);

  // Auto-generated insights based on real data
  const insights = useMemo(() => {
    const completedTrades = trades.filter(t => t.outcome !== "pending");
    if (completedTrades.length < 3) return [];

    const insights: string[] = [];

    // Best session analysis
    Object.entries(stats.sessionStats).forEach(([session, data]) => {
      if (data.total >= 2) {
        const rate = ((data.wins / data.total) * 100).toFixed(0);
        if (data.wins / data.total >= 0.7) {
          insights.push(`🎯 ${rate}% win rate in ${session} - keep focusing here!`);
        } else if (data.wins / data.total <= 0.4) {
          insights.push(`⚠️ Only ${rate}% win rate in ${session} - avoid or review strategy`);
        }
      }
    });

    // HTF zone analysis
    Object.entries(stats.zoneStats).forEach(([zone, data]) => {
      if (data.total >= 2) {
        const rate = ((data.wins / data.total) * 100).toFixed(0);
        if (data.wins / data.total >= 0.7) {
          insights.push(`📊 ${rate}% win rate in ${zone} zone - optimal entry context`);
        }
      }
    });

    // Emotional state correlation
    Object.entries(stats.emotionStats).forEach(([emotion, data]) => {
      if (data.total >= 2) {
        const rate = ((data.wins / data.total) * 100).toFixed(0);
        if (data.wins / data.total <= 0.35 && emotion !== "calm" && emotion !== "focused") {
          insights.push(`🧠 Win rate drops to ${rate}% when ${emotion} - take a break`);
        } else if (data.wins / data.total >= 0.75) {
          insights.push(`✨ ${rate}% win rate when ${emotion} - maintain this state`);
        }
      }
    });

    // Discipline correlation
    if (parseFloat(stats.avgDiscipline) >= 4) {
      insights.push(`💪 High discipline score (${stats.avgDiscipline}/5) - strong mental game`);
    } else if (parseFloat(stats.avgDiscipline) <= 2.5) {
      insights.push(`⚡ Low discipline score (${stats.avgDiscipline}/5) - focus on rules adherence`);
    }

    // Plan following correlation
    if (parseFloat(stats.planFollowedWinRate) >= 70) {
      insights.push(`📋 ${stats.planFollowedWinRate}% win rate when following plan - stick to it!`);
    }

    return insights;
  }, [trades, stats]);

  return (
    <div className="min-h-screen bg-retro-digital">
      {/* Header */}
      <motion.header
        className="sticky top-0 z-40 backdrop-blur-xl border-b border-border bg-background/95 shadow-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="container mx-auto px-3 md:px-4 py-3 md:px-4">
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

      <div className="container mx-auto px-3 md:px-4 py-6 md:py-12 max-w-7xl">
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
            Framework-based tracking with real-time analytics and psychological insights.
          </p>
        </motion.div>

        {/* Basic Stats */}
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
            <div className="text-2xl font-bold text-green-500">{stats.winCount}</div>
            <div className="text-xs text-muted-foreground">Wins</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-red-500">{stats.lossCount}</div>
            <div className="text-xs text-muted-foreground">Losses</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-accent">{stats.winRate}%</div>
            <div className="text-xs text-muted-foreground">Win Rate</div>
          </Card>
        </motion.div>

        {/* Insights */}
        {insights.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-8"
          >
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-lg font-mono">Data-Driven Insights</h3>
              </div>
              <div className="space-y-2">
                {insights.map((insight, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-muted/30 border border-border">
                    <p className="text-sm font-mono">{insight}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Advanced Analytics */}
        {trades.filter(t => t.outcome !== "pending").length >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 gap-6 mb-8"
          >
            {/* Session Performance */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-lg font-mono">Win Rate by Session</h3>
              </div>
              <div className="space-y-3">
                {Object.entries(stats.sessionStats).map(([session, data]) => {
                  if (data.total === 0) return null;
                  const rate = ((data.wins / data.total) * 100).toFixed(0);
                  return (
                    <div key={session} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-mono">{session}</span>
                        <span className="font-bold">{rate}% ({data.wins}/{data.total})</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${rate}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* HTF Zone Performance */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-lg font-mono">Win Rate by HTF Zone</h3>
              </div>
              <div className="space-y-3">
                {Object.entries(stats.zoneStats).map(([zone, data]) => {
                  if (data.total === 0) return null;
                  const rate = ((data.wins / data.total) * 100).toFixed(0);
                  return (
                    <div key={zone} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-mono capitalize">{zone}</span>
                        <span className="font-bold">{rate}% ({data.wins}/{data.total})</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent transition-all"
                          style={{ width: `${rate}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Add Trade Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
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
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div>
                  <h3 className="font-bold text-lg mb-4 font-mono flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Basic Info
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-mono">Date</Label>
                      <Input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        required
                        className="font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-mono">Pair/Asset</Label>
                      <Input
                        placeholder="ES, NQ, EUR/USD..."
                        value={formData.pair}
                        onChange={(e) => setFormData({...formData, pair: e.target.value})}
                        required
                        className="font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-mono">Direction</Label>
                      <Select value={formData.direction} onValueChange={(v: "long" | "short") => setFormData({...formData, direction: v})}>
                        <SelectTrigger className="font-mono">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="long">Long</SelectItem>
                          <SelectItem value="short">Short</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* HTF Context */}
                <div>
                  <h3 className="font-bold text-lg mb-4 font-mono flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    HTF Context
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-mono">HTF Timeframe</Label>
                      <Select value={formData.htfTimeframe} onValueChange={(v: any) => setFormData({...formData, htfTimeframe: v})}>
                        <SelectTrigger className="font-mono">
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
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-mono">HTF Bias</Label>
                      <Select value={formData.htfBias} onValueChange={(v: any) => setFormData({...formData, htfBias: v})}>
                        <SelectTrigger className="font-mono">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bullish">Bullish</SelectItem>
                          <SelectItem value="bearish">Bearish</SelectItem>
                          <SelectItem value="neutral">Neutral/Conflicted</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-mono">HTF Zone (EQ)</Label>
                      <Select value={formData.htfZone} onValueChange={(v: any) => setFormData({...formData, htfZone: v})}>
                        <SelectTrigger className="font-mono">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="premium">Premium (above 50%)</SelectItem>
                          <SelectItem value="discount">Discount (below 50%)</SelectItem>
                          <SelectItem value="equilibrium">Equilibrium (~50%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Sweep & Pattern */}
                <div>
                  <h3 className="font-bold text-lg mb-4 font-mono flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Sweep & Pattern
                  </h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-mono">Sweep Type</Label>
                      <Select value={formData.sweepType} onValueChange={(v: any) => setFormData({...formData, sweepType: v})}>
                        <SelectTrigger className="font-mono">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SSL">SSL</SelectItem>
                          <SelectItem value="BSL">BSL</SelectItem>
                          <SelectItem value="Double Purge">Double Purge ⟐</SelectItem>
                          <SelectItem value="None">No Sweep</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-mono">Sweep Level</Label>
                      <Select value={formData.sweepLevel} onValueChange={(v: any) => setFormData({...formData, sweepLevel: v})}>
                        <SelectTrigger className="font-mono">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="LTF">LTF</SelectItem>
                          <SelectItem value="HTF">HTF</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-mono">Pattern Confirmed</Label>
                      <Select value={formData.patternConfirmed} onValueChange={(v: any) => setFormData({...formData, patternConfirmed: v})}>
                        <SelectTrigger className="font-mono">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="C2">C2 (Change of Character)</SelectItem>
                          <SelectItem value="C3">C3 (Expansion)</SelectItem>
                          <SelectItem value="SMT">SMT Divergence</SelectItem>
                          <SelectItem value="None">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-mono">Entry Zone Type</Label>
                      <Select value={formData.entryZoneType} onValueChange={(v: any) => setFormData({...formData, entryZoneType: v})}>
                        <SelectTrigger className="font-mono">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CISD">CISD</SelectItem>
                          <SelectItem value="iFVG">iFVG</SelectItem>
                          <SelectItem value="Order Block">Order Block</SelectItem>
                          <SelectItem value="FVG">FVG</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Session & Timing */}
                <div>
                  <h3 className="font-bold text-lg mb-4 font-mono flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Session & Timing
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-mono">Session Phase</Label>
                      <Select value={formData.session} onValueChange={(v: any) => setFormData({...formData, session: v})}>
                        <SelectTrigger className="font-mono">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="H1 Setup">H1 Setup (2-6 AM)</SelectItem>
                          <SelectItem value="H2 Reversal">H2 Reversal (9:30 AM-12 PM)</SelectItem>
                          <SelectItem value="H3 Continuation">H3 Continuation (10 AM-2 PM)</SelectItem>
                          <SelectItem value="H4 Delivery">H4 Delivery (2-6 PM)</SelectItem>
                          <SelectItem value="Outside Session">Outside Session</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-mono">Timeframe Traded</Label>
                      <Select value={formData.timeframeTraded} onValueChange={(v: any) => setFormData({...formData, timeframeTraded: v})}>
                        <SelectTrigger className="font-mono">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5m">5m</SelectItem>
                          <SelectItem value="15m">15m</SelectItem>
                          <SelectItem value="1H">1H</SelectItem>
                          <SelectItem value="4H">4H</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Levels & Outcome */}
                <div>
                  <h3 className="font-bold text-lg mb-4 font-mono">Levels & Outcome</h3>
                  <div className="grid md:grid-cols-5 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-mono">Entry</Label>
                      <Input
                        placeholder="4905"
                        value={formData.entry}
                        onChange={(e) => setFormData({...formData, entry: e.target.value})}
                        required
                        className="font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-mono">Stop</Label>
                      <Input
                        placeholder="4895"
                        value={formData.stop}
                        onChange={(e) => setFormData({...formData, stop: e.target.value})}
                        required
                        className="font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-mono">Target</Label>
                      <Input
                        placeholder="4935"
                        value={formData.target}
                        onChange={(e) => setFormData({...formData, target: e.target.value})}
                        required
                        className="font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-mono">Planned R:R</Label>
                      <Input
                        placeholder="1:3"
                        value={formData.rr}
                        onChange={(e) => setFormData({...formData, rr: e.target.value})}
                        required
                        className="font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-mono">Actual R:R</Label>
                      <Input
                        placeholder="1:3"
                        value={formData.actualRR}
                        onChange={(e) => setFormData({...formData, actualRR: e.target.value})}
                        className="font-mono"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-mono">Outcome</Label>
                    <Select value={formData.outcome} onValueChange={(v: any) => setFormData({...formData, outcome: v})}>
                      <SelectTrigger className="font-mono">
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

                {/* Psychology & Discipline */}
                <div>
                  <h3 className="font-bold text-lg mb-4 font-mono flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Psychology & Discipline
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-mono">Emotional State</Label>
                      <Select value={formData.emotionalState} onValueChange={(v: any) => setFormData({...formData, emotionalState: v})}>
                        <SelectTrigger className="font-mono">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="calm">Calm & Confident</SelectItem>
                          <SelectItem value="focused">Focused</SelectItem>
                          <SelectItem value="neutral">Neutral</SelectItem>
                          <SelectItem value="anxious">Anxious</SelectItem>
                          <SelectItem value="fomo">FOMO</SelectItem>
                          <SelectItem value="revenge">Revenge Trading</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-mono">Followed Trading Plan?</Label>
                      <Select value={formData.followedPlan} onValueChange={(v: any) => setFormData({...formData, followedPlan: v})}>
                        <SelectTrigger className="font-mono">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes - Fully</SelectItem>
                          <SelectItem value="partial">Partially</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-mono">Pre-Trade Checklist</Label>
                      <Select value={formData.preTradeChecklist} onValueChange={(v: any) => setFormData({...formData, preTradeChecklist: v})}>
                        <SelectTrigger className="font-mono">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="completed">Completed ✓</SelectItem>
                          <SelectItem value="partial">Partially</SelectItem>
                          <SelectItem value="skipped">Skipped</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-mono">Discipline Score: {formData.disciplineScore}/5</Label>
                      <Slider
                        value={[formData.disciplineScore || 3]}
                        onValueChange={([v]) => setFormData({...formData, disciplineScore: v})}
                        min={1}
                        max={5}
                        step={1}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground font-mono">
                        <span>Poor</span>
                        <span>Excellent</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-mono">Trade Notes</Label>
                    <Textarea
                      placeholder="What happened? Session timing? C2 quality? Entry precision?"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      rows={3}
                      className="font-mono text-xs"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-mono">Lessons Learned</Label>
                    <Textarea
                      placeholder="What worked? What didn't? What will you do differently?"
                      value={formData.lessonsLearned}
                      onChange={(e) => setFormData({...formData, lessonsLearned: e.target.value})}
                      rows={3}
                      className="font-mono text-xs"
                    />
                  </div>
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
                          <Badge variant="outline" className="font-mono text-xs">
                            {trade.session}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {trade.date}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold font-mono text-accent">{trade.actualRR || trade.rr}</div>
                        <div className="text-xs text-muted-foreground">Risk/Reward</div>
                      </div>
                    </div>

                    {/* Framework Details */}
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <div className="text-muted-foreground text-xs mb-1">HTF Context</div>
                        <div className="font-mono">{trade.htfTimeframe} {trade.htfBias} - {trade.htfZone}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs mb-1">Sweep & Pattern</div>
                        <div className="font-mono">{trade.sweepType} ({trade.sweepLevel}) + {trade.patternConfirmed}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs mb-1">Entry Zone</div>
                        <div className="font-mono">{trade.entryZoneType} on {trade.timeframeTraded}</div>
                      </div>
                    </div>

                    {/* Levels */}
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

                    {/* Psychology */}
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <div className="text-muted-foreground text-xs mb-1">Emotional State</div>
                        <div className="font-mono capitalize">{trade.emotionalState}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs mb-1">Discipline Score</div>
                        <div className="font-mono">{trade.disciplineScore}/5 {'⭐'.repeat(trade.disciplineScore)}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs mb-1">Followed Plan</div>
                        <div className="font-mono capitalize">{trade.followedPlan}</div>
                      </div>
                    </div>

                    {/* Notes */}
                    {trade.notes && (
                      <div className="p-3 rounded-lg bg-muted/30 border border-border">
                        <div className="text-muted-foreground text-xs mb-1 font-mono">Notes</div>
                        <p className="text-sm leading-relaxed">{trade.notes}</p>
                      </div>
                    )}

                    {trade.lessonsLearned && (
                      <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
                        <div className="text-accent text-xs mb-1 font-mono font-bold">Lessons Learned</div>
                        <p className="text-sm leading-relaxed">{trade.lessonsLearned}</p>
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
