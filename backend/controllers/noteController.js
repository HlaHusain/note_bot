const noteModel = require("../model/noteModel");
const userModel = require("../model/userModel");
const courseModel = require("../model/courseModel");
const mongoose = require("mongoose");
const HttpError = require("../model/http-error");
//const { validationResult } = require('express-validator');

//Get all notes by user_id and course_id
const getNotesByUserIdAndCourseId = async (req, res, next) => {
  const { user_id, course_id } = req.params;

  try {
    const user = await userModel.findById(user_id).populate("notes");

    if (!user.notes || user.notes.length === 0) {
      return res
        .status(404)
        .json({ message: "Could not find notes for the provided user id." });
    }

    res.json({
      notes: user.notes
        .filter((note) => note.course_id.toString() === course_id)
        .map((note) => note.toObject({ getters: true })),
    });
  } catch (err) {
    const error = new HttpError(
      "An error occurred while fetching notes. ",
      500
    );
    return next(error);
  }
};

// Get user notes by user_id
const getNoteByUserId = async (req, res, next) => {
  const { user_id } = req.params;

  console.log(user_id, "user_id");

  try {
    const user = await userModel.findById(user_id).populate("notes");

    console.log("user.notes = ", user);

    if (!user.notes || user.notes.length === 0) {
      return res
        .status(404)
        .json({ message: "Could not find notes for the provided user id." });
    }

    //res.json({ notes: user.notes.map(note => note.toObject({ getters: true })) });
    // Group notes by course ID
    const groupedNotes = {};
    user.notes.forEach((note) => {
      const courseId = note.course_id._id.toString();

      if (!groupedNotes[courseId]) {
        groupedNotes[courseId] = {
          course_id: note.course_id._id,
          course_title: note.course_id.title,
          notes: [],
        };
      }

      groupedNotes[courseId].notes.push(note);
    });

    // Convert the grouped notes object to an array
    const groupedNotesArray = Object.values(groupedNotes);

    res.json({ notes: groupedNotesArray });
  } catch (err) {
    const error = new HttpError(
      "An error occurred while fetching notes. ",
      500
    );
    return next(error);
  }
};

// Get all notes by course title
const getNotesByCourseTitle = async (req, res, next) => {
  const searchKeyword = req.params.keyword;

  try {
    // Get all courses that match the search keyword
    const courses = await courseModel.find({
      title: { $regex: searchKeyword, $options: "i" },
    });
    const courseIds = courses.map((course) => course._id);

    // Get all notes that match the course ids
    const notes = await noteModel
      .find({ course_id: { $in: courseIds } })
      .populate("course_id", "title")
      .populate("user_id", "user_name")
      .select("note_id title");

    res.json(notes);
  } catch (err) {
    const error = new HttpError(
      "An error occurred while fetching notes. ",
      500
    );
    return next(error);
  }
};

// // Create a new note
// const createNote = async (req, res, next) => {
//   const { user_id, title, isPublic, course_id } = req.body;

//   //console.log(user_id, title, isPublic, course_id);

//   try {
//     // Input validation
//     if (!user_id || !title || !course_id) {
//       return res.status(400).json({ message: "Missing required fields." });
//     }

//     const [user, course] = await Promise.all([
//       userModel.findById(user_id),
//       courseModel.findById(course_id),
//     ]);

//     // Check if user and course exist
//     if (!user) {
//       return res
//         .status(404)
//         .json({ message: "Could not find user for the provided id." });
//     }
//     if (!course) {
//       return res
//         .status(404)
//         .json({ message: "Could not find course for the provided id." });
//     }

//     try {
//       const sess = await mongoose.startSession();
//       sess.startTransaction();
//       const createdNote = new noteModel({
//         title,
//         notes: noteIds, 
//       });
//       await createdNote.save({ session: sess }); //add the note to the database
//       user.notes.push(createdNote); //push the note to the user
//       await user.save({ session: sess }); //save the user
//       await sess.commitTransaction();

//       console.log("createdNote", createdNote);

//       res.status(201).json({ message: "Note created!", note: createdNote });
//     } catch (error) {
//       await session.abortTransaction();
//       throw error;
//     } finally {
//       session.endSession();
//     }
//   } catch (err) {
//     const error = new HttpError(
//       "Creating note failed, please try again later.",
//       500
//     );
//     return next(error);
//   }
// };

const createNote = async (req, res, next) => {
  const { user_id, title, isPublic, course_id } = req.body;
  
  try {
    // Input validation and error handling...

    const createdNote = new noteModel({
      user_id,
      title,
      isPublic,
      course_id,
      sections: [],
    });
    
    await createdNote.save();

    res.status(201).json({ message: "Note created!", note: createdNote });
  } catch (err) {
    const error = new HttpError(
      "Creating note failed, please try again later.",
      500
    );
    return next(error);
  }
};

