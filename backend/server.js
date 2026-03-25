import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(authRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/CollabHub')
    .then(() => console.log("DB connected"))
    .catch(err => console.log(err));

app.listen(5000, () => console.log("Server running"));

