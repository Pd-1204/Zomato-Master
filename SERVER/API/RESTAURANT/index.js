import express from "express";
import { RestaurantModel } from "../../Database/allModels";
import { ValidateRestaurantId } from "../../VALIDATION/food";
import { ValidateRestaurantCity, ValidateRestaurantSearchString } from "../../VALIDATION/restaurant";
const Router = express.Router();

/* 
Route        /
des          get all the restaurant details 
params       None
access       public
method       get
*/

Router.get("/", async(req, res)=>{
    try {
        await ValidateRestaurantCity(req.query);
        const {city} = req.query;
        const restaurants = await RestaurantModel.find({city});
        return res.json({restaurants});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/* 
Route        /
des          get particular rest details based on id 
params       _id
access       public
method       GET
*/

Router.get("/:_id", async(req, res)=>{
    try {
        await ValidateRestaurantId(req.params);
        const {city} = req.params;
        const restaurant = await RestaurantModel.findOne({_id});
        return res.json({restaurant});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/* 
Route        /search
des          get particular restaurant 
params       searchString
access       public
method       get
*/

Router.get("/search", async(req, res)=>{
    try {
        await ValidateRestaurantSearchString(req.body);
        const {searchString} = req.body;
        const restaurants = await RestaurantModel.find({
            name: {$regex : searchString, $options: "i"}
        });
        return res.json({restaurants});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

export default Router;
