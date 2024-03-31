import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./database/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import userRoute from "./routes/user.js"

dotenv.config();
const __dirname = path.resolve();
connectDB().then();

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use("/", (req, res) => {
	res.send("Server running successfully");
});

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/api/users", userRoute)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
