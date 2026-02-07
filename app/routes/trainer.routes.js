const trainerController = require("../controllers/trainer.controller");
const { verifyToken } = require("../middlewares/authJwt");
const { isAdmin } = require("../middlewares/verifyRole");

module.exports = function(app) {
    app.get("/api/trainers", trainerController.getAllTrainers);
    app.get("/api/trainers/:id", trainerController.getTrainerById);
    app.put("/api/admin/trainers/:id", [verifyToken, isAdmin], trainerController.updateTrainer)
    app.delete("/api/admin/trainers/:id", [verifyToken, isAdmin], trainerController.deleteTrainer)
};