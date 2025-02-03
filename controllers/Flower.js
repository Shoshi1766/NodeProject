import { FlowerModel } from '../models/Flower.js';

export const getAllFlowers = async (req, res) => {
    try {
        //מביא את כל תוכן מודל הפרח
        let data = await FlowerModel.find();
        //ותציג את התוכן בתגובה
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

export const getFlowerById = async (req, res) => {
    try {
        //חיפוש לפי id במודל
        let data = await FlowerModel.findById(req.params.id);
        if (!data)
            return res.status(400).json({ title: "error cannot get by id", message: "cannot find such a flower" });
        res.json(data);
    }
    catch (er) {
        return res.status(400).json({
            title: "cannot get by id", message:
                err.message
        })
    }
}
export const addFlower = async (req, res) => {
    try {
        //משתנים שהפונקציה דורשת מתוך הbody
        let { name, price, flowerContain } = req.body;
        //אם אין את המשתנים אז תחזיר שגיאה
        if (!name || !price || !flowerContain || flowerContain.length == 0)
            return res.status(400).json({ title: "erorr cannot add flower", message: "missing requierd fileds" });
        //דאגה למחיר הגיוני
        if (price < 0 || price > 10000)
            return res.status(400).json({ title: "erorr cannot add flower", message: "requierd price" });
        //יצרת 'פרח חדש' בטבלה
        let Flower = new FlowerModel(req.body);
        //ושמירתו
        await Flower.save();
        //ושיציג אותו בתגובה
        return res.json(Flower);

    }
    catch (er) {
        res.status(400).json({ title: "error cannot add flower", message: er.message });
    }
}

export const deleteFlowerById = async (req, res) => {
    //לקיחת הid שהוא הפרמטר שאמור להישלח בurl
    let { id } = req.params;
    try {
        //מציאת הפרח המבוקש למחיקה
        let Flower = await FlowerModel.findByIdAndDelete(id);
        //ואם אין כזה פרח תחזירק שגיאה
        if (!Flower)
            return res.status(400).json({ title: "error cannot find flower to delete", message: "missing id of flower" })
        res.json(Flower)
    }
    catch (er) {
        return res.status(400).json({ title: "error cannot find flower to delete", message: er.message });
    }
}

export const updateFlowerById = async (req, res) => {
    let { id } = req.params;
    let { name, price, flowerContain } = req.body;
    try {
        if (!name || !price || !flowerContain || flowerContain.length == 0)
            return res.status(400).json({ title: "cannot update flower", message: "missing flower details" })
        let Flower = await FlowerModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!Flower)
            return res.status(400).json({ title: "error cannot find flower to delete", message: "missing id of flower" })
        res.json(Flower)
    }
    catch (er) {
        return res.status(400).json({ title: "error cannot update the flower", message: er.message });
    }
}