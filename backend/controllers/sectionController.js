const sectionModel = require('../models/sectionModel');

// Get sections by note id
const getSectionsByNoteId = async (req, res, next) => {
  const { note_id } = req.params;

  let sections;
  try {
    sections = await sectionModel.find({ note_id }).populate('note_id');
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Fetching sections failed, please try again later." });
  }

  res.json({ sections: sections.map(section => section.toObject({ getters: true })) });
};



// Create a new section
const createSection = async (req, res, next) => {

    const { layout_field, note_id } = req.body;
    
    const createdSection = new sectionModel({
        layout_field,
        note_id
    });
    
    try {
        await createdSection.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Creating section failed, please try again." });
    }
    
    res.status(201).json({ section: createdSection });
}

//delete section from note
const deleteSection = async (req, res, next) => {
    const { note_id } = req.params;
    const section_id = req.params.section_id;

    try {
        const note = await noteModel.findById(note_id);
        const section = await sectionModel.findById(section_id);

        if (!note) {
            return res.status(404).json({ message: "Could not find note for the provided id." });
        }

        if (!section) {
            return res.status(404).json({ message: "Could not find section for the provided id." });
        }

        section = await sectionModel.findOneAndDelete({
            _id: section_id,
            note_id: note_id
        });

        note.sections.pull(section);
        await note.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Deleting section failed, please try again." });
    }

    res.status(200).json({ message: "Deleted section." });
}

exports.getSectionsByNoteId = getSectionsByNoteId;
exports.createSection = createSection;
exports.deleteSection = deleteSection;