import express from "express";
import { updateAsset, updateExpense } from "../controllers/update.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.patch("/assets/:assetType", auth, updateAsset);
router.patch("/expenses", auth, updateExpense);

export default router;
