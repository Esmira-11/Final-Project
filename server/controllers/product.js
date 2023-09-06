const Product = require("../models/Product");
const User = require("../models/User");
const slugify = require("slugify");
const fs = require("fs");

exports.createProduct = async (req, res) => {
  try {
    const { name, slug, description, price, category, petcategory, size } =
      req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !petcategory:
        return res.status(500).send({ error: "PetCategory is Required" });
      case !size:
        return res.status(500).send({ error: "Size is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is Required and should be less than 1mb" });
    }
    const products = new Product({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .populate("petcategory", "name")
      .select("-photo")
      .select("-comments.user")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "AllProducts",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error: error.message,
    });
  }
};

exports.getProductBySlug = async (req,res) => {
  try {
    const product = await Product
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .select("-comments")
      .populate("category")
      .populate("petcategory", "name");
      

    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
}

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .select("-photo")
      .select("-comments")
      .populate("category")
      .populate("petcategory", "name");
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
};

exports.getProductPhoto = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id).select("-photo");
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
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, slug, description, price, category, petcategory, size } =
      req.fields;
    const { photo } = req.files;
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !petcategory:
        return res.status(500).send({ error: "PetCategory is Required" });
      case !size:
        return res.status(500).send({ error: "Size is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is Required and should be less than 1mb" });
    }
    const products = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating product",
    });
  }
};

exports.productFilters = async (req, res) => {
  try {
    const { checked, radio, petCategories, sorting } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    if (petCategories.length > 0) args.petcategory = petCategories;

     let sortOptions = {};

     if (sorting === "lowToHigh") {
       sortOptions = { price: 1 }; 
     } else if (sorting === "highToLow") {
       sortOptions = { price: -1 }; 
     }

    const products = await Product.find(args).sort(sortOptions);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while filtering products",
      error,
    });
  }
};

exports.productCount = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

exports.productList = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await Product.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

      res.status(200).send({
        success:true,
        products,
      })
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in per page ctrl",
      error,
    });
  }
};

exports.search = async (req,res) => {
  try {
    const {keyword} = req.params
    const results = await Product
    .find({
      $or:[
        {name:{$regex : keyword, $options: "i"}},
        {description:{$regex : keyword, $options: "i"}}
      ]
    }).select("-photo");
    res.json(results)
  } catch (error) {
    console.error(error)
    res.status(400).send({
      success:false,
      message:'Error In Search Product API',
      error
    })
  }
}

exports.relatedProduct = async (req,res) => {
  try {
    const {pid,cid} = req.params
    // console.log(pid,cid)
    const products = await Product.find({
      category:cid,
      _id: {$ne:pid}
    }).select("-photo").limit(3).populate("category").populate("petcategory", "name");
    res.status(200).send({
      success:true,
      products
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      success:false,
      message:'Error while getting related products',
      error
    })
  }
}

exports.addCommentAndRating = async (req, res) => {
  try {
      const { productId, text, rating } = req.body;

      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).send({
          success: false,
          message: "product not found",
        });
      }

      const newComment = {
        user: {
          id: user._id,
          username: user.username,
          avatar: {
            data: user.avatar.data.toString('base64'),
            contentType: user.avatar.contentType,
          },
        },
        text,
        rating,
      };

      product.comments.push(newComment);

      const totalRating = product.comments.reduce((acc, comment) => acc + comment.rating, 0);
      product.averageRating = totalRating / product.comments.length;

      await product.save();

      res.status(201).send({
          success: true,
          message: "Comment and rating added successfully",
          comment: newComment,
      });
  } catch (error) {
      console.log(error);
      res.status(500).send({
          success: false,
          error,
          message: "Error in adding comment and rating",
      });
  }
};

exports.getCommentsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId)
      .select('comments')
      // .populate({
      //   path: 'comments.user',
      //   select: 'username avatar',
      // });

    if (!product) {
      return res.status(404).send({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).send({
      success: true,
      message: 'Comments by Product ID',
      comments: product.comments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in getting comments by Product ID',
      error: error.message,
    });
  }
}