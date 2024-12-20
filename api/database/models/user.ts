import { DB } from "../index";
import sqlite3 from "sqlite3";
import { hashPassword } from "../../../pages/api/auth/index";

export interface User {
  id?: number;
  name?: string;
  email: string;
  password: string; // Hashed password,
  contact?: string;
  sample_data?: boolean;
}

// Register a new user
export const createUser = async (user: User): Promise<User | null> => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, contact } = user;
    const hashedPassword = await hashPassword(password);
    // Use parameterized query to prevent SQL injection
    DB.run(
      "INSERT INTO sellers (name, email, password,contact) VALUES (?, ?, ?,?)",
      [name, email, user.sample_data ? hashedPassword : password, contact],
      function (err: Error) {
        if (err) {
          // Log the error to console for debugging
          console.error("Error inserting seller into database:", err);
          return reject(new Error("Failed to create seller"));
        }

        // Type the `this` keyword as `sqlite3.RunResult` to access `lastID`
        const result = this as sqlite3.RunResult; // `this` refers to the `RunResult` object

        // Log the inserted user data (ID will be generated automatically)
        console.log("Seller inserted with ID:", result.lastID);

        // Retrieve the inserted user details from the database
        DB.get(
          "SELECT id, name, email FROM sellers WHERE id = ?",
          [result.lastID],
          (selectErr, row) => {
            if (selectErr) {
              console.error("Error retrieving seller details:", selectErr);
              return reject(
                new Error("Failed to fetch inserted seller details")
              );
            }

            // Log the retrieved user details
            console.log("Inserted sellers details:", row);

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
    DB.get(
      "SELECT * FROM sellers WHERE email = ?",
      [email],
      (err, row: any) => {
        if (err) reject(err);
        resolve(row);
      }
    );
  });
};

export const getUserById = (id: string | number): Promise<User | undefined> => {
  return new Promise((resolve, reject) => {
    DB.get("SELECT * FROM sellers WHERE id = ?", [id], (err, row: any) => {
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
      "UPDATE sellers SET password = ? WHERE id = ?",
      [password, id],
      function (err) {
        if (err) reject(err);
        resolve();
      }
    );
  });
};
