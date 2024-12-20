// src/api/sellers/index.ts
import { NextApiRequest, NextApiResponse } from "next";
import { successResponse, errorResponse } from "../../../api/utils/responses";
import { getSellers } from "../../../api/database/models/seller";

// Handler to get all sellers or sellers by a list of IDs
const getSellersHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return errorResponse(res, "Method Not Allowed", 405);
  }

  const { ids } = req.query;
  try {
    const sellerIds = ids ? (Array.isArray(ids) ? ids : [ids]) : undefined;
    const sellers = await getSellers(sellerIds?.map(Number));
    return successResponse(res, sellers, 200);
  } catch (error: any) {
    return errorResponse(
      res,
      error.message || "Failed to retrieve sellers",
      500
    );
  }
};

// Export the handlers
export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      await getSellersHandler(req, res);
      break;
    default:
      return errorResponse(res, "Method Not Allowed", 405);
  }
};
