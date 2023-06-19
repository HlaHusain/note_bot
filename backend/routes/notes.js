var express = require("express");
var router = express.Router();
const notes = require("../model/noteModel");
const noteController = require("../controllers/noteController");

//Registering notes route:
router.get("/", noteController.getNotes);
router.get("/:user_id", noteController.getNoteByUserId);
router.post("/", noteController.createNote);

module.exports = router;