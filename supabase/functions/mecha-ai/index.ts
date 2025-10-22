import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const KNOWLEDGE_BASE = `
PROTECTED SWINGS: Manipulation occurs when price sweeps a high/low then quickly returns (false run). C2 must close back inside C1-C2 range to prove manipulation.

4H CANDLE PROFILING: Asia Reversal (22:00 reversal) → London Expansion (2-6am) → NY Continuation. London Reversal (2am sweep of 22:00) → NY reversal. Pattern: Reversal candle followed by expansion candle.

CISD (Change in State of Delivery): Momentum shift confirmation. Open of candle that closes opposite to previous direction creates CISD line. Zone extends to equilibrium.

SMT DIVERGENCE: Structural comparison between correlated assets (ES/NQ/YM). PSP = binary (1 asset diverges), CIC = triad (2 assets diverge). Each asset compared to its own previous bar, not cross-price comparison.

ASSET SYNCHRONIZATION: Leading asset fails to reverse → Middle/Lagging break SMT. Strength switch confirms trigger. 2-stage CIC = crack in correlation.

TTrades Model: C1 touches POI → C2 sweeps & closes inside → C3 creates expectation. Swing requires opposing candle closures. Use CISD for reversal entries, OB for continuation.
`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { query } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: `You are a MECHA-X trading expert. Provide clear, detailed explanations using this knowledge:\n\n${KNOWLEDGE_BASE}\n\nKeep answers concise (2-3 sentences) but informative. Use trading terminology correctly.` },
          { role: "user", content: query }
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`AI Gateway error: ${error}`);
    }

    const data = await response.json();
    const answer = data.choices[0]?.message?.content || "No explanation available.";

    return new Response(JSON.stringify({ answer }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
