import { NextApiRequest, NextApiResponse } from "next";
import { successResponse, errorResponse } from "../../utils/responses";
import { generateToken } from "../../utils/jwt";
import { createUser, getUserByEmail } from "../../database/models/user";
import { hashPassword } from "../auth";

// Define the User type
interface User {
  id: number;
  name: string;
  email: string;
  password: string; // This will be excluded later
}

// Handler for user registration
const register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return errorResponse(res, "Method not allowed", 405); // Error if method is not POST
  }

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return errorResponse(res, "All fields are required", 400); // Error if any field is missing
  }

  try {
    // Check if user already exists by email
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return errorResponse(res, "Email already in use", 409); // Error if email is already taken
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const newUser: any = await createUser({
      name,
      email,
      password: hashedPassword,
    });

    const jwtToken = generateToken(newUser.id);
    if (!newUser) {
      return errorResponse(res, "Failed to create user", 500); // Error if user is not created
    }
    // Omit password from the response using Omit utility type
    const userData = omitPassword(newUser);
    userData["token"] = jwtToken;
    userData["token_validity"] = "1h";
    // Return success response with user data (excluding password)
    return successResponse(res, [userData], 201);
  } catch (error) {
    console.error("Error during user registration:", error);
    return errorResponse(res, "Internal server error", 500);
  }
};

// Function to omit password from the user object
const omitPassword = <T extends User>(user: T): Omit<T, "password"> => {
  const { password, ...userData } = user;
  return userData;
};

export default register;
