const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }

        // Check if user exists
        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        // Check password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (isPasswordCorrect) {
            // Generate JWT token
            const tokenData = {
                _id: user._id,
                email: user.email,
            };
            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

            // Set cookie options
            const tokenOptions = {
                httpOnly: true,
                secure: true, // Enable in production for HTTPS
                sameSite: 'strict' // Mitigates CSRF attacks
            };

            // Set cookie with JWT token
            res.cookie("token", token, tokenOptions).status(200).json({
                message: "Login successful",
                data: token,
                success: true,
                error: false
            });
        } else {
            throw new Error("Incorrect password");
        }
    } catch (err) {
        console.error("Error signing in:", err); // Log the error for debugging purposes
        res.status(401).json({
            message: err.message || "Authentication failed",
            error: true,
            success: false
        });
    }
}

module.exports = userSignInController;
