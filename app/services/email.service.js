require("dotenv").config()
const nodemailer = require("nodemailer");

console.log("Check User:", process.env.EMAIL_USER);
console.log("Check Pass:", process.env.SENDGRID_API_KEY ? "Loaded" : "Not Loaded");

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.SENDGRID_API_KEY
    }
});

exports.sendWelcomeEmail = async (userEmail, username) => {
    const mailOptions = {
        from: `"PinkPower Gym" <${process.env.EMAIL_FROM}>`,
        to: userEmail,
        subject: "Welcome to Pink Power Gym!",
        html: `
            <h1>Hello, ${username}!</h1>
            <p>Thanks for joining our female-only fitness community.</p>
            <p>You can now log in and start your fitness journey!</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("email sent to: " + userEmail);
    } catch (error) {
        console.error("Email Error: ", error);
    }
};