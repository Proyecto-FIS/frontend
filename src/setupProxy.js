if (process.env.NODE_ENV === "development") {

    const { createProxyMiddleware } = require('http-proxy-middleware');

    module.exports = function (app) {
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
    };
}