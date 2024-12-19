import { NextApiRequest, NextApiResponse } from "next";
import { successResponse, errorResponse } from "../../utils/responses";
import { getProducts, addProduct } from "../../database/models/product";
import { getSellerById } from "../../database/models/seller";

const productsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      const { id } = req.query;

      // Fetch all products or a single product based on the query parameter
      const products = await getProducts(id ? Number(id) : undefined);

      if (id && !products.length) {
        return errorResponse(res, "Product not found", 404);
      }

      return successResponse(res, products, 200);
    }

    if (req.method === "POST") {
      const { name, description, status, sellerId } = req.body;

      if (!name || !description || !status || !sellerId) {
        return errorResponse(res, "All fields are required", 400);
      }

      // Check if the seller exists
      let seller;
      try {
        seller = await getSellerById(sellerId);
      } catch (err) {
        return errorResponse(
          res,
          "Failed to check seller existence. Please try again.",
          500
        );
      }

      if (!seller) {
        return errorResponse(res, "Seller not found. Cannot add product.", 404);
      }

      const newProduct = await addProduct({
        name,
        description,
        status,
        sellerId,
      });

      return successResponse(res, newProduct, 201);
    }

    return errorResponse(res, "Method not allowed", 405);
  } catch (error) {
    console.error("Error in productsHandler:", error);
    return errorResponse(res, "Internal server error", 500);
  }
};

export default productsHandler;
