import { NextApiRequest, NextApiResponse } from "next";
import { successResponse, errorResponse } from "../../utils/responses";
import { getUserByEmail } from "../../database/models/user";
import { comparePassword } from "../auth/index";
import { generateToken } from "../../utils/jwt";

// Handler for user login
const login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return errorResponse(res, "Method not allowed", 405);
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return errorResponse(res, "Email and password are required", 400);
  }

  try {
    // Find user by email
    const user: any = await getUserByEmail(email);

    if (!user) {
      return errorResponse(res, "User not found", 404); // Error if user doesn't exist
    }

    // Compare the provided password with the stored password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return errorResponse(res, "Invalid credentials", 401); // Error if password is incorrect
    }
    const jwtToken = generateToken(user.id);

    // Return success response with user data (excluding password)
    const { password: _, ...userData } = user;
    (userData["token"] = jwtToken), (userData["token_validity"] = "1h");
    return successResponse(res, [userData], 200);
  } catch (error) {
    return errorResponse(res, "Internal server error", 500);
  }
};

export default login;
