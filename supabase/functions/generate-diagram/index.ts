import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const DIAGRAM_PROMPTS = {
  pattern: `Create a clean trading chart diagram showing the C1→C2→C3 pattern. Show:
- C1 candle touching a blue order block (labeled "C1 Touches POI")
- C2 candle with a long wick sweeping above C1 high, but body closing INSIDE the C1-C2 range (labeled "C2 Sweep + Close Inside")
- C3 candle creating the expectation zone (labeled "C3 Confirmation")
Use green bullish candles, professional trading chart style, clean labels, white background. Aspect ratio 16:9.`,

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
Clean timeline design, white background. Aspect ratio 16:9.`
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
