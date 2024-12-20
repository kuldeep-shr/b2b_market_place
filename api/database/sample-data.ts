import { createUser } from "./models/user";
import { addProduct } from "./models/product";
import DB from "./index";

// Define Seller type
interface Seller {
  name: string;
  email: string;
  contact: string;
  image: string;
  password: string;
  sample_data?: boolean;
}

// Define Product type
interface Product {
  name: string;
  description: string;
  status: "available" | "sold";
  sellerId: number;
  image: string;
}

// Sample Seller Data
const sellers: Seller[] = [
  {
    name: "John Doe",
    email: "john@example.com",
    contact: "1234567890",
    password: "John@1234",
    image:
      "https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-1024.png",
    sample_data: true,
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    contact: "0987654321",
    password: "Jane@1234",
    image:
      "https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-1024.png",
    sample_data: true,
  },
  {
    name: "Michael Brown",
    email: "michael@example.com",
    contact: "1122334455",
    password: "Michael@1234",
    image:
      "https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-1024.png",
    sample_data: true,
  },
  {
    name: "Sarah Lee",
    email: "sarah@example.com",
    contact: "2233445566",
    password: "Sarah@1234",
    image:
      "https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-1024.png",
    sample_data: true,
  },
  {
    name: "David Clark",
    email: "david@example.com",
    contact: "3344556677",
    password: "David@1234",
    image:
      "https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-1024.png",
    sample_data: true,
  },
];

// Sample Product Data
const products: Omit<Product, "sellerId">[] = [
  {
    name: "Product 1",
    description: "Description for Product 1",
    image: "https://picsum.photos/id/1/200/300",
    status: "available",
  },
  {
    name: "Product 2",
    description: "Description for Product 2",
    image: "https://picsum.photos/id/2/200/300",
    status: "sold",
  },
  {
    name: "Product 3",
    description: "Description for Product 3",
    image: "https://picsum.photos/id/3/200/300",
    status: "available",
  },
  {
    name: "Product 4",
    description: "Description for Product 4",
    image: "https://picsum.photos/id/4/200/300",
    status: "available",
  },
  {
    name: "Product 5",
    description: "Description for Product 5",
    image: "https://picsum.photos/id/6/200/300",
    status: "sold",
  },
];

// Function to check if the database exists
const checkAndCreateDatabase = async (): Promise<void> => {
  try {
    const result = await DB.query(
      `SELECT 1 FROM pg_database WHERE datname = 'your_database_name'`
    );
    if (result.rowCount === 0) {
      console.log("Database does not exist. Creating database...");
      await DB.query(`CREATE DATABASE your_database_name`);
      console.log("Database created successfully.");
    } else {
      console.log("Database already exists.");
    }
  } catch (err) {
    console.error("Error checking or creating the database:", err);
    throw new Error("Failed to verify or create the database.");
  }
};

// Function to seed the database
const seedDatabase = async (): Promise<void> => {
  try {
    console.log("Starting database seeding...");

    const sellerIds: number[] = [];

    // Insert Sellers
    for (const seller of sellers) {
      const createdSeller: any = await createUser(seller);
      sellerIds.push(createdSeller.id);
    }

    // Insert Products
    for (let i = 0; i < products.length; i++) {
      const product = {
        ...products[i],
        sellerId: sellerIds[i % sellerIds.length],
      };
      await addProduct(product);
    }

    console.log("Sample data has been inserted into the database.");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};

// Main Function
const main = async (): Promise<void> => {
  if (process.env.NODE_ENV !== "production") {
    await checkAndCreateDatabase();
    await seedDatabase();
  } else {
    console.warn("Seeding is disabled in the production environment.");
  }
};

// Run the main function
main().catch((err) => {
  console.error("Unexpected error:", err);
});
