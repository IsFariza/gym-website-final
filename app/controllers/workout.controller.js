const Workout = require("../models/workout.model")

exports.findAll = async (req, res) => {
    try {
        const workouts = await Workout.find()
            .populate("trainer", "username specialty") 
            .populate("exercises", "name muscleGroup");
        res.status(200).json(workouts);
    } catch (err) {
        res.status(500).json({ message: "Error fetching programs" });
    }
}

exports.create = async (req, res) => {
    try {
        const workoutData = {
            ...req.body,
            trainer: req.user.id 
        };
        const workout = new Workout(workoutData);
        await workout.save();
        res.status(201).json(workout);
    } catch (err) {
        res.status(400).json({ message: "Failed to create workout: " + err.message });
    }
}

exports.addExerciseToWorkout = async (req, res) => {
    try {
        const { exerciseId } = req.body;
        
        const updatedWorkout = await Workout.findByIdAndUpdate(
            req.params.id,
            { 
                $addToSet: {
                    exercises: exerciseId
                }
            }, 
            { 
                new: true 
            }
        ).populate("exercises");

        if (!updatedWorkout)
             return res.status(404).json({message: "Workout not found"});

        res.status(200).json({message: "Workout updated succesfully", updatedWorkout});
    } catch (err) {
        res.status(400).json({message: "Error adding exercise: " + err.message});
    }
}

exports.removeExerciseFromWorkout = async (req, res) => {
    try {
        const { exerciseId } = req.params;

        const updatedWorkout = await Workout.findByIdAndUpdate(
            req.params.id,
            { 
                $pull: { 
                    exercises: exerciseId 
                } 
            }, 
            { 
                new: true 
            }
        ).populate("exercises");

        if (!updatedWorkout) {
            return res.status(404).json({message: "Workout not found"});
        }

        res.status(200).json({ message: "Exercise removed from workout", updatedWorkout});
    } catch (err) {
        res.status(400).json({ message: "Error removing exercise: " + err.message });
    }
}

exports.delete = async (req, res) => {
    try{
        const workout = await Workout.findByIdAndDelete(req.params.id);
        if(!workout)
            return res.status(404).json({message: "Workout not found"});
        res.status(200).json({message: "Workout deleted successfully"});

    } catch(err){
        res.status(500).json({message: "Error deleting workout: "+ err.message})
    }
}