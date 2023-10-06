import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import SpotifyRoutes from "./routes/spotify";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 5000;

app.use(cors()).use(cookieParser());

app.use("/", SpotifyRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
