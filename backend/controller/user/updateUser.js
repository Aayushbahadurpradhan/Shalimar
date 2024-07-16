const userModel = require("../../models/userModel");

async function updateUser(req, res) {
    try {
        const sessionUser = req.userId;
        const { userId, email, name, role } = req.body;

        // Validate that userId is provided
        if (!userId) {
            return res.status(400).json({
                message: "User ID (userId) is required",
                error: true,
                success: false
            });
        }

        // Security: Check if sessionUser has permission to update userId (if needed)

        const payload = {
            ...(email && { email }),
            ...(name && { name }),
            ...(role && { role }),
        };

        const updateUser = await userModel.findByIdAndUpdate(userId, payload, { new: true });

        if (!updateUser) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        res.status(200).json({
            data: updateUser,
            message: "User updated successfully",
            success: true,
            error: false
        });

    } catch (err) {
        console.error("Error updating user:", err); // Log the error for debugging purposes
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
}

module.exports = updateUser;
