var express = require("express");
var router = express.Router();
const insert = require("../model/dbInsert");
/* GET users listing. */
router.get("/", function (req, res, next) {
  insert()
});

module.exports = router;
