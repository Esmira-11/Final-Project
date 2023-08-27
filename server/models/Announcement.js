const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema(
    {
      type: {
        type: String,
        enum: ['found', 'question'], 
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        // required: function () {
        //   return this.type === 'found'; 
        // },
      },
      contactInfo: {
        type: String,
        // required: function () {
        //   return this.type === 'found';
        // },
      },
      photo: {
        data:Buffer,
        contentType:String,
        // required: function () {
        //   return this.type === 'found';
        // },
      },
      user: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User', 
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        // avatar: {
        //   type: String, // Assuming it's a URL to the user's avatar
        // },
      },
    //   likes: [
    //     {
    //       user: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'User', 
    //       },
    //     },
    //   ],
      comments: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
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