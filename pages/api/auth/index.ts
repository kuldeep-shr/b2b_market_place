import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { getUserById } from "../../database/models/user";

const SECRET_KEY = String(process.env.JWT_SECRET);

// Function to hash a password
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Function to compare a password with the hashed password
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

// Function to extract user from session or token (if using JWT)
export const getUserFromSession = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function
) => {
  // Try to extract token from cookies or headers
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Token from cookies or Authorization header

  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  try {
    console.log("JWT____", SECRET_KEY);

    // Verify the JWT token and extract user data
    const decoded: any = jwt.verify(token, SECRET_KEY); // Decode JWT
    const userId: number = decoded.userId;

    console.log("user", decoded);
    // Fetch the user from the database using the userId
    const user = await getUserById(userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    console.log("auth", error);
    return res.status(500).json({ message: "Authentication failed" });
  }
};
