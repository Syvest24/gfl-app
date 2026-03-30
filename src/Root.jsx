import { useState } from "react";
import App from "./App.jsx";
import PromptGenerator from "./PromptGenerator.jsx";

export default function Root() {
  const [page, setPage] = useState("generator");

  const tabStyle = (id) => ({
    padding: "0 20px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    gap: 7,
    fontSize: 13,
    fontWeight: page === id ? 600 : 400,
    color: page === id ? "#FFFDF9" : "#A8BCA4",
    cursor: "pointer",
    background: page === id ? "rgba(255,255,255,0.12)" : "transparent",
    border: "none",
    borderBottom: page === id ? "2px solid #C8D9C4" : "2px solid transparent",
    fontFamily: "sans-serif",
    transition: "all 0.15s",
    whiteSpace: "nowrap",
  });

  return (
    <div style={{ fontFamily: "sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* GLOBAL HEADER */}
      <div style={{ background: "#3D4A38", height: 46, display: "flex", alignItems: "stretch", justifyContent: "space-between", flexShrink: 0, paddingLeft: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1 }}>
          <div style={{ fontSize: 16, color: "#FFFDF9", fontWeight: 700, display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
            🌿 <span>Gentle Focus Lab</span>
          </div>
          {/* Navigation tabs */}
          <div style={{ display: "flex", height: "100%", gap: 2 }}>
            <button onClick={() => setPage("generator")} style={tabStyle("generator")}>
              <span>🎨</span> Image Generator
            </button>
            <button onClick={() => setPage("prompts")} style={tabStyle("prompts")}>
              <span>✦</span> Prompt Generator
            </button>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", paddingRight: 16 }}>
          <div style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 20, padding: "3px 12px", fontSize: 10, color: "#A8BCA4" }}>
            {page === "generator" ? "Pinterest · Instagram · Story" : "Midjourney · Firefly · DALL·E"}
          </div>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div style={{ flex: 1, minHeight: 0 }}>
        {page === "generator" ? <App embedded /> : <PromptGenerator />}
      </div>
    </div>
  );
}
