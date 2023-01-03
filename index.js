import express from "express";
import router from "./routes.js";
import cors from "cors";
import dotenv from "dotenv/config";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/mail", router);

app.listen(3000, () => console.log("Server on port 3000"));
