import { Mongoose } from "mongoose";

const UserSchema = new Mongoose.Schema({
    fullname: {type: String, required: true},
    email:{type: String, required: true},
    password :{type:String},
    address:[{detail:{type:String}, for:{type: String}}],
    phoneNumber: [{type:Number}]
});

export const UserModel = Mongoose.UserModel("Users", UserSchema);