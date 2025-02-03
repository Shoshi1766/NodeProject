import { UserModel } from '../models/User.js';

export const getAllUsers = async (req, res) => {
    try {
        let data = await UserModel.find({}, "-password");
        res.json(data);
    }
    catch (er) {
        console.log("error: " + er);
        return res.status(400).json({
            title: "cannot get all", message:
                er.message
        })
    }
}
export const getUserByTz = async (req, res) => {
    try {
        //בגלל שעשיתי תז לא אוטמטית אני מחפשת ע"י הפונקציה findone
        //אז תחפש לפי התז ותחזיר אובייקט משתמש ללא הסיסמה שלו
        let data = await UserModel.findOne({ tz: req.params.tz }, "-password");
        if (!data)
            return res.status(400).json({ title: "error cannot get by tz", message: "cannot find such a user" });
        res.json(data);
    }
    catch (er) {
        return res.status(400).json({ title: "cannot get by tz", message: er.message })
    }
}
export const addUser = async (req, res) => {
    try {
        let { tz, fullName, password } = req.body;
        if (!tz || !fullName || !password)
            return res.status(400).json({ title: "erorr cannot add user", message: "missing requierd fileds" });
        if (password.length < 9)
            return res.status(400).json({ title: "erorr cannot add user", message: "requierd 8 chars in password" });
        let User = new UserModel(req.body);
        await User.save();
        let userResponse = User.toObject();
        delete userResponse.password;
        return res.json(userResponse);

    }
    catch (er) {
        res.status(400).json({ title: "error cannot add user", message: er.message });
    }
}



export const updateUserByIdWithoutUpdatePassword = async (req, res) => {
    let { tz } = req.params;
    //אני מכניסה את הנתונים שקיבלתי בbody
    //את הסיסמה למשתנה נפרד (בגלל שאותה אני לא רוצה לעדכן), ואת שאר הנתונים לתוך אובייקט details
    let { password, ...details } = req.body;
    try {
        //אם נשלחה סיסמה תזרוק שגיאה
        if (password)
            return res.status(400).json({ title: "cannot update user", message: "update without changing password" });
// תחפש במודל לפי התז  (ולכן findone)
// ותחזיר לי כres את האובייקט החדש ואל תציג את הסיסמה
        let User = await UserModel.findOneAndUpdate({ tz }, details, { new: true, fields: "-password" });
        if (!User)
            return res.status(400).json({ title: "error cannot find user to update", message: "missing tz" });
        res.json(User);
    }
    catch (er) {
        return res.status(400).json({ title: "error cannot update the user", message: er.message });
    }
}

export const updatePasswordById = async (req, res) => {
    let { tz } = req.params;
    let { password } = req.body;
    try {
        if (!password)
            return res.status(400).json({ title: "cannot update password", message: "missing user password" })
        let User = await UserModel.findOneAndUpdate({ tz }, req.body, { new: true, fields: "-password" });
        if (!User)
            return res.status(400).json({ title: "error cannot find user to update", message: "missing tz" })
        res.json(User)
    }
    catch (er) {
        return res.status(400).json({ title: "error cannot update the password of this user", message: er.message });
    }
}

export const getUserByFullNameAndPasswordAndByPost = async (req, res) => {
    let { password, fullName } = req.body;
    try {
        if (!password || !fullName)
      //לחפש מישהו שזהו שמו וזאת סיסמתו
        return res.status(400).json({ title: "error missing password and full name", message: "missing correct details" })
        let User = await UserModel.findOne({ fullName: fullName, password: password }, "-password");
        if (!User)
            return res.status(400).json({ title: "error cannot find such user", message: "missing correct details" })
      //אם מצאתה כזה משתמש תחזיר אותו לres 
            res.json(User);
    }
    catch (er) {
        return res.status(400).json({ title: "error cannot get user by full name and password", message: er.message });
    }
}