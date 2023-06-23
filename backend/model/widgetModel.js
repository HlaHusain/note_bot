const mongoose = require("./dbconnection.js");
const WIDGET_TYPES = require("./widgetTypes");
// Initialize parameters
const collectionName_widgets = process.env.DB_COLLECTION_WIDGETS;



//define structure of the documents in a collection
const widgetSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [WIDGET_TYPES.TEXT, WIDGET_TYPES.VIDEO, WIDGET_TYPES.PDF],
    default: 1,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  section_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Section",
  },
});

const widgetModel = mongoose.model(collectionName_widgets, widgetSchema);

module.exports = widgetModel;
