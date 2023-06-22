const courseModel = require('../model/courseModel');
const noteModel = require('../model/noteModel');
const userModel = require('../model/userModel');
const mongoose = require('mongoose');

// Get all courses by user_id
const getCoursesByUserId = async (req, res, next) => {
    const user_id = req.params.user_id;
    let courses;
    
    try {
        courses = await courseModel.find({ user_id: user_id });
    } catch (err) {
        console.log(err);
        return res
        .status(500)
        .json({ message: "Fetching courses failed, please try again later." });
    }
    
    res.json({ courses: courses.map(course => course.toObject({ getters: true })) });
    }

    //create a new course
    const createCourse = async (req, res, next) => {
        const { course_name, course_code, course_description, user_id } = req.body;
        
        const createdCourse = new courseModel({
            course_name,
            course_code,
            course_description,
            user_id
        });
        
        try {
            await createdCourse.save();
        } catch (err) {
            console.log(err);
            return res
            .status(500)
            .json({ message: "Creating course failed, please try again." });
        }
        
        res.status(201).json({ course: createdCourse });
    }

    //delete course and its notes
    //const deleteCourse = async (req, res, next) => { ... }


    exports.getCoursesByUserId = getCoursesByUserId;
    exports.createCourse = createCourse;
