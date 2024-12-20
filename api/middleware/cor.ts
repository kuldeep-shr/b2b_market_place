import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

// CORS Middleware to handle cross-origin requests
const cors =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    // Allow specific origins or all origins
    res.setHeader("Access-Control-Allow-Origin", "*"); // Replace '*' with your frontend URL for better security
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    return handler(req, res);
  };

export default cors;
