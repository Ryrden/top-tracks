import express from "express";
import { Request, Response } from "express";

const app = express();
const port = 5000;

app.get("/api/v1", (req: Request, res: Response) => {
    res.send("Eu amo a leticia");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
