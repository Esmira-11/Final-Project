const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema(
    {
      type: {
        type: String,
        enum: ['found', 'question'], // 'found' for found pets, 'question' for user questions
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      // Location, contactInfo, and photos are conditional fields
      location: {
        type: String,
        required: function () {
          return this.type === 'found'; // Required only for 'found' announcements
        },
      },
      contactInfo: {
        type: String,
        required: function () {
          return this.type === 'found'; // Required only for 'found' announcements
        },
      },
      photos: {
        data:Buffer,
        contentType:String,
        required: function () {
          return this.type === 'found'; // Required only for 'found' announcements
        },
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user who submitted the announcement
      },
    //   likes: [
    //     {
    //       user: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'User', // Reference to the user who liked the announcement
    //       },
    //     },
    //   ],
      comments: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the user who made the comment
          },
          text: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
    { timestamps: true }
  );

const Announcement = mongoose.model('Announcement', AnnouncementSchema);

module.exports = Announcement;