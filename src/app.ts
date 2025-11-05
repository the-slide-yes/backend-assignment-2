import express, { Express } from "express";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";

// Ensure environment variables are loaded before internal imports
dotenv.config();

import { getHelmetConfig } from "../config/helmetConfig";

import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";

// Initialize Express application
const app: Express = express();

// Use morgan for HTTP request logging
app.use(morgan("combined"));

app.use(helmet());
app.use(helmet(getHelmetConfig()));

// This allows the api request to have a body that exists
// Without this, req.body will be undefined
app.use(express.json());

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/api/v1", employeeRoutes);
app.use("/api/v1", branchRoutes);

app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

export default app;