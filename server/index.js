import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import multer from "multer";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import { posts, users } from "./data/index.js";
import Post from "./models/posts.js";

/* CONFIGURATIONS REQUIRED WHEN WE USE TYPE: MODULE IN PACKAGE.JSON */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// storing images locally... whatever we upload locally
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// routes with files
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken , upload.single("picture"), createPost);

// routes

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// MONGOOSE SETUP

const PORT = process.env.PORT || 6000;
console.log("🚀 ~ file: index.js:64 ~ PORT:", PORT)

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
// add data one time
      // User.insertMany(users);
      // Post.insertMany(posts);

    });
  }).catch((err) => console.log(`{PORT} error while running`));

