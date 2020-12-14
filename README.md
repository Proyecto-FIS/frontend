# frontend
Frontend - Coffaine

## Environment variables
Create the following files in the project root folder:
- .env.development.local: local development environment
- .env.test.local: local testing environment
- .env.production.local: local production environment

A summary of possible environment variables is here:
- API_ENDPOINT_URL: URL pointing to the Coffaine API service

## Proxy
To use a development proxy, you must create a setupProxy.js file under src folder,
Then, enter this content:

```javascript
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: process.env.API_ENDPOINT_URL,
            changeOrigin: true,
            pathRewrite: {
                "^/api":""
            }
        })
    );
};
```
