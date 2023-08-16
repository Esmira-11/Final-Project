const Product = require("../models/Product")
const slugify = require('slugify')
const fs = require('fs')

exports.createProduct = async (req, res) => {
    try {
        const {name, slug, description, price, category, quantity, shipping} = req.fields;
        const {photo} = req.files
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is Required'})
            case !description:
                return res.status(500).send({error:'Description is Required'})
            case !price:
                return res.status(500).send({error:'Price is Required'})
            case !category:
                return res.status(500).send({error:'Category is Required'})
            case !quantity:
                return res.status(500).send({error:'Quantity is Required'})
            case photo && photo.size>1000000:
                return res.status(500).send({error:'Photo is Required and should be less than 1mb'})
            // case !shipping:
            //     return res.status(500).send({error:'Shipping is Required'})
        }
        const products = new Product({...req.fields, slug:slugify(name)})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message: 'Product Created Successfully',
            products,
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in creating product'
        })
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product
        .find({})
        .populate('category')
        .select("-photo")
        .limit(12)
        .sort({createdAt: -1 });
        res.status(200).send({
            success:true,
            counTotal:products.length,
            message: 'AllProducts',
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in getting products',
            error: error.message
        })
    }
}

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product
        .findById(id)
        .select("-photo")
        .populate("category");
        res.status(200).send({
          success: true,
          message: "Get Single Product Successfully",
          product,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error While getting Single Product",
        });
      }
}

exports.getProductPhoto = async(req,res) => {
    try {
        const product = await Product.findById(req.params.id).select("photo")
        if(product.photo.data){
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error)
        res.status({
            success: false,
            message: "Error while getting photo",
            error
        })
    }
}

exports.deleteProductById = async(req,res) => {
    try {
        const { id } = req.params;
        await Product
        .findByIdAndDelete(id)
        .select("-photo");
        res.status(200).send({
          success: true,
          message: "Product Deleted Successfully",
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error while deleting product",
          error,
        });
      }
}

exports.updateProduct = async(req,res) => {
    try {
        const {name, slug, description, price, category, quantity, shipping} = req.fields;
        const {photo} = req.files
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is Required'})
            case !description:
                return res.status(500).send({error:'Description is Required'})
            case !price:
                return res.status(500).send({error:'Price is Required'})
            case !category:
                return res.status(500).send({error:'Category is Required'})
            case !quantity:
                return res.status(500).send({error:'Quantity is Required'})
            case photo && photo.size>1000000:
                return res.status(500).send({error:'Photo is Required and should be less than 1mb'})
            // case !shipping:
            //     return res.status(500).send({error:'Shipping is Required'})
        }
        const products = await Product.findByIdAndUpdate(req.params.id,
            {...req.fields, slug: slugify(name)},
            {new: true}
            )
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message: 'Product Updated Successfully',
            products,
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in updating product'
        })
    }
}