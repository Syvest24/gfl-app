import { useState } from "react";

// ─── OPTION DATA ──────────────────────────────────────────────────────────────
const PLATFORMS = [
  { id:"pinterest", label:"Pinterest Pin", size:"1000×1500", icon:"📌" },
  { id:"instagram", label:"Instagram Post", size:"1080×1080", icon:"📷" },
  { id:"story",     label:"Instagram Story", size:"1080×1920", icon:"📱" },
  { id:"tiktok",    label:"TikTok Cover", size:"1080×1920", icon:"🎵" },
];

const PRODUCTS = [
  { id:"planner", label:"ADHD Focus Planner", desc:"Productivity planner for neurodivergent brains", icon:"🗂️" },
  { id:"fuel",    label:"Focus Fuel Protocol", desc:"Brain-food meal guide", icon:"🍃" },
  { id:"bundle",  label:"Total Focus Bundle",  desc:"Planner + Fuel Protocol together", icon:"✨" },
];

const CONTENT_TYPES = [
  { id:"product",    label:"Product Showcase",  desc:"Feature the product directly", icon:"🛍️" },
  { id:"lifestyle",  label:"Lifestyle Flat Lay", desc:"Aesthetic desk/workspace scene", icon:"🌿" },
  { id:"quote",      label:"Quote Card",         desc:"Inspirational or brand quote", icon:"💬" },
  { id:"awareness",  label:"Educational",        desc:"ADHD awareness or tips", icon:"🧠" },
  { id:"food",       label:"Food / Nutrition",   desc:"Meals, ingredients, brain food", icon:"🥗" },
  { id:"testimonial",label:"Social Proof",       desc:"Results, transformation", icon:"⭐" },
];

const SCENES = [
  { id:"desk",       label:"Minimal Desk",    desc:"Clean notebook, pen, tea", icon:"📓" },
  { id:"flatlay",    label:"Cozy Flat Lay",    desc:"Journal, candle, plants", icon:"🕯️" },
  { id:"food",       label:"Food Styling",     desc:"Bowl, ingredients, herbs", icon:"🥗" },
  { id:"botanical",  label:"Botanical",        desc:"Leaves, flowers, nature", icon:"🌱" },
  { id:"marble",     label:"Marble Surface",   desc:"Clean marble with props", icon:"🪨" },
  { id:"bedroom",    label:"Soft Bedroom",     desc:"Bedside, warm morning light", icon:"🌅" },
];

const MOODS = [
  { id:"calm",       label:"Calm & Minimal",  color:"#EDF2EB" },
  { id:"warm",       label:"Warm & Cozy",     color:"#FDF3E3" },
  { id:"dreamy",     label:"Dreamy Soft",     color:"#F0EDF8" },
  { id:"bold",       label:"Bold & Clean",    color:"#3D4A38" },
  { id:"fresh",      label:"Fresh & Bright",  color:"#E8F4F0" },
  { id:"editorial",  label:"Editorial Dark",  color:"#1C1C1C" },
];

const PALETTES = [
  { id:"sage",    label:"Sage Green",   hex:"#8FAF85" },
  { id:"cream",   label:"Warm Cream",   hex:"#EDE4D4" },
  { id:"lav",     label:"Soft Lavender",hex:"#C9BFE0" },
  { id:"blush",   label:"Dusty Blush",  hex:"#E8C4C4" },
  { id:"caramel", label:"Caramel",      hex:"#C4894A" },
  { id:"charcoal",label:"Charcoal",     hex:"#3D4A38" },
];

const STYLES = [
  { id:"photorealistic", label:"Photorealistic",  desc:"Like a real photo, DSLR quality" },
  { id:"illustrated",    label:"Soft Illustrated", desc:"Flat illustration, Studio Ghibli" },
  { id:"editorial",      label:"Editorial",        desc:"Magazine-quality, high end" },
  { id:"aesthetic",      label:"Aesthetic",        desc:"Instagram aesthetic, dreamy" },
  { id:"minimal",        label:"Ultra Minimal",    desc:"Clean, lots of whitespace" },
  { id:"artistic",       label:"Artistic",         desc:"Painterly, textured, expressive" },
];

