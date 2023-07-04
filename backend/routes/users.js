var express = require("express");
var router = express.Router();
const multer = require("multer");
const uuid = require("uuid");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads/");
    },
    filename: function (req, file, cb) {
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      cb(null, uuid.v4() + "-" + Date.now() + "." + extension);
    },
  }),
});
const usersController = require("../controllers/usersController");
const checkAuth = require("../middleware/check-auth");
// const insert = require("../model/dbInsert");
/* GET users listing. register route */

router.post("/signup", usersController.signup);
router.post("/login", usersController.login);
router.post("/upload", upload.single("file"), usersController.uploadFile);

//pass the middellware function  , any routes after this check will be reatched with valid token
//router.use(checkAuth)
router.get("/", usersController.getUsers);

module.exports = router;
