const noteModel = require('../model/noteModel')
const uuid = require("uuid");

//DUMMY DATA :), it is only stored in the memory!
const dummyData = [
    {
      archive_from_id: "",
      user_id: 1,
      title: "Notes in AWT",
      avg_rate: "4",
      isPublic: 1,
      course_id: 15
    },
    {
      archive_from_id: "",
      user_id: 2,
      title: "Notes in ILE",
      avg_rate: "4",
      isPublic: 1,
      course_id: 4,
    },
  ];

// Get all notes
const getNotes = (req, res, next) => {
    res.json(dummyData);
};


// Get a user notes by user_id
const getNoteByUserId = (req, res, next) => {  
  //get id from params url
    const user_id = req.params.user_id;
    const notes = dummyData.find((n) => n.user_id === user_id );
    res.json(notes);
};

// Create a new note
 const createNote = async (req, res, next) => {

    const {user_id, title, isPublic, course_id}  = req.body;
    
    const createdNote = {
        // Generating a random id by using uuid package (a third party package)
        id: uuid.v4(),
        user_id: user_id,
        title: title,
        isPublic: isPublic,
        course_id: course_id,
    };
    
    dummyData.push(createdNote);
    await noteModel.insertMany(createdNote)
    res.status(201).json({message: "Note created!", note: createdNote});
};


exports.getNotes = getNotes;
exports.getNoteByUserId = getNoteByUserId;
exports.createNote = createNote;