const mongoose = require('mongoose');
const PetCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique:true,
    },
    slug:{
        type:String,
        lowercase:true
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    },
    {timestamps:true}
);

const PetCategory = mongoose.model("PetCategory", PetCategorySchema);

module.exports = PetCategory;
