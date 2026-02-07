const Trainer = require("../models/user.model");

exports.getAllTrainers = async (req, res) => {
    try {
        const trainers = await Trainer.find({role: "trainer"}).select("-password");
        res.status(200).json(trainers);
    } catch (err) {
        res.status(500).json({message:"Error fetching trainers"});
    }
}

exports.getTrainerById = async (req, res) => {
    try {
        const trainer = await Trainer.findById(req.params.id).select("-password");
        if (!trainer || trainer.role !=="trainer") 
            return res.status(404).json({message: "Trainer not found"});
        res.status(200).json(trainer);
    } catch (err) {
        res.status(500).json({message:"Error fetching trainer"});
    }
}

exports.updateTrainer = async (req, res) => {
    try {
        const { specialty, experience, contactNumber, username, email } = req.body;

        const updatedTrainer = await Trainer.findOneAndUpdate(
            { 
                _id: req.params.id, 
                role: "trainer" 
            },
            { 
                specialty, 
                experience, 
                contactNumber, 
                username, 
                email },
            { 
                new: true, 
                runValidators: true 
            } 
        ).select("-password");

        if (!updatedTrainer) {
            return res.status(404).json({message: "Trainer not found"})
        }

        res.status(200).json({ 
            message: "Trainer updated successfully", 
            updatedTrainer 
        });
    } catch (err) {
        res.status(400).json({message: "Update failed: " + err.message });
    }
};

exports.deleteTrainer = async (req, res) => {
    try {
        const trainer = await Trainer.findOneAndDelete({ 
            _id: req.params.id, 
            role: "trainer" 
        });

        if (!trainer) {
            return res.status(404).json({message: "Trainer not found"}); 
        }

        res.status(200).json({message: "Trainer deleted successfully"});
    } catch (err) {
        res.status(500).json({message: "Error deleting trainer"}); 
    }
};

