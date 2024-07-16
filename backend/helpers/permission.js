const userModel = require("../models/userModel");

const uploadProductPermission = async (userId) => {
    try {
        const user = await userModel.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        return user.role === 'ADMIN';
    } catch (error) {
        console.error("Error checking upload permission:", error);
        return false; // Default to false if any error occurs
    }
};

module.exports = uploadProductPermission;
