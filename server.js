const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// 메신저봇 R → POST 요청
app.post("/", (req, res) => {
  try {
    const msg =
      req.body?.content ||
      req.body?.msg ||
      req.body?.message ||
      "";

    let reply = "";

    if (!msg.includes("와와봇")) {
      return res.status(200).json({
        version: "2.0",
        template: { outputs: [] }
      });
    }

    if (msg.includes("안녕")) {
      reply = "와와 안녕!! 🐶";
    } else if (msg.includes("날씨")) {
      reply = "와와 아직 날씨는 못 보지만 곧 배울게!";
    } else {
      reply = "와와 여기 있어! 뭐 도와줄까?";
    }

    res.status(200).json({
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: reply
            }
          }
        ]
      }
    });
  } catch (err) {
    res.status(200).json({
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: "⚠️ 서버 오류가 났어. 잠시 후 다시 말해줘!"
            }
          }
        ]
      }
    });
  }
});

// Render 헬스체크
app.get("/", (req, res) => {
  res.send("와와봇 서버 살아있어 🟢");
});

app.listen(PORT, () => {
  console.log(`🐶 와와봇 서버 실행 중 : ${PORT}`);
});
