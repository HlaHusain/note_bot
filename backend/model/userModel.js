const mongoose = require("./dbconnection.js");
// Initialize parameters
const collectionName_users = process.env.DB_COLLECTION_USERS;

//define structure of the documents in a collection
const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  study_field: {
    type: String,
    required: true,
  },
  notes: [{ 
    type: mongoose.Types.ObjectId,
    ref:'Note'
  }],
});

const userModel = mongoose.model(collectionName_users, userSchema);

module.exports = userModel;
