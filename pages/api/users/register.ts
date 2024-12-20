import { NextApiRequest, NextApiResponse } from "next";
import { successResponse, errorResponse } from "../../../api/utils/responses";
import { generateToken } from "../../../api/utils/jwt";
import {
  createUser,
  checkUserExistence,
} from "../../../api/database/models/user";
import { hashPassword } from "../auth";

// Define the User type
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  contact: string;
  image?: string;
}

// Handler for user registration
const register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return errorResponse(res, "Method not allowed", 405); // Error if method is not POST
  }

  const { name, email, password, image, contact } = req.body;
  if (!name || !email || !password || !contact) {
    return errorResponse(res, "All fields are required", 400); // Error if any field is missing
  }

  try {
    // Check if user already exists by email or phone
    const user = await checkUserExistence(contact, email);
    if (user) {
      return errorResponse(
        res,
        "User exists, please check your email or phone",
        409
      );
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const newUser: any = await createUser({
      name,
      email,
      password: hashedPassword,
      contact,
      image,
    });

    const jwtToken = generateToken(newUser.id);
    if (!newUser) {
      return errorResponse(res, "Failed to create seller", 500); // Error if user is not created
    }
    // Omit password from the response using Omit utility type
    const userData = omitPassword(newUser);
    userData["token"] = jwtToken;
    userData["token_validity"] = "1h";
    // Return success response with user data (excluding password)
    return successResponse(res, userData, 201);
  } catch (error) {
    console.error("Error during seller registration:", error);
    return errorResponse(res, "Internal server error", 500);
  }
};

// Function to omit password from the user object
const omitPassword = <T extends User>(user: T): Omit<T, "password"> => {
  const { password, ...userData } = user;
  return userData;
};

export default register;
