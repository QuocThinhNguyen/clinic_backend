import express from "express";

let router = express.Router();

let initWebRoutes = (app) => {

    router.get("/", (req, res) => {
        return res.send("Hello Nodejs");
    });

    router.get("/webhook", (req, res) => {
        return res.send("Hello Webhook");
    });

    return app.use("/", router);
}

export default initWebRoutes;