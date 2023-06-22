const mongoose = require("./dbconnection.js");
// Initialize parameters
const collectionName_notes = process.env.DB_COLLECTION_NOTES;

//define structure of the documents in a collection
const noteSchema = new mongoose.Schema({

  archive_from_id: {
    type: String,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref:'User'
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
    ref:'Course'
  },

});

const noteModel = mongoose.model(collectionName_notes, noteSchema);

module.exports = noteModel;
