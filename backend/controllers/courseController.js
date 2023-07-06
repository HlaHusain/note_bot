const courseModel = require("../model/courseModel");
const noteModel = require("../model/noteModel");
const userModel = require("../model/userModel");
const HttpError = require("../model/http-error");
const mongoose = require("mongoose");
const { json } = require("body-parser");

//get all courses : test
const getAllCourses = async (req, res, next) => {
  try {
    const courses = await courseModel.find();
    res.json({
      courses: courses.map((course) => course.toObject({ getters: true })),
    });
  } catch (err) {
    const error = new HttpError(
      "Fetching courses failed, please try again later.",
      500
    );
    return next(error);
  }
};

//Get courses by user_id
const getCoursesByUserId = async (req, res, next) =>{
  const { user_id } = req.params;

  try {
    const user = await userModel.findById(user_id).populate("courses");

    if (!user) {
      return res
        .status(404)
        .json({ message: "Could not find user for the provided user id." });
    }

    res.json({
      courses: user.courses.map((course) => course.toObject({ getters: true })),
    });
  } catch (err) {
    const error = new HttpError(
      "An error occurred while fetching courses.",
      500
    );
    return next(error);
  }
};

//Create a new course
const createCourse = async (req, res, next) => {
  const { user_id, title } = req.body;
  let session; // Declare the session variable

  try {
    // Start a Mongoose session
    session = await mongoose.startSession();
    session.startTransaction();

    // Create the course
    const createdCourse = await courseModel.create([{ user_id, title }], { session });

    // Assign the course to the user
    await userModel.findByIdAndUpdate(
      user_id,
      { $push: { courses: createdCourse[0]._id } },
      { session }
    );

    // Commit the transaction
    await session.commitTransaction();

    res.status(201).json({ course: createdCourse[0] });
  } catch (error) {
    // Abort the transaction and roll back changes
    if (session) {
      await session.abortTransaction();
    }

    const httpError = new HttpError(
      `An error occurred while creating the course: ${error.message}`,
      500
    );
    return next(httpError);
  } finally {
    // End the session
    if (session) {
      session.endSession();
    }
  }
};

//delete course and its notes
const deleteCourseWithNotes = async (req, res, next) => {
  const { course_id } = req.params;
  
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const course = await courseModel.findById(course_id);

      if (!course) {
        return res
          .status(404)
          .json({ message: "Could not find course for the provided id." });
      }

      const noteIds = course.notes;

      // Delete the course and its associated notes
      await Promise.all([
        courseModel.findByIdAndDelete(course_id, { session }), // Delete the course
        noteModel.deleteMany({ _id: { $in: noteIds } }, { session }), // Delete the associated notes
      ]);

      await session.commitTransaction();

      res.status(200).json({ message: "Course and associated notes deleted." });
    } catch (error) {
      await session.abortTransaction();
      const httpError = new HttpError(
        `An error occurred while deleting the course: ${error.message}`,
        500
      );
      return next(httpError);
    } finally {
      session.endSession();
    }
  } catch (err) {
    const error = new HttpError(
      "Deleting course failed, please try again later.",
      500
    );
    return next(error);
  }
};


exports.getAllCourses = getAllCourses;
exports.getCoursesByUserId = getCoursesByUserId;
exports.deleteCourseWithNotes = deleteCourseWithNotes;
exports.createCourse = createCourse;

