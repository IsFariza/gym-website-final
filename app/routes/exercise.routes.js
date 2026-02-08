const exerciseController = require("../controllers/exercise.controller");
const { verifyToken } = require("../middleware/authJwt");
const { isTrainer} = require("../middleware/verifyRole");

module.exports = function(app) {
    app.get("/api/exercises", exerciseController.findAll);
    app.post("/api/exercises", [verifyToken, isTrainer], exerciseController.create);
};