import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const ejsMate = require("ejs-mate");
import dotenv from "dotenv";
import path from "path";

import SpotifyRoutes from "./routes/spotify";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.engine("ejs", ejsMate);
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
