import { useEffect, useRef, useState } from "react";

export default function CountUp({ text, duration = 900 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(text);
  const done = useRef(false);

  useEffect(() => {
    const match = text.match(/^([^\d]*)(\d+)(.*)$/);
    if (!match) { setDisplay(text); return; }
    const [, prefix, numStr, suffix] = match;
    const target = parseInt(numStr, 10);
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !done.current) {
        done.current = true;
        const start = performance.now();
        function step(ts) {
          const p = Math.min((ts - start) / duration, 1);
          setDisplay(prefix + Math.round(p * target) + suffix);
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [text, duration]);

  return <span ref={ref}>{display}</span>;
}
