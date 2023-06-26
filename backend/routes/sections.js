const sectionController = require('../controllers/sectionController');
const express = require('express');
const router = express.Router();

//Registering sections route
// the rest of the path , pointer to the function from sectionController
router.get('/note/:note_id', sectionController.getSectionsByNoteId);
router.post('/', sectionController.createSection);
router.patch('/:section_id', sectionController.updateSection);
router.patch('/note/:note_id', sectionController.addSectionToNote);
router.patch('/:section_id/widgets', sectionController.updateSectionWidgets);
router.delete('/:note_id/:section_id', sectionController.deleteSection);

//export the router
module.exports = router;