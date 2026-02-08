const Exercise = require("../models/exercise.model")

exports.findAll = async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.status(200).json(exercises);
    } catch (err) {
        res.status(500).json({ message: "Error fetching exercises"});
    }
};

exports.create = async (req, res) => {
    try {
        const exercise = new Exercise(req.body);
        const savedExercise = await exercise.save();
        res.status(201).json(savedExercise);
    } catch (err) {
        res.status(400).json({ message: "Validation failed: " + err.message });
    }
};