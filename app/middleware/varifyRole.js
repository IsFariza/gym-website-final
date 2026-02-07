const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next(); 
    } else {
        return res.status(403).json({message: "Access denied: you are not Admin" }); //
    }
};

const isTrainer = (req, res, next) => {
    if (req.user && req.user.role === "trainer") {
        next(); 
    } else {
        return res.status(403).json({message: "Access denied: you are not Trainer" }); //
    }
};

module.exports = { isAdmin, isTrainer };