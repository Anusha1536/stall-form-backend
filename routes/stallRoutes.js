import express from "express";
import { getAllStalls, registerStall, updateStall, deletestall } from "../controllers/stallcontrollers.js";
const router = express.Router();

router.post("/register", registerStall);

router.get("/view", getAllStalls);

router.put("/update/:id", updateStall);

router.delete("/delete/:id", deletestall);

export default router;
