import { NextApiRequest, NextApiResponse } from "next";
import { successResponse, errorResponse } from "../../../api/utils/responses";
import {
  getSellerById,
  updateSellerById,
} from "../../../api/database/models/seller";
import { getUserFromSession } from "../auth/index";

// Handler for updating a seller's details
const updateSeller = async (req: NextApiRequest, res: NextApiResponse) => {
  getUserFromSession(req, res, async () => {
    const { id } = req.query;
    const { name, email, contact } = req.body;

    if (req.method !== "PATCH") {
      return errorResponse(res, "Method not allowed", 405);
    }

    if (!name && !email && !contact) {
      return errorResponse(
        res,
        "At least one field (name, email, or contact) is required to update",
        400
      );
    }

    // Log the received id to check the value
    console.log("Received seller ID:", id);

    try {
      // Ensure the ID is a valid number
      const sellerId = Number(id); // Convert the query param id to a number
      if (isNaN(sellerId)) {
        return errorResponse(res, "Invalid seller ID", 400); // If ID is not a valid number
      }

      // Check if the seller exists
      const seller = await getSellerById(sellerId);
      if (!seller) {
        return errorResponse(res, "Seller not found", 404); // Error if seller not found
      }

      // Prepare the fields to be updated
      const updatedFields: { name?: string; email?: string; contact?: string } =
        {};

      if (name) updatedFields.name = name;
      if (email) updatedFields.email = email;
      if (contact) updatedFields.contact = contact;

      // Update the seller's details in the database
      const updatedSeller = await updateSellerById(sellerId, updatedFields);

      // Return success response with updated seller details
      return successResponse(res, [updatedSeller], 200);
    } catch (error) {
      console.error("Error during seller update:", error);
      return errorResponse(res, "Internal server error", 500); // Internal server error
    }
  });
};

export default updateSeller;
