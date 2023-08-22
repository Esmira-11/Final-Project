const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    slug:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.ObjectId,
        ref:'Category',
        required:true
    },
    petcategory:{
        type:mongoose.ObjectId,
        ref:'PetCategory',
        required:true
    },
    size:{
        type: String,
        enum: ["Small", "Medium", "Large"],
        required:true
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    quantity: { type: Number, default: 1 },
    },
    {timestamps:true}
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;