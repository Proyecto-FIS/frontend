const express = require("express");
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

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

app.use("/", express.static(__dirname + "/../build"));

app.listen(process.env.PORT, () => {
    console.log(`Running at port ${process.env.PORT}`);
});
