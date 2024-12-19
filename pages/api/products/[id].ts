import { NextApiRequest, NextApiResponse } from "next";
import { successResponse, errorResponse } from "../../utils/responses";
import { updateProduct } from "../../database/models/product";

const productUpdateHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;

  if (typeof id !== "string") {
    return errorResponse(res, "Invalid product ID", 400);
  }

  if (req.method !== "PATCH") {
    return errorResponse(res, "Method not allowed", 405);
  }

  const { name, description, status, sellerId } = req.body;

  // Ensure at least one field to update is provided
  if (!name && !description && !status && !sellerId) {
    return errorResponse(
      res,
      "At least one field (name, description, status, sellerId) is required to update",
      400
    );
  }

  try {
    // Update product
    const updatedProduct = await updateProduct({
      id: parseInt(id),
      ...(name && { name }),
      ...(description && { description }),
      ...(status && { status }),
      ...(sellerId && { sellerId }),
    });

    return successResponse(res, [updatedProduct], 200);
  } catch (error) {
    console.error("Error updating product:", error);
    return errorResponse(res, "Failed to update product", 500);
  }
};

export default productUpdateHandler;
