const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/auth.config');
const emailService = require("../services/email.service")

exports.register = async (req, res) => {
    try {
        const { username, email, password, gender, phoneNumber, role } = req.body;
        
        if (gender !== 'female') {
            return res.status(400).json({message: "Only female users may register"});
        }

        const hashedPwd = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPwd,
            gender,
            phoneNumber,
            role
        });

        await user.save();
        await emailService.sendWelcomeEmail(user.email, user.username)
        res.status(201).json({ message: "User registration successful!", user});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) 
            return res.status(404).json({message: "User not found"});

        const passwordIsValid = await bcrypt.compare(req.body.password, user.password);
        
        if (!passwordIsValid) 
            return res.status(401).json({message: "Invalid password"});

        const token = jwt.sign(
            { 
                id: user._id, 
                role: user.role 
            }, 
            config.secret, 
            { expiresIn: '24h' }
        );

        res.status(200).json({
            id: user._id,
            username: user.username,
            role: user.role,
            accessToken: token
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};