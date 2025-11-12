# Setup - TradingView Indicator Configuration

## Header
**MECHA-X Settings**
- Back

---

## Hero

# TradingView Indicator Configuration Guide

Each setting automates a specific part of the 6-step framework. Configure once in TradingView, trade forever.

**PineScript v6**

---

## Settings Panel

### Display (Global)
Font: Use Monospace for cleaner technical appearance. Text Size: Global sizing for all labels (Auto = responsive based on chart zoom).

**Settings:**
- Font: Monospace ✓
- Text Size: Normal (Options: Tiny, Small, Normal, Large, Huge, Auto)

---

### HTF Setup (Step 1: HTF Context)
Auto Mode: Intelligently selects HTFs based on chart TF (5m → 1H/4H/Daily). Manual: Configure 4 custom HTF layers with full control.

**Settings:**
- Mode: Auto ✓ (Options: Auto, Manual)

**Manual TF Layers:**

**TF 1:**
- Enabled: ✓
- Timeframe: 15m
- Bars: 10
- Map: ✓

**TF 2:**
- Enabled: ✓
- Timeframe: 1H
- Bars: 8
- Map: ✓

**TF 3:**
- Enabled: ✓
- Timeframe: 4H
- Bars: 6
- Map: ✓

**TF 4:**
- Enabled: ✓
- Timeframe: 1D
- Bars: 4
- Map: ☐

---

### HTF Candles (Step 1: HTF Context)
Customize bull/bear candle colors and wicks. Offset = distance from price. Gap = space between candles. Bias Arrow = optional trend arrow.

**Settings:**
- Bull: #00ff00
- Bear: #ff0000
- Wick: #808080
- Offset: 25
- Gap: 2
- Show Bias: ☐

---

### Chart Mapping (Step 1: HTF Context)
BSL/SSL: Mark Buyside/Sellside liquidity (highs/lows where stops sit). Dividers: Mark HTF candle opens/closes. EQ: 50% equilibrium levels for discount/premium zones.

**Settings:**
- BSL/SSL: ✓
- Style: ━━━ (solid)
- ↑ Count: 1
- ↓ Count: 1

**Dividers:**
- Show: ✓

**EQ Lines:**
- Show: ✓

---

### Liquidity Sweeps (Step 3: Sweep Detection)
Valid Sweeps: Confirmed sweeps that held (reversal patterns). Invalid: Failed sweeps (price continued). HTF sweeps are more significant than LTF. Live: Real-time sweep detection as price moves.

**Settings:**
- Enable: ✓
- LTF: ✓
- HTF: ✓
- Live: ✓

**Valid Sweeps:**
- Style: ━━━ (solid)
- Width: 2
- Color: #000000

**Invalid Sweeps:**
- Show: ☐

---

### Pattern Detection (Step 3: Sweep + C2)
C2: Mark exact reversal candle where sweep reversed. C3: Expansion candle after reversal. SMT: Divergence between correlated assets (Binary = 2 assets, Triad = 3).

**Settings:**
- C2: ✓
- C2 Size: Tiny
- C3: ✓
- C3 Box: ☐

**SMT:**
- Enable: ☐
- Mode: Binary (Options: Binary, Triad)
- Asset Override: (e.g., ES,NQ)

---

### Session Models (Step 2: Session Timing)
Display real-time session model tracking table. Shows active sweep sequences, double purge counts (⟐), and SMR entry confirmations (✓). Tracks H1-H4 session progression.

**Settings:**
- Enable: ✓
- Position: Bottom Right
- Size: Small
- Display Mode: Full (Options: Full, Compact, Minimal)

---

### CISD (Step 4: Entry Zones)
Change in State of Delivery - marks when market shifts from one phase to another. Your entry level. Targets = comma-separated multipliers (1x, 2-2.5x, 3.5-4x).

**Settings:**
- Enable: ✓
- Style: ━━━ (solid)
- Width: 2
- Bull: #2d7ec0
- Bear: #d75e5e
- Targets: ✓
- ↑ Targets: 1,2,2.5,3.5,4
- ↓ Targets: 1,2,2.5,3.5,4

---

### iFVG (Step 4: Entry Zones)
Inverse Fair Value Gaps - price inefficiencies left during quick reversals. Acts as support/resistance. Often aligns with CISD for best entries.

**Settings:**
- Enable: ✓
- Style: ━━━ (solid)

---

### Sessions (Step 2: Session Timing)
Session markers for timing key moves. Macro Times highlight specific high-probability windows where sweeps and reversals typically occur.

**Settings:**
- Enable: ✓
- Macro Times: ✓

---

## Footer

**Framework Automation Complete**

These settings mirror exactly what's in your TradingView indicator. Configure once, and the entire 6-step framework automates on your charts.

- Read Logic
- Back to Overview
