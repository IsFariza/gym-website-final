const { verifyToken } = require("../middlewares/authJwt");
const { isAdmin } = require("../middlewares/verifyRole");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller"); 
const { registerValidation } = require("../middleware/validate");

module.exports = function(app) {

    app.post("/api/auth/register", [registerValidation], authController.register);
    app.post("/api/auth/login", authController.login);

    app.get("/api/users/profile", [verifyToken], userController.getUserProfile);
    app.put("/api/users/profile", [verifyToken], userController.updateUserProfile);
    
    app.get("/api/admin/users", [verifyToken, isAdmin], userController.findAllUsers);
    app.delete("/api/admin/users/:id", [verifyToken, isAdmin], userController.deleteUser);
};