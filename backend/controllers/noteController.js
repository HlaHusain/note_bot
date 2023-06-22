const noteModel = require('../model/noteModel')
const userModel = require('../model/userModel');
const courseModel = require('../model/courseModel');
const mongoose = require('mongoose');
const HttpError = require('../model/http-error');

// Get all notes by course_id: where isPublic = true
const getPublicNotesByCourseId = async (req, res, next) => {
  const { course_id } = req.params;
  
  try {
    const publicNotesByCourse = await noteModel.find({ isPublic: true, course_id });
    const noteTitles = publicNotesByCourse.map(note => note.title);
    res.json({ notes: noteTitles });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Fetching public notes failed, please try again later." });
  }
};



// Get user notes by user_id
const getNoteByUserId = async (req, res, next) => {
  const { user_id } = req.params;

  try {
    const user = await userModel.findById(user_id).populate('notes');

    if (!user.notes || user.notes.length === 0) {
      return res.status(404).json({ message: "Could not find notes for the provided user id." });
    }

    res.json({ notes: user.notes.map(note => note.toObject({ getters: true })) });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Getting notes failed, please try again later." });
  }
};


// Create a new note
const createNote = async (req, res, next) => {
  const { user_id, title, isPublic, course_id } = req.body;

  try {
    // Input validation
    if (!user_id || !title || !course_id) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const [user, course] = await Promise.all([
      userModel.findById(user_id),
      courseModel.findById(course_id),
    ]);

    // Check if user and course exist
    if (!user) {
      return res.status(404).json({ message: "Could not find user for the provided id." });
    }
    if (!course) {
      return res.status(404).json({ message: "Could not find course for the provided id." });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const createdNote = new noteModel({
        user_id,
        title,
        isPublic,
        course_id,
      });

      await createdNote.save({ session });
      user.notes.push(createdNote);
      course.notes.push(createdNote);

      await Promise.all([user.save({ session }), course.save({ session })]);

      await session.commitTransaction();

      res.status(201).json({ message: "Note created!", note: createdNote });
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Creating note failed, please try again later." });
  }
};


//update note
const updateNote = async (req, res, next) => {
  const { title, isPublic, course_id } = req.body;
  const note_id = req.params.note_id;

  try {
    let note = await noteModel.findById(note_id);

    if (!note) {
      return res.status(404).json({ message: "Could not find note for the provided id." });
    }

    note.title = title;
    note.isPublic = isPublic;
    note.course_id = course_id;

    note = await note.save();

    res.status(200).json({ message: "Note updated!", note });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Updating note failed, please try again later." });
  }
};


//delete note
const deleteNote = async (req, res, next) => {
  const { user_id, course_id } = req.params;
  const note_id = req.params.note_id;

  try {
    const user = await userModel.findById(user_id);
    const course = await courseModel.findById(course_id);

    if (!user) {
      return res.status(404).json({ message: "Could not find user for the provided id." });
    }

    if (!course) {
      return res.status(404).json({ message: "Could not find course for the provided id." });
    }

    const note = await noteModel.findOneAndDelete({
      _id: note_id,
      user_id: user._id,
      course_id: course._id,
    });

    if (!note) {
      return res.status(404).json({ message: "Could not find note for the provided id." });
    }

    // Remove the note reference from user and course
    user.notes.pull(note._id);
    course.notes.pull(note._id);

    await Promise.all([user.save(), course.save()]);

    res.json({ message: "Note deleted!", note });
  } catch (error) {
    return res.status(500).json({ message: "Deleting note failed, please try again later." });
  }
};



//exports.getNotes = getNotes;
exports.getPublicNotesByCourseId = getPublicNotesByCourseId;
exports.getNoteByUserId = getNoteByUserId;
exports.createNote = createNote;
exports.updateNote = updateNote;
exports.deleteNote = deleteNote;