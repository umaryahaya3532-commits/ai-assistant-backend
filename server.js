const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const HF_TOKEN = process.env.HF_TOKEN;

app.get("/", (req, res) => {
  res.send("AI Assistant Server is running");
});

app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-large",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: message
        })
      }
    );

    const data = await response.json();

    res.json({
      reply: data[0]?.generated_text || "Ban samu amsa ba"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
