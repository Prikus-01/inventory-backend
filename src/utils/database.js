import { Pool } from 'pg'

let pool;

/**
 * Initialize database connection pool
 * @returns {Pool} PostgreSQL connection pool
 */
export const initializePool = () => {
	if (!pool) {
		pool = new Pool({
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			database: process.env.DB_NAME,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			max: 20,
			idleTimeoutMillis: 30000,
			connectionTimeoutMillis: 10000,
			ssl: {
				rejectUnauthorized: false // For self-signed certs
			}
		});

		pool.on("error", (err) => {
			console.log("Unexpected error on idle client", err);
		});
	}
	return pool;
};

/**
 * Connect to the database and test connection
 */
export const connectDB = async () => {
	try {
		const dbPool = initializePool();
		const client = await dbPool.connect();
		console.log("Connected to PostgreSQL database");
		client.release();
	} catch (error) {
		console.log("Failed to connect to database:", error);
		throw error;
	}
};

/**
 * Execute a database query
 * @param {string} text - SQL query string
 * @param {Array} params - Query parameters
 * @returns {Promise<Object>} Query result
 */
export const query = async (text, params = []) => {
	const dbPool = initializePool();
	const start = Date.now();

	try {
		const result = await dbPool.query(text, params);
		const duration = Date.now() - start;
		console.log("Executed query", {
			text,
			duration,
			rows: result.rowCount,
		});
		return result;
	} catch (error) {
		console.log("Database query error:", error);
		throw error;
	}
};

/**
 * Get a database client for transactions
 * @returns {Promise<Object>} Database client
 */
export const getClient = async () => {
	const dbPool = initializePool();
	return await dbPool.connect();
};


