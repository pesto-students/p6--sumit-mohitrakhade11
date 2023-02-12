import express from "express";
import { createAsset, createExpense } from "../controllers/create.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/assets/:assetType", auth, createAsset);
router.post("/expenses", auth, createExpense);

export default router;
