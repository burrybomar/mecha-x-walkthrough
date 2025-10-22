import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const DIAGRAM_PROMPTS = {
  pattern: `Create a clean trading chart diagram showing the C1→C2→C3 pattern with 3 candles:
- C1 (left candle): First candle touching a blue order block below, labeled "C1 Touches POI"
- C2 (middle candle): THE SWING - Lower than both C1 and C3, with a wick going down to sweep liquidity (SSL), labeled "C2 Swing Low (Bullish)"
- C3 (right candle): Higher than C2, confirming reversal, labeled "C3 Confirmation"
Show: Bullish example where C2 is the swing low in the middle. Add arrows showing price sweeping liquidity below C2.
Professional trading chart style, clean labels, white background, grid. Aspect ratio 16:9.`,

  phases: `Create a circular flow diagram showing 5 trading phases:
REVERSAL (red arrow) → EXPANSION (green arrow) → CONTINUATION (blue arrow) → CONSOLIDATION (gray box) → RETRACEMENT (yellow arrow) → back to REVERSAL.
Modern, clean design with icons for each phase, professional trading style, white background. Aspect ratio 16:9.`,

  smt: `Create a comparison chart showing SMT Divergence:
Left side: ES futures making Higher High (green line going up)
Right side: NQ futures making Lower High (red line diverging down)
Label "PSP Divergence Detected" with arrows pointing to the divergence.
Professional trading chart style, clean grid background, clear labels. Aspect ratio 16:9.`,

  liquidity: `Create a trading chart showing BSL and SSL zones:
- Horizontal line above price labeled "BSL (Buy Side Liquidity)" with dollar signs
- Horizontal line below price labeled "SSL (Sell Side Liquidity)" with dollar signs
- Candlesticks in between
- Arrows showing institutional hunt for liquidity
Clean professional chart, white background. Aspect ratio 16:9.`,

  cisd: `Create a diagram showing CISD (Change in State of Delivery):
- Bearish candles moving down
- CISD line (horizontal) at the open of the reversal candle
- Shaded zone to equilibrium (50%)
- Bullish candles reversing upward
Label "CISD Line" and "Equilibrium Zone". Professional chart style. Aspect ratio 16:9.`,

  sessions: `Create a 24-hour timeline showing trading sessions:
- ASIA session (6pm-2am) in purple
- LONDON session (2am-6am) in blue  
- NY session (6am-6pm) in green
Show key times: 10pm (Asia sweep), 2am (London), 10am (NYAM-SB)
Clean timeline design, white background. Aspect ratio 16:9.`,

  asiaRev: `Create a trading chart showing 4H ASIA REVERSAL model:
- 10pm (22:00) candle sweeping 6pm (18:00) high labeled "ASIA Sweep"
- Price reverses down
- London session (2-6am) shows expansion downward with green arrows
- Label "Target: London Expansion"
Professional 4H chart, time labels, clean grid. Aspect ratio 16:9.`,

  londonRev: `Create a trading chart showing 4H LONDON REVERSAL (trap):
- 2am London candle sweeps 10pm Asia high upward labeled "London Trap Sweep"
- Price immediately reverses down (fake move)
- NY session (6am-10am) shows strong reversal continuation down
- Label "NY Reverses London Trap"
Professional 4H chart, red and green candles, time labels. Aspect ratio 16:9.`,

  nyamSB: `Create a 1H chart showing NYAM Silver Bullet window:
- Timeline showing 10am-11am window highlighted in gold
- Price shows FVG retest around 10:10-10:15 labeled "Optimal Entry"
- Arrow pointing to session high/low target
- Label "NYAM-SB: Most Reliable 1H Setup"
Professional 1H chart, clean design. Aspect ratio 16:9.`,

  framework: `Create a visual diagram showing 4-Layer Framework:
Layer 1: "4H Structure + Session Model" with chart icon
Layer 2: "Silver Bullet + Macro Windows" with clock icon
Layer 3: "1H Micro Profiling (H1-H4)" with magnifying glass
Layer 4: "Entry Precision: FVG Retest" with target icon
Vertical flow with arrows connecting layers, modern design. Aspect ratio 16:9.`,

  terms: `Create a clean infographic showing key trading terms:
BSL (Buy Side Liquidity) - highs with $ symbols
SSL (Sell Side Liquidity) - lows with $ symbols
CISD (Change in State of Delivery) - momentum arrow
iFVG (Inverted Fair Value Gap) - shaded zone
POI (Point of Interest) - target icon
Modern, colorful, icon-based design. Aspect ratio 16:9.`,

  tooltipAnatomy: `Create a diagram showing tooltip structure:
Header section: "ASIA-REV @ 19875 | ✓ Held | [3/3] STRONG"
Pattern section: "10p High swept → C2 2a"
Validation section: "Phase:REV + Bias:REV + SMT:PSP-REV ✓✓✓"
HTF Context: "2 HTFs delivering: 7a:EXP ASIA:EXP"
Clean labeled sections, professional design. Aspect ratio 16:9.`
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { diagramType } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const prompt = DIAGRAM_PROMPTS[diagramType as keyof typeof DIAGRAM_PROMPTS];
    if (!prompt) throw new Error("Invalid diagram type");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [{ role: "user", content: prompt }],
        modalities: ["image", "text"]
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`AI Gateway error: ${error}`);
    }

    const data = await response.json();
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageUrl) throw new Error("No image generated");

    return new Response(JSON.stringify({ imageUrl }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating diagram:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
