const widgetModel = require("../models/widgetModel.js");
const WIDGET_TYPES = require("../models/widgetTypes.js");

// Get widgets by section id
const getWidgetsBySectionId = async (req, res, next) => {
    const { section_id } = req.params;
    
    let widgets;
    try {
        widgets = await widgetModel.find({ section_id }).populate("section_id");
    } catch (err) {
        console.log(err);
        return res
        .status(500)
        .json({ message: "Fetching widgets failed, please try again later." });
    }
    
    res.json({ widgets: widgets.map((widget) => widget.toObject({ getters: true })) });
    }

    // Create a new widget
    const createWidget = async (req, res, next) => {

        const { widget_type, section_id } = req.body;
        
        const createdWidget = new widgetModel({
            widget_type,
            section_id
        });
        
        try {
            await createdWidget.save();
        } catch (err) {
            console.log(err);
            return res
            .status(500)
            .json({ message: "Creating widget failed, please try again." });
        }
        
        res.status(201).json({ widget: createdWidget });
    }

    //delete widget from section
    //const deleteWidget = async (req, res, next) => { ... }

    //update widget
    //const updateWidget = async (req, res, next) => { ... }

    exports.getWidgetsBySectionId = getWidgetsBySectionId;
    exports.createWidget = createWidget;