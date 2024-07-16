const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');

async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body;

        // Input validation
        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }
        if (!name) {
            throw new Error("Please provide name");
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            throw new Error("User already exists");
        }

        // Hash password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);

        if (!hashedPassword) {
            throw new Error("Password hashing failed");
        }

        // Create new user
        const newUser = new userModel({
            email,
            password: hashedPassword,
            name,
            role: "GENERAL" // Assign default role
        });

        const savedUser = await newUser.save();

        res.status(201).json({
            data: savedUser,
            success: true,
            error: false,
            message: "User created successfully"
        });
    } catch (err) {
        console.error("Error signing up:", err); // Log the error for debugging purposes
        res.status(400).json({
            message: err.message || "Failed to create user",
            error: true,
            success: false
        });
    }
}

module.exports = userSignUpController;
