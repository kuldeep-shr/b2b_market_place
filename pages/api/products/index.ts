import { NextApiRequest, NextApiResponse } from "next";
import { successResponse, errorResponse } from "../../../api/utils/responses";
import {
  getProducts,
  addProduct,
  getProductsBySellerId,
} from "../../../api/database/models/product";
import { getSellerById } from "../../../api/database/models/seller";
import { getUserFromSession } from "../../api/auth/index";

const productsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  getUserFromSession(req, res, async () => {
    try {
      const sellerObj = (req as any).user;
      if (req.method === "GET") {
        const { id, seller } = req.query;
        // If `seller` query is provided, fetch products for the seller
        if (seller) {
          return getUserFromSession(req, res, async () => {
            try {
              const products = await getProductsBySellerId(sellerObj.id);
              return successResponse(res, products, 200);
            } catch (error) {
              console.error("Error fetching products for seller:", error);
              return errorResponse(
                res,
                "Failed to fetch products for seller",
                500
              );
            }
          });
        }

        // Fetch all products or a single product based on the query parameter
        const products = await getProducts(id ? Number(id) : undefined);

        if (id && !products.length) {
          return errorResponse(res, "Product not found", 404);
        }

        return successResponse(res, products, 200);
      }

      if (req.method === "POST") {
        const { name, description, status, sellerId, image } = req.body;

        if (!name || !description || !status || !sellerId) {
          return errorResponse(res, "All fields are required", 400);
        }

        // Check if the seller exists
        const seller = await getSellerById(sellerId);
        if (!seller) {
          return errorResponse(
            res,
            "Seller not found. Cannot add product.",
            404
          );
        }

        const newProduct = await addProduct({
          name,
          description,
          status,
          sellerId,
          image,
        });

        return successResponse(res, newProduct, 201);
      }

      return errorResponse(res, "Method not allowed", 405);
    } catch (error) {
      console.error("Error in productsHandler:", error);
      return errorResponse(res, "Internal server error", 500);
    }
  });
};

export default productsHandler;
