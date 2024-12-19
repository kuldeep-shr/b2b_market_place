import { DB } from "../index";

export interface Product {
  id?: number;
  name: string;
  description: string;
  status: string;
  sellerId: number;
}

// Fetch products (all or a specific one by ID)
export const getProducts = (id?: number): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    const query = id
      ? "SELECT * FROM products WHERE id = ?"
      : "SELECT * FROM products";
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
    const { name, description, status, sellerId } = product;
    const query =
      "INSERT INTO products (name, description, status, sellerId) VALUES (?, ?, ?, ?)";

    DB.run(query, [name, description, status, sellerId], function (err) {
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
