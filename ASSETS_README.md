# Asset Configuration Instructions

## Candlestick Pattern Images

To complete the C1-C2-C3-C4 sequence visualization, please add your two candlestick pattern images to the assets folder:

### Required Images

1. **Bullish Sequence Pattern**
   - **Filename:** `sequence-pattern-bullish.png` or `.jpg`
   - **Location:** `/src/assets/sequence-pattern-bullish.png`
   - **Description:** The left image from your screenshots showing the green/bullish candle sequence (C1→C2→C3→C4)
   - **Requirements:**
     - Clear visibility of numbered candles (1, 2, 3, 4)
     - Black or dark background preferred
     - Shows green/bullish reversal pattern

2. **Bearish Sequence Pattern**
   - **Filename:** `sequence-pattern-bearish.png` or `.jpg`
   - **Location:** `/src/assets/sequence-pattern-bearish.png`
   - **Description:** The right image showing the red/bearish candle sequence
   - **Requirements:**
     - Clear visibility of numbered candles (1, 2, 3, 4)
     - Black or dark background preferred
     - Shows red/bearish reversal pattern

### How to Add the Images

1. Save both images from your screenshots
2. Rename them to:
   - `sequence-pattern-bullish.png` (or `.jpg`)
   - `sequence-pattern-bearish.png` (or `.jpg`)
3. Place them in the `/src/assets/` directory
4. The SequenceStepsExplainer component will automatically use them

### Update Component After Adding Images

Once you've added the images, update the following files to reference them:

**`src/pages/C2Patterns.tsx`:**
```tsx
// Add imports at the top
import bullishPatternImg from '@/assets/sequence-pattern-bullish.png';
import bearishPatternImg from '@/assets/sequence-pattern-bearish.png';

// Then update the SequenceStepsExplainer components:
<SequenceStepsExplainer
  variant="bullish"
  patternImage={bullishPatternImg}
  className="mb-16"
/>

<SequenceStepsExplainer
  variant="bearish"
  patternImage={bearishPatternImg}
  className="mb-8"
/>
```

### Alternative: Using External URLs

If you prefer to host the images elsewhere or use them via URL, you can pass the URL directly:

```tsx
<SequenceStepsExplainer
  variant="bullish"
  patternImage="https://your-image-host.com/bullish-pattern.png"
  className="mb-16"
/>
```

## Background Animation Images

The `AnimatedCandlestickBackground` component can also use these images as subtle animated backgrounds. To enable:

```tsx
<AnimatedCandlestickBackground
  variant="bullish"
  opacity={0.1}
  speed="slow"
  imageUrl={bullishPatternImg}
/>
```

## Theme Color Matching

The components are designed to automatically match your theme colors:

- **Bullish colors:** Uses `hsl(var(--bullish))` - Muted teal-green
- **Bearish colors:** Uses `hsl(var(--bearish))` - Muted warm red
- **Primary accent:** Uses `hsl(var(--primary))` - Blue
- **Background protection:** Automatic gradient overlays ensure text remains readable

All text and labels are optimized for visibility over dark backgrounds and will maintain high contrast regardless of the underlying image.

## Troubleshooting

### Images not showing up?
- Check the file path is correct
- Ensure the images are in `/src/assets/`
- Verify the import statements in your components
- Run `npm run dev` to rebuild

### Text not visible over image?
- Adjust the `opacity` prop on `SequenceStepsExplainer`
- The component includes automatic gradient overlays for text protection
- Default opacity is 0.15 for subtle background effect

### Need to change the animation?
- Modify the `speed` prop: `'slow'`, `'medium'`, or `'fast'`
- Adjust the `AnimatedCandlestickBackground` settings in the page component
