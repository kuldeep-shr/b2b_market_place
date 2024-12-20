import DB from "../index";
import { Seller } from "../../../pages/api/sellers/seller";

export interface Product {
  id?: number;
  name: string;
  description: string;
  status: string;
  sellerId: number;
  image?: string;
}

export type PartialProduct = Partial<Product> & { id: number };
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

// Function to get all products or a specific product by ID
const getProducts = async (id?: number, limit?: number): Promise<Product[]> => {
  try {
    const query = id
      ? "SELECT p.id, p.name, p.description, p.status, p.image, p.sellerId, s.name AS seller FROM products AS p LEFT JOIN sellers AS s ON p.sellerId = s.id WHERE p.id = $1 LIMIT $2"
      : "SELECT p.id, p.name, p.description, p.status, p.image, p.sellerId, s.name AS seller FROM products AS p LEFT JOIN sellers AS s ON p.sellerId = s.id LIMIT $1";
    const params = id ? [id, limit] : [limit];
    const result = await DB.query(query, params);
    return result.rows;
  } catch (err) {
    console.error("Error fetching products:", err);
    throw new Error("Database error while fetching products");
  }
};

// Function to add a new product
const addProduct = async (product: Product): Promise<Product> => {
  try {
    const { name, description, status, sellerId, image } = product;
    const query =
      "INSERT INTO products (name, description, status, sellerId, image) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const result = await DB.query(query, [
      name,
      description,
      status,
      sellerId,
      image,
    ]);
    return result.rows[0];
  } catch (err) {
    console.error("Error inserting product:", err);
    throw new Error("Database error while inserting product");
  }
};

// Function for partial updates of products
const updateProduct = async (
  product: PartialProduct
): Promise<Product | null> => {
  try {
    const { id, ...fieldsToUpdate } = product;

    const setClause = Object.keys(fieldsToUpdate)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");
    const values = [...Object.values(fieldsToUpdate), id];

    if (!setClause) {
      throw new Error("No fields to update.");
    }

    const query = `UPDATE products SET ${setClause} WHERE id = $${values.length} RETURNING *`;
    const result = await DB.query(query, values);

    if (result.rowCount === 0) {
      return null;
    }
    return result.rows[0];
  } catch (err) {
    console.error("Error updating product:", err);
    throw new Error("Database error while updating product");
  }
};

// Function to get products by seller ID
const getProductsBySellerId = async (sellerId: number): Promise<Product[]> => {
  try {
    const query =
      "SELECT p.id, p.name, p.description, p.status, p.image, p.sellerId, s.name AS seller FROM products AS p LEFT JOIN sellers AS s ON p.sellerId = s.id WHERE p.sellerId = $1";
    const result = await DB.query(query, [sellerId]);
    return result.rows;
  } catch (err) {
    console.error("Error fetching products by seller ID:", err);
    throw new Error("Database error while fetching products by seller ID");
  }
};

// Function to map products by seller
const productMapBySeller = async (
  productId: number | string,
  sellerId: number
): Promise<Product[]> => {
  try {
    const query = "SELECT * FROM products WHERE id = $1 AND sellerId = $2";
    const result = await DB.query(query, [productId, sellerId]);
    return result.rows;
  } catch (err) {
    console.error(
      `Failed to fetch products for productId ${productId} and sellerId ${sellerId}:`,
      err
    );
    throw new Error("Database error while fetching mapped products by seller");
  }
};

export {
  getSellerById,
  getAllSellers,
  updateSellerById,
  getSellers,
  sellerExists,
  getProducts,
  addProduct,
  updateProduct,
  getProductsBySellerId,
  productMapBySeller,
};
