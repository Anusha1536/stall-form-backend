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

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://eventstall-portal.netlify.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

app.use("/stalls", stallRoutes);

connectToDb(() => {
    app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
});