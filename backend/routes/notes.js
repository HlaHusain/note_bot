var express = require("express");
var router = express.Router();
const noteController = require("../controllers/noteController");

//Registering notes route
// the rest of the path , pointer to the function from noteController
//router.get("/", noteController.getNotes);
router.get('/:user_id', noteController.getNoteByUserId);
router.post('/', noteController.createNote);
router.patch('/:note_id', noteController.updateNote);
router.delete('/:note_id', noteController.deleteNote);
router.get('/public/:course_id', noteController.getPublicNotesByCourseId);

//export the router 
module.exports = router;