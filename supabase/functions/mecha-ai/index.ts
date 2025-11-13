import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW = 60000;

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
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Authentication required" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid authentication" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const now = Date.now();
    const userLimit = rateLimitMap.get(user.id) ?? { count: 0, resetTime: now + RATE_WINDOW };
    
    if (now > userLimit.resetTime) {
      userLimit.count = 0;
      userLimit.resetTime = now + RATE_WINDOW;
    }
    
    if (userLimit.count >= RATE_LIMIT) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    userLimit.count++;
    rateLimitMap.set(user.id, userLimit);

    const { query } = await req.json();
    
    if (!query || typeof query !== 'string') {
      return new Response(JSON.stringify({ error: "Invalid query parameter" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    if (query.length > 500) {
      return new Response(JSON.stringify({ error: "Query too long (max 500 characters)" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
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
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
