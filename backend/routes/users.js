var express = require("express");
var router = express.Router();
const usersController = require('../controllers/usersController')
// const insert = require("../model/dbInsert");
/* GET users listing. register route */

router.get("/", usersController.getUsers);
router.post("/signup", usersController.signup);
router.post("/login", usersController.login);

module.exports = router;
