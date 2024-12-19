import { NextApiRequest, NextApiResponse } from "next";
import { successResponse, errorResponse } from "../../utils/responses";
import {
  getProductById,
  updateProductStatus,
} from "../../database/models/product";

// Handle GET and PUT requests for a specific product
const productHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (typeof id !== "string") {
    return errorResponse(res, "Invalid product ID", 400);
  }

  if (req.method === "GET") {
    try {
      // Fetch product details by ID
      const product = await getProductById(parseInt(id));
      if (!product) {
        return errorResponse(res, "Product not found", 404);
      }
      return successResponse(res, product, 200);
    } catch (error) {
      return errorResponse(res, "Failed to fetch product", 500);
    }
  }

  if (req.method === "PUT") {
    const { status } = req.body;

    if (!status) {
      return errorResponse(res, "Product status is required", 400);
    }

    try {
      // Update product status
      const updatedProduct: any = await updateProductStatus(
        parseInt(id),
        status
      );
      if (!updatedProduct) {
        return errorResponse(res, "Product not found", 404);
      }
      return successResponse(res, updatedProduct, 200);
    } catch (error) {
      return errorResponse(res, "Failed to update product", 500);
    }
  }

  // Method not allowed
  return errorResponse(res, "Method not allowed", 405);
};

export default productHandler;
