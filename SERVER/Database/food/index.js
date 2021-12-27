import { Timestamp } from "bson";
import { Mongoose } from "mongoose";

const FoodSchema = new Mongoose.FoodSchema({
    name: {type: String , required: true},
    descript:{type:String, required: true},
    isVeg: {type:Boolean, required: true},
    isContainsEgg:{type:Boolean, required:true},
    category:{type:String, required:true},
    photos:{
        type: Mongoose.Types.ObjectId,
        ref:"Images"
    },
    price:{type:Number, default:150,require:true},
    addOns:[{type:Mongoose.Types.ObjectId, ref:"Foods"}],
    restaurant :{
        type:Mongoose.Types.ObjectId,
        ref: "Restaurants",
        required:true
    }
},
{


timestamps:true

});

export const FoodModel = Mongoose.FoodModel("Foods", FoodSchema);