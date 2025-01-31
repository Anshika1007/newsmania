const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes");


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());




app.get("/api/news", async (req, res) => {
    const { category = "general", country = "us" } = req.query; // Default values if not provided
    try {
        const response = await axios.get("https://newsapi.org/v2/top-headlines", {
            params: {
                apiKey: process.env.NEWS_API_KEY, // Use your NewsAPI key here
                category,
                country,
            },
        });

        res.status(200).json(response.data.articles); // Send only the articles array
    } catch (error) {
        console.error("Error fetching news:", error.message);
        res.status(500).json({ message: "Error fetching news", details: error.message });
    }
});
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT, () => console.log("MongoDB connected")))
  .catch((err) => console.log(err));
app.use("/api/auth", authRoutes);
const PORT = process.env.PORT || 8080;



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
