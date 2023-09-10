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
    comments: [
        {
          user: {
            id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User', 
              required: true,
            },
            username: {
              type: String,
              required: true,
            },
            avatar: {
              data:String,
              contentType:String,
            },
          },
          rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
          },
          text: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    averageRating: {
        type: Number,
        default: 0,
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