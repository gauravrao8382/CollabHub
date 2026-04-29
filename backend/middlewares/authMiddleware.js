import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "No token" });
    }

    try {
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_KEY);

        console.log("Decoded:", decoded);

        // 🔥 REAL FIX
        const user = await User.findById(decoded.id || decoded._id);

        if (!user) {
            return res.status(401).json({ message: "User not found in token" });
        }

        req.user = user; // ✅ full user attach

        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: "Invalid token" });
    }
};