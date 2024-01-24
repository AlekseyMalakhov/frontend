import express from "express";
import cors from "cors";
import path from "path";
import { getDirName } from "./lib/getDirName.js";

const app = express();
const port = process.env.PORT || 3010;
app.use(cors());

const dirName = getDirName(import.meta.url);
app.use(express.static(path.join(dirName, "dist")));

app.get("*", function (req, res) {
    res.sendFile(path.join(dirName, "/dist/index.html"));
});

//start the server
app.listen(port, () => {
    console.log(`App is listening at port ${port}`);
});
