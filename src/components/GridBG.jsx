import { C } from "../tokens";

export default function GridBG() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(${C.border}40 1px, transparent 1px), linear-gradient(90deg, ${C.border}40 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
      }} />
      <div style={{ position: "absolute", top: 0, left: "15%", width: "70%", height: "500px", background: `radial-gradient(ellipse, ${C.purple}18 0%, transparent 70%)`, filter: "blur(50px)" }} />
      <div style={{ position: "absolute", top: "40%", right: "-5%", width: "350px", height: "350px", background: `radial-gradient(ellipse, ${C.gold}08 0%, transparent 70%)`, filter: "blur(60px)" }} />
    </div>
  );
}
