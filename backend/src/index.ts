import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const ejsMate = require("ejs-mate");
import dotenv from "dotenv";
import path from "path";

import SpotifyRoutes from "./routes/spotify";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 5000;

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../src/views"));

app.use(express.static(__dirname + "../src/public"))
    .use(cors())
    .use(cookieParser());

app.get("/", (req: Request, res: Response) => {
    res.render("index");
});

app.use("/", SpotifyRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
