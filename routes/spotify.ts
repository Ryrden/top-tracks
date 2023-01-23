import express from "express";
import { Authorization, Callback } from "../controllers/spotify";
const router = express.Router();

router.route("/login").get(Authorization);

router.route("/callback").get(Callback);

export default router;
