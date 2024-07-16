const userModel = require("../../models/userModel");

async function userDetailsController(req, res) {
    try {
        console.log("userId", req.userId);
        const user = await userModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        console.log("user", user); // Log user details

        res.status(200).json({
            data: user,
            error: false,
            success: true,
            message: "User details retrieved successfully"
        });

    } catch (err) {
        console.error("Error fetching user details:", err); // Log the error for debugging purposes
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
}

module.exports = userDetailsController;
