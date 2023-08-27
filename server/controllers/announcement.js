const Announcement = require("../models/Announcement");
const User = require("../models/User")
const fs = require("fs");

exports.createQuestion = async (req, res) => {
  try {
    const { description } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const announcement = new Announcement({
      type: "question",
      description,
      user: {
        id: user._id,
        username: user.username,
        // avatar: user.avatar
      },
    });

    await announcement.save();
    res.status(201).send({
      success: true,
      message: "Announcement Created Successfully",
      announcement,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating announcement",
    });
  }
};

exports.createAnnouncement = async (req, res) => {
  try {
    const { location, description, contactInfo } = req.fields;
    const { photo } = req.files;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    switch (true) {
      case !location:
        return res.status(500).send({ error: "Location is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !contactInfo:
        return res.status(500).send({ error: "ContactInfo is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is Required and should be less than 1mb" });
    }
    const announcements = new Announcement({ ...req.fields,type: "found",user: {
      id: user._id,
      username: user.username,
      // avatar: user.avatar
    }, });
    if (photo) {
      announcements.photo.data = fs.readFileSync(photo.path);
      announcements.photo.contentType = photo.type;
    }
    await announcements.save();
    res.status(201).send({
      success: true,
      message: "Announcement Created Successfully",
      announcements,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating announcement",
    });
  }
};

exports.getAllAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.find({})
    .select("-photo")
    .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: announcement.length,
      message: "AllAnnouncement",
      announcement,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting announcement",
      error: error.message,
    });
  }
  

}

exports.getAnnouncementPhoto = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id).select("photo");
    if (announcement.photo.data) {
      res.set("Content-type", announcement.photo.contentType);
      return res.status(200).send(announcement.photo.data);
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

exports.deleteAnnouncementById = async (req, res) => {
  try {
    const { id } = req.params;
    await Announcement.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Announcement Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting announcement",
      error,
    });
  }
}