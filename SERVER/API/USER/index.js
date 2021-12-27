import express from "express";

import { UserModel } from "../../Database/allModels";

const Router = express.Router();

/* 
Route        /
des          get an user data 
params       _id
access       public
method       GET
*/

Router.get("/:_id", async(req, res)=>{
    try {
        const{_id} = req.params;
        const getUser = await UserModel.findById(_id);
        return res.json({user: getUser});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});


/* 
Route        /update
des          update an user data 
params       userid
access       public
method       put
*/

Router.put("/update/:_userId", async(req, res)=>{
    try {
        const {userId} = req.params;
        const {userData} = req.body;
        const updateUserData = await UserModel.findByIdAndUpdate(
            userId,
            {
                $set: userData
            },
            {new: true}
        );
        return res.json({user: updateUserData});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

export default Router;
