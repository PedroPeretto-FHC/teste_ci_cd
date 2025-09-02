import { pool } from "../db.js";

export async function initTable() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL
        )
    `);
}

export async function getUsers(req, res) {
    try {
        const result = await pool.query("SELECT * FROM users");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function createUser(req, res) {
    try {
        const { name, email } = req.body;
        const result = await pool.query(
        "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
        [name, email]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const result = await pool.query(
        "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
        [name, email, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM users WHERE id = $1", [id]);
        res.json({ message: "Usuário deletado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}