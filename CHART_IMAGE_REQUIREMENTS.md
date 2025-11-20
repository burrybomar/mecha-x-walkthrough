# Chart Examples - Image Requirements

This document details what each chart example image should visually show to match its description and educational purpose.

---

## HTF ANALYSIS (4 examples)

### 1. HTF Context & Bias
**Current Image:** `htf-chart-edge.png`
**Should Show:**
- Daily/4H chart view with price structure
- Clear premium/discount zones marked (price in upper half = premium, lower half = discount)
- Daily high labeled as BSL (Buy Side Liquidity) target
- Previous week low labeled as discount zone
- HTF order blocks (rectangles/zones) marked for reversal areas
- Directional bias indicators (arrows or text showing "look for shorts" in premium)

### 2. Clean HTF Level
**Current Image:** `htf-level-clean.png`
**Should Show:**
- Horizontal line showing untouched HTF resistance/support level
- Multiple touches/rejections at this level from past
- Gap/distance between current price and the level
- Annotation: "Await sweep of this level"
- Clean chart without clutter

### 3. HTF Sweep Pattern
**Current Image:** `htf-sweeps-chart.png`
**Should Show:**
- Clear wick piercing through HTF high (or low)
- Strong reversal candle immediately after the sweep
- Body closing back inside the previous range
- Labels: "BSL Sweep" or "SSL Sweep"
- Before/after structure visible

### 4. Key Level Diagram
**Current Image:** `htf-key-level-diagram.png`
**Should Show:**
- Structure of swing highs and lows
- BSL labeled above highs, SSL labeled below lows
- Expected sweep zones (circles or highlights)
- Reversal areas marked after sweep zones
- Educational diagram style (can be annotated/drawn)

---

## LIQUIDITY (3 examples)

### 5. Perfect Liquidity Sweep
**Current Image:** `liquidity-sweep-clean.png`
**Should Show:**
- Sharp wick shooting through a swing high/low
- Body of candle closes back inside the range
- Strong rejection wick (long wick, small body)
- Label: "Liquidity Grab" or "Sweep"
- Next candles showing reversal direction

### 6. BSL/SSL Levels
**Current Image:** `bsl-ssl-chart.png`
**Should Show:**
- Multiple swing highs with "BSL" labels above them
- Multiple swing lows with "SSL" labels below them
- Different timeframe levels (HTF vs LTF liquidity)
- Price path showing how it seeks these levels
- Color-coded or clearly differentiated BSL (bullish) vs SSL (bearish)

### 7. Swing Low Pattern
**Current Image:** `swing-low-confirmation-new.jpg`
**Should Show:**
- Series of lower lows building up SSL
- Final swing low getting swept (wick through)
- Structure shift/break of structure after sweep
- Entry zone formation at the breakdown point
- Annotations showing the sequence of events

---

## PATTERNS (5 examples)

### 8. C2 Pattern Labels
**Current Image:** `c2-labels-chart.png`
**Should Show:**
- 3-candle reversal patterns clearly labeled "C2"
- Multiple C2 patterns on the same chart
- Arrows or indicators showing direction change
- Each C2 after a sweep/liquidity grab
- Text explaining: "3-candle reversal confirms sweep"

### 9. Candle Closure Confirmation
**Current Image:** `closing-within-pattern.jpg`
**Should Show:**
- HTF level (horizontal line)
- Wick sweeping through the level
- Body closing back inside the range (below resistance or above support)
- Annotation: "Closure inside = valid sweep"
- Visual emphasis on where body closes vs where wick extended

### 10. Complete Closing Within Pattern
**Current Image:** `closing-within-complete.jpg`
**Should Show:**
- H4 distribution candle (large range candle)
- Body closes above a sweep high
- Next candle closes back inside the previous range
- Labels: "Distribution Candle", "Closing Within Candle"
- Entry zone now activated

### 11. SMT Divergence (LTF)
**Current Image:** `smt-ltf-chart.png`
**Should Show:**
- Two correlated charts side by side (ES vs NQ, or similar)
- One makes new high, other doesn't (or vice versa)
- Divergence circled or highlighted
- Label: "SMT Divergence Detected"
- Timestamp showing they occurred at same time

### 12. CISD Entry Zone
**Current Image:** `cisd-chart.png`
**Should Show:**
- Point where structure broke (break of swing)
- CISD zone highlighted (rectangle or shaded area)
- Order block or iFVG within the zone
- Price pulling back to this level
- Entry wick rejecting from zone
- Label: "CISD" or "Change in State of Delivery"

---

## ENTRY ZONES (4 examples)

### 13. CISD on LTF
**Current Image:** `ltf-entry-confirmation.jpg`
**Should Show:**
- 5min or 15min chart (lower timeframe)
- Precise entry wick tapping CISD level
- Strong rejection candle (long wick down for longs, or vice versa)
- Stop loss placement shown just beyond sweep
- Clean zoom-in showing entry precision

