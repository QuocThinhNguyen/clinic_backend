import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import routers from "./route/index.js";
import connectDB from "./config/connectDB.js";
import upload from "./utils/fileUpload.js";
import dotenv from "dotenv";
import multer from "multer";
dotenv.config();

let app = express();


// config app
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

routers(app);

connectDB();

let port = process.env.PORT || 9000;

app.listen(port, () => {
  // callback
  console.log("Backend Nodejs is running on the port: " + port);
});
