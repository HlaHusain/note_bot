var express = require("express");
var router = express.Router();
const noteController = require("../controllers/noteController");

//Registering notes route
// the rest of the path , pointer to the function from noteController
router.get('/user/:user_id', noteController.getNoteByUserId);
router.post('/', noteController.createNote);
router.patch('/:note_id', noteController.updateNote);
router.delete('/:user_id/:course_id/:note_id', noteController.deleteNote);
router.get('/users/:user_id/courses/:course_id/notes', noteController.getNotesByUserIdAndCourseId);
router.get('/course/:keyword', noteController.getNotesByCourseTitle);
router.get('/test', noteController.getNotes);

//export the router 
module.exports = router;