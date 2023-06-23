const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

//Registering courses route
// the rest of the path , pointer to the function from courseController
router.get('/user/:user_id', courseController.getCoursesByUserId);
router.post('/', courseController.createCourse);
//router.delete('/:course_id', courseController.deleteCourse);



//export the router
module.exports = router;


