import { useState } from "react";
import { motion } from "framer-motion";
import { Book, Clock, TrendingUp, Target, Layers, Timer, ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Knowledge = () => {
  const navigate = useNavigate();

  const topics = [
    {
      id: "ttrades",
      icon: <TrendingUp className="w-5 h-5" />,
      label: "TTrades Model",
      gradient: "from-primary via-accent to-primary",
    },
    {
      id: "4h-profiling",
      icon: <Clock className="w-5 h-5" />,
      label: "4H Candle Profiling",
      gradient: "from-blue-500 via-cyan-500 to-blue-600",
    },
    {
      id: "liquidity",
      icon: <Layers className="w-5 h-5" />,
      label: "IRL/ERL Liquidity",
      gradient: "from-purple-500 via-pink-500 to-purple-600",
    },
    {
      id: "ndm",
      icon: <Target className="w-5 h-5" />,
      label: "Next Day Model",
      gradient: "from-green-500 via-emerald-500 to-green-600",
    },
    {
      id: "time-range",
      icon: <Timer className="w-5 h-5" />,
      label: "Time & Range",
      gradient: "from-orange-500 via-yellow-500 to-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Subtle Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/98 to-primary/3" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.header 
          className="border-b border-border/40 backdrop-blur-sm bg-background/80"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div className="flex items-center gap-3">
                <Book className="w-8 h-8 text-primary" />
                <div>
                  <h1 className="text-3xl font-bold font-mono">Knowledge Base</h1>
                  <p className="text-sm text-muted-foreground">Complete trading system documentation</p>
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Content */}
        <main className="container mx-auto px-4 py-12">
          <Tabs defaultValue="ttrades" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
              {topics.map((topic) => (
                <TabsTrigger 
                  key={topic.id} 
                  value={topic.id}
                  className="gap-2 data-[state=active]:bg-primary/10"
                >
                  {topic.icon}
                  <span className="hidden sm:inline">{topic.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* TTrades Model */}
            <TabsContent value="ttrades" className="space-y-6">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-mono">
                    <TrendingUp className="w-6 h-6" />
                    TTrades Model Overview
                  </CardTitle>
                  <CardDescription>
                    Comprehensive framework for identifying swings, confirmations, and entry points
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="concepts">
                      <AccordionTrigger>Core Concepts</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Opposing Candles</h4>
                          <p className="text-muted-foreground">Using opposing candles to identify reversal points and point of interest zones.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Fair Value Gaps (FVG)</h4>
                          <p className="text-muted-foreground">Identifying and trading imbalances in price delivery for entry opportunities.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Equilibrium</h4>
                          <p className="text-muted-foreground">Understanding discount and premium zones to determine optimal entry locations.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="swings">
                      <AccordionTrigger>Swing Highs & Lows</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Candle 2 Closure</h4>
                          <p className="text-muted-foreground">The reversal candle closure pattern that signals swing formation.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Candle 3 Closure</h4>
                          <p className="text-muted-foreground">Conditional rule for swing confirmation and continuation expectations.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Wicks & Equilibrium</h4>
                          <p className="text-muted-foreground">Understanding order flow through wick analysis and equilibrium zones.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="confirmation">
                      <AccordionTrigger>CISD Confirmation & Projection</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Swing Confirmation</h4>
                          <p className="text-muted-foreground">Using CISD (Change in State of Delivery) to confirm valid swing points and determine targets.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Ideal Formation</h4>
                          <p className="text-muted-foreground">Identifying the ideal swing formation for high-probability setups.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="poi">
                      <AccordionTrigger>Point of Interest (POI)</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Opposing Candles POI</h4>
                          <p className="text-muted-foreground">Using opposing candles to mark zones of interest for entries.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Highs & Lows POI</h4>
                          <p className="text-muted-foreground">Leveraging swing highs and lows as key reference points.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Fair Value Gaps POI</h4>
                          <p className="text-muted-foreground">FVGs serve as high-probability zones for price reaction.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="calendar">
                      <AccordionTrigger>Economic Calendar</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Applying the Economic Calendar</h4>
                          <p className="text-muted-foreground">Understanding how news events affect market structure and timing.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Monday Rule</h4>
                          <p className="text-muted-foreground">Special considerations for Monday trading and weekly bias development.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="analysis">
                      <AccordionTrigger>Multi-Timeframe Analysis</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Daily Chart Analysis</h4>
                          <p className="text-muted-foreground">Identifying daily swing points for directional bias.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Weekly Profile</h4>
                          <p className="text-muted-foreground">Blending weekly profiles with daily swing points for higher timeframe context.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Hourly Confirmation</h4>
                          <p className="text-muted-foreground">Using hourly timeframes to confirm swing formation and time entries.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="entries">
                      <AccordionTrigger>Entry Logic & OSOK Model</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">OSOK Entries</h4>
                          <p className="text-muted-foreground">One Shot One Kill entry model for precision trading.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Fractal Model</h4>
                          <p className="text-muted-foreground">A model for any timeframe - applying the same principles across different time horizons.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 4H Candle Profiling */}
            <TabsContent value="4h-profiling" className="space-y-6">
              <Card className="border-blue-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-mono">
                    <Clock className="w-6 h-6" />
                    4H Candle Profiling
                  </CardTitle>
                  <CardDescription>
                    The mechanical way to read price action and anticipate session behavior
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="overview">
                      <AccordionTrigger>Framework Overview</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Thought Process</h4>
                          <p className="text-muted-foreground">
                            If we can profile weekly candles—where one day's reversal leads to another day's expansion—we can apply the same logic to 4H candles within the daily range. When one 4H candle reverses, creating the second candle of the swing point, the following candle is expected to expand.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Wick vs Body</h4>
                          <p className="text-muted-foreground">
                            • Wick = Reversal phase<br/>
                            • Body = Expansion phase<br/>
                            The goal: identify the reversal, then trade the expansion.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="structure">
                      <AccordionTrigger>Daily Range Structure</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Indices (6 × 4H candles)</h4>
                          <p className="text-muted-foreground">
                            • 2:00 AM - 6:00 AM<br/>
                            • 6:00 AM - 10:00 AM<br/>
                            • 10:00 AM - 2:00 PM (Close before 12:00 PM NY Lunch)
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Forex</h4>
                          <p className="text-muted-foreground">
                            • 1:00 AM - 5:00 AM<br/>
                            • 5:00 AM - 9:00 AM<br/>
                            • 9:00 AM - 1:00 PM (On 10:00 AM news days)
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="patterns">
                      <AccordionTrigger>Reversal Patterns</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Asia Reversal Pattern</h4>
                          <p className="text-muted-foreground">
                            If Asia candles reverse, expect London expansion and NY continuation.<br/>
                            • Indices: Reversal within 18:00 or 22:00 candle<br/>
                            • Forex: Reversal within 17:00 or 21:00 candle
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">London Reversal Pattern</h4>
                          <p className="text-muted-foreground">
                            On classic buy days, expect London reversal with NY continuation.<br/>
                            • Indices: 2:00 AM - 6:00 AM window (focus on 2:00 AM candle)<br/>
                            • Forex: 1:00 AM - 5:00 AM window (focus on 1:00 AM candle)
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">NY Reversal Pattern</h4>
                          <p className="text-muted-foreground">
                            When London and Asia fail, NY handles reversals (common on news days).<br/>
                            • Indices: 6:00 AM - 10:00 AM reversal into expansion<br/>
                            • Forex: 5:00 AM - 9:00 AM reversal into expansion
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="entries-4h">
                      <AccordionTrigger>Entry Ideas</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Reversal Candle Entry</h4>
                          <p className="text-muted-foreground">Use CISD as confluence for reversal candle entries.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Continuation Candle Entry</h4>
                          <p className="text-muted-foreground">Use Orderblocks as confluence for continuation candle entries.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Key Focus</h4>
                          <p className="text-muted-foreground">
                            • Observe the open of the 4H candle<br/>
                            • Watch for M15 reversal confirmation<br/>
                            • Enter on next continuation candle
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="advanced">
                      <AccordionTrigger>Advanced Concepts</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">HRLR → LRLR</h4>
                          <p className="text-muted-foreground">
                            High Resistance Liquidity Runs → Low Resistance Liquidity Runs<br/>
                            In simple terms: manipulation → failure swing
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Protected vs Failure Swings</h4>
                          <p className="text-muted-foreground">
                            Protected Swing = OB/opposing candle into key level (won't be revisited)<br/>
                            Trade away from protected swings toward unprotected/failure swings
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Daily Profiles</h4>
                          <p className="text-muted-foreground">
                            • London Reversal = wick in London, NY expansion<br/>
                            • NY Reversal = wick in NY (after London/Asia fails)
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            {/* IRL/ERL Liquidity */}
            <TabsContent value="liquidity" className="space-y-6">
              <Card className="border-purple-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-mono">
                    <Layers className="w-6 h-6" />
                    Internal & External Range Liquidity
                  </CardTitle>
                  <CardDescription>
                    Understanding liquidity relationships and their impact on price movement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="internal">
                      <AccordionTrigger>Internal Liquidity (IRL)</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div>
                          <p className="text-muted-foreground">
                            Internal Range Liquidity refers to liquidity pools that exist within an established range. These are interim highs and lows that price may sweep before making its true directional move.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Characteristics</h4>
                          <p className="text-muted-foreground">
                            • Created by consolidation within a range<br/>
                            • Often swept before external liquidity<br/>
                            • Can be used to refine entries
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="external">
                      <AccordionTrigger>External Liquidity (ERL)</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div>
                          <p className="text-muted-foreground">
                            External Range Liquidity refers to liquidity pools that exist outside an established range—typically swing highs and lows that represent major liquidity objectives.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Buyside Liquidity</h4>
                          <p className="text-muted-foreground">
                            Resting buy stops above swing highs—targets for bearish moves.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Sellside Liquidity</h4>
                          <p className="text-muted-foreground">
                            Resting sell stops below swing lows—targets for bullish moves.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="relationship">
                      <AccordionTrigger>IRL/ERL Relationship</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div>
                          <p className="text-muted-foreground">
                            The relationship between internal and external liquidity helps determine:
                          </p>
                          <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-2">
                            <li>Whether price will sweep internal liquidity before external</li>
                            <li>If the current range is accumulation or distribution</li>
                            <li>Where the true Draw on Liquidity (DOL) is located</li>
                            <li>Optimal entry timing based on liquidity sweeps</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Trading Application</h4>
                          <p className="text-muted-foreground">
                            Watch for internal liquidity sweeps first, then anticipate moves toward external liquidity targets. This sequence helps avoid false moves and improves entry timing.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Next Day Model */}
            <TabsContent value="ndm" className="space-y-6">
              <Card className="border-green-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-mono">
                    <Target className="w-6 h-6" />
                    MMXM's Next Day Model
                  </CardTitle>
                  <CardDescription>
                    A secret to predicting daily bias and expansion candles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="rules">
                      <AccordionTrigger>Model Rules</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Core Principle</h4>
                          <p className="text-muted-foreground">
                            Price must reach a HTF PD array before the model activates.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Candle 1 - Draw on Liquidity (DOL)</h4>
                          <p className="text-muted-foreground">
                            When Candle 2 (reversal candle at HTF level) fails to close above/below the previous candle and instead closes back inside the range, Candle 1 becomes the DOL.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Candle 3 - Expansion</h4>
                          <p className="text-muted-foreground">
                            Candle 3 will be an OLHC or OHLC candle (expansion candle).
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Candle 4 - Continued Expansion</h4>
                          <p className="text-muted-foreground">
                            If Candle 3 does not reach the Candle 1 draw, Candle 4 will also be considered an expansion candle.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="scenarios">
                      <AccordionTrigger>Trading Scenarios</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">1st Scenario</h4>
                          <p className="text-muted-foreground">
                            Price reaches HTF PDA, Candle 2 fails to break structure, closes inside range, Candle 3 expands toward Candle 1 DOL.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">2nd Scenario</h4>
                          <p className="text-muted-foreground">
                            Similar to 1st but Candle 3 doesn't fully reach DOL, so Candle 4 continues expansion.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">3rd Scenario</h4>
                          <p className="text-muted-foreground">
                            If liquidity or imbalance resides below the Candle 1 draw, target that as extended objective.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="confirmation-ndm">
                      <AccordionTrigger>Reversal Confirmation</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div>
                          <p className="text-muted-foreground">
                            The reversal can be confirmed through CISD on 4H or 1H timeframe.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">What to Look For</h4>
                          <p className="text-muted-foreground">
                            • HTF PDA engagement<br/>
                            • Candle 2 failure to sustain direction<br/>
                            • CISD confirmation on lower timeframe<br/>
                            • Clear DOL target from Candle 1
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Time & Range */}
            <TabsContent value="time-range" className="space-y-6">
              <Card className="border-orange-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-mono">
                    <Timer className="w-6 h-6" />
                    Time and Range in a Candle
                  </CardTitle>
                  <CardDescription>
                    Understanding how candles form and anticipating expansion vs consolidation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="fundamentals">
                      <AccordionTrigger>Time & Range Fundamentals</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Time in a Candle</h4>
                          <p className="text-muted-foreground">
                            Each candle has a specific time window to expand:<br/>
                            • Daily candle = 24 hours<br/>
                            • Hourly candle = 60 minutes<br/>
                            • 4H candle = 4 hours
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Range in a Candle</h4>
                          <p className="text-muted-foreground">
                            Within its time window, a candle must create range—either by creating wick then body, or body then wick. The range pattern reveals market intention.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">ICT Quote</h4>
                          <p className="text-muted-foreground italic">
                            "Time first, price later."
                          </p>
                          <p className="text-muted-foreground mt-2">
                            Market expands during specific times: news releases, equity opens (NYSE 9:30), and session opens (London, NY, Asia).
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="expansion">
                      <AccordionTrigger>Trading the Expansion</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Expansion Signals</h4>
                          <p className="text-muted-foreground">
                            If a candle is going to expand, it often:<br/>
                            • Creates a small wick early<br/>
                            • Uses less time for the wick<br/>
                            • Leaves more time for directional body expansion
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Example</h4>
                          <p className="text-muted-foreground">
                            If an hourly candle prints a small wick in the first 5–10 minutes, the remaining 50–55 minutes may expand directionally—giving a trading opportunity.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="consolidation">
                      <AccordionTrigger>When Candles Consolidate</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Consolidation Signals</h4>
                          <p className="text-muted-foreground">
                            If a new candle:<br/>
                            • Takes too much time to create opposing run<br/>
                            • Struggles to close above/below the opposing run<br/>
                            • Doesn't engage with POI or SMT
                          </p>
                          <p className="text-muted-foreground mt-2">
                            That's a red flag for consolidation.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Key Concept</h4>
                          <p className="text-muted-foreground italic">
                            "When price takes time, it engineers liquidity."
                          </p>
                          <p className="text-muted-foreground mt-2">
                            The candle is likely forming a tight range to later manipulate and reverse—classic AMD (Accumulation, Manipulation, Distribution) behavior.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="engagement">
                      <AccordionTrigger>How to Engage</AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Setup Requirements</h4>
                          <p className="text-muted-foreground">
                            • Wait for swing point to form<br/>
                            • Look for opposing runs/OBs forming quickly<br/>
                            • Preferably, OB should engage with POI (FVG, OB, Range high/low, SMT divergence)
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Non-POI OB (Low Quality)</h4>
                          <p className="text-muted-foreground">
                            If an opposing run or OB forms without engaging any PD Array, SMT divergence, or clear POI, it's an unprotected swing—likely to be hunted first before the real move.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Quality Filter</h4>
                          <p className="text-muted-foreground">
                            Only trade OBs that engage with clear POIs and form quickly within the candle's time window.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/40 backdrop-blur-sm bg-background/80 py-8">
          <div className="container mx-auto px-4 text-center text-muted-foreground font-mono text-sm">
            <p>MECHA-X Trading System • Time-Based HTF Sweep Framework</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Knowledge;