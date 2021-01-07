const express = require("express");
const path = require("path");
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

const STATIC = path.resolve(__dirname, "..", "build");
const INDEX = path.resolve(STATIC, "index.html");

app.use(
    '/api',
    createProxyMiddleware({
        target: process.env.API_ENDPOINT_URL,
        changeOrigin: true,
        pathRewrite: {
            "^/api": ""
        }
    })
);

app.use(express.static(STATIC));

app.get("*", (req, res) => {
    res.sendFile(INDEX);
});

app.listen(process.env.PORT, () => {
    console.log(`Running at port ${process.env.PORT}`);
});
