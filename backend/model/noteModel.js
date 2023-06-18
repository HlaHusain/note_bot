const mongoose = require("./dbconnection.js");
// Initialize parameters
const collectionName_notes = process.env.DB_COLLECTION_NOTES;

//define structure of the documents in a collection
const noteSchema = new mongoose.Schema({

  archive_from_id: {
    type: String,
  },
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  avg_rate: {
    type: String,
    required: true,
  },
  isPublic: {
    type: Boolean,
    required: true,
  },
  course_id: {
    type: String,
    required: true,
  },

});

const noteModel = mongoose.model(collectionName_notes, noteSchema);

module.exports = noteModel;
