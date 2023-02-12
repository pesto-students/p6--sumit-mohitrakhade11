import express from "express";
import { register, verify, logIn, logOut, profile, isAuth } from "../controllers/auth.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.get("/register/verify/:confirmationToken", verify);
router.post("/login", logIn);
router.get("/logout", auth, logOut);
router.get("/profile", auth, profile);
router.get("/isauth", auth, isAuth);

export default router;
