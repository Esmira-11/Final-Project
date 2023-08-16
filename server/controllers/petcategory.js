const PetCategory = require('../models/PetCategory');
const slugify = require('slugify')
const fs = require('fs')

exports.createPetCategory = async (req,res) => {
    try {
        const {name, slug} = req.fields;
        const {photo} = req.files
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is Required'})
            case photo && photo.size>1000000:
                return res.status(500).send({error:'Photo is Required and should be less than 1mb'})
        }
        const petCategory = new PetCategory({...req.fields, slug:slugify(name)})
        if(photo){
            petCategory.photo.data = fs.readFileSync(photo.path)
            petCategory.photo.contentType = photo.type
        }
        await petCategory.save()
        res.status(201).send({
            success:true,
            message: 'PetCategory Created Successfully',
            petCategory,
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in creating PetCategory'
        })
    }
}

exports.updatePetCategory = async (req,res) => {
    try {
        const {name, slug} = req.fields;
        const {photo} = req.files
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is Required'})
            case photo && photo.size>1000000:
                return res.status(500).send({error:'Photo is Required and should be less than 1mb'})
            
        }
        const petCategory = await PetCategory.findByIdAndUpdate(req.params.id,
            {...req.fields, slug: slugify(name)},
            {new: true}
            )
        if(photo){
            petCategory.photo.data = fs.readFileSync(photo.path)
            petCategory.photo.contentType = photo.type
        }
        await petCategory.save()
        res.status(201).send({
            success:true,
            message: 'PetCategory Updated Successfully',
            petCategory,
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in updating PetCategory'
        })
    }
}

exports.getAllPetCategory = async (req,res) => {
    try {
        const petCategory = await PetCategory
        .find({})
        .select("-photo")
        .limit(12)
        .sort({createdAt: -1 });
        res.status(200).send({
            success:true,
            counTotal:petCategory.length,
            message: 'AllPetCategory',
            petCategory,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in getting petCategory',
            error: error.message
        })
    }
}

exports.getPetCategoryById = async (req,res) => {
    try {
        const { id } = req.params;
        const petCategory = await PetCategory
        .findById(id)
        .select("-photo")
        res.status(200).send({
          success: true,
          message: "Get Single petCategory Successfully",
          petCategory,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error While getting Single petCategory",
        });
      }
}

exports.getPetCategoryPhoto = async (req,res) => {
    try {
        const petCategory = await PetCategory.findById(req.params.id).select("photo")
        if(petCategory.photo.data){
            res.set('Content-type', petCategory.photo.contentType)
            return res.status(200).send(petCategory.photo.data)
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

exports.deletePetCategoryById = async(req,res) => {
    try {
        const { id } = req.params;
        await PetCategory
        .findByIdAndDelete(id)
        .select("-photo");
        res.status(200).send({
          success: true,
          message: "PetCategory Deleted Successfully",
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error while deleting PetCategory",
          error,
        });
      }
}