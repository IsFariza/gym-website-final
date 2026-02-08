const User = require("../models/user.model");

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); 
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ message:"Error fetching profile"});
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const { username, email, phoneNumber } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { username, email, phoneNumber },
            { new: true, runValidators: true }
        ).select("-password");

        res.status(200).json({ message: "Profile updated successfull", updatedUser });
    } catch (err) {
        res.status(400).json({ message: "Update failed: " + err.message });
    }
};

exports.findAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({message: "Error fetching users"});
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: "User deleted by admin"});
    } catch (err) {
        res.status(500).json({message: "Could not delete user"});
    }
}

exports.createTrainer = async (req, res) => {
    try {
        const { specialty, experience, contactNumber } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            { 
                role: 'trainer', 
                specialty, 
                experience, 
                contactNumber 
            },
            { new: true }
        )
        res.status(200).json({message: "User promoted to Trainer", updatedUser});
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}