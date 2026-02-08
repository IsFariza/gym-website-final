const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    muscleGroup: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    machineRequired: { 
      type: String,
      default: "None"
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Exercise", exerciseSchema);