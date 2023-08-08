var express = require("express");
var router = express.Router();
const noteController = require("../controllers/noteController");

 
//Registering notes route
router.get('/:note_id/widgets', noteController.getNoteWidgets); // Grid view SavedNotes page
// the rest of the path , pointer to the function from noteController
router.get('/user/:user_id', noteController.getNoteByUserId); //Grid view of the Dashboard page
router.post('/', noteController.createNote); // AddNote button in the Dashboard page
router.patch('/:note_id', noteController.updateNote); // Clicking on a note in the Dashboard page

router.delete('/:user_id/:course_id/:note_id', noteController.deleteNote); // Clicking on the delete button in the NoteDetails page
router.get('/users/:user_id/courses/:course_id/notes', noteController.getNotesByUserIdAndCourseId); // Show more link in the Dashboard page
router.get('/search/:keyword', noteController.getNotesByCourseTitle); // Search bar in the Dashboard page

router.get('/users/:user_id/savednotes', noteController.getSavedNotesByUserId); // Grid view SavedNotes page


router.post('/users/:user_id/notes/:note_id/save', noteController.saveNote); // Clicking on the save button in the Search page
router.post('/update_rating', noteController.updateRating);
router.patch('/push_sections', noteController.pushSectionsToNote);

router.get('/note/:note_id', noteController.getNoteByNoteID); // Clicking on a note in the Dashboard page
// test route
// router.get('/test', noteController.getNotes);

//export the router 
module.exports = router;