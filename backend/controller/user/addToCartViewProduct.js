const addToCartModel = require("../../models/cartProduct");

const addToCartViewProduct = async (req, res) => {
    try {
        const currentUser = req.userId;

        const allProduct = await addToCartModel.find({ userId: currentUser }).populate("productId");

        res.status(200).json({
            data: allProduct,
            success: true,
            error: false
        });

    } catch (err) {
        console.error("Error viewing products in cart:", err); // Log the error for debugging purposes
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
};

module.exports = addToCartViewProduct;
