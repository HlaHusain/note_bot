const mongoose = require("./dbconnection.js");
// Initialize parameters
const collectionName_notes = 'notes';

//define structure of the documents in a collection
const noteSchema = new mongoose.Schema({

  archive_from_id: {
    type: String,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref:'users'
  },
  title: {
    type: String,
    required: true,
  },
  avg_rate: {
    type: String,
    required: false,
  },
  isPublic: {
    type: Boolean,
    required: true,
  },
  course_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref:'courses'
  },
  sections: [{
    type: mongoose.Types.ObjectId,
    ref:'sections'
  }],
  saved_by: [{
    type: mongoose.Types.ObjectId,
    ref: 'users'
  }],
  ratings: [
    {
      userId: { type: mongoose.Types.ObjectId, ref: "users" },
      rating: { type: Number, min: 1, max: 5, required: true },
    },
  ],
},
{ timestamps: true }
);

const noteModel = mongoose.model(collectionName_notes, noteSchema);

module.exports = noteModel;
