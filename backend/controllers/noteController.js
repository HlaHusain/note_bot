const noteModel = require('../model/noteModel')
const userModel = require('../model/userModel');
const mongoose = require('mongoose');

/*
// Get all notes
const getNotes = (req, res, next) => {
    res.json(dummyData);
};
*/

// Get all notes by course_id: where isPublic = true
const getPublicNotesByCourseId = async (req, res, next) => {
  const course_id = req.params.course_id;
  let publicNotes;

  try {
    publicNotes = await noteModel.find({ isPublic: true, course_id: course_id });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Fetching public notes failed, please try again later." });
  }

  res.json({ notes: publicNotes.map(note => note.toObject({ getters: true })) });
};


// Get user notes by user_id
const getNoteByUserId = async (req, res, next) => {  

  //get id from params url
    const user_id = req.params.user_id;

    //let notes;
    let userWithNotes;

    try{
      //notes = await noteModel.find({user_id: user_id});
      
      userWithNotes = await userModel.findById(user_id).populate('notes');
    
    }catch(err){
      console.log(err);
      return res
      .status(500)
      .json({ message: "Getting notes failed , please try again later ." });
    }

    //if(!notes || notes.length === 0){ ... }
    if(!userWithNotes || userWithNotes.notes.length === 0){
      return res
      .status(404)
      .json({ message: "Could not find notes for the provided user id." });
    }
    
    //map() applies a function to every element of an array
    //Getters: true means that the object will have an id field instead of _id
    //res.json({notes: notes.map(note => note.toObject({getters: true}))});
    
    res.json({notes: userWithNotes.notes.map(note => note.toObject({getters: true}))});
  };


// Create a new note
 const createNote = async (req, res, next) => {

    const {user_id, title, isPublic, course_id}  = req.body;
   
    const createdNote = new noteModel({
      user_id: user_id,
      title: title,
      isPublic: isPublic,
      course_id: course_id,
    });

    let user;
    try{

      user = userModel.findById(user_id); // to check if the user exists

    }catch(err){
      return res
      .status(500)
      .json({ message: "Fetching notes failed , please try again later ." });
    }

    if(!user){
      return res
      .status(404)
      .json({ message: "Could not find user for the provided id." });
    }

    try{

      const sess = await mongoose.startSession();
      sess.startTransaction();
      await createdNote.save({session: sess}); //add the note to the database
      user.notes.push(createdNote); //push the note to the user
      await user.save({session: sess}); //save the user
      await sess.commitTransaction();

    }catch(err){
      return res
      .status(500)
      .json({ message: "Fetching notes failed , please try again later ." });
    }
    //Status 201 means created
    res.status(201).json({message: "Note created!", note: createdNote});
};


//update note
const updateNote = async (req, res, next) => {
  const {title, isPublic, course_id}  = req.body;
  const note_id = req.params.note_id;

  let note;
  try{
    note = await noteModel.findById(note_id);
  }catch(err){
    console.log(err);
    return res
    .status(500)
    .json({ message: "Updating note failed , please try again later ." });
  }

  note.title = title;
  note.isPublic = isPublic;
  note.course_id = course_id;

  try{
    await note.save(); 
  }catch(err){
    console.log(err);
    return res
    .status(500)
    .json({ message: "Updating note failed , please try again later ." });
  }

  res.status(200).json({message: "Note updated!", note: note.toObject({getters: true})});
};

//delete note
const deleteNote = async (req, res, next) => {
  const note_id = req.params.note_id;

  let note;
  try{
    place = await noteModel.findById(note_id).populate('user_id'); // the user_id allows us to access the user who created this note
  }catch(err){
    console.log(err);
    return res
    .status(500)
    .json({ message: "Deleting note failed , please try again later ." });
  }

  if(!note){
    return res
    .status(404)
    .json({ message: "Could not find note for this id." });
  }


  try{

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await note.remove({session: sess}); //remove the note from the database
    note.user_id.notes.pull(note); //pull the note from the user 
    await note.user_id.save({session: sess}); //save the user
    await sess.commitTransaction();

  }catch(err){
    return res
    .status(500)
    .json({ message: "Deleting note failed , please try again later ." });
  }

  res.status(200).json({message: "Note Deleted!", note: note.toObject({getters: true})});
};


//exports.getNotes = getNotes;
exports.getPublicNotesByCourseId = getPublicNotesByCourseId;
exports.getNoteByUserId = getNoteByUserId;
exports.createNote = createNote;
exports.updateNote = updateNote;
exports.deleteNote = deleteNote;