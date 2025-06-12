import jwt from 'jsonwebtoken';

export function generateToken(user) {
    const payload = {
        userId: user._id,
        userName: user.fullName,
        userRole:user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });  // טוקן שפג תוקפו אחרי שעה
    return token;
}
export function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);  // מאמת את הטוקן ומפענח אותו
        return decoded;  // אם הטוקן תקין, מחזירים את המידע המפוענח
    } catch (err) {
        throw new Error("Invalid token");  // אם הטוקן לא תקין או פג תוקף
    }
}
