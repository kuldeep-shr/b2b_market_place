import jwt from "jsonwebtoken";

const JWT_SECRET = String(process.env.JWT_SECRET);

// Generate JWT token
export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
};

// Verify JWT token
export const verifyToken = (token: string) => {
  try {
    console.log(":::JWT", JWT_SECRET);
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
