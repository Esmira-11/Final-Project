const Category = require("../models/Category");
const slugify = require('slugify')

exports.createCategory = async (req, res) => {
    try {
        const {name} = req.body;
        if(!name){
            return res.status(401).send({ message: "Name is required" });
        }
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
              success: true,
              message: "Category Already Exisits",
            });
        }
        const category = await new Category({
            name,
            slug: slugify(name),
        }).save();
        res.status(201).send({
            success: true,
            message: "Category created",
            category,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Category'
        })
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await Category.findByIdAndUpdate(
          id,
          { name, slug: slugify(name) },
          { new: true }
        );
        res.status(200).send({
          success: true,
          messsage: "Category Updated Successfully",
          category,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error while updating category",
        });
      }
};

exports.getAllCategory = async (req,res) => {
    try {
        const category = await Category.find({});
        res.status(200).send({
          success: true,
          message: "All Categories List",
          category,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error while getting all categories",
        });
      }
}

exports.getCategoryById = async (req,res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        res.status(200).send({
          success: true,
          message: "Get Single Category SUccessfully",
          category,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error While getting Single Category",
        });
      }
}

exports.deleteCategoryById = async (req,res) => {
    try {
        const { id } = req.params;
        await Category.findByIdAndDelete(id);
        res.status(200).send({
          success: true,
          message: "Category Deleted Successfully",
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error while deleting category",
          error,
        });
      }
}