import { createPool } from 'mysql2';

// create db connection
const pool = createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_SCHEMA,
	port: process.env.DB_PORT
});

pool.getConnection(function (err, conn) {
	if (err) {
		console.error('Error connecting to database!');
		console.error(err);
		return;
	}
	console.info(`Connected to database ${pool.config.connectionConfig.database} on port ${pool.config.connectionConfig.port}`);
	pool.releaseConnection(conn);
});

export const db = pool.promise();

export const nextId = async (table) => {
	const [rows] = await db.query(`SELECT MAX(id) as max_id FROM ${table}`);
	if (rows.length <= 0) return 1;
	return rows[0].max_id + 1;
};
