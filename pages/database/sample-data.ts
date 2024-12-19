import { createSeller } from "./models/seller";
import { addProduct } from "./models/product";

// Define Seller type
interface Seller {
  name: string;
  email: string;
  contact: string;
}

// Define Product type
interface Product {
  name: string;
  description: string;
  status: "Available" | "Sold";
  sellerId: number;
}

// Sample Seller Data
const sellers: Seller[] = [
  { name: "John Doe", email: "john@example.com", contact: "1234567890" },
  { name: "Jane Smith", email: "jane@example.com", contact: "0987654321" },
  {
    name: "Michael Brown",
    email: "michael@example.com",
    contact: "1122334455",
  },
  { name: "Sarah Lee", email: "sarah@example.com", contact: "2233445566" },
  { name: "David Clark", email: "david@example.com", contact: "3344556677" },
];

// Sample Product Data
const products: Product[] = [
  {
    name: "Product 1",
    description: "Description for Product 1",
    status: "Available",
    sellerId: 1,
  },
  {
    name: "Product 2",
    description: "Description for Product 2",
    status: "Sold",
    sellerId: 1,
  },
  {
    name: "Product 3",
    description: "Description for Product 3",
    status: "Available",
    sellerId: 2,
  },
  {
    name: "Product 4",
    description: "Description for Product 4",
    status: "Available",
    sellerId: 3,
  },
  {
    name: "Product 5",
    description: "Description for Product 5",
    status: "Sold",
    sellerId: 4,
  },
];

// Function to seed data
const seedDatabase = async (): Promise<void> => {
  try {
    // Insert Sellers
    for (const seller of sellers) {
      await createSeller(seller);
    }

    // Insert Products
    for (const product of products) {
      await addProduct(product);
    }

    console.log("Sample data has been inserted into the database.");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};

// Run the seed function
seedDatabase();
