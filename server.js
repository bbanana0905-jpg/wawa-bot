import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const BOT_NAME = "와와봇";

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage || !userMessage.includes(BOT_NAME)) {
    return res.json({ reply: "" });
  }

  const question = userMessage.replace(BOT_NAME, "").trim();

  if (!question) {
    return res.json({ reply: "불렀으면 질문도 같이 해줘 😆" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
너는 마비노기 모바일 길드 챗봇 '와와봇'이야.
길드원처럼 친근하게 말해.
너무 길게 말하지 말고 핵심만 대답해.
          `,
        },
        { role: "user", content: question },
      ],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (e) {
    res.json({ reply: "지금은 머리가 좀 멍해 😵 다시 불러줘!" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🟢 와와봇 서버 실행 중");
});
