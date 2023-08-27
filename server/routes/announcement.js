const express = require('express');
const formidable = require('express-formidable')
const { requireSignIn} = require('../middleware/authMiddleware.js');
const { createQuestion, createAnnouncement, getAllAnnouncement, getAnnouncementPhoto } = require('../controllers/announcement');

const router = express.Router();

router.route("/create-question").post(requireSignIn,  createQuestion);
router.route("/create-announcement").post(requireSignIn,formidable(),  createAnnouncement);
router.route("/all-announcement").get(getAllAnnouncement);
router.route("/announcement-photo/:id").get(getAnnouncementPhoto);


module.exports = router;