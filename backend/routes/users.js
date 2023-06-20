var express = require("express");
var router = express.Router();
const usersController = require('../controllers/usersController')
const checkAuth = require('../middleware/check-auth')
// const insert = require("../model/dbInsert");
/* GET users listing. register route */


router.post("/signup", usersController.signup);
router.post("/login", usersController.login);

//pass the middellware function  , any routes after this check will be reatched with valid token
router.use(checkAuth)
router.get("/", usersController.getUsers);


module.exports = router;