### 14. Setup Zones Clean
**Current Image:** `trade-setups-h4.jpg`
**Should Show:**
- Multiple CISD zones marked on same chart (after different sweeps)
- Each zone labeled: "Setup Zone 1", "Setup Zone 2", etc.
- Annotations showing which zone to prioritize (closest to sweep)
- HTF bias direction indicated
- Multiple entry opportunities visible

### 15. Multi-Timeframe Confluence
**Current Image:** `h1-m15-within-h4.jpg`
**Should Show:**
- H4 distribution candle clearly visible (large candle body)
- H1 run marked within it
- M15 stop hunt marked
- M15 FVG (Fair Value Gap) marked
- All three elements nested/aligned within the H4 candle
- Labels for each timeframe element

### 16. Distribution Setup
**Current Image:** `distribution-setups.png`
**Should Show:**
- Price consolidating/ranging at premium (highs)
- Multiple candles showing distribution phase
- Volume profile or text: "Volume increases"
- Sweep of high triggering reversal
- Target zone at discount below
- Session time window notation (if applicable)

---

## SESSIONS (3 examples)

### 17. H4 Distribution Candle
**Current Image:** `h4-distribution-formations.jpg`
**Should Show:**
- 2-6 PM EST labeled or highlighted
- H4 candle showing distribution phase (consolidation)
- Final delivery move (strong directional move after distribution)
- Session window marked clearly
- Before/during/after phases visible

### 18. Scalper's Primary Objective
**Current Image:** `scalper-objective.jpg`
**Should Show:**
- Previous H4 candle setting up context
- Next H4 candle marked as "TARGET"
- Annotation: "Catch the next H4 distribution"
- Tight stop loss visualization
- Quick execution zones
- High probability setup markers

---

## REPLACEMENT INSTRUCTIONS

To replace an image:

1. Prepare your new chart screenshot showing the exact elements listed above
2. Name it appropriately (keep same name or update import in ChartExamples.tsx)
3. Place in `/src/assets/` folder
4. If renaming, update the import in `/src/pages/ChartExamples.tsx`

Example:
```typescript
// Old
import htfChart from "@/assets/htf-chart-edge.png";

// New (if renamed)
import htfChart from "@/assets/htf-chart-NEW.png";
```

## CURRENT VS NEEDED MAPPING

| Example Title | Current File | What It MUST Show |
|--------------|--------------|-------------------|
| HTF Context & Bias | htf-chart-edge.png | Premium/discount zones, BSL target, HTF order blocks |
| Clean HTF Level | htf-level-clean.png | Horizontal level, multiple touches, gap to current price |
| HTF Sweep Pattern | htf-sweeps-chart.png | Wick through HTF level + strong reversal candle |
| Key Level Diagram | htf-key-level-diagram.png | Swing structure, BSL/SSL locations, sweep zones |
| Perfect Liquidity Sweep | liquidity-sweep-clean.png | Sharp wick through level, body closes inside |
| BSL/SSL Levels | bsl-ssl-chart.png | Multiple highs/lows labeled with BSL/SSL |
| Swing Low Pattern | swing-low-confirmation-new.jpg | Lower lows building SSL, final sweep, structure shift |
| C2 Pattern Labels | c2-labels-chart.png | 3-candle reversals labeled "C2" after sweeps |
| Candle Closure Confirmation | closing-within-pattern.jpg | Wick through level, body closes back inside |
| Complete Closing Within | closing-within-complete.jpg | H4 distribution + next candle closing within |
| SMT Divergence | smt-ltf-chart.png | Two correlated assets, one makes new high/other doesn't |
| CISD Entry Zone | cisd-chart.png | Structure break point, order block/iFVG, pullback entry |
| CISD on LTF | ltf-entry-confirmation.jpg | 5m/15m zoom, precise entry wick, rejection |
| Setup Zones Clean | trade-setups-h4.jpg | Multiple CISD zones marked, prioritization shown |
| Multi-TF Confluence | h1-m15-within-h4.jpg | H4 candle containing H1 run + M15 hunt + M15 FVG |
| Distribution Setup | distribution-setups.png | Premium consolidation, volume, sweep, target |
| H4 Distribution Candle | h4-distribution-formations.jpg | 2-6PM EST window, distribution phase, delivery |
| Scalper's Objective | scalper-objective.jpg | Previous H4 setup + next H4 target marked |

---

## WHICH IMAGES ARE INACCURATE?

Review each image against its requirements above. Common issues:
- ❌ Wrong timeframe shown
- ❌ Missing key labels (BSL, SSL, CISD, C2)
- ❌ Doesn't show the described pattern
- ❌ Shows different concept than description
- ❌ Too cluttered or unclear
- ❌ Missing annotations that descriptions mention

**Let me know which specific images don't match their requirements and I'll help you update the code!**
