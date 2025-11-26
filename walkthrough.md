# Visual Overhaul: Glacier Minimalist

I have completely redone the website's visual theme to match your request for an "artistic, minimalist, candlestick-oriented" design with a "Glacier Blue" and "Light Grey" palette.

## Key Changes

### 1. New Color Palette & Theme (`src/index.css`)

- **Background**: Very light cool grey/white (`hsl(210, 20%, 98%)`) for a clean, minimalist canvas.
- **Text**: Deep charcoal/black (`hsl(220, 20%, 10%)`) for maximum visibility and contrast.
- **Primary**: "Glacier Blue" (`hsl(200, 60%, 60%)`) - a calm, icy blue used for branding and bullish indicators.
- **Secondary**: Light grey (`hsl(210, 20%, 90%)`) for subtle UI elements.
- **Glassmorphism**: Implemented a new `.glass-panel` class with a "frosted glass" look (white with high blur and subtle border), replacing the old dark glass style.

### 2. New Background (`src/components/visuals/MinimalistCandleBackground.tsx`)

- Created a custom HTML5 Canvas component.
- **Visuals**: Draws thin, artistic candlesticks that gently float upwards.
- **Colors**: Uses the Glacier Blue (bullish) and Light Grey (bearish) palette.
- **Animation**: Subtle pulsing and movement to create a "living" background without being distracting.
- **Integration**: Added to `App.tsx` to render globally behind all content.

### 3. Typography

- **Font**: Switched to `JetBrains Mono` / `Fira Code` (monospace) for the entire site to give it a technical, trading-focused feel.
- **Headings**: Bold, uppercase, and strictly black for impact.

## Verification

- **Aesthetic**: The site now feels much lighter, cleaner, and more "premium" with the glacier theme.
- **Readability**: Black text on light backgrounds ensures excellent readability.
- **Interactivity**: The background provides a dynamic, state-of-the-art feel.
