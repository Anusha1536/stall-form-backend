// import dns from 'dns';

// dns.setDefaultResultOrder('ipv4first');
import cors from "cors";
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]);  // Cloudflare + Google DNS
import express from 'express';
import stallRoutes from "./routes/stallRoutes.js";
import dotenv from "dotenv";
import { connectToDb } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();


const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://eventstall-portal.netlify.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

// ✅ MUST be before everything
app.use(cors(corsOptions));

// ✅ Explicitly handle preflight
app.options("*", cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

app.use("/stalls", stallRoutes);

connectToDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
    process.exit(1); // stop app properly
  });