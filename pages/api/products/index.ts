import { NextApiRequest, NextApiResponse } from "next";
import { successResponse, errorResponse } from "../../utils/responses";
import { getAllProducts, addProduct } from "../../database/models/product";

// Handle GET and POST requests for products
const productsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      // Fetch all products
      const products = await getAllProducts();
      return successResponse(res, products, 200);
    } catch (error) {
      return errorResponse(res, "Failed to fetch products", 500);
    }
  }

  if (req.method === "POST") {
    const { name, description, status, sellerId } = req.body;

    if (!name || !description || !status || !sellerId) {
      return errorResponse(res, "All fields are required", 400);
    }

    try {
      // Create a new product
      const newProduct = await addProduct({
        name,
        description,
        status,
        sellerId,
      });
      return successResponse(res, newProduct, 201);
    } catch (error) {
      return errorResponse(res, "Failed to create product", 500);
    }
  }

  // Method not allowed
  return errorResponse(res, "Method not allowed", 405);
};

export default productsHandler;
