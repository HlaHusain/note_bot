const mongoose = require("./dbconnection.js");
// Initialize parameters
const collectionName_sections = 'sections';
//define structure of the documents in a collection
const sectionSchema = new mongoose.Schema({

    layout_field: {
    type: String,
    enum:[1,2,3,4,5,6,7,8],
    default:1,
    required: true,
  },
  note_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref:'notes'
  },
  widgets: [{
    type: mongoose.Types.ObjectId,
    ref:'widgets'
  }],
});

const sectionModel = mongoose.model(collectionName_sections, sectionSchema);

module.exports = sectionModel;
