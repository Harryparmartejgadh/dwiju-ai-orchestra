import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, image, mode = "chat" } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Image Generation Mode
    if (mode === "generate-image") {
      const prompt = messages[messages.length - 1].content;
      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image-preview",
          messages: [
            { role: "user", content: prompt }
          ],
          modalities: ["image", "text"]
        }),
      });

      if (!response.ok) {
        throw new Error(`Image generation failed: ${response.status}`);
      }

      const data = await response.json();
      const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
      
      return new Response(
        JSON.stringify({ 
          message: data.choices[0].message.content || "છબી બનાવી છે",
          image: imageUrl 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Chat Mode (default)
    const systemMessage = {
      role: "system",
      content: `તમે Dwiju છો - એક અદ્યતન AI સહાયક જે ગુજરાતી અને અંગ્રેજી બોલી શકે છે. તમારી પાસે 1950+ features છે જેમાં medical, educational, humanoid, spiritual, agricultural અને safety features સામેલ છે. તમે:
- વપરાશકર્તાને મદદ કરવા માટે હંમેશા તૈયાર રહો
- ગુજરાતી અને અંગ્રેજી બંનેમાં સ્પષ્ટ જવાબ આપો
- Images જોઈ શકો અને તેનું વિશ્લેષણ કરી શકો
- કોઈપણ વિષય પર જાણકારી આપો
- હંમેશા મદદરૂપ અને મિત્રવત બનો`
    };

    let userContent: any;
    if (image) {
      userContent = [
        { type: "text", text: messages[messages.length - 1].content },
        { type: "image_url", image_url: { url: image } }
      ];
    } else {
      userContent = messages[messages.length - 1].content;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          systemMessage,
          ...messages.slice(0, -1),
          { role: "user", content: userContent }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    return new Response(
      JSON.stringify({ message: data.choices[0].message.content }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
