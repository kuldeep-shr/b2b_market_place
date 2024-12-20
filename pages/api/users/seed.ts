import { NextApiRequest, NextApiResponse } from "next";
import {
  checkAndCreateDatabase,
  seedDatabase,
} from "../../../api/database/sample-data";

// API Route Handler
const seed = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      console.log("Seeding process started...");

      if (process.env.NODE_ENV !== "production") {
        await checkAndCreateDatabase();
        await seedDatabase();
        res.status(200).json({ message: "Seeding completed successfully." });
      } else {
        res.status(400).json({ message: "Seeding is disabled in production." });
      }
    } catch (error) {
      console.error("Seeding error:", error);
      res
        .status(500)
        .json({ message: "Error during seeding", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed. Please use GET." });
  }
};

export default seed;
