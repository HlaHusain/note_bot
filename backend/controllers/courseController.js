const courseModel = require('../model/courseModel');
const noteModel = require('../model/noteModel');
const userModel = require('../model/userModel');
const HttpError = require('../model/http-error');
const mongoose = require('mongoose');


//Get notes' courses by user_id 
const getCoursesByUserId = async (req, res, next) => {
    const { user_id } = req.params;
  
    try {
      const user = await userModel.findById(user_id).populate({
        path: 'notes',
        populate: { path: 'course_id' } // Populate the course reference for each note
      });
  
      if (!user) {
        return res.status(404).json({ message: "Could not find user for the provided id." });
      }
  
      // Get unique course IDs from the user's notes
      const courseIds = Array.from(new Set(user.notes.map(note => note.course_id)));
  
      // Fetch the courses based on the unique course IDs
      const courses = await courseModel.find({ _id: { $in: courseIds } });
  
      res.json({ courses });
    } catch (err) {
      const error = new HttpError('An error occurred while fetching notes.', 500);
      return next(error);
    }
  };
  

    //create a new course with empty notes
    const createCourseWithEmptyNotes = async (req, res, next) => {
        const { title } = req.body;
      
        try {
          // Input validation
          if (!title) {
            return res.status(400).json({ message: "Invalid course data." });
          }
      
          const session = await mongoose.startSession();
          session.startTransaction();
      
          try {
            const createdCourse = new courseModel({
              title,
              notes: [] // Empty notes array
            });
      
            await createdCourse.save({ session });
      
            await session.commitTransaction();
      
            res.status(201).json({ message: "Course created!", course: createdCourse });
          } catch (error) {
            await session.abortTransaction();
            throw error;
          } finally {
            session.endSession();
          }
        } catch (err) {
          const error = new HttpError('Creating course failed, please try again later.', 500);
          return next(error);
        }
      };
      

    //create a new course for existing notes
      const createCourseWithNotes = async (req, res, next) => {
        const { title, noteIds } = req.body;
      
        try {
          // Input validation
          if (!title || !Array.isArray(noteIds)) {
            return res.status(400).json({ message: "Invalid course data." });
          }
      
          const session = await mongoose.startSession();
          session.startTransaction();
      
          try {
            const createdCourse = new courseModel({
              title,
              notes: noteIds // Assign the array of note IDs to the notes field
            });
      
            await createdCourse.save({ session });
      
            // Associate the course with the existing notes
            await noteModel.updateMany(
              { _id: { $in: noteIds } },
              { $set: { course_id: createdCourse._id } },
              { session }
            );
      
            await session.commitTransaction();
      
            res.status(201).json({ message: "Course created!", course: createdCourse });
          } catch (error) {
            await session.abortTransaction();
            throw error;
          } finally {
            session.endSession();
          }
        } catch (err) {
          const error = new HttpError('Creating course failed, please try again later.', 500);
          return next(error);
        }
      };
      

    //update a course
    const updateCourse = async (req, res, next) => {
        const { course_id } = req.params;
        const { title } = req.body;
      
        try {
          const course = await courseModel.findById(course_id);
      
          if (!course) {
            return res.status(404).json({ message: "Could not find course for the provided id." });
          }
      
          course.title = title; // Update the course title
      
          await course.save();
      
          res.status(200).json({ message: "Course updated!", course });
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: "An error occurred." });
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
              return res.status(404).json({ message: "Could not find course for the provided id." });
            }
      
            const noteIds = course.notes;
      
            // Delete the course and its associated notes
            await Promise.all([
              courseModel.findByIdAndDelete(course_id, { session }), // Delete the course
              noteModel.deleteMany({ _id: { $in: noteIds } }, { session }) // Delete the associated notes
            ]);
      
            await session.commitTransaction();
      
            res.status(200).json({ message: "Course and associated notes deleted." });
          } catch (error) {
            await session.abortTransaction();
            throw error;
          } finally {
            session.endSession();
          }
        } catch (err) {
          const error = new HttpError('Deleting course failed, please try again later.', 500);
          return next(error);
        }
      };

      

    exports.getCoursesByUserId = getCoursesByUserId;
    exports.createCourseWithEmptyNotes = createCourseWithEmptyNotes;
    exports.createCourseWithNotes = createCourseWithNotes;
    exports.updateCourse = updateCourse;
    exports.deleteCourseWithNotes = deleteCourseWithNotes;
