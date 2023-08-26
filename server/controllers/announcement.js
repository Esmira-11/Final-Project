const Announcement = require("../models/Announcement");
const fs = require("fs");


exports.createQuestion = async (req, res) => {
  try {
    const { description } = req.body;
    const announcement = new Announcement({
      type: "question",
      description,
      user: req.user.id,
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
    const announcements = new Announcement({ ...req.fields,type: "found",user: req.user.id, });
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
