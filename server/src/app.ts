import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import express from "express";
import bodyParser from "body-parser";
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
import morgan from "morgan";
import fileUpload from "express-fileupload";

// local imports
import connectDb from "./db/db";
import expressErrorMiddleware from "./middlewares/express-error";
import authRoutes from "./routes/auth.routes";
import bookRoutes from "./routes/book.routes";
import cartRoutes from "./routes/cart.routes";
import orderRoutes from "./routes/order.routes";
import { authMiddleware } from "./middlewares/authMiddleware";

const app = express();

// cloudinary config
cloudinary.config({
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
  cloud_name: "dolgpezth",
});

// middlewares
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload({ useTempFiles: true }));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.get("/", (req, res) => {
  res.send("Home");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/cart", authMiddleware, cartRoutes);
app.use("/api/v1/orders", authMiddleware, orderRoutes);

app.use(expressErrorMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI!);
    app.listen(PORT, () => {
      console.log(`server running on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
