const userModel = require("../../models/userModel");

async function allUsers(req, res) {
    try {
        console.log("UserID in allUsers:", req.userId);

        const allUsers = await userModel.find();

        res.status(200).json({
            message: "All Users",
            data: allUsers,
            success: true,
            error: false
        });
    } catch (err) {
        console.error("Error fetching all users:", err); // Log the error for debugging purposes
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
}

module.exports = allUsers;
