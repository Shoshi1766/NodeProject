import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // קבלת הטוקן מה-Headers

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded; // שמירת המשתמש המבוטל ב-request
        next();
    } catch (err) {
        return res.status(400).json({ message: "Invalid token." });
    }
};

export const verifyManager = (req, res, next) => {
    verifyUser(req, res, () => { // תחילה בודק שזה המשתמש הנכון
        if (req.user.userRole !== "Manager") {
            return res.status(403).json({ message: "Access denied. Manager role required." });
        }
        next();
    });
};
