var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
const HttpError = require("./model/http-error");
var cors = require("cors");

require("dotenv").config();

//import the routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
// var fillRouter = require("./routes/fillDB");
var notesRouter = require("./routes/notes");
var coursesRouter = require("./routes/courses");
var sectionsRouter = require("./routes/sections");
var widgetsRouter = require("./routes/widgets");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Set Access-Control-Allow-Origin and other headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin , X-Requested-with ,Content-Type ,Accept , Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");

  next();
});

app.use(cors({ credentials: true }));
app.options("*", cors());

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'");
  next();
});

app.use(bodyParser.json()); // support json encoded bodies

//midellware , initial route filter of paths: ex, '/users','/notes'..
app.use("/users", usersRouter);
app.use(require("./middleware/check-auth"));
app.use("/", indexRouter);
// app.use("/fill", fillRouter);
app.use("/notes", notesRouter);
app.use("/courses", coursesRouter);
app.use("/sections", sectionsRouter);
app.use("/widgets", widgetsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

// error handler , if we have an error in the app , this will be executed
app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  // set locals, only providing error in development
  res.status(err.status || 500);
  res.json({ message: err.message || "An unkown error occured!" });
});

module.exports = app;
