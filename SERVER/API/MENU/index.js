import express from "express";
import { MenuModel , ImageModel} from "../../Database/allModels";

const Router = express.Router();

/* 
Route        /list
des          get list of menu based on id 
params       -id
access       public
method       get
*/

Router.get("/list/:_id", async(req, res)=>{
    try {
        const {_id} = req.params;
        const menus = await MenuModel.findOne(_id);
        return res.json({menus});
        
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

/* 
Route        /image
des          get image of menu based on id 
params       _id
access       public
method       get
*/

Router.get("/image/:_id", async(req, res)=>{
    try {
        const {_id} = req.params;
        const menus = await ImageModel.findOne(_id);
        return res.json({menus});
        
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

export default Router;