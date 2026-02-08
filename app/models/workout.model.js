const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    title: { 
        type: String, 
        trim: true,
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    level: { 
      type: String, 
      enum: ["beginner", "intermediate", "advanced"], 
      required: true 
    },
    trainer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    exercises: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise"
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);