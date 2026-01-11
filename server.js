import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// Render 포트 설정 (중요)
const PORT = process.env.PORT || 3000;

// === 메인 웹훅 ===
app.post("/", async (req, res) => {
  try {
    // 🔍 카카오에서 오는 전체 데이터 로그
    console.log("카카오 원본:", JSON.stringify(req.body, null, 2));

    // ✅ 사용자가 실제로 보낸 말
    const userMessage = req.body?.userRequest?.utterance;

    console.log("사용자 말:", userMessage);

    // 안전장치
    if (!userMessage) {
      return res.json({
        version: "2.0",
        template: {
          outputs: [
            {
              simpleText: {
                text: "⚠️ 메시지를 이해하지 못했어. 다시 말해줄래?"
              }
            }
          ]
        }
      });
    }

    // 🤖 와와 기본 응답 (일단 GPT 안 씀)
    const reply = `와와: ${userMessage} 😊`;

    // ✅ 카카오 규격 응답
    return res.json({
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

  } catch (error) {
    console.error("서버 에러:", error);

    return res.json({
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: "🚨 와와가 잠깐 아파… 다시 불러줘!"
            }
          }
        ]
      }
    });
  }
});

// === 서버 실행 ===
app.listen(PORT, () => {
  console.log(`✅ 와와 서버 실행 중 : ${PORT}`);
});
