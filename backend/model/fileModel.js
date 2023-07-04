const mongoose = require("./dbconnection.js");
// Initialize parameters
const collectionName_file = "file";

// Define a schema for the file
const fileSchema = new mongoose.Schema({
  filename: String,
  url: String,
  size: Number,
});

const fileModel = mongoose.model(collectionName_file, fileSchema);

module.exports = fileModel;
