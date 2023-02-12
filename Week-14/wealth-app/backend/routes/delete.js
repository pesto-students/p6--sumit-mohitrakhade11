import express from "express";
import { deleteAsset, deleteExpense } from "../controllers/delete.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.delete("/assets/:assetType", auth, deleteAsset);
router.delete("/expenses", auth, deleteExpense);

export default router;
