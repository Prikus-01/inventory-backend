import express from "express";
import helmet from "helmet";
import cors from "cors";
import 'dotenv/config';
import {connectDB} from "./src/utils/database.js"

const app = express();
const PORT = process.env.PORT || 6213;

// Security middleware
app.use(helmet());
app.use(cors());

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.get('/', (req,res)=>{
    res.send("server is running ");
})

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Global error handler
// app.use((err, req, res, next) => {
//     logger.critical("Unhandled error:", err);
//     res.status(500).json({
//         error: "Internal server error",
//         ...(process.env.NODE_ENV === "development" && { details: err.message }),
//     });
// });

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

try {
    await connectDB();
} catch (error) {
    console.log(error);
    process.exit(1);
}

app.listen(PORT, () => {
    console.log(`server started!! listening on port ${PORT}`);
})