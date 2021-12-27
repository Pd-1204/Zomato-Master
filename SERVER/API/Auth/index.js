import express from "express";
import bcrypt from "bcryptjs";

//models
import { UserModel } from "../../Database/user";


//validations
import { ValidateSignUp, ValidateSignIn } from "../../VALIDATION/auth";
import { async } from "regenerator-runtime";

const Router = express.Router();

/* 
Route           signup
des             signup using email and password
params          none
access          public
method          POST
*/

Router.post("/signup", async(req, res)=>{
    try {
        await ValidateSignUp(req.body.credentials);
        const {email, password, fullname, phoneNumber} = req.body.credentials;

        const checkUserByEmail = await UserModel.findOne({email});
        const checkUserByPhone = await UserModel.findOne({phoneNumber});

        if(checkUserByEmail || checkUserByPhone){
            return res.json({error: "User already Exists!!"});
        }

    //hashing the password
        const bcryptSalt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password, bcryptSalt);
    
    //save to DB
    await UserModel.create({
        ...req.body.credentials,
        password: hashedPassword
    });

    //jwt token
        const token = jwt.sign({user:{fullname, email}}, "ZomatoApp")
    
        return res.status(200).json({token, status:"Success"});
    } catch (error) {
        return res.status(500).json({error:console.error(message)});
    }
});

//signin api
/* 
Route           signin
des             signin using email and password
params          none
access          public
method          POST
*/

Router.post("/signin", async(req,res)=>{
    try {
        await ValidateSignIn(req.body.credentials);
        const user = await UserModel.findByEmailAndPassword(
            req.body.credentials
        )
        const token = user.generateJwtToken();
        return res.status(200).json({token, status:"Success"});
    } catch (error) {
        return res.status(500).json({error:console.error(message)});
    }
})