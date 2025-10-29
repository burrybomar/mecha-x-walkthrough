# Remaining Slide Components to Update

The following components still need to be updated with the unified design:
- LiquiditySlides.tsx
- CISDSlides.tsx  
- SessionSlides.tsx
- PatternsSlides.tsx
- IFVGSlides.tsx
- TradingSequenceSlides.tsx

## Changes needed:
1. Remove all hardcoded color variables and gradients from step objects
2. Change container max-width from max-w-6xl to max-w-5xl
3. Change border from border-2 to border
4. Change shadow from shadow-2xl to shadow-lg
5. Change rounded-2xl to rounded-xl
6. Update background animation to use var(--gradient-primary)
7. Reduce padding and spacing
8. Simplify animations and transitions
9. Use semantic color classes (bg-primary, text-primary, etc.)

These should follow the exact same pattern as HTFSlides.tsx and SMTSlides.tsx.
