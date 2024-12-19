import { NextApiResponse } from "next";

// Success response helper
export const successResponse = (
  res: NextApiResponse,
  data: any,
  statusCode: number = 200
) => {
  return res.status(statusCode).json({
    success: true,
    data,
  });
};

// Error response helper
export const errorResponse = (
  res: NextApiResponse,
  message: string,
  statusCode: number = 400
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};
