const User = require("../models/User");
const fs = require("fs");

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

exports.uploadPhoto = async (req,res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const { avatar } = req.files;

    switch (true) {
      case avatar && avatar.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is Required and should be less than 1mb" });
    }

    user.avatar.data = fs.readFileSync(avatar.path);
    user.avatar.contentType = avatar.type;
    await user.save();

    res.status(200).json({ success: true, message: "Avatar uploaded successfully" });
  } catch (error) {
    console.log("esi")
    console.error("Error uploading avatar:", error);
    res.status(500).json({ success: false, message: "Avatar upload failed" });
  }
}

exports.getAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("avatar");
    if (user.avatar.data) {
      res.set("Content-type", user.avatar.contentType);
      return res.status(200).send(user.avatar.data);
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