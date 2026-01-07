import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Crypto Backend Running");
});

app.get("/price/:coin", async (req, res) => {
  try {
    const coin = req.params.coin.toUpperCase();

    const response = await fetch(
      `https://api.binance.com/api/v3/ticker/price?symbol=${coin}USDT`
    );

    const data = await response.json();

    if (!data.price) {
      return res.json({ error: "Invalid coin" });
    }

    res.json({
      coin,
      price: data.price
    });
  } catch (err) {
    res.json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));