const AI_TOOLS = [
  { id:"midjourney",  label:"Midjourney",    icon:"🎨", suffix:"--ar 2:3 --style raw --stylize 200 --v 6" },
  { id:"dalle",       label:"DALL·E 3",      icon:"🤖", suffix:"" },
  { id:"firefly",     label:"Adobe Firefly", icon:"🔥", suffix:"" },
  { id:"ideogram",    label:"Ideogram",      icon:"✍️", suffix:"" },
  { id:"leonardo",    label:"Leonardo.ai",   icon:"🦁", suffix:"" },
  { id:"stable",      label:"Stable Diffusion", icon:"⚡", suffix:"Steps: 30, CFG: 7" },
];

const LIGHTING = [
  "Soft natural morning light", "Golden hour warm glow", "Overcast diffused light",
  "Studio softbox lighting", "Window side light", "Candlelight warm tones"
];

const ANGLES = [
  "Top-down flat lay (overhead)", "45-degree angle", "Eye level straight on",
  "Slight tilt artistic angle", "Close-up macro detail", "Wide establishing shot"
];

export default function PromptGenerator() {
  const [step, setStep] = useState(1);
  const [sel, setSel] = useState({
    platform: "", product: "", contentType: "", scene: "",
    mood: "", palette: "", style: "", aiTool: "midjourney",
    lighting: "", angle: "", extraDetails: "", brandName: "Gentle Focus Lab",
    includeText: false, textContent: "", includeAvatar: false
  });
  const [prompts, setPrompts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  const s = (k, v) => setSel(p => ({ ...p, [k]: v }));

  const STEPS = [
    { num: 1, label: "Platform & Product" },
    { num: 2, label: "Content & Scene" },
    { num: 3, label: "Style & Mood" },
    { num: 4, label: "AI Tool & Details" },
  ];

  const isComplete = () => sel.platform && sel.product && sel.contentType && sel.scene && sel.mood && sel.palette && sel.style;

  const buildSystemPrompt = () => `You are an expert AI image prompt engineer specialising in aesthetic social media content for wellness, productivity and neurodivergent lifestyle brands. You write precise, detailed, structured prompts that produce stunning results in AI image generators.

You always write prompts that are:
- Visually descriptive (lighting, textures, materials, colours)
- Commercially viable (clean, professional, brand-appropriate)
- Platform-optimised (correct compositions for each social media format)
- Emotionally resonant for the ADHD/neurodivergent wellness audience

The brand is "Gentle Focus Lab" — a soft, calm, intentional productivity brand for ADHD and neurodivergent people. Aesthetic: sage green, warm cream, soft lavender, cozy minimalism, slow living.`;

  const buildUserPrompt = () => {
    const platform = PLATFORMS.find(p => p.id === sel.platform);
    const product = PRODUCTS.find(p => p.id === sel.product);
    const contentType = CONTENT_TYPES.find(p => p.id === sel.contentType);
    const scene = SCENES.find(p => p.id === sel.scene);
    const mood = MOODS.find(p => p.id === sel.mood);
    const palette = PALETTES.find(p => p.id === sel.palette);
    const style = STYLES.find(p => p.id === sel.style);
    const aiTool = AI_TOOLS.find(p => p.id === sel.aiTool);

    return `Generate AI image prompts for the following brief:

PLATFORM: ${platform?.label} (${platform?.size})
PRODUCT: ${product?.label} — ${product?.desc}
CONTENT TYPE: ${contentType?.label} — ${contentType?.desc}
SCENE/SETTING: ${scene?.label} — ${scene?.desc}
MOOD: ${mood?.label}
COLOUR PALETTE: ${mood?.label}, ${palette?.label} as accent
VISUAL STYLE: ${style?.label} — ${style?.desc}
LIGHTING: ${sel.lighting || "soft natural light"}
CAMERA ANGLE: ${sel.angle || "top-down flat lay"}
AI TOOL: ${aiTool?.label}
${sel.extraDetails ? `EXTRA DETAILS: ${sel.extraDetails}` : ""}
${sel.includeText && sel.textContent ? `TEXT ON IMAGE: "${sel.textContent}"` : ""}
${sel.includeAvatar ? "INCLUDE: A soft illustrated female avatar (late 20s, warm olive skin, dark wavy hair, leaf crown, sage green top) as the brand persona." : ""}

Generate EXACTLY this JSON (no markdown, no backticks):
{
  "main_prompt": "The primary detailed prompt (150-200 words) — fully describe subject, composition, lighting, materials, textures, colours, mood, style, camera settings",
  "negative_prompt": "Everything to avoid for this image (50-80 words)",
  "short_prompt": "A punchy 40-word version for quick tests",
  "style_modifiers": ["modifier1", "modifier2", "modifier3", "modifier4", "modifier5"],
  "composition_notes": "2-3 sentences on how to compose this image for ${platform?.label}",
  "variations": [
    {"label": "Variation A — Morning light", "prompt": "60-word variation with different time of day"},
    {"label": "Variation B — Close-up detail", "prompt": "60-word variation focusing on a detail"},
    {"label": "Variation C — Wider scene", "prompt": "60-word variation with more environmental context"}
  ],
  "tool_suffix": "${aiTool?.suffix || ""}",
  "pro_tips": ["tip1 specific to ${aiTool?.label}", "tip2 about this content type", "tip3 about the style"]
}`;
  };

  const generate = async () => {
    if (!isComplete()) { setError("Please complete all selections before generating."); return; }
    setLoading(true); setError(""); setPrompts(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: buildSystemPrompt(),
          messages: [{ role: "user", content: buildUserPrompt() }]
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setPrompts(parsed);
    } catch (e) {
      setError("Failed to generate — " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const copy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key); setTimeout(() => setCopied(""), 2000);
  };

  const CopyBtn = ({ text, id, label = "Copy" }) => (
    <button onClick={() => copy(text, id)} style={{ padding: "5px 12px", background: copied === id ? "#EDF2EB" : "#F7F2EA", color: "#3D4A38", border: "1px solid #C8D9C4", borderRadius: 20, fontSize: 11, fontFamily: "inherit", cursor: "pointer", fontWeight: 500, transition: "all 0.15s" }}>
      {copied === id ? "Copied ✓" : label}
    </button>
  );

  const lbl = { fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".08em", color: "#9A9D94", marginBottom: 8, display: "block" };
  const div = { height: 1, background: "#EDE4D4", margin: "16px 0" };

  const OptionGrid = ({ options, selected, onSelect, cols = 3 }) => (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 8 }}>
      {options.map(opt => (
        <button key={opt.id} onClick={() => onSelect(opt.id)} style={{ padding: "10px 8px", borderRadius: 10, border: `2px solid ${selected === opt.id ? "#8FAF85" : "#EDE4D4"}`, background: selected === opt.id ? "#EDF2EB" : "white", cursor: "pointer", fontFamily: "inherit", textAlign: "left", transition: "all 0.15s" }}>
          {opt.icon && <div style={{ fontSize: 18, marginBottom: 4 }}>{opt.icon}</div>}
          {opt.color && <div style={{ width: 20, height: 20, borderRadius: 5, background: opt.color, border: "1px solid rgba(0,0,0,0.1)", marginBottom: 4 }} />}
          {opt.hex && <div style={{ width: 24, height: 24, borderRadius: 6, background: opt.hex, border: "1px solid rgba(0,0,0,0.1)", marginBottom: 4 }} />}
          <div style={{ fontSize: 12, fontWeight: 600, color: "#3D4A38", lineHeight: 1.3 }}>{opt.label}</div>
          {opt.desc && <div style={{ fontSize: 10, color: "#9A9D94", marginTop: 2, lineHeight: 1.4 }}>{opt.desc}</div>}
          {opt.size && <div style={{ fontSize: 9, color: "#8FAF85", marginTop: 2, fontWeight: 500 }}>{opt.size}</div>}
        </button>
      ))}
    </div>
  );

  return (
    <div style={{ fontFamily: "sans-serif", background: "#F7F2EA", minHeight: "calc(100vh - 44px)", display: "flex", gap: 0 }}>

      {/* LEFT — form */}
      <div style={{ width: 560, background: "white", borderRight: "1px solid #EDE4D4", overflowY: "auto", padding: "20px 24px", flexShrink: 0 }}>

        {/* Progress steps */}
        <div style={{ display: "flex", gap: 0, marginBottom: 24, background: "#F7F2EA", borderRadius: 12, padding: 4 }}>
          {STEPS.map(st => (
            <button key={st.num} onClick={() => setStep(st.num)} style={{ flex: 1, padding: "8px 4px", border: "none", borderRadius: 9, fontSize: 11, fontFamily: "inherit", cursor: "pointer", background: step === st.num ? "#3D4A38" : "transparent", color: step === st.num ? "white" : "#7A7D72", fontWeight: step === st.num ? 600 : 400, transition: "all 0.15s", lineHeight: 1.3 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{st.num}</div>
              <div style={{ fontSize: 9 }}>{st.label}</div>
            </button>
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <span style={lbl}>Platform</span>
              <OptionGrid options={PLATFORMS} selected={sel.platform} onSelect={v => s("platform", v)} cols={2} />
            </div>
            <div style={div} />
            <div>
              <span style={lbl}>Product to promote</span>
              <OptionGrid options={PRODUCTS} selected={sel.product} onSelect={v => s("product", v)} cols={1} />
            </div>
            <div>
              <span style={lbl}>Brand name on image</span>
              <input value={sel.brandName} onChange={e => s("brandName", e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: 9, border: "1.5px solid #EDE4D4", fontSize: 13, fontFamily: "inherit", color: "#3D4A38", outline: "none" }} />
            </div>
            <button onClick={() => setStep(2)} style={{ padding: "11px", background: "#3D4A38", color: "white", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, fontFamily: "inherit", cursor: "pointer" }}>
              Next → Content & Scene
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <span style={lbl}>Content type</span>
              <OptionGrid options={CONTENT_TYPES} selected={sel.contentType} onSelect={v => s("contentType", v)} cols={2} />
            </div>
            <div style={div} />
            <div>
              <span style={lbl}>Background scene</span>
              <OptionGrid options={SCENES} selected={sel.scene} onSelect={v => s("scene", v)} cols={2} />
            </div>
            <div style={div} />
            <div>
              <span style={{ ...lbl, marginBottom: 4 }}>Lighting</span>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {LIGHTING.map(l => (
                  <button key={l} onClick={() => s("lighting", l)} style={{ padding: "5px 11px", borderRadius: 20, border: `1.5px solid ${sel.lighting === l ? "#8FAF85" : "#EDE4D4"}`, background: sel.lighting === l ? "#EDF2EB" : "white", fontSize: 11, cursor: "pointer", fontFamily: "inherit", color: sel.lighting === l ? "#3D4A38" : "#5A5D54", fontWeight: sel.lighting === l ? 600 : 400, transition: "all 0.15s" }}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span style={{ ...lbl, marginBottom: 4 }}>Camera angle</span>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {ANGLES.map(a => (
                  <button key={a} onClick={() => s("angle", a)} style={{ padding: "5px 11px", borderRadius: 20, border: `1.5px solid ${sel.angle === a ? "#8FAF85" : "#EDE4D4"}`, background: sel.angle === a ? "#EDF2EB" : "white", fontSize: 11, cursor: "pointer", fontFamily: "inherit", color: sel.angle === a ? "#3D4A38" : "#5A5D54", fontWeight: sel.angle === a ? 600 : 400, transition: "all 0.15s" }}>
                    {a}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: "10px", background: "white", color: "#3D4A38", border: "1.5px solid #EDE4D4", borderRadius: 10, fontSize: 12, fontFamily: "inherit", cursor: "pointer" }}>← Back</button>
              <button onClick={() => setStep(3)} style={{ flex: 2, padding: "10px", background: "#3D4A38", color: "white", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, fontFamily: "inherit", cursor: "pointer" }}>Next → Style & Mood</button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <span style={lbl}>Mood & atmosphere</span>
              <OptionGrid options={MOODS} selected={sel.mood} onSelect={v => s("mood", v)} cols={3} />
            </div>
            <div style={div} />
            <div>
              <span style={lbl}>Colour palette</span>
              <OptionGrid options={PALETTES} selected={sel.palette} onSelect={v => s("palette", v)} cols={3} />
            </div>
            <div style={div} />
            <div>
              <span style={lbl}>Visual style</span>
              <OptionGrid options={STYLES} selected={sel.style} onSelect={v => s("style", v)} cols={2} />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setStep(2)} style={{ flex: 1, padding: "10px", background: "white", color: "#3D4A38", border: "1.5px solid #EDE4D4", borderRadius: 10, fontSize: 12, fontFamily: "inherit", cursor: "pointer" }}>← Back</button>
              <button onClick={() => setStep(4)} style={{ flex: 2, padding: "10px", background: "#3D4A38", color: "white", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, fontFamily: "inherit", cursor: "pointer" }}>Next → AI Tool & Details</button>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <span style={lbl}>AI tool you're using</span>
              <OptionGrid options={AI_TOOLS} selected={sel.aiTool} onSelect={v => s("aiTool", v)} cols={3} />
            </div>
            <div style={div} />
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ ...lbl, margin: 0 }}>Include text on image?</span>
                <button onClick={() => s("includeText", !sel.includeText)} style={{ width: 36, height: 20, borderRadius: 10, border: "none", background: sel.includeText ? "#8FAF85" : "#D0CCC5", cursor: "pointer", position: "relative" }}>
                  <div style={{ width: 14, height: 14, borderRadius: 7, background: "white", position: "absolute", top: 3, left: sel.includeText ? 19 : 3, transition: "all 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                </button>
              </div>
              {sel.includeText && (
                <input value={sel.textContent} onChange={e => s("textContent", e.target.value)} placeholder='e.g. "Stop fighting your brain. Start working with it."' style={{ width: "100%", padding: "9px 12px", borderRadius: 9, border: "1.5px solid #EDE4D4", fontSize: 12, fontFamily: "inherit", outline: "none" }} />
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#3D4A38" }}>Include Lena (brand avatar)?</div>
                <div style={{ fontSize: 10, color: "#9A9D94" }}>Soft illustrated female persona</div>
              </div>
              <button onClick={() => s("includeAvatar", !sel.includeAvatar)} style={{ width: 36, height: 20, borderRadius: 10, border: "none", background: sel.includeAvatar ? "#8FAF85" : "#D0CCC5", cursor: "pointer", position: "relative" }}>
                <div style={{ width: 14, height: 14, borderRadius: 7, background: "white", position: "absolute", top: 3, left: sel.includeAvatar ? 19 : 3, transition: "all 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
              </button>
            </div>
            <div>
              <span style={lbl}>Extra details (optional)</span>
              <textarea value={sel.extraDetails} onChange={e => s("extraDetails", e.target.value)} rows={3} placeholder="e.g. add a small succulent plant, warm morning atmosphere, the planner should be open to a weekly spread..." style={{ width: "100%", padding: "10px 12px", borderRadius: 9, border: "1.5px solid #EDE4D4", fontSize: 12, fontFamily: "inherit", resize: "vertical", outline: "none", lineHeight: 1.6 }} />
            </div>
            {error && <div style={{ background: "#FBF0F0", border: "1px solid #F2D4D4", borderRadius: 9, padding: "10px 14px", fontSize: 12, color: "#C47B7B" }}>{error}</div>}
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setStep(3)} style={{ flex: 1, padding: "10px", background: "white", color: "#3D4A38", border: "1.5px solid #EDE4D4", borderRadius: 10, fontSize: 12, fontFamily: "inherit", cursor: "pointer" }}>← Back</button>
              <button onClick={generate} disabled={loading} style={{ flex: 2, padding: "12px", background: loading ? "#C8D9C4" : "#3D4A38", color: "white", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: "inherit", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {loading ? (
                  <><div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} /> Generating...</>
                ) : "✦  Generate Prompts"}
              </button>
            </div>
          </div>
        )}

        {/* Summary bar */}
        {(sel.platform || sel.product) && (
          <div style={{ marginTop: 20, background: "#F7F2EA", borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 10, color: "#9A9D94", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6 }}>Your brief so far</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {[sel.platform, sel.product, sel.contentType, sel.scene, sel.mood, sel.palette, sel.style].filter(Boolean).map((v, i) => (
                <span key={i} style={{ background: "#EDF2EB", color: "#3D4A38", fontSize: 10, padding: "2px 9px", borderRadius: 12, fontWeight: 500 }}>{v}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT — results */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>

        {!prompts && !loading && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "70vh", color: "#9A9D94", gap: 14 }}>
            <div style={{ fontSize: 48, opacity: .3 }}>✦</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#5A5D54" }}>Your prompts will appear here</div>
            <div style={{ fontSize: 12, textAlign: "center", maxWidth: 280, lineHeight: 1.6 }}>Complete the 4 steps on the left, then click Generate Prompts. Claude will write structured prompts optimised for your chosen AI tool.</div>
            <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap", justifyContent: "center" }}>
              {AI_TOOLS.map(t => (
                <span key={t.id} style={{ background: "white", border: "1px solid #EDE4D4", borderRadius: 20, padding: "4px 12px", fontSize: 11, color: "#7A7D72" }}>{t.icon} {t.label}</span>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60vh", gap: 16 }}>
            <div style={{ width: 48, height: 48, border: "3px solid #C8D9C4", borderTopColor: "#3D4A38", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
            <div style={{ fontSize: 14, color: "#5A5D54", fontWeight: 500 }}>Claude is crafting your prompts...</div>
            <div style={{ fontSize: 11, color: "#9A9D94" }}>Analysing brief · Writing descriptions · Structuring for {AI_TOOLS.find(t => t.id === sel.aiTool)?.label}</div>
          </div>
        )}

        {prompts && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16, animation: "fadeIn 0.4s ease" }}>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#3D4A38" }}>Your Prompts ✦</div>
                <div style={{ fontSize: 11, color: "#9A9D94", marginTop: 2 }}>
                  {AI_TOOLS.find(t => t.id === sel.aiTool)?.icon} Optimised for {AI_TOOLS.find(t => t.id === sel.aiTool)?.label} · {PLATFORMS.find(p => p.id === sel.platform)?.label}
                </div>
              </div>
              <button onClick={generate} style={{ padding: "7px 16px", background: "#EDF2EB", color: "#3D4A38", border: "1px solid #C8D9C4", borderRadius: 20, fontSize: 11, fontFamily: "inherit", cursor: "pointer", fontWeight: 600 }}>↺ Regenerate</button>
            </div>

            {/* Main Prompt */}
            <div style={{ background: "white", borderRadius: 14, border: "2px solid #8FAF85", padding: "18px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <div>
                  <span style={{ background: "#3D4A38", color: "white", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 12, letterSpacing: ".05em" }}>MAIN PROMPT</span>
                  <span style={{ fontSize: 11, color: "#9A9D94", marginLeft: 8 }}>Paste this directly into {AI_TOOLS.find(t => t.id === sel.aiTool)?.label}</span>
                </div>
                <CopyBtn text={prompts.main_prompt + (prompts.tool_suffix ? " " + prompts.tool_suffix : "")} id="main" label="Copy Full" />
              </div>
              <div style={{ fontSize: 13, color: "#3D4A38", lineHeight: 1.75, background: "#F7F2EA", borderRadius: 10, padding: "14px 16px", fontFamily: "Georgia, serif", fontStyle: "italic" }}>
                {prompts.main_prompt}
              </div>
              {prompts.tool_suffix && (
                <div style={{ marginTop: 10, background: "#EDF2EB", borderRadius: 8, padding: "8px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 600, color: "#5A8050", textTransform: "uppercase", letterSpacing: ".06em" }}>Tool suffix · </span>
                    <span style={{ fontSize: 12, color: "#3D4A38", fontFamily: "monospace" }}>{prompts.tool_suffix}</span>
                  </div>
                  <CopyBtn text={prompts.tool_suffix} id="suffix" label="Copy" />
                </div>
              )}
            </div>

            {/* Short + Negative */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ background: "white", borderRadius: 12, border: "1px solid #EDE4D4", padding: "14px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#3D4A38", textTransform: "uppercase", letterSpacing: ".06em" }}>Quick Test Prompt</span>
                  <CopyBtn text={prompts.short_prompt} id="short" />
                </div>
                <div style={{ fontSize: 12, color: "#5A5D54", lineHeight: 1.65, fontStyle: "italic" }}>{prompts.short_prompt}</div>
              </div>
              <div style={{ background: "#FBF0F0", borderRadius: 12, border: "1px solid #F2D4D4", padding: "14px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#C47B7B", textTransform: "uppercase", letterSpacing: ".06em" }}>Negative Prompt</span>
                  <CopyBtn text={prompts.negative_prompt} id="neg" />
                </div>
                <div style={{ fontSize: 12, color: "#7A4848", lineHeight: 1.65 }}>{prompts.negative_prompt}</div>
              </div>
            </div>

            {/* Style Modifiers */}
            {prompts.style_modifiers?.length > 0 && (
              <div style={{ background: "white", borderRadius: 12, border: "1px solid #EDE4D4", padding: "14px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#3D4A38", textTransform: "uppercase", letterSpacing: ".06em" }}>Style Modifiers</span>
                  <CopyBtn text={prompts.style_modifiers.join(", ")} id="mods" label="Copy All" />
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {prompts.style_modifiers.map((m, i) => (
                    <button key={i} onClick={() => copy(m, "mod" + i)} style={{ padding: "5px 12px", background: "#EDF2EB", color: "#3D4A38", border: "none", borderRadius: 20, fontSize: 11, cursor: "pointer", fontFamily: "inherit", fontWeight: 500 }}>
                      {copied === "mod" + i ? "✓" : "+"} {m}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Variations */}
            {prompts.variations?.length > 0 && (
              <div style={{ background: "white", borderRadius: 12, border: "1px solid #EDE4D4", padding: "16px 18px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#3D4A38", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 12 }}>3 Prompt Variations</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {prompts.variations.map((v, i) => (
                    <div key={i} style={{ background: "#F7F2EA", borderRadius: 9, padding: "12px 14px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: "#5A8050" }}>{v.label}</span>
                        <CopyBtn text={v.prompt} id={"var" + i} />
                      </div>
                      <div style={{ fontSize: 12, color: "#5A5D54", lineHeight: 1.65, fontStyle: "italic" }}>{v.prompt}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Composition Notes + Pro Tips */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {prompts.composition_notes && (
                <div style={{ background: "#F0EDF8", borderRadius: 12, border: "1px solid #DDD5EE", padding: "14px 16px" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#534AB7", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 }}>Composition Notes</div>
                  <div style={{ fontSize: 12, color: "#3C3489", lineHeight: 1.65 }}>{prompts.composition_notes}</div>
                </div>
              )}
              {prompts.pro_tips?.length > 0 && (
                <div style={{ background: "#FDF3E3", borderRadius: 12, border: "1px solid #F2DDB8", padding: "14px 16px" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#C4894A", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 }}>Pro Tips</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {prompts.pro_tips.map((t, i) => (
                      <div key={i} style={{ fontSize: 11, color: "#7A5020", lineHeight: 1.5, display: "flex", gap: 6 }}>
                        <span style={{ color: "#C4894A", flexShrink: 0 }}>✦</span> {t}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Copy everything button */}
            <div style={{ background: "#3D4A38", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "white" }}>Copy complete prompt pack</div>
                <div style={{ fontSize: 11, color: "#A8BCA4" }}>Main prompt + negative + all variations</div>
              </div>
              <button onClick={() => copy(
                `MAIN PROMPT:\n${prompts.main_prompt}\n${prompts.tool_suffix ? "\nTOOL SUFFIX: " + prompts.tool_suffix : ""}\n\nNEGATIVE PROMPT:\n${prompts.negative_prompt}\n\nQUICK TEST:\n${prompts.short_prompt}\n\nSTYLE MODIFIERS:\n${prompts.style_modifiers?.join(", ")}\n\nVARIATIONS:\n${prompts.variations?.map(v => v.label + ":\n" + v.prompt).join("\n\n")}`,
                "all"
              )} style={{ padding: "9px 20px", background: "#8FAF85", color: "white", border: "none", borderRadius: 20, fontSize: 12, fontWeight: 700, fontFamily: "inherit", cursor: "pointer" }}>
                {copied === "all" ? "Copied! ✓" : "Copy Everything ↗"}
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
