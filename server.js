import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const userMsg = req.body.msg;

    if (!userMsg || userMsg.trim() === "") {
      return res.json({ reply: "와와봇이 들을 말이 없어 🐶" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "너는 카카오톡 봇 '와와봇'이야. 사용자가 '와와봇'이라고 부를 때만 대답하고, 친근한 한국어로 짧게 말해.",
          },
          {
            role: "user",
            content: userMsg,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const reply =
      data.choices?.[0]?.message?.content ??
      "와와봇이 잠깐 멍 때렸어 🐶";

    res.json({ reply });
  } catch (err) {
    res.json({ reply: "와와봇 서버가 잠깐 아파 🐾" });
  }
});

app.get("/", (req, res) => {
  res.send("와와봇 서버 실행 중 🐶");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("와와봇 서버 실행 중 :", PORT);
});
