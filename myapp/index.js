var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("home");
});
/* GET services page */
router.get("/services", function (req, res, next) {
  res.render("services");
});
/* GET contact page. */
router.get("/contact", function (req, res, next) {
  res.render("contact");
});
module.exports = router;