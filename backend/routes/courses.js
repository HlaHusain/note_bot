var express = require("express");
var router = express.Router();
var courseController = require("../controllers/courseController");

//Registering courses route
// the rest of the path , pointer to the function from courseController
router.get('/user/:user_id', courseController.getCoursesByUserId); // Courses page (Grid view): when click on Courses in the Dashboard page
router.post('/', courseController.createCourseWithEmptyNotes); // AddCourse button in the Dashboard page
router.post('/notes', courseController.createCourseWithNotes); // SaveNote button in the NoteDetails page
router.patch('/:course_id', courseController.updateCourse); // Clicking on the edit icon in the Courses page
router.delete('/:course_id', courseController.deleteCourseWithNotes); // Clicking on the delete icon in the Courses page



//export the router
module.exports = router;


