var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// request time logger
const myLogger = function (req, res, next) {
  const date = new Date();
  const day = date.toDateString().substring(0, 3);
  const time = date.toTimeString().substring(0, 2);
  if (day === "Sat" || day === "Sat" || time >= 17|| time < 9) {
    next(createError(401));
  } else {
    next();
  }
};

var indexRouter = require("./routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(myLogger);

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (res.statusCode === 401)
    res.render("error", {
      errorMessage:
        "sorry our web application is only available in working time (Monday to Friday,  from 9 to 17) ",
    });
  else {
    res.render("error");
  }
});
module.exports = app;