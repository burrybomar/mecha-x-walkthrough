import { useState } from "react";
import { motion } from "framer-motion";
import { Book, Clock, TrendingUp, Target, Layers, Timer, ArrowLeft, Settings } from "lucide-react";
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
      id: "profiling-models",
      icon: <Target className="w-5 h-5" />,
      label: "1H/4H Models",
      gradient: "from-emerald-500 via-teal-500 to-emerald-600",
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
    {
      id: "settings",
      icon: <Book className="w-5 h-5" />,
      label: "Settings Guide",
      gradient: "from-indigo-500 via-violet-500 to-indigo-600",
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
            <TabsList className="flex w-full overflow-x-auto mb-8 lg:grid lg:grid-cols-7">
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

            {/* 1H/4H Profiling Models */}
            <TabsContent value="profiling-models" className="space-y-6">
              <Card className="border-emerald-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-mono text-lg sm:text-xl">
                    <Target className="w-5 h-5 sm:w-6 sm:h-6" />
                    1H/4H Profiling Models
                  </CardTitle>
                  <CardDescription>
                    Entry system and target zones - CISD retest entries with defined accumulation, manipulation, and distribution zones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="entry">
                      <AccordionTrigger>Entry Strategy</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-sm sm:text-base">
                        <div>
                          <h4 className="font-semibold mb-2">CISD Retest Entry</h4>
                          <p className="text-muted-foreground">
                            After CISD forms and price expands, wait for price to retest the CISD level. This retest provides the optimal entry point with favorable risk/reward.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Why Retest Works</h4>
                          <p className="text-muted-foreground">
                            • CISD level acts as new support/resistance<br/>
                            • Retest confirms the level is respected<br/>
                            • Provides better entry than chasing the initial move<br/>
                            • Allows tight stop loss placement below/above CISD
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Entry Timing</h4>
                          <p className="text-muted-foreground">
                            Best executed on 1H or 4H timeframes. Watch for price to pull back to CISD zone, show rejection (wick), then continuation candle in direction of trend.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="targets">
                      <AccordionTrigger>Target Zones (1x-4x)</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-sm sm:text-base">
                        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                          <h4 className="font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Primary Targets: 1x & 2-2.5x</h4>
                          <p className="text-muted-foreground mb-2">
                            These are your main take-profit zones. Most moves complete within this range.
                          </p>
                          <p className="text-muted-foreground">
                            • <strong>1x:</strong> First target - conservative, high probability<br/>
                            • <strong>2-2.5x:</strong> Extended target - manipulation zone completion
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">1x - 1.5x: Accumulation/Re-accumulation Zone</h4>
                          <p className="text-muted-foreground">
                            This is where smart money accumulates positions. Price often consolidates here before the next leg. If you're in the trade, consider:
                          </p>
                          <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                            <li>Taking partial profits at 1x</li>
                            <li>Moving stop to breakeven</li>
                            <li>Watching for continuation patterns</li>
                            <li>Expecting some sideways movement (re-accumulation)</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">2x - 2.5x: Manipulation Zone</h4>
                          <p className="text-muted-foreground">
                            The manipulation zone where price often creates final traps before reversal or distribution. Key characteristics:
                          </p>
                          <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                            <li>Price sweeps highs/lows to grab liquidity</li>
                            <li>Creates false breakouts</li>
                            <li>Ideal zone to take majority of profits</li>
                            <li>Often the last push before reversal</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">3.5x - 4x: Expansion/Distribution Zone</h4>
                          <p className="text-muted-foreground">
                            Extended targets only hit during major expansion moves. This is where institutions distribute positions:
                          </p>
                          <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                            <li>Rare - only 20-30% of trades reach here</li>
                            <li>High risk - reversal likely imminent</li>
                            <li>If you're still holding, exit immediately</li>
                            <li>Don't chase if you missed the entry</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="execution">
                      <AccordionTrigger>Trade Execution Plan</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-sm sm:text-base">
                        <div>
                          <h4 className="font-semibold mb-2">Step-by-Step Process</h4>
                          <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                            <li>Wait for valid CISD formation after sweep</li>
                            <li>Wait for price to retest CISD level</li>
                            <li>Confirm rejection at CISD (wick formation)</li>
                            <li>Enter on next continuation candle</li>
                            <li>Place stop below/above CISD level</li>
                            <li>First target: 1x (take 50% profit)</li>
                            <li>Second target: 2-2.5x (take remaining 50%)</li>
                            <li>If momentum is strong, hold runner to 3.5-4x</li>
                          </ol>
                        </div>

                        <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                          <h4 className="font-semibold mb-2">⚠️ Risk Management</h4>
                          <p className="text-muted-foreground">
                            • Never risk more than 1-2% per trade<br/>
                            • Move stop to breakeven at 1x target<br/>
                            • Take majority of profits at 2-2.5x<br/>
                            • Don't hold into distribution zone (3.5-4x) expecting more
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Guide */}
            <TabsContent value="settings" className="space-y-6">
              <Card className="border-indigo-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-mono text-lg sm:text-xl">
                    <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
                    MECHA-X Settings Guide
                  </CardTitle>
                  <CardDescription>
                    Complete reference for all TradingView script settings and inputs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="display">
                      <AccordionTrigger>Display Settings</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-sm sm:text-base">
                        <div>
                          <h4 className="font-semibold mb-2">Font</h4>
                          <p className="text-muted-foreground">
                            <strong>Options:</strong> Default, Monospace<br/>
                            Choose "Monospace" for cleaner, more technical appearance. Affects all labels and text.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Text Size</h4>
                          <p className="text-muted-foreground">
                            <strong>Options:</strong> Tiny, Small, Normal, Large, Huge, Auto<br/>
                            Global text sizing for all labels. Use "Auto" for responsive sizing based on chart zoom.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="htf-setup">
                      <AccordionTrigger>HTF Setup</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-sm sm:text-base">
                        <div>
                          <h4 className="font-semibold mb-2">Mode: Auto vs Manual</h4>
                          <p className="text-muted-foreground">
                            <strong>Auto:</strong> Intelligently selects HTFs based on your chart timeframe<br/>
                            • 5min chart → shows 1H, 4H, Daily<br/>
                            • 15min chart → shows 4H, Daily, Weekly<br/>
                            <strong>Manual:</strong> Configure up to 4 custom HTF layers with full control
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">TF 1-4 (Manual Mode)</h4>
                          <p className="text-muted-foreground">
                            For each timeframe slot:<br/>
                            • <strong>Show:</strong> Enable/disable this HTF layer<br/>
                            • <strong>Timeframe:</strong> Select specific timeframe (15m, 1H, 4H, 1D, 1W, etc.)<br/>
                            • <strong>Bars:</strong> Number of HTF candles to display (1-60)<br/>
                            • <strong>Map:</strong> Show BSL/SSL lines and EQ levels for this HTF
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="htf-candles">
                      <AccordionTrigger>HTF Candles Display</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-sm sm:text-base">
                        <div>
                          <h4 className="font-semibold mb-2">Colors</h4>
                          <p className="text-muted-foreground">
                            • <strong>Bull:</strong> Color for bullish HTF candles (default: green)<br/>
                            • <strong>Bear:</strong> Color for bearish HTF candles (default: black)<br/>
                            • <strong>Wick:</strong> Color for candle wicks and borders
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Position & Size</h4>
                          <p className="text-muted-foreground">
                            • <strong>Offset:</strong> Distance from price action (default: 25)<br/>
                            • <strong>Gap:</strong> Space between HTF candles (1-4)<br/>
                            • <strong>Width:</strong> Candle width (Tiny, Small, Medium, Large, Huge)
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Bias Arrow</h4>
                          <p className="text-muted-foreground">
                            Optional bias arrow above HTF candles showing directional trend (↑/↓). Configure bull/bear colors.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Labels</h4>
                          <p className="text-muted-foreground">
                            Position HTF interval labels (15m, 4H, MON, etc.) Above, Below, or Inside candles. Adjust size and color.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="chart-mapping">
                      <AccordionTrigger>Chart Mapping</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-sm sm:text-base">
                        <div>
                          <h4 className="font-semibold mb-2">BSL/SSL Lines</h4>
                          <p className="text-muted-foreground">
                            <strong>Enable:</strong> Show Buyside/Sellside Liquidity lines<br/>
                            <strong>Style:</strong> Line style (Solid/Dashed/Dotted)<br/>
                            <strong>Width:</strong> Line thickness (0-4)<br/>
                            <strong>Labels:</strong> Show "BSL/SSL" text labels<br/>
                            <strong>Count:</strong> Number of highs/lows to track (1-20 each)
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Dividers (Open/Close Lines)</h4>
                          <p className="text-muted-foreground">
                            Vertical lines marking HTF candle opens/closes:<br/>
                            • <strong>Auto Hierarchy:</strong> Different styles based on timeframe importance<br/>
                            • <strong>≤1H:</strong> Scalping TFs (1m-1H) - dotted<br/>
                            • <strong>4-8H:</strong> Session-based intraday - dashed<br/>
                            • <strong>1D:</strong> Daily structure - solid<br/>
                            • <strong>1W+:</strong> Macro TFs - bold solid
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">EQ (Equilibrium) Lines</h4>
                          <p className="text-muted-foreground">
                            <strong>Enable:</strong> Show 50% equilibrium levels<br/>
                            <strong>Style & Width:</strong> Customize appearance<br/>
                            <strong>Labels:</strong> Show "EQ" text with time context<br/>
                            <strong>Count:</strong> Number of EQ levels to display (1-20)
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="liquidity-sweeps">
                      <AccordionTrigger>Liquidity Sweeps</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-sm sm:text-base">
                        <div>
                          <h4 className="font-semibold mb-2">Enable Settings</h4>
                          <p className="text-muted-foreground">
                            • <strong>Enable:</strong> Master toggle for sweep detection<br/>
                            • <strong>LTF:</strong> Show lower timeframe sweeps<br/>
                            • <strong>HTF:</strong> Show higher timeframe sweeps<br/>
                            • <strong>Live:</strong> Show real-time sweeps (unconfirmed)
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Valid Sweeps</h4>
                          <p className="text-muted-foreground">
                            Sweeps that hold and form reversals:<br/>
                            • Configurable line style, width, color<br/>
                            • Default: Solid black line<br/>
                            • These are confirmed sweep patterns
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Invalid Sweeps</h4>
                          <p className="text-muted-foreground">
                            Sweeps that fail (price continues through):<br/>
                            • Optional display<br/>
                            • Separate LTF/HTF toggles<br/>
                            • Different styling (usually gray/dashed)<br/>
                            • Shows failed setups for learning
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="pattern-detection">
                      <AccordionTrigger>Pattern Detection</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-sm sm:text-base">
                        <div>
                          <h4 className="font-semibold mb-2">C2 Labels</h4>
                          <p className="text-muted-foreground">
                            <strong>Show:</strong> Display C2 (reversal candle) labels<br/>
                            <strong>Size:</strong> Label size (Tiny to Huge)<br/>
                            <strong>Color:</strong> Label color (default: black)<br/>
                            C2 marks the exact candle where sweep reversed
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">C3 Labels</h4>
                          <p className="text-muted-foreground">
                            <strong>Show:</strong> Display C3 (expansion candle) labels<br/>
                            <strong>Size:</strong> Label size<br/>
                            <strong>Color:</strong> Label color (default: purple)<br/>
                            C3 marks the expansion candle after reversal
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">C3 Expectation Box</h4>
                          <p className="text-muted-foreground">
                            Optional box showing expected C3 expansion range:<br/>
                            • Bull box (green) for upward expansion<br/>
                            • Bear box (red) for downward expansion<br/>
                            • Breaks indicate failed expansion
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">SMT (Smart Money Technique)</h4>
                          <p className="text-muted-foreground">
                            <strong>Enable:</strong> Turn on SMT divergence detection<br/>
                            <strong>Mode:</strong> Binary (2 assets) or Triad (3 assets)<br/>
                            <strong>Asset Override:</strong> Manually specify correlated assets<br/>
                            • Binary: 1 primary + 1 correlated<br/>
                            • Triad: 1 primary + 2 correlated (algorithm picks strongest)
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="cisd-settings">
                      <AccordionTrigger>CISD Settings</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-sm sm:text-base">
                        <div>
                          <h4 className="font-semibold mb-2">CISD Line</h4>
                          <p className="text-muted-foreground">
                            <strong>Enable:</strong> Show CISD detection<br/>
                            <strong>Style & Width:</strong> Line appearance<br/>
                            <strong>Bull/Bear Colors:</strong> Separate colors for direction
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">CISD Label</h4>
                          <p className="text-muted-foreground">
                            <strong>Text:</strong> Label text (default: "CISD")<br/>
                            <strong>Size:</strong> Label size<br/>
                            <strong>Colors:</strong> Different colors for bull/bear CISD
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Projections</h4>
                          <p className="text-muted-foreground">
                            <strong>Enable:</strong> Show target projection lines<br/>
                            <strong>Bullish Targets:</strong> Comma-separated (e.g., "1,2,2.5,3.5,4")<br/>
                            <strong>Bearish Targets:</strong> Same format<br/>
                            <strong>Style:</strong> Projection line appearance<br/>
                            <strong>Colors:</strong> Separate bull/bear projection colors
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="ifvg-settings">
                      <AccordionTrigger>iFVG Settings</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-sm sm:text-base">
                        <div>
                          <h4 className="font-semibold mb-2">iFVG Display</h4>
                          <p className="text-muted-foreground">
                            <strong>Show:</strong> Enable iFVG box detection<br/>
                            <strong>Bull Color:</strong> Bullish iFVG box color (default: green transparent)<br/>
                            <strong>Bear Color:</strong> Bearish iFVG box color (default: red transparent)<br/>
                            <br/>
                            iFVGs only appear after valid sweeps - they mark the gap that formed during the reversal phase.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="alerts-sessions">
                      <AccordionTrigger>Alerts & Sessions</AccordionTrigger>
                      <AccordionContent className="space-y-4 text-sm sm:text-base">
                        <div>
                          <h4 className="font-semibold mb-2">Alerts</h4>
                          <p className="text-muted-foreground">
                            <strong>Formation:</strong> Alert when new sweep forms<br/>
                            <strong>Failure:</strong> Alert when sweep invalidates<br/>
                            <br/>
                            Set up TradingView alerts using these conditions to get notified of key events.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Session Models Table</h4>
                          <p className="text-muted-foreground">
                            <strong>Show:</strong> Display session models info table<br/>
                            <strong>Position:</strong> Top Left/Right, Bottom Left/Right<br/>
                            <strong>Size:</strong> Table size (Tiny, Small, Normal, Large)<br/>
                            <br/>
                            Shows current session, time remaining, and active Silver Bullet/Macro windows.
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