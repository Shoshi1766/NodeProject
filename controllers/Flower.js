import {FlowerModel} from '../models/Flower.js';

export const getAllFlowers = async (req,res) => {
    try {
        let data = await FlowerModel.find();
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
        let { name, price, flowerContain } = req.body;
        if (!name || !price || !flowerContain || flowerContain.length == 0)
            return res.status(400).json({ title: "erorr cannot add flower", message: "missing requierd fileds" });
        if (price < 0 || price > 10000)
            return res.status(400).json({ title: "erorr cannot add flower", message: "requierd price" });
        let Flower = new FlowerModel(req.body);
        await Flower.save();
        return res.json(Flower);

    }
    catch (er) {
        res.status(400).json({ title: "error cannot add flower", message: er.message });
    }
}

export const deleteFlowerById = async (req, res) => {
    let { id } = req.params;
    try {
        let Flower = await FlowerModel.findByIdAndDelete(id);
        if (!Flower)
            return res.status(400).json({ title: "error cannot find flower to delete", message: "missing id of flower"})
        res.json(Flower)
    }
    catch (er) {
        return res.status(400).json({ title: "error cannot find flower to delete", message: er.message });
    }
}

export const updateFlowerById = async (req, res) => {
    let { id } = req.params;
    let {name,price,flowerContain}=req.body;
    try {
        if(!name|| !price || !flowerContain || flowerContain.length == 0)
            return res.status(400).json({title:"cannot update flower", message:"missing flower details"})
        let Flower = await FlowerModel.findByIdAndUpdate(id,req.body,{new:true});
        if (!Flower)
            return res.status(400).json({ title: "error cannot find flower to delete", message: "missing id of flower" })
        res.json(Flower)
    }
    catch (er) {
        return res.status(400).json({ title: "error cannot update the flower",message:er.message});
    }
}