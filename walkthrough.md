# Visuals & Settings Update Walkthrough

I have addressed the user's feedback regarding the "generic" sequence visuals and the inaccurate settings documentation.

## Changes Made

### 1. New Sequence Visuals (`src/components/visuals/MechaSequenceVisual.tsx`)

- Created a high-fidelity SVG-based component to visualize the three core sequences:
  - **Reversal**: Shows C1 Swing High/Low, C2 Sweep (with gradient highlight), and C3 Expansion with CISD entry level.
  - **Continuation**: Shows HTF context (ghost candle), Impulse, Pullback, and Continuation Trigger.
  - **Aligned**: Shows HTF Bias arrow, LTF structure alignment, and "A+ Setup" indicator.
- Replaced the generic `SequenceDiagram` in `InteractiveSequenceViewer.tsx` with this new component.

### 2. Configuration Update (`src/components/landing/Configuration.tsx`)

- **Removed**: The generic table layout.
- **Added**: A grid layout of "Settings Groups" that matches the actual PineScript inputs found in `reference/Mecha-X.pine`.
- **Specifics**:
  - Added "POI Validation" group with "POI Filter", "NWOG", "MWDR", "FVG".
  - Added "Display", "HTF Setup", "HTF Candles", "Chart Mapping", "Liquidity Sweeps", "Pattern Detection", and "CISD" groups.
  - Added a note about the critical "POI Filter" input.

## Verification

- **Visuals**: The sequences now look like the actual trading setup (candles, wicks, levels) rather than abstract boxes.
- **Settings**: The configuration section now accurately reflects the tool's actual inputs, avoiding confusion for the user.
