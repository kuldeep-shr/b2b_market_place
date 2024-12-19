// src/api/sellers/index.ts
import { NextApiRequest, NextApiResponse } from "next";
import { successResponse, errorResponse } from "../../utils/responses";
import {
  createSeller,
  sellerExists,
  getSellers,
} from "../../database/models/seller";
import { getUserFromSession } from "../auth/index";

// Handler to get all sellers or sellers by a list of IDs
const getSellersHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  getUserFromSession(req, res, async () => {
    if (req.method !== "GET") {
      return errorResponse(res, "Method Not Allowed", 405);
    }

    const { ids } = req.query;
    try {
      // If IDs are passed, fetch sellers by those IDs, otherwise fetch all sellers
      const sellerIds = ids ? (Array.isArray(ids) ? ids : [ids]) : undefined;
      const sellers = await getSellers(sellerIds?.map(Number)); // Convert IDs to numbers
      return successResponse(res, sellers, 200);
    } catch (error: any) {
      return errorResponse(
        res,
        error.message || "Failed to retrieve sellers",
        500
      );
    }
  });
};

// Handler to create a new seller
const createSellerHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "POST") {
    return errorResponse(res, "Method Not Allowed", 405);
  }

  const { name, email, contact } = req.body;

  if (!name || !email || !contact) {
    return errorResponse(
      res,
      "All fields (name, email, contact) are required",
      400
    );
  }

  // Check if the seller already exists by email
  const exists = await sellerExists(email);
  if (exists) {
    return errorResponse(res, "Seller with this email already exists", 400);
  }

  try {
    const newSeller = await createSeller({ name, email, contact });
    return successResponse(res, [newSeller], 201);
  } catch (error: any) {
    return errorResponse(res, error.message || "Failed to create seller", 500);
  }
};

// Export the handlers
export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      await getSellersHandler(req, res);
      break;
    case "POST":
      await createSellerHandler(req, res);
      break;
    default:
      return errorResponse(res, "Method Not Allowed", 405);
  }
};
