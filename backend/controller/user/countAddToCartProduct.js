const addToCartModel = require("../../models/cartProduct");

const countAddToCartProduct = async (req, res) => {
    try {
        const userId = req.userId;

        const count = await addToCartModel.countDocuments({ userId });

        res.status(200).json({
            data: { count },
            message: "Count retrieved successfully",
            error: false,
            success: true
        });
    } catch (error) {
        console.error("Error counting products in cart:", error); // Log the error for debugging purposes
        res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
};

module.exports = countAddToCartProduct;
