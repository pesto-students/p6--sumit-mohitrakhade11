import express from "express";
import { readAsset, readExpense, readIncome } from "../controllers/read.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/assets/:assetType", auth, readAsset);
router.get("/expenses", auth, readExpense);
router.get("/income/:timeFrame", auth, readIncome);

export default router;
