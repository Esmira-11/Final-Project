const Announcement = require("../models/Announcement");

exports.createQuestion = async (req, res) => {
    try {
        const { description } = req.body;
        const announcement = new Announcement({
          type: 'question',
          description ,
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
}
