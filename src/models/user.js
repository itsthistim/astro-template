import { db } from './db';

export default class User {
	constructor(id, firstname, lastname, username, email, password, optedIn) {
		this.id = id;
		this.firstname = firstname;
		this.lastname = lastname;
		this.username = username;
		this.email = email;
		this.password = password;
		this.optedIn = optedIn;
	}

	static async getAll() {
		const [rows] = await db.query('SELECT * FROM user');
		if (rows.length === 0) return null;
		return rows.map((row) => new User(row.id, row.firstname, row.lastname, row.username, row.email, row.password, row.opted_in));
	}

	static async getById(id) {
		const [rows] = await db.query('SELECT * FROM user WHERE id = ?', [id]);
		if (rows.length === 0) return null;
		return new User(rows[0].id, rows[0].firstname, rows[0].lastname, rows[0].username, rows[0].email, rows[0].password, rows[0].opted_in);
	}

	static async getByUsername(username) {
		const [rows] = await db.query('SELECT * FROM user WHERE username = ?', [username]);
		if (rows.length === 0) return null;
		return new User(rows[0].id, rows[0].firstname, rows[0].lastname, rows[0].username, rows[0].email, rows[0].password, rows[0].opted_in);
	}
	
	static async getByEmail(email) {
		const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
		if (rows.length === 0) return null;

		return new User(rows[0].id, rows[0].firstname, rows[0].lastname, rows[0].username, rows[0].email, rows[0].password, rows[0].opted_in);
	}

	async save() {
		const [rows] = await db.query('INSERT INTO user (firstname, lastname, username, email, password, opted_in) VALUES (?, ?, ?, ?, ?, ?)', [
			this.firstname,
			this.lastname,
			this.username,
			this.email,
			this.password,
			this.optedIn
		]);

		this.id = rows.insertId;
		return this;
	}

	async update() {
		const [rows] = await db.query('UPDATE user SET firstname = ?, lastname = ?, username = ?, email = ?, password = ? WHERE id = ?', [
			this.firstname,
			this.lastname,
			this.username,
			this.email,
			this.password,
			this.id
		]);

		return this;
	}
	
	async delete() {
		const [rows] = await db.query('DELETE FROM user WHERE id = ?', [this.id]);
		return this;
	}
}
