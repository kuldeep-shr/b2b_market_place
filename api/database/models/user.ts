import { DB } from "../index";
import { hashPassword } from "../../../pages/api/auth/index";

export interface User {
  id?: number;
  name?: string;
  email: string;
  password: string; // Hashed password,
  contact: string;
  sample_data?: boolean;
  image: string;
}

// Register a new user
export const createUser = async (user: User): Promise<User | null> => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, contact, image } = user;
    const hashedPassword = await hashPassword(password);
    try {
      const result = await DB.query(
        "INSERT INTO sellers (name, email, password, contact, image) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, image",
        [
          name,
          email,
          user.sample_data ? hashedPassword : password,
          contact,
          image || null,
        ]
      );
      resolve(result.rows[0]);
    } catch (err) {
      console.error("Error inserting seller into database:", err);
      reject(new Error("Failed to create seller"));
    }
  });
};

// Get user information by contact or email
export const checkUserExistence = (
  contact?: string,
  email?: string
): Promise<User | undefined> => {
  return new Promise(async (resolve, reject) => {
    console.log("contact", contact);
    console.log("email", email);

    let query = "SELECT * FROM sellers WHERE ";
    const params: (string | undefined)[] = [];

    // Dynamically build query based on provided inputs
    if (contact && email) {
      query += "contact = $1 OR email = $2";
      params.push(contact, email);
    } else if (contact) {
      query += "contact = $1";
      params.push(contact);
    } else if (email) {
      query += "email = $1";
      params.push(email);
    } else {
      reject("At least one of 'contact' or 'email' must be provided.");
      return;
    }

    try {
      const result = await DB.query(query, params);
      resolve(result.rows[0]);
    } catch (err) {
      console.error("Error checking user existence:", err);
      reject(new Error("Failed to check user existence"));
    }
  });
};

export const getUserById = (id: string | number): Promise<User | undefined> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await DB.query("SELECT * FROM sellers WHERE id = $1", [
        id,
      ]);
      resolve(result.rows[0]);
    } catch (err) {
      console.error("Error fetching user by ID:", err);
      reject(new Error("Failed to fetch user by ID"));
    }
  });
};

// Update user password
export const updateUserPassword = (
  id: number,
  password: string
): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      await DB.query("UPDATE sellers SET password = $1 WHERE id = $2", [
        password,
        id,
      ]);
      resolve();
    } catch (err) {
      console.error("Error updating user password:", err);
      reject(new Error("Failed to update user password"));
    }
  });
};
