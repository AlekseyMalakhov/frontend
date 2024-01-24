import express from "express";
import cors from "cors";
import path from "path";
import { getDirName } from "./lib/getDirName.js";

const app = express();
const port = process.env.PORT || 3010;
app.use(cors());
const dirName = getDirName(import.meta.url);
app.use("/static", express.static(path.join(dirName, "build")));

app.get("*", function (req, res) {
    res.sendFile(path.join(dirName, "/build/index.html"));
});

//start the server
app.listen(port, () => {
    console.log(`Bortik project app listening at port ${port}`);
});
