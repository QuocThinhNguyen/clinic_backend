import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    return res.send("Hello Nodejs");
});

router.get("/webhook", (req, res) => {
    return res.send("Hello Webhook");
});

export default router;