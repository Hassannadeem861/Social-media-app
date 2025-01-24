import dotenv from "dotenv";
import User from "../models/user-model.js";
import jwt from "jsonwebtoken";

dotenv.config();

const verifyToken = async (req, res, next) => {
  try {
    const token = req?.cookies?.accessToken;
    // console.log("jwt token: ", token);

    // req.header("Authorization");
    // ||
    // req.header("Authorization")
    // .replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Access token is missing or invalid" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log("decoded: ", decoded);

    if (!decoded || !decoded._id) {
      return res.status(403).json({ message: "Invalid access token" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.log("JWT MIDDLEWARE ERROR: ", error.message);
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token expired, please login again" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const adminRoleMiddleware = (...roles) => {
  // console.log("roles: ", roles);

  return async (req, res, next) => {
    try {
      // Check if user's role is included in the allowed roles
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          message: `Role: ${req.user.role} is not allowed to access this permission`,
        });
      }
      next();
    } catch (error) {
      console.error("ERROR IN ADMIN ROLE MIDDLEWARE: ", error);
      res.status(500).json({ message: "Server error in role middleware" });
    }
  };
};

export { verifyToken, adminRoleMiddleware };
