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
            <TabsList className="flex w-full overflow-x-auto mb-8 lg:grid lg:grid-cols-5">
              {topics.map((topic) => (
                <TabsTrigger 
                  key={topic.id} 
                  value={topic.id}
                  className="gap-2 data-[state=active]:bg-primary/10 whitespace-nowrap flex-shrink-0"
                >
                  {topic.icon}
                  <span className="text-xs sm:text-sm">{topic.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* TTrades Model */}
            <TabsContent value="ttrades" className="space-y-6">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-mono text-lg sm:text-xl">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                    TTrades Foundation
                  </CardTitle>
                  <CardDescription>
                    Core swing framework - how to spot reversals and time your entries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="concepts">
                      <AccordionTrigger>Building Blocks</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-sm sm:text-base">
                        <div>
                          <h4 className="font-semibold mb-2">Opposing Candles</h4>
                          <p className="text-muted-foreground">When a candle closes opposite to the prior move, that's your reversal signal. Mark these - they're your entry zones.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Fair Value Gaps (FVG)</h4>
                          <p className="text-muted-foreground">Price gaps = imbalances = magnets. Price loves to fill these. Use them as entry targets when combined with swing points.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Discount vs Premium</h4>
                          <p className="text-muted-foreground">Buy low, sell high. Discount = below equilibrium (buy zone). Premium = above equilibrium (sell zone). Simple.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="swings">
                      <AccordionTrigger>Reading Swings</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-sm sm:text-base">
                        <div>
                          <h4 className="font-semibold mb-2">Candle 2 - The Reversal</h4>
                          <p className="text-muted-foreground">Second candle closes back inside the range? That's your reversal. This is where the swing forms.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Candle 3 - The Expansion</h4>
                          <p className="text-muted-foreground">After the reversal, candle 3 should expand toward your target. If it doesn't reach, candle 4 will continue.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Wicks Show The Story</h4>
                          <p className="text-muted-foreground">Big wick = failed attempt. Small wick = strong direction. Watch where wicks form relative to equilibrium.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="confirmation">
                      <AccordionTrigger>CISD - Your Confirmation Tool</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-sm sm:text-base">
                        <div>
                          <h4 className="font-semibold mb-2">What Is CISD?</h4>
                          <p className="text-muted-foreground">Change in State of Delivery. When price shifts from making lower lows to higher lows (or vice versa), that's your confirmation the swing is valid.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">How To Use It</h4>
                          <p className="text-muted-foreground">Wait for CISD before entering. No CISD = no trade. It confirms the structure changed and gives you your target projection.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="poi">
                      <AccordionTrigger>Where To Enter (POI)</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-sm sm:text-base">
                        <div>
                          <h4 className="font-semibold mb-2">Opposing Candles</h4>
                          <p className="text-muted-foreground">These are your entry zones. Price reversed here once, it'll likely react again.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Swing Highs/Lows</h4>
                          <p className="text-muted-foreground">Previous swing points = future reaction zones. Mark them, use them.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">FVG as Entry</h4>
                          <p className="text-muted-foreground">Price gaps are magnets. When combined with a swing point, they're gold.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="calendar">
                      <AccordionTrigger>News & Timing</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-sm sm:text-base">
                        <div>
                          <h4 className="font-semibold mb-2">High-Impact News</h4>
                          <p className="text-muted-foreground">News creates volatility = sweeps liquidity = forms swings. Watch the calendar, trade the reaction.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Monday Setup</h4>
                          <p className="text-muted-foreground">Monday sets the weekly tone. Look for manipulation early week, expansion mid-to-late week.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="analysis">
                      <AccordionTrigger>Top-Down Analysis</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-sm sm:text-base">
                        <div>
                          <h4 className="font-semibold mb-2">Weekly → Daily Direction</h4>
                          <p className="text-muted-foreground">Weekly gives you the big picture. Daily gives you the swing. Trade with the HTF, time with the LTF.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">4H/1H Entry Timing</h4>
                          <p className="text-muted-foreground">Lower timeframes confirm your entry. Wait for CISD on 4H/1H before pulling the trigger.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="entries">
                      <AccordionTrigger>Execution (OSOK)</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-sm sm:text-base">
                        <div>
                          <h4 className="font-semibold mb-2">One Shot, One Kill</h4>
                          <p className="text-muted-foreground">One entry per setup. Either it works or it doesn't. No averaging down, no hoping. Precision.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Works On Any Timeframe</h4>
                          <p className="text-muted-foreground">Same logic scales. Daily, 4H, 1H - swings form the same way. Pick your timeframe, apply the rules.</p>
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
                  <CardTitle className="flex items-center gap-2 font-mono text-lg sm:text-xl">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                    4H Session Playbook
                  </CardTitle>
                  <CardDescription>
                    Mechanical session-by-session guide - know which 4H candle will reverse and expand
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="overview">
                      <AccordionTrigger>The Core Idea</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-sm sm:text-base">
                        <div>
                          <h4 className="font-semibold mb-2">Simple Logic</h4>
                          <p className="text-muted-foreground">
                            Daily candle = 6 × 4H candles. One session reverses (wick), next session expands (body). Identify which 4H candle reverses, trade the expansion that follows.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Wick = Reversal, Body = Expansion</h4>
                          <p className="text-muted-foreground">
                            When a 4H candle forms a wick, that's the reversal. The body of the next candle(s) = your expansion/trade opportunity.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="structure">
                      <AccordionTrigger>Key 4H Windows</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-sm sm:text-base">
                        <div>
                          <h4 className="font-semibold mb-2">Indices - 3 Key Windows</h4>
                          <p className="text-muted-foreground">
                            • 2:00-6:00 AM (London open)<br/>
                            • 6:00-10:00 AM (NY pre-market/open)<br/>
                            • 10:00-2:00 PM (NY AM - close before lunch 12PM)
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Forex - Same Idea, Different Times</h4>
                          <p className="text-muted-foreground">
                            • 1:00-5:00 AM<br/>
                            • 5:00-9:00 AM<br/>
                            • 9:00-1:00 PM (especially on 10AM news days)
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="patterns">
                      <AccordionTrigger>Session Patterns (When To Trade)</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-sm sm:text-base">
                        <div>
                          <h4 className="font-semibold mb-2">Asia Reversal → London/NY Expansion</h4>
                          <p className="text-muted-foreground">
                            If Asia (18:00 or 22:00 candle) reverses, London and NY will expand that move.<br/>
                            Trade London open and NY continuation.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">London Reversal → NY Expansion</h4>
                          <p className="text-muted-foreground">
                            Most common. London 2AM-6AM candle forms the reversal wick, NY session expands.<br/>
                            Enter on NY open continuation.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">NY Reversal (News Days)</h4>
                          <p className="text-muted-foreground">
                            When Asia/London fail to reverse, NY will handle it (usually around news).<br/>
                            6AM-10AM or 10AM candle reverses, then expands into close.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="entries-4h">
                      <AccordionTrigger>How To Enter</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-sm sm:text-base">
                        <div>
                          <h4 className="font-semibold mb-2">On Reversal Candles</h4>
                          <p className="text-muted-foreground">Wait for CISD confirmation on M15. Then enter the reversal candle's OB/FVG.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">On Continuation Candles</h4>
                          <p className="text-muted-foreground">After reversal confirmed, enter continuation candle OBs toward your target.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Timing Is Everything</h4>
                          <p className="text-muted-foreground">
                            • Watch 4H open<br/>
                            • Drop to M15 for CISD<br/>
                            • Enter next continuation move
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="advanced">
                      <AccordionTrigger>Advanced Patterns</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-sm sm:text-base">
                        <div>
                          <h4 className="font-semibold mb-2">Manipulation → Reversal</h4>
                          <p className="text-muted-foreground">
                            HRLR (High Resistance Run) = manipulation sweep. LRLR (Low Resistance Run) = true move. Watch for the fake-out before the breakout.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Protected vs Unprotected Swings</h4>
                          <p className="text-muted-foreground">
                            Protected swing = OB into key level, won't get touched again. Unprotected swing = gets swept. Trade FROM protected swings TOWARD unprotected ones.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Session Profiles</h4>
                          <p className="text-muted-foreground">
                            London Reversal = wick in London session, body in NY. NY Reversal = both wick and body in NY (happens on news/high-volatility days).
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