import express from "express";
import { Authorization, Callback } from "../controllers/spotify";
import cors from "cors";

const router = express.Router();

router.route("/login").get(Authorization);

router.route("/callback").get(
    cors({
        origin: "*",
        credentials: true,
    }),
    Callback
);

export default router;
