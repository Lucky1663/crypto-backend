import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.get("/price/:coin", async (req, res) => {
  try {
    const coin = req.params.coin.toUpperCase();

    const r = await fetch(
      `https://api.binance.com/api/v3/ticker/price?symbol=${coin}USDT`
    );

    const data = await r.json();

    if (!data.price) {
      return res.json({ error: "Invalid coin" });
    }

    res.json({ price: data.price });

  } catch {
    res.json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Running on " + PORT));
