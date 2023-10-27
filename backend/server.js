import express from "express";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
const PORT = process.env.PORT || 3001;
import userRoutes from "./routes/userRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import mainRoutes from "./routes/mainRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import statusRoutes from "./routes/statusRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use("/api/main", mainRoutes);
app.use("/api/users", userRoutes);
app.use("/api/goal", goalRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/images", imageRoutes);

const __dirname = path.resolve();
var options = {
  setHeaders: function (res, path, stat) {
    if (path.endsWith(".js")) {
      res.append("Content-Type", "text/javascript; charset=UTF-8");
      res.append("X-Content-Type-Options", "nosniff");
    } else if (path.endsWith(".css")) {
      res.append("Content-Type", "text/css");
      res.append("X-Content-Type-Options", "nosniff");
    } else if (path.endsWith(".jsx")) {
      res.append("Content-Type", "text/javascript; charset=UTF-8");
      res.append("X-Content-Type-Options", "nosniff");
    }
  },
};

app.use(
  "/static",
  express.static(path.join(__dirname, "frontend", "dist", "assets"), options)
);
app.use(
  "/static",
  express.static(path.join(__dirname, "frontend", "src", "main.jsx"), options)
);
app.use(
  "/static",
  express.static(
    path.join(__dirname, "frontend", "public", "4900_8_04_catalyststuff.jpg")
  )
);

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "frontend", "dist", "index.html"),
    (err) => {
      res.status(500).send(err);
    }
  );
});

//Error Handler Middleware - otherwise express will return HTML error page
app.use(notFound);
app.use(errorHandler);

//Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests");
  });
});
