const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send({
          success: true,
          message: "All users List",
          users,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error while getting all users",
        });
      }
}


exports.deleteCategoryById = async (req,res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).send({
          success: true,
          message: "User Deleted Successfully",
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error while deleting user",
          error,
        });
      }
}