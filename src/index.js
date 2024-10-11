import express from 'express';
import bodyParser from 'body-parser';
import routers from './route/index.js';
import connectDB from './config/connectDB.js';

import dotenv from 'dotenv';
dotenv.config();

let app = express();

// config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routers(app);

connectDB();

let port = process.env.PORT || 9000;

app.listen(port, () => {
    // callback
    console.log("Backend Nodejs is running on the port: " + port);
})