const mongoose = require("./dbconnection.js");
// Initialize parameters
const collectionName_sections = process.env.DB_COLLECTION_SECTIONS;
//define structure of the documents in a collection
const sectionSchema = new mongoose.Schema({

    layout_field: {
    type: String,
    enum:[1,2,3,4,5,6,7,8],
    default:1,
    required: true,
  },
  note_id: {
    type: String,
    required: true,
  },
});

const sectionModel = mongoose.model(collectionName_sections, sectionSchema);

module.exports = sectionModel;
