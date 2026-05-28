// ─── FINSIGHTONE — CLAUDE API CLIENT ──────────────────────────────────────
// Central module for all Claude API calls

const CLAUDE_API = "https://api.anthropic.com/v1/messages";
const MODEL     = "claude-sonnet-4-20250514";
const API_KEY   = import.meta.env.VITE_CLAUDE_API_KEY;

export async function callClaude(systemPrompt, userPrompt, maxTokens = 1500) {
  if (!API_KEY) {
    console.warn("No VITE_CLAUDE_API_KEY — using fallback scoring");
    return null;
  }
  try {
    const res = await fetch(CLAUDE_API, {
      method: "POST",
      headers: {
        "Content-Type":            "application/json",
        "x-api-key":               API_KEY,
        "anthropic-version":       "2023-06-01",
        "anthropic-dangerous-direct-browser-calls": "true",
      },
      body: JSON.stringify({
        model:      MODEL,
        max_tokens: maxTokens,
        system:     systemPrompt,
        messages:   [{ role: "user", content: userPrompt }],
      }),
    });
    if (!res.ok) throw new Error(`Claude API ${res.status}`);
    const data = await res.json();
    const text = data.content?.[0]?.text || "";
    // Strip markdown fences if present
    const clean = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    return clean;
  } catch (err) {
    console.error("Claude API error:", err);
    return null;
  }
}

export async function scoreEligibility(formData, promptFn) {
  const { system, user } = promptFn(formData);
  const raw = await callClaude(system, user, 1000);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    console.error("Could not parse Claude eligibility JSON:", raw);
    return null;
  }
}

export async function generateDocument(clientData, promptFn, maxTokens = 4000) {
  const { system, user } = promptFn(clientData);
  return await callClaude(system, user, maxTokens);
}
