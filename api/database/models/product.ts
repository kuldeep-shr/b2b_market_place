import exp from "constants";
import { DB } from "../index";

export interface Product {
  id?: number;
  name: string;
  description: string;
  status: string;
  sellerId: number;
  image?: string;
}

// Fetch products (all or a specific one by ID)
export const getProducts = (id?: number): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    const query = id
      ? "SELECT p.id, p.name,p.description,p.status,p.image,p.sellerId,s.name AS seller FROM products AS p LEFT JOIN sellers AS s ON p.sellerId=s.id WHERE p.id = ?"
      : "SELECT p.id, p.name,p.description,p.status,p.image,p.sellerId,s.name AS seller FROM products AS p LEFT JOIN sellers AS s ON p.sellerId=s.id";
    const params = id ? [id] : [];

    DB.all(query, params, (err, rows: Product[]) => {
      if (err) {
        reject(new Error(`Error fetching products: ${err.message}`));
      } else {
        resolve(rows);
      }
    });
  });
};

// Add a new product
export const addProduct = (product: Product): Promise<Product> => {
  return new Promise((resolve, reject) => {
    const { name, description, status, sellerId, image = "" } = product;
    const query =
      "INSERT INTO products (name, description, status, sellerId,image) VALUES (?, ?, ?, ?,?)";

    DB.run(query, [name, description, status, sellerId, image], function (err) {
      if (err) {
        reject(new Error(`Error inserting product: ${err.message}`));
      } else {
        resolve({ id: this.lastID, ...product });
      }
    });
  });
};

// New helper type for partial updates
export type PartialProduct = Partial<Product> & { id: number };

// Function for partial updates
export const updateProduct = (
  product: PartialProduct
): Promise<Product | null> => {
  return new Promise((resolve, reject) => {
    const { id, ...fieldsToUpdate } = product;

    const setFields = Object.keys(fieldsToUpdate)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(fieldsToUpdate);

    if (!setFields) {
      return reject(new Error("No fields to update."));
    }

    const query = `UPDATE products SET ${setFields} WHERE id = ?`;
    DB.run(query, [...values, id], function (err) {
      if (err) {
        return reject(new Error(`Error updating product: ${err.message}`));
      }
      resolve(fieldsToUpdate as Product);
    });
  });
};

// Get products by seller ID
export const getProductsBySellerId = (sellerId: number): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT p.id, p.name,p.description,p.status,p.image,p.sellerId,s.name AS seller FROM products AS p LEFT JOIN sellers AS s ON p.sellerId=s.id WHERE sellerId = ?";
    DB.all(query, [sellerId], (err, rows: any) => {
      if (err) {
        reject(new Error(`Error fetching products: ${err.message}`));
      } else {
        resolve(rows);
      }
    });
  });
};

export const productMapBySeller = (
  productId: number | string,
  sellerId: number
): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    console.log("productId", productId);
    console.log("sellerId", sellerId);

    // Explicitly specify the columns to fetch for better readability and performance
    const query = `
      SELECT 
        *
      FROM 
        products
      WHERE 
        id = ? AND sellerId = ?
    `;

    DB.all(query, [productId, sellerId], (err, rows: any) => {
      if (err) {
        reject(
          new Error(
            `Failed to fetch products for productId ${productId} and sellerId ${sellerId}: ${err.message}`
          )
        );
      } else {
        resolve(rows);
      }
    });
  });
};
