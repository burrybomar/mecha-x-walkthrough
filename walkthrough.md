# FAQ Content Redo Walkthrough

I have completely rewritten the FAQ content to address the user's concerns about misleading claims and false promises. The new content focuses strictly on the mechanical logic of the framework and the reality of trading.

## Changes Made

### 1. Main FAQ Page (`src/pages/FAQ.tsx`)

- **Removed**: All mentions of specific win rates (e.g., "45-55%"), specific trade frequencies (e.g., "2-5 trades per week"), and guarantees of profitability.
- **Added**:
  - **"Risk & Reality" Category**: Explicitly states that no system guarantees profits and that the tool is for analysis, not signals.
  - **"Logic & Framework" Category**: Explains the core concepts (KL to DL, Sweep necessity, Mechanical definitions) without hype.
  - **"Execution & Rules" Category**: Focuses on the mechanics of invalidation, time alignment, and SMT as a confluence tool.
- **Visuals**: Updated icons to match the new categories (Target, Zap, Shield).

### 2. Landing Page FAQ Section (`src/components/landing/FAQSection.tsx`)

- **Rewrote Questions**:
  - "Is this a buy/sell signal indicator?" -> Explicit "No".
  - "Is this a 'Get Rich Quick' system?" -> Explicit "Absolutely not".
- **Focus**: Emphasized that the tool visualizes market structure and that the user is responsible for execution.

## Verification

- **Content Check**: The new text is grounded, logical, and devoid of marketing fluff or financial advice.
- **Structure Check**: The FAQ page still functions with its category filters and accordion layout.
- **Consistency**: The message is now consistent across both the main page and the landing page section.
