import Jwt from "jsonwebtoken";
import User from "../models/userModel.js"

const verifyToken = async (req, res, next) => {
    try {
      const token = req.cookies.accessToken;
  
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "You're not authorized",
        });
      }
  
      const decodedData = Jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findById(decodedData.id);
  
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }
      req.user = user;
      next();
      
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  };

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.role === "admin" || req.user.role === "user" ) {
            next();
        } else {
            res.status(401).json({
                success: false,
                message: "You're not authenticated"
            });
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === "admin") {
            next();
        } else {
            res.status(401).json({
                success: false,
                message: `Role: ${req.user.role} is not allowed to access this resource`
            });
        }
    });
};

