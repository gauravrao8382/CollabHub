import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "No token" });
    }

    try {
        // 🔥 "Bearer TOKEN" → TOKEN extract karo
        const token = authHeader.split(" ")[1];
        
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        console.log("Decoded user:", decoded); // debug

        req.user = decoded;

        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: "Invalid token" });
    }
};