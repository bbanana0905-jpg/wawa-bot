import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) {
      return res.json({ reply: "메시지를 못 받았어 ㅠㅠ" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "나는 귀여운 강아지 와와봇이야." },
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "응답 실패 ㅠㅠ";

    res.json({ reply });
  } catch (e) {
    console.error(e);
    res.json({ reply: "서버 오류야 ㅠㅠ 잠시 후 다시 말해줘!" });
  }
});

app.get("/", (req, res) => {
  res.send("와와봇 서버 실행 중!");
});

app.listen(PORT, () => {
  console.log("와와봇 서버 실행 중:", PORT);
});
