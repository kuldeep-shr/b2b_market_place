// src/database/models/seller.ts
import DB from "../index";
import { Seller } from "../../../pages/api/sellers/seller";

const sellerExists = async (email: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    DB.get(
      "SELECT id FROM sellers WHERE email = ?",
      [email],
      (err: Error, row: any) => {
        if (err) {
          return reject(err);
        }
        resolve(row !== undefined); // If row exists, return true
      }
    );
  });
};

// Function to get a single seller by ID
const getSellerById = async (id: number): Promise<Seller | null> => {
  return new Promise((resolve, reject) => {
    DB.get("SELECT * FROM sellers WHERE id = ?", [id], (err, rows: any) => {
      if (err) {
        console.error("Error fetching seller by ID:", err.message);
        return reject({
          message: "Database error while fetching seller",
          error: err,
        });
      }
      if (!rows) {
        return reject({ message: `Seller with ID ${id} not found` });
      }
      resolve(rows);
    });
  });
};

// Function to get all sellers
const getAllSellers = async (): Promise<Seller[]> => {
  return new Promise((resolve, reject) => {
    DB.all("SELECT * FROM sellers", (err, rows: any) => {
      if (err) {
        console.error("Error fetching sellers:", err.message);
        return reject({
          message: "Database error while fetching sellers",
          error: err,
        });
      }
      resolve(rows);
    });
  });
};

// Function to create a new seller
// const createSeller = async (seller: Seller): Promise<Seller> => {
//   return new Promise((resolve, reject) => {
//     const { name, email, contact, password } = seller;

//     DB.run(
//       "INSERT INTO sellers (name, email, contact,password) VALUES (?, ?, ?,?)",
//       [name, email, contact, password],
//       function (err: Error) {
//         if (err) {
//           console.error("Error inserting seller:", err.message);
//           return reject({
//             message: "Database error while inserting seller",
//             error: err,
//           });
//         }
//         const result = this as sqlite3.RunResult;
//         const newSeller: Seller = { id: result.lastID, name, email, contact };
//         resolve(newSeller);
//       }
//     );
//   });
// };

// Function to handle single or multiple seller retrieval
const getSellers = async (ids?: any): Promise<Seller[]> => {
  return new Promise((resolve, reject) => {
    if (ids && ids.length > 0) {
      const placeholders = ids.map(() => "?").join(",");
      DB.all(
        `SELECT * FROM sellers WHERE id IN (${placeholders})`,
        ids,
        (err, rows: any) => {
          if (err) {
            console.error("Error fetching sellers by IDs:", err.message);
            return reject({
              message: "Database error while fetching sellers by IDs",
              error: err,
            });
          }
          resolve(rows);
        }
      );
    } else {
      DB.all("SELECT * FROM sellers", (err, rows: any) => {
        if (err) {
          console.error("Error fetching all sellers:", err.message);
          return reject({
            message: "Database error while fetching all sellers",
            error: err,
          });
        }
        resolve(rows);
      });
    }
  });
};

// Function to update seller by ID dynamically
const updateSellerById = (
  id: number,
  updatedFields: { name?: string; email?: string; contact?: string }
): Promise<Seller> => {
  return new Promise((resolve, reject) => {
    const setClause = Object.keys(updatedFields)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(updatedFields);

    const query = `UPDATE sellers SET ${setClause} WHERE id = ?`;

    DB.run(query, [...values, id], function (err: Error) {
      if (err) {
        console.log("Error updating seller:", err);
        return reject(err); // Reject if there's an error
      }

      // Fetch the updated seller and resolve it
      DB.get("SELECT * FROM sellers WHERE id = ?", [id], (err, row) => {
        if (err) {
          console.log("Error fetching updated seller:", err);
          return reject(err); // Reject if error fetching updated seller
        }
        resolve(row as Seller); // Resolve with the updated seller
      });
    });
  });
};

// Export all functions at the end of the file
export {
  getSellerById,
  getAllSellers,
  // createSeller,
  updateSellerById,
  getSellers,
  sellerExists,
};
