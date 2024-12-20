import { createUser } from "./models/user";
import { addProduct } from "./models/product";

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
const products: Product[] = [
  {
    name: "Product 1",
    description: "Description for Product 1",
    image: "https://picsum.photos/id/1/200/300",
    status: "available",
    sellerId: 1,
  },
  {
    name: "Product 2",
    description: "Description for Product 2",
    image: "https://picsum.photos/id/2/200/300",
    status: "sold",
    sellerId: 1,
  },
  {
    name: "Product 3",
    description: "Description for Product 3",
    image: "https://picsum.photos/id/3/200/300",
    status: "available",
    sellerId: 2,
  },
  {
    name: "Product 4",
    description: "Description for Product 4",
    image: "https://picsum.photos/id/4/200/300",
    status: "available",
    sellerId: 3,
  },
  {
    name: "Product 5",
    description: "Description for Product 5",
    image: "https://picsum.photos/id/6/200/300",
    status: "sold",
    sellerId: 4,
  },
];

// Function to seed data
const seedDatabase = async (): Promise<void> => {
  try {
    // Insert Sellers
    for (const seller of sellers) {
      await createUser(seller);
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
