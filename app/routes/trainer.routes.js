const trainerController = require("../controllers/trainer.controller");
const { verifyToken } = require("../middleware/authJwt");
const { isAdmin } = require("../middleware/verifyRole");
const {isTrainer} = require("../middleware/verifyRole")

module.exports = function(app) {
    app.get("/api/trainers", trainerController.getAllTrainers);
    app.get("/api/trainers/:id", trainerController.getTrainerById)
    app.get("/api/trainer/my-workouts", [verifyToken, isTrainer], trainerController.getTrainerWorkouts)
    app.put("/api/admin/trainers/:id", [verifyToken, isAdmin], trainerController.updateTrainer)
    app.delete("/api/admin/trainers/:id", [verifyToken, isAdmin], trainerController.deleteTrainer)
};