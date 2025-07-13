import express from "express";
import helmet from "helmet";
import cors from "cors";
import 'dotenv/config';
import {connectDB} from "./src/utils/database.js"
import godownsRoutes from "./src/routes/godowns.js"
import productsRoutes from "./src/routes/products.js"
import transactionRoutes from "./src/routes/transactions.js"
import { query } from "./src/utils/database.js";

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

app.use('/api/v1/godowns', godownsRoutes)
app.use('/api/v1/products', productsRoutes)
app.use('/api/v1/transactions', transactionRoutes)

app.get('/api/v1/inventorys' , async (req,res) => {
    const result = await query(
        "SELECT * FROM inventorys ORDER BY inventory_id ASC"
    )
    res.status(200).json({status : 200 , data : result.rows})
})

app.get('/api/v1/displayinventorys' , async (req,res) => {
    const result = await query(
        "Select inventory_id, inventorys.product_id, godown_name, quantity, product_name, packing, units_in_case, inventorys.updated_at from (inventorys inner join products on inventorys.product_id = products.product_id) inner join godowns on inventorys.godown_id = godowns.godown_id ORDER BY product_name ASC"
    )
    res.status(200).json({status : 200 , data : result.rows})
})

// Global error handler
app.use((err, req, res, next) => {
    logger.critical("Unhandled error:", err);
    res.status(500).json({
        error: "Internal server error",
        ...(process.env.NODE_ENV === "development" && { details: err.message }),
    });
});

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