const workoutController = require("../controllers/workout.controller");
const { verifyToken } = require("../middleware/authJwt");
const { isTrainer, isAdmin } = require("../middleware/verifyRole");

module.exports = function(app) {
   
    app.get("/api/workouts", workoutController.findAll);
    app.delete("/api/workouts/:id", [verifyToken], workoutController.delete)
    app.post("/api/workouts", [verifyToken], workoutController.create)
    app.put("/api/workouts/:id/exercises", [verifyToken], workoutController.addExerciseToWorkout)
    app.delete("/api/workouts/:id/exercises/:exerciseId", [verifyToken], workoutController.removeExerciseFromWorkout)
};