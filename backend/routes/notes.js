var express = require("express");
var router = express.Router();
const notes = require("../model/noteModel");
const noteController = require("../controllers/noteController");

//Registering notes route
// the rest of the path , pointer to the function from noteController
router.get("/", noteController.getNotes);
router.get("/:user_id", noteController.getNoteByUserId);
router.post("/", noteController.createNote);


//export the router 
module.exports = router;