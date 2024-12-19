import { DB } from "../index";

export interface Product {
  id?: number;
  name: string;
  description: string;
  status: string;
  sellerId: number;
}

// Get all products
export const getAllProducts = (): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    DB.all("SELECT * FROM products", (err, rows: any) => {
      if (err) reject(err);
      else {
        console.log("rp", rows);
        resolve(rows);
      }
    });
  });
};

// Get a product by ID
export const getProductById = (id: number): Promise<Product | undefined> => {
  return new Promise((resolve, reject) => {
    DB.get("SELECT * FROM products WHERE id = ?", [id], (err, row: any) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

// Function to add a product to the database
export const addProduct = (product: Product): Promise<void> => {
  return new Promise((resolve, reject) => {
    const { name, description, status, sellerId } = product;
    const query =
      "INSERT INTO products (name, description, status, sellerId) VALUES (?, ?, ?, ?)";
    DB.run(query, [name, description, status, sellerId], function (err) {
      if (err) {
        reject(new Error(`Error inserting product: ${err.message}`));
      } else {
        resolve();
      }
    });
  });
};

// Update product status
export const updateProductStatus = (
  id: number,
  status: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    DB.run(
      "UPDATE products SET status = ? WHERE id = ?",
      [status, id],
      function (err) {
        if (err) reject(err);
        resolve();
      }
    );
  });
};
