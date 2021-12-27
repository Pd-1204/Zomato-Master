import {Mongoose} from "mongoose";

const MenuSchema = new Mongoose.Schema({
  menus: [
    {
      name: {type: String, required: true},
      items: [
        {
          type: Mongoose.Types.ObjectId,
          ref: "Foods"
        }
      ]
    }
  ],
  recommended: [
    {
      type: Mongoose.Types.ObjectId,
      ref: "Foods",
      unique: true
    }
  ]
},
{
  timestamps: true
});

export const MenuModel = Mongoose.Menumodel("Menus", MenuSchema);