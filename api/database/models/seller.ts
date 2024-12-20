import DB from "../index";
import { Seller } from "../../../pages/api/sellers/seller";

const sellerExists = async (email: string): Promise<boolean> => {
  try {
    const result = await DB.query("SELECT id FROM sellers WHERE email = $1", [
      email,
    ]);
    return result.rowCount > 0;
  } catch (err) {
    console.error("Error checking seller existence:", err);
    throw new Error("Failed to check seller existence");
  }
};

// Function to get a single seller by ID
const getSellerById = async (id: number): Promise<Seller | null> => {
  try {
    const result = await DB.query("SELECT * FROM sellers WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      throw new Error(`Seller with ID ${id} not found`);
    }
    return result.rows[0];
  } catch (err) {
    console.error("Error fetching seller by ID:", err);
    throw new Error("Database error while fetching seller");
  }
};

// Function to get all sellers
const getAllSellers = async (): Promise<Seller[]> => {
  try {
    const result = await DB.query("SELECT * FROM sellers");
    return result.rows;
  } catch (err) {
    console.error("Error fetching sellers:", err);
    throw new Error("Database error while fetching sellers");
  }
};

// Function to handle single or multiple seller retrieval
const getSellers = async (ids?: number[]): Promise<Seller[]> => {
  try {
    if (ids && ids.length > 0) {
      const placeholders = ids.map((_, index) => `$${index + 1}`).join(", ");
      const query = `SELECT * FROM sellers WHERE id IN (${placeholders})`;
      const result = await DB.query(query, ids);
      return result.rows;
    } else {
      const result = await DB.query("SELECT * FROM sellers");
      return result.rows;
    }
  } catch (err) {
    console.error("Error fetching sellers:", err);
    throw new Error("Database error while fetching sellers");
  }
};

// Function to update seller by ID dynamically
const updateSellerById = async (
  id: number,
  updatedFields: { name?: string; email?: string; contact?: string }
): Promise<Seller> => {
  try {
    const setClause = Object.keys(updatedFields)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");
    const values = [...Object.values(updatedFields), id];

    const updateQuery = `UPDATE sellers SET ${setClause} WHERE id = $${values.length} RETURNING *`;
    const result = await DB.query(updateQuery, values);

    if (result.rowCount === 0) {
      throw new Error(`Seller with ID ${id} not found`);
    }
    return result.rows[0];
  } catch (err) {
    console.error("Error updating seller:", err);
    throw new Error("Database error while updating seller");
  }
};

export {
  getSellerById,
  getAllSellers,
  updateSellerById,
  getSellers,
  sellerExists,
};
