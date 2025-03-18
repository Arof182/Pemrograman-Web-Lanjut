const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Proxy untuk layanan user-service
app.use("/users", createProxyMiddleware({ target: "http://localhost:5001", changeOrigin: true }));

// Proxy untuk layanan device-service
app.use("/devices", createProxyMiddleware({ target: "http://localhost:5002", changeOrigin: true }));

app.listen(5000, () => {
    console.log("API Gateway berjalan di port 5000");
});
