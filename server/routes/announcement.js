const express = require('express');
const formidable = require('express-formidable')
const { requireSignIn} = require('../middleware/authMiddleware.js');
const { getCommentsByAnnouncementId, createComment, createQuestion, createAnnouncement, getAllAnnouncement, getAnnouncementPhoto, deleteAnnouncementById, getAnnouncementsByUserId, announcementFilters } = require('../controllers/announcement');

const router = express.Router();

router.route("/create-question").post(requireSignIn,  createQuestion);
router.route("/create-announcement").post(requireSignIn,formidable(),  createAnnouncement);
router.route("/all-announcement").get(getAllAnnouncement);
router.route("/announcement-photo/:id").get(getAnnouncementPhoto);
router.route("/delete-announcement/:id").delete(deleteAnnouncementById);
router.route("/user/:userId").get(requireSignIn,getAnnouncementsByUserId);
router.route("/comments/:announcementId").get(requireSignIn,getCommentsByAnnouncementId);
router.route("/announcement-filters").post(announcementFilters);
router.route("/create-comment").post(requireSignIn, createComment);


module.exports = router;