require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "100kb" }));
app.use(express.static(path.join(__dirname, "public")));

const SYSTEM_PROMPT = `You are an expert Shopify theme developer who writes reliable Shopify Liquid, HTML, CSS, and vanilla JavaScript.
Generate code that directly addresses the user's request.
Requirements:
- Prefer a complete, self-contained Shopify section or snippet when appropriate.
- For a section, include valid Shopify section schema at the end inside {% schema %} ... {% endschema %}.
- Use Shopify Liquid syntax and Shopify theme conventions; do not invent unsupported Liquid filters or objects.
- Make the result responsive, accessible, and reasonably performant.
- Scope CSS to a unique wrapper/class so it does not unintentionally affect the rest of the theme.
- Avoid external libraries unless the user explicitly asks for one.
- Never include secrets, API keys, or server-side credentials in generated storefront code.
- Output only the code, with no Markdown fences and no explanatory prose.
- If a key requirement is ambiguous, make a sensible assumption and add a short code comment rather than asking a follow-up question.`;

app.post("/api/generate", async (req, res) => {
  try {
    const prompt = typeof req.body?.prompt === "string" ? req.body.prompt.trim() : "";
    if (!prompt) return res.status(400).json({ error: "Please describe the Liquid code you need." });
    if (prompt.length > 6000) return res.status(400).json({ error: "Your request is too long. Please keep it under 6,000 characters." });
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "API key is missing. Add OPENAI_API_KEY to your .env file, then restart the app." });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1",
        instructions: SYSTEM_PROMPT,
        input: prompt
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("OpenAI API error:", data);
      return res.status(response.status).json({
        error: data?.error?.message || "The AI service could not generate code. Please try again."
      });
    }

    const code = (data.output || [])
      .flatMap(item => item.content || [])
      .filter(item => item.type === "output_text")
      .map(item => item.text)
      .join("\n")
      .trim();

    if (!code) return res.status(502).json({ error: "The AI returned an empty response. Please try again." });
    res.json({ code });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong while generating code. Please try again." });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Shopify Liquid AI is running at http://localhost:${PORT}`);
});
