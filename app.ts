import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import ejs from "ejs";
import dotenv from "dotenv";
import path from "path";

import SpotifyRoutes from "./routes/spotify";

import { Request, Response } from "express";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.engine("html", ejs.renderFile);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(__dirname + "/public"))
    .use(cors())
    .use(cookieParser());

app.get("/", (req: Request, res: Response) => {
    res.render("index");
});

app.use("/", SpotifyRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));
