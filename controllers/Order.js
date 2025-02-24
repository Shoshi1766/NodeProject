import { OrderModel } from '../models/Order.js'
import { UserModel } from '../models/User.js';

export const getAllOrders = async (req, res) => {
    try {
        let data = await OrderModel.find();
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

export const addOrder = async (req, res) => {
    try {
        let { userId, products, address } = req.body;
        if (!userId || !products || !address || products.length == 0)
            return res.status(400).json({ title: "erorr cannot add order1", message: "missing requierd fileds" });
        const userExists = await UserModel.findOne({ tz: userId });
        if (!userExists)
            return res.status(400).json({ title: "erorr cannot add order2", message: "missing correct tz of user" });
        let Order = new OrderModel(req.body);
        await Order.save();
        return res.json(Order);

    }
    catch (er) {
        res.status(400).json({ title: "error cannot add order", message: er.message });
    }
}

export const deleteOrderById = async (req, res) => {
    let { id } = req.params;
    try {
        let Order = await OrderModel.findById(id);
        if (!Order)
            return res.status(400).json({ title: "error cannot find order to delete", message: "missing id of order" })
        if (Order.isSend)
            return res.status(400).json({ title: "error cannot delete this order", message: "the order send" })
        await OrderModel.findByIdAndDelete(id);
        res.json(Order)
    }
    catch (er) {
        return res.status(400).json({ title: "error cannot find order to delete", message: er.message });
    }
}

export const getAllOrdersByUserId = async (req, res) => {
    let { userId } = req.params;
    try {
        //תחפש במודל הזמנה לפי הuser id שנשלח בurl
        let Orders = await OrderModel.find({ userId: userId })
        //וליכולות להיות מספר הזמנות למשתמש אחד
        //ולכן אם המערך ריק תחזיר שגיאה
       
        if (Orders.length == 0)
            return res.status(400).json({ title: "error cannot find orders", message: "missin correct userId" });
        return res.json(Orders);
    }
    catch (er) {
        return res.status(400).json({ title: "error cannot find orders by userId", message: er.message });
    }
}

export const updateOrderToSendingById = async (req, res) => {
    let { id } = req.params;
    try {
        //חיפוש במודל לפי הid ותעדכן את המשלוח לtrue ותחזיר לי כres את האובייקט המעודכן
        let Order = await OrderModel.findByIdAndUpdate(id, { isSend: true }, { new: true });
        if (!Order)
            return res.status(400).json({ title: "error cannot find order to update", message: "missing id" });
        res.json(Order);
    }
    catch (er) {
        return res.status(400).json({ title: "error cannot update the order", message: er.message });
    }
}