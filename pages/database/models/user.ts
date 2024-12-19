import { DB } from "../index";
import sqlite3 from "sqlite3";

export interface User {
  id?: number;
  name?: string;
  email: string;
  password: string; // Hashed password
}

// Register a new user
export const createUser = async (user: User): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const { name, email, password } = user;

    // Use parameterized query to prevent SQL injection
    DB.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password],
      function (err: Error) {
        if (err) {
          // Log the error to console for debugging
          console.error("Error inserting user into database:", err);
          return reject(new Error("Failed to create user"));
        }

        // Type the `this` keyword as `sqlite3.RunResult` to access `lastID`
        const result = this as sqlite3.RunResult; // `this` refers to the `RunResult` object

        // Log the inserted user data (ID will be generated automatically)
        console.log("User inserted with ID:", result.lastID);

        // Retrieve the inserted user details from the database
        DB.get(
          "SELECT id, name, email FROM users WHERE id = ?",
          [result.lastID],
          (selectErr, row) => {
            if (selectErr) {
              console.error("Error retrieving user details:", selectErr);
              return reject(new Error("Failed to fetch inserted user details"));
            }

            // Log the retrieved user details
            console.log("Inserted user details:", row);

            // Resolve with the inserted user details (exclude password)
            const { password: _, ...userData }: any = row;
            resolve(userData);
          }
        );
      }
    );
  });
};

// Get a user by email
export const getUserByEmail = (email: string): Promise<User | undefined> => {
  return new Promise((resolve, reject) => {
    DB.get("SELECT * FROM users WHERE email = ?", [email], (err, row: any) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

export const getUserById = (id: string | number): Promise<User | undefined> => {
  return new Promise((resolve, reject) => {
    DB.get("SELECT * FROM users WHERE id = ?", [id], (err, row: any) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

// Update user password
export const updateUserPassword = (
  id: number,
  password: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    DB.run(
      "UPDATE users SET password = ? WHERE id = ?",
      [password, id],
      function (err) {
        if (err) reject(err);
        resolve();
      }
    );
  });
};
