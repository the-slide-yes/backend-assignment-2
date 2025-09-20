import express, { Express } from "express";
import morgan from "morgan";
import employeeRoutes from "./api/v1/routes/employeeRoutes";

// Initialize Express application
const app: Express = express();

// Use morgan for HTTP request logging
app.use(morgan("combined"));

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/api/v1", employeeRoutes);

app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

export default app;