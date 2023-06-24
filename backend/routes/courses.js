var express = require("express");
var router = express.Router();
var courseController = require("../controllers/courseController");

//Registering courses route
// the rest of the path , pointer to the function from courseController
router.get('/user/:user_id', courseController.getCoursesByUserId);
router.post('/', courseController.createCourseWithEmptyNotes);
router.post('/notes', courseController.createCourseWithNotes);
router.patch('/:course_id', courseController.updateCourse);
router.delete('/:course_id', courseController.deleteCourseWithNotes);



//export the router
module.exports = router;


