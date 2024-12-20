import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

// Initialize PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon.tech
  },
});

export const DB = {
  query: (text: string, params?: any[]) => pool.query(text, params),
};

// Create tables if they don't exist
const createTables = async () => {
  try {
    await DB.query(`
      CREATE TABLE IF NOT EXISTS sellers (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        image TEXT,
        contact TEXT NOT NULL UNIQUE
      )
    `);

    await DB.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        status TEXT NOT NULL,
        sellerId INTEGER REFERENCES sellers(id),
        image TEXT
      )
    `);

    console.log("Tables have been created or already exist.");
  } catch (err) {
    console.error("Error creating tables:", err);
  }
};

// Call the function to create tables
createTables();

export default DB;
