const widgetController = require("../controllers/widgetController.js");
const express = require('express');
const router = express.Router();

//Registering widgets route
// the rest of the path , pointer to the function from widgetController
router.get('/section/:section_id', widgetController.getWidgetsBySectionId);
router.patch('/section/:section_id', widgetController.addWidgetToSection);
//router.patch('/:widget_id', widgetController.updateWidget);
//router.delete('/:section_id/:widget_id', widgetController.deleteWidget);

router.post('/', widgetController.createWidget);
//export the router
module.exports = router;