// push a section to a note
const pushSectionsToNote = async (req, res, next) => {
  const { note_id, section_ids } = req.body;

  try {
    // Input validation and error handling...

    const note = await noteModel.findById(note_id);

    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }

    note.sections.push(...section_ids);
    await note.save();

    res.status(200).json({ message: "Sections added to note.", note });
  } catch (err) {
    const error = new HttpError(
      "Adding sections to note failed, please try again later.",
      500
    );
    return next(error);
  }
};



//update note
const updateNote = async (req, res, next) => {
  const { title, isPublic, course_id } = req.body;
  const note_id = req.params.note_id;

  try {
    let note = await noteModel.findById(note_id);

    if (!note) {
      return res
        .status(404)
        .json({ message: "Could not find note for the provided id." });
    }

    note.title = title;
    note.isPublic = isPublic;
    note.course_id = course_id;

    note = await note.save();

    res
      .status(200)
      .json({
        message: "Note updated!",
        note: note.toObject({ getters: true }),
      });
  } catch (err) {
    const error = new HttpError(
      "Updating note failed, please try again later.",
      500
    );
    return next(error);
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
      return res
        .status(404)
        .json({ message: "Could not find user for the provided id." });
    }

    if (!course) {
      return res
        .status(404)
        .json({ message: "Could not find course for the provided id." });
    }

    const note = await noteModel.findOneAndDelete({
      _id: note_id,
      user_id: user._id,
      course_id: course._id,
    });

    if (!note) {
      return res
        .status(404)
        .json({ message: "Could not find note for the provided id." });
    }

    // Remove the note reference from user and course
    user.notes.pull(note._id);
    course.notes.pull(note._id);

    await Promise.all([user.save(), course.save()]);

    res.json({ message: "Note deleted!", note });
  } catch (err) {
    const error = new HttpError(
      "Deleting note failed, please try again later.",
      500
    );
    return next(error);
  }
};

// save note
const saveNote = async (req, res, next) => {
  const { user_id, note_id } = req.params;

  try {
    // Find the user by user_id
    const user = await userModel.findById(user_id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "Could not find user for the provided id." });
    }

    // Find the note by note_id
    const note = await noteModel.findById(note_id);

    if (!note) {
      return res
        .status(404)
        .json({ message: "Could not find note for the provided id." });
    }

    // Check if the user who wrote the note is different from the user trying to save it
    if (note.user_id.toString() === user._id.toString()) {
      return res
        .status(400)
        .json({ message: "Cannot save a note written by yourself." });
    }

    // Check if the user has already saved the note
    const isNoteSaved = note.saved_by.includes(user._id);

    if (isNoteSaved) {
      return res
        .status(400)
        .json({ message: "Note is already saved by the user." });
    }

    // Save the note for the user
    note.saved_by.push(user._id);
    await note.save();

    res.json({ message: "Note saved successfully." });
  } catch (err) {
    const error = new HttpError(
      "An error occurred while saving the note.",
      500
    );
    return next(error);
  }
};

//get saved notes of a user
const getSavedNotesByUserId = async (req, res, next) => {
  const { user_id } = req.params;

  try {
    const notes = await noteModel
      .find({ saved_by: user_id })
      .populate("course_id", "title")
      .populate("user_id", "user_name")
      .select("note_id title");

    res.json(notes);
  } catch (err) {
    const error = new HttpError("An error occurred while fetching notes.", 500);
    return next(error);
  }
};

//get all notes
const getNotes = async (req, res, next) => {
  try {
    const notes = await noteModel.find();
    res.json({ notes: notes.map((note) => note.toObject({ getters: true })) });
  } catch (err) {
    const error = new HttpError(
      "An error occurred while fetching notes. ",
      500
    );
    return next(error);
  }
};

const getNoteByNoteID = async (req, res, next) => {
  const { note_id } = req.params;

  try {
    const note = await noteModel.findById(note_id);

    if (!note) {
      return res
        .status(404)
        .json({ message: "Could not find note for the provided ID." });
    }

    res.json({ note: note.toObject({ getters: true }) });
  } catch (err) {
    const error = new HttpError(
      "An error occurred while fetching the note.",
      500
    );
    return next(error);
  }
};


exports.getNotesByUserIdAndCourseId = getNotesByUserIdAndCourseId;
exports.getNoteByUserId = getNoteByUserId;
exports.getNotesByCourseTitle = getNotesByCourseTitle;
exports.createNote = createNote;
exports.updateNote = updateNote;
exports.deleteNote = deleteNote;

exports.saveNote = saveNote;
exports.getSavedNotesByUserId = getSavedNotesByUserId;

exports.getNoteByNoteID = getNoteByNoteID;
exports.pushSectionsToNote = pushSectionsToNote;
