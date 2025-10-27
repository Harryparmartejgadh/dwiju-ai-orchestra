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
            { role: "user", content: `Create a high-quality, detailed image: ${prompt}` }
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
          message: data.choices[0].message.content || "છબી તૈયાર છે",
          image: imageUrl 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Video & Music Generation Mode - Info only (actual generation not available)
    if (mode === "generate-video" || mode === "generate-music") {
      const type = mode === "generate-video" ? "video" : "music/song";
      const prompt = messages[messages.length - 1].content;
      
      const infoMessage = mode === "generate-video" 
        ? `Video generation માટે તમારું વર્ણન: "${prompt}"\n\nહાલમાં Dwiju માટે real-time video generation ઉપલબ્ધ નથી. પરંતુ હું તમને video બનાવવા માટે:\n1. સ્ક્રિપ્ટ લખી શકું\n2. Storyboard બનાવી શકું\n3. Video માટેના images generate કરી શકું\n4. Video editing સૂચનો આપી શકું\n\nકઈ મદદ જોઈએ છે?`
        : `Music/Song generation માટે તમારું વર્ણન: "${prompt}"\n\nહાલમાં Dwiju માટે real-time music generation ઉપલબ્ધ નથી. પરંતુ હું તમને:\n1. Song lyrics લખી શકું\n2. Music composition સૂચનો આપી શકું\n3. અવાજ અને instruments વિશે માર્ગદર્શન આપી શકું\n4. Music production માટે સૂચનો આપી શકું\n\nકઈ મદદ જોઈએ છે?`;
      
      return new Response(
        JSON.stringify({ message: infoMessage }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Chat Mode (default)
    const systemMessage = {
      role: "system",
      content: `તમે Dwiju છો - એક અદ્યતન AI સહાયક જે ગુજરાતી અને અંગ્રેજી બોલી શકે છે. તમારી પાસે 1950+ features છે જેમાં medical, educational, humanoid, spiritual, agricultural અને safety features સામેલ છે.

તમારી ક્ષમતાઓ:
- ગુજરાતી અને અંગ્રેજી બંનેમાં સ્પષ્ટ અને વિગતવાર જવાબ આપો
- Images જોઈ શકો અને વિશ્લેષણ કરી શકો (image recognition, object detection, text extraction)
- કોઈપણ વિષય પર જાણકારી આપો - medical, education, technology, agriculture, spirituality
- Code લખી શકો અને technical સમસ્યાઓ solve કરી શકો
- Data analysis અને calculations કરી શકો
- Creative content લખી શકો - stories, poems, scripts
- હંમેશા મદદરૂપ, મિત્રવત અને સકારાત્મક બનો

જ્યારે image આપવામાં આવે:
- છબીમાં શું છે તે વિગતવાર વર્ણન કરો
- Text હોય તો તે વાંચો અને સમજાવો
- Objects, people, colors, emotions identify કરો
- Context અને insights આપો`
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
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
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
      if (response.status === 401 || response.status === 403) {
        return new Response(
          JSON.stringify({ error: "API key authentication failed. Please check your configuration." }),
          { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error(`AI gateway error: ${response.status}`);
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
