import express from "express";
import { FoodModel } from "../../Database/allModels";
import { ValidateCategory, ValidateRestaurantId } from "../../VALIDATION/food";
const Router = express.Router();

/* 
Route        /
des          get all the foods based on particular rest
params       _id
access       public
method       get
*/

Router.get("/:_id" , async(req,res)=>{
    try {
        await ValidateRestaurantId(req.params);
        const {_id} = req.params;
        const foods = await FoodModel.find({restaurant: _id});
        return res.json({foods});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/* 
Route        /r
des          get all the foods based on particular category
params       category
access       public
method       get
*/

Router.get("/r/:category", async(req,res)=>{
    try {
        await ValidateCategory(req.params);
        const {category} = req.params;
        const foods = await FoodModel.find({
            category: {$regex: category, $options: "i"}
        });
        return res.json({foods});
    } catch (error) {
        return res.status(500),json({error: error.message});
    }
});

export default Router;

