import sqlite3 from "sqlite3";
import dotenv from "dotenv";
dotenv.config();

// Initialize the SQLite database with the file path
const dbName = String(process.env.DB);
export const DB = new sqlite3.Database(dbName, (err) => {
  if (err) {
    console.error("Error opening database:", err.message, dbName);
  } else {
    console.log(`Connected to the SQLite database,${dbName}`);
  }
});

// Create tables if they don't exist
const createTables = () => {
  DB.serialize(() => {
    // Create products table
    DB.run(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        status TEXT NOT NULL,
        sellerId INTEGER,
        image TEXT,
        FOREIGN KEY (sellerId) REFERENCES sellers(id)
      )
    `);

    // Create sellers table
    DB.run(`
      CREATE TABLE IF NOT EXISTS sellers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        image TEXT,
        contact TEXT NOT NULL UNIQUE
      )
    `);
  });
};

// Call the function to create tables
createTables();

// Export DB for other modules to use
export default DB